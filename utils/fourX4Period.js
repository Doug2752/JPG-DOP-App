import { storage } from '../services/storage';
import { todayStr } from './date';

const DAY_MS = 24 * 60 * 60 * 1000;

const CYCLE_LENGTH_DAYS = 30;
const GRACE_DEADLINE_DAYS = 34;

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function addDays(iso, n) {
  return new Date(new Date(iso + 'T00:00:00Z').getTime() + n * DAY_MS);
}

function fmtMonthDay(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

function daysBetweenInclusive(fromISO, untilISO) {
  const a = new Date(fromISO + 'T00:00:00Z').getTime();
  const b = new Date(untilISO + 'T00:00:00Z').getTime();
  return Math.round((b - a) / DAY_MS) + 1;
}

const CYCLE_FALLBACK = {
  cycle_start: '2026-08-01',
  tracking_start_date: null,
  onramp_end: null,
  tier: 4,
  cap_override_minutes: null,
};

/**
 * Reads the HUB client record for `username` out of the shared
 * localStorage key `hub_clients` and returns its cycle anchors. HUB owns
 * this data; DOP is read-only against it. Falls back to a fixed
 * cycle_start when no record is found so dev testing always exercises the
 * 30-day cycle path rather than silently skipping it.
 */
export async function getCycleData(username) {
  let clients;
  try {
    clients = JSON.parse(localStorage.getItem('hub_clients'));
  } catch (_) {
    return { ...CYCLE_FALLBACK };
  }
  if (!Array.isArray(clients) || !username) return { ...CYCLE_FALLBACK };

  const target = String(username).trim().toLowerCase();
  const match = clients.find(c => c && [
    c.username, c.name, c.client_name, c.user, c.id,
  ].some(v => v && String(v).trim().toLowerCase() === target));
  if (!match) return { ...CYCLE_FALLBACK };

  return {
    cycle_start: match.cycle_start ?? CYCLE_FALLBACK.cycle_start,
    tracking_start_date: match.tracking_start_date ?? null,
    onramp_end: match.onramp_end ?? null,
    tier: match.tier ?? 4,
    cap_override_minutes: match.cap_override_minutes ?? null,
  };
}

/** Reads the cycle anchor off the active record, falling back to HUB. */
async function resolveCycleStart(user, active) {
  return active[0].cycle_start || (await getCycleData(user)).cycle_start;
}

export function graceDeadlineDate(cycleStart) {
  return addDays(cycleStart, GRACE_DEADLINE_DAYS);
}

export function canClose(cycleStart, todayISO) {
  return todayISO >= isoDate(addDays(cycleStart, CYCLE_LENGTH_DAYS));
}

export function isGraceExpired(cycleStart, todayISO) {
  return todayISO > isoDate(graceDeadlineDate(cycleStart));
}

export function describeCloseWindow(cycleStart) {
  const start = isoDate(addDays(cycleStart, CYCLE_LENGTH_DAYS));
  const end = isoDate(graceDeadlineDate(cycleStart));
  return `${fmtMonthDay(start)} through ${fmtMonthDay(end)}`;
}

export function periodDateRange(fromISO, untilISO) {
  const days = daysBetweenInclusive(fromISO, untilISO);
  return `${fmtMonthDay(fromISO)} - ${fmtMonthDay(untilISO)} (${days} days)`;
}

export function nextCycleOf(cycleStart) {
  return { cycleStart: isoDate(addDays(cycleStart, CYCLE_LENGTH_DAYS)) };
}

export function computeTimesExpected(protocol, fromISO, untilISO) {
  const days = daysBetweenInclusive(fromISO, untilISO);
  if (protocol.frequency === 'weekly_target') {
    const weeks = Math.ceil(days / 7);
    return (protocol.weekly_target || 0) * weeks;
  }
  return days;
}

export function auditOutcome(rate) {
  if (rate >= 0.85) return 'unlocked';
  if (rate >= 0.75) return 'standard';
  return 'remediate';
}

export async function countCompletions(user, protocolId, fromISO, untilISO) {
  const sk = (user || 'guest') + '_dop7_';
  const adRaw = await storage.get(sk + 'archiveDates');
  const dates = adRaw && adRaw.value ? JSON.parse(adRaw.value) : [];
  const inRange = dates.filter(d => d >= fromISO && d <= untilISO);
  let count = 0;
  for (const d of inRange) {
    const fv = await storage.get(sk + 'form_' + d);
    if (fv && fv.value) {
      try {
        const f = JSON.parse(fv.value);
        if (f.fourX4Checks && f.fourX4Checks[protocolId]) count++;
      } catch (_) { /* skip unparsable day */ }
    }
  }
  return count;
}

/**
 * Closes whatever active-status records exist for `user` as of `activeUntil`,
 * writing a History Snapshot Record for each and updating the live protocol
 * records in place (status/core_outcome/coach_overridden/active_until).
 * Re-reads 4x4_protocols_ from storage itself so callers never need to pass
 * a possibly-stale copy. Returns { closed, protocols } where `protocols` is
 * the full merged array as written to storage.
 */
export async function closeActivePeriod(user, activeUntil, overrides = {}) {
  const normalizedUser = user.toLowerCase();
  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const active = all.filter(r => r.status === 'active');
  if (active.length === 0) return { closed: false, protocols: all };

  const netTimeCostSnapshot = active.reduce((sum, p) => (
    p.time_cost_minutes === null || p.time_cost_minutes === undefined
      ? sum
      : sum + Number(p.time_cost_minutes)
  ), 0);
  const dateRange = periodDateRange(active[0].active_from, activeUntil);

  const status = overrides.status || 'history';
  const coreOutcome = 'core_outcome' in overrides
    ? overrides.core_outcome
    : null;

  const historyRecords = [];
  const closedProtocols = [];
  for (const p of active) {
    const timesCompleted = await countCompletions(
      user, p.id, p.active_from, activeUntil
    );
    const timesExpected = computeTimesExpected(
      p, p.active_from, activeUntil
    );
    const completionRate = timesExpected > 0
      ? timesCompleted / timesExpected
      : 0;
    const coachOverridden = 'coach_overridden' in overrides
      ? overrides.coach_overridden
      : p.coach_overridden;

    const freshPv = await storage.get('4x4_protocols_' + normalizedUser);
    const freshAll = freshPv && freshPv.value ? JSON.parse(freshPv.value) : all;
    const freshP = freshAll.find(r => r.id === p.id) || p;
    const base = {
      ...freshP,
      active_until: activeUntil,
      status,
      core_outcome: coreOutcome,
      coach_overridden: coachOverridden,
    };

    historyRecords.push({
      ...base,
      times_completed: timesCompleted,
      times_expected: timesExpected,
      completion_rate: completionRate,
      net_time_cost_snapshot: netTimeCostSnapshot,
      period_date_range: dateRange,
      audit_outcome: auditOutcome(completionRate),
    });
    closedProtocols.push(base);
  }

  // Alteration originals archived mid-cycle for the closing cycle:
  // judged independently at close over their pre-alteration window.
  // Kept out of the tier-cap evaluation (partial-period fragments).
  const closingCycleStart = await resolveCycleStart(user, active);
  const alteredOriginals = all.filter(r => (
    r.status === 'altered_archived'
    && r.cycle_start === closingCycleStart
  ));
  const alteredHistoryRecords = [];
  const alteredGradProtocols = [];
  for (const p of alteredOriginals) {
    const timesCompleted = await countCompletions(
      user, p.id, p.active_from, p.active_until
    );
    const timesExpected = computeTimesExpected(
      p, p.active_from, p.active_until
    );
    const completionRate = timesExpected > 0
      ? timesCompleted / timesExpected
      : 0;
    const gradBase = {
      ...p,
      status: 'pending_graduation_original',
    };
    alteredHistoryRecords.push({
      ...gradBase,
      times_completed: timesCompleted,
      times_expected: timesExpected,
      completion_rate: completionRate,
      net_time_cost_snapshot: netTimeCostSnapshot,
      period_date_range: periodDateRange(p.active_from, p.active_until),
      audit_outcome: auditOutcome(completionRate),
    });
    alteredGradProtocols.push(gradBase);
  }

  const hv = await storage.get('4x4_history_' + normalizedUser);
  const existingHistory = hv && hv.value ? JSON.parse(hv.value) : [];
  await storage.set(
    '4x4_history_' + normalizedUser,
    JSON.stringify(
      existingHistory.concat(historyRecords).concat(alteredHistoryRecords)
    )
  );

  const { tier: hubTier, cap_override_minutes: capOverride } = await getCycleData(user);
  await evaluateAndWriteTierCap(user, storage, hubTier, capOverride);

  const ts = Date.now();
  const remediateCarries = [];
  historyRecords.forEach((hr, idx) => {
    if (hr.audit_outcome !== 'remediate') return;
    const closedRecord = closedProtocols[idx];
    const { cycleStart: nextCycleStart } = nextCycleOf(
      closedRecord.cycle_start || closingCycleStart
    );
    remediateCarries.push({
      ...closedRecord,
      id: '4x4_' + ts + '_' + closedRecord.foundation_core,
      status: 'active',
      core_outcome: null,
      cycle_start: nextCycleStart,
      active_from: nextCycleStart,
      active_until: null,
      times_completed: 0,
      times_expected: 0,
      completion_rate: 0,
      is_keepin4x4: false,
      linked_to: closedRecord.id,
      cycle_id: closedRecord.cycle_id,
      attempt_number: (closedRecord.attempt_number || 1) + 1,
      is_remediate_carry: true,
    });
  });

  const rest = all.filter(r => (
    r.status !== 'active'
    && !(r.status === 'altered_archived' && r.cycle_start === closingCycleStart)
    && r.core_outcome !== 'retry'
  ));
  const seenIds = new Set();
  const merged = rest
    .concat(closedProtocols)
    .concat(remediateCarries)
    .concat(alteredGradProtocols)
    .filter(r => {
      if (seenIds.has(r.id)) return false;
      seenIds.add(r.id);
      return true;
    });
  await storage.set('4x4_protocols_' + normalizedUser, JSON.stringify(merged));

  return { closed: true, protocols: merged };
}

/**
 * Writes the Time Governor cap for the user. Cap is sourced from HUB:
 * capOverride (positive integer) if set, else tier 1 → 60 min,
 * all other tiers → 30 min.
 */
export async function evaluateAndWriteTierCap(user, storage, tier, capOverride) {
  const normalizedUser = user.toLowerCase();
  let cap;
  if (capOverride !== null && capOverride !== undefined && Number.isInteger(capOverride) && capOverride > 0) {
    cap = capOverride;
  } else if (tier === 1) {
    cap = 60;
  } else {
    cap = 30;
  }
  const tierData = { tier, cap };
  await storage.set('4x4_tier_' + normalizedUser, JSON.stringify(tierData));
  return tierData;
}

/**
 * Returns closed protocol records (status !== 'active') that have not yet
 * been through a Promote/Drop graduation decision — i.e. core_outcome is
 * still null (manual close) or 'incomplete' (auto-close), not yet
 * 'advanced' or 'retry'. Each record is annotated with audit_outcome
 * pulled from its matching History snapshot (same id).
 */
export async function getPendingGraduationDecisions(user) {
  const normalizedUser = user.toLowerCase();
  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const pending = all.filter(r => (
    r.status !== 'active'
    && r.status !== 'altered_archived'
    && r.core_outcome !== 'advanced'
    && r.core_outcome !== 'retry'
    && !r.is_keepin4x4
  ));
  if (pending.length === 0) return [];

  const hv = await storage.get('4x4_history_' + normalizedUser);
  const history = hv && hv.value ? JSON.parse(hv.value) : [];

  return pending
    .map(p => {
      const h = history.find(r => r.id === p.id);
      return { ...p, audit_outcome: h ? h.audit_outcome : null };
    })
    .filter(p => p.audit_outcome !== 'remediate');
}

/**
 * Promote outcome: marks the protocol advanced/graduated and writes a new
 * custom AM and/or PM item (per time_of_day) into the client's DOP setup
 * so it appears on the daily checklist, carrying a "Graduated from 4x4"
 * marker in its label. That protocol's time_cost_minutes stops counting
 * toward the 4x4 Time Governor budget automatically, since only
 * status:'active' records feed the Set Up / Edit net-cost calculation.
 */
export async function promoteProtocol(user, protocolId, timeOfDayOverride) {
  const normalizedUser = user.toLowerCase();
  const sk = (user || 'guest') + '_dop7_';

  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const idx = all.findIndex(r => r.id === protocolId);
  if (idx === -1) return null;
  const protocol = all[idx];

  const resolvedTimeOfDay = timeOfDayOverride || protocol.time_of_day;
  const dopItemId = 'grad_' + Date.now() + '_' + protocol.foundation_core;
  const label = protocol.name;

  const sv = await storage.get(sk + 'setup');
  const setup = sv && sv.value ? JSON.parse(sv.value) : null;
  if (setup) {
    if (resolvedTimeOfDay === 'am' || resolvedTimeOfDay === 'both') {
      const id = 'am_custom_' + dopItemId;
      setup.amCustomItems = [...(setup.amCustomItems || []), { id, label, graduated_from_4x4: true }];
      setup.amOrder = [...(setup.amOrder || []), id];
    }
    if (resolvedTimeOfDay === 'pm' || resolvedTimeOfDay === 'both') {
      const id = 'pm_custom_' + dopItemId;
      setup.pmCustomItems = [...(setup.pmCustomItems || []), { id, label, graduated_from_4x4: true }];
      setup.pmOrder = [...(setup.pmOrder || []), id];
    }
    await storage.set(sk + 'setup', JSON.stringify(setup));
  }

  all[idx] = {
    ...protocol,
    graduated_to_dop: true,
    core_outcome: 'advanced',
    dop_item_id: dopItemId,
  };
  await storage.set('4x4_protocols_' + normalizedUser, JSON.stringify(all));
  return all[idx];
}

/**
 * Drop outcome: marks the protocol retry. The already-written History
 * snapshot stands as-is; nothing else continues, no DOP item is created.
 */
export async function dropProtocol(user, protocolId) {
  const normalizedUser = user.toLowerCase();
  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const idx = all.findIndex(r => r.id === protocolId);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], core_outcome: 'retry' };
  await storage.set('4x4_protocols_' + normalizedUser, JSON.stringify(all));
  return all[idx];
}

/**
 * Keep-in-4x4 outcome: the graduation decision is deferred. The closed
 * record itself just gets flagged is_keepin4x4:true / core_outcome:null —
 * it still carries its own original lineage fields unchanged. The actual
 * continuation (a new active record carrying linked_to/attempt_number/
 * cycle_id/prior_frequency/prior_time_cost forward from this record) is
 * created later, when the client saves the next Set Up/Edit period.
 */
export async function keepIn4x4Protocol(user, protocolId) {
  const normalizedUser = user.toLowerCase();
  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const idx = all.findIndex(r => r.id === protocolId);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], is_keepin4x4: true, core_outcome: null };
  await storage.set('4x4_protocols_' + normalizedUser, JSON.stringify(all));
  return all[idx];
}

/**
 * Returns closed protocols marked is_keepin4x4 that have not yet been
 * carried into a new active record (i.e. no other record's linked_to
 * points at them). These are pre-fill candidates for the next Set Up/
 * Edit screen. Each is annotated with audit_outcome from its matching
 * History snapshot, so the Set Up screen can flag Remediate carryovers.
 */
export async function getKeepIn4x4Carryovers(user) {
  const normalizedUser = user.toLowerCase();
  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const carryovers = all.filter(r => (
    r.is_keepin4x4 && !all.some(o => o.linked_to === r.id)
  ));
  if (carryovers.length === 0) return [];

  const hv = await storage.get('4x4_history_' + normalizedUser);
  const history = hv && hv.value ? JSON.parse(hv.value) : [];

  return carryovers.map(p => {
    const h = history.find(r => r.id === p.id);
    return { ...p, audit_outcome: h ? h.audit_outcome : null };
  });
}

/**
 * Combined-growth percentage for a Keep-in-4x4 protocol being saved into a
 * new period:
 *   freq_delta = ((new_weekly_target - prior_frequency) / prior_frequency) * 100
 *   duration_delta = ((new_time_cost_minutes - prior_time_cost) / prior_time_cost) * 100
 *   combined = freq_delta + duration_delta
 * Daily frequency (no weekly_target) is treated as 0 on either side of
 * freq_delta. If the prior protocol was DNA (prior_time_cost null), only
 * freq_delta counts and the full 25% must come from frequency alone. A
 * zero prior value on either dimension contributes 0 to that dimension's
 * delta (skips the division) rather than passing/failing the whole check.
 * Caller compares the returned percentage against the 25% threshold.
 */
export function keepIn4x4GrowthPercent(draft, carryover) {
  const priorFreq = Number(carryover.priorFrequency) || 0;
  const newFreq = draft.frequency === 'weekly_target'
    ? (Number(draft.weekly_target) || 0)
    : 0;
  const freqDelta = priorFreq !== 0
    ? ((newFreq - priorFreq) / priorFreq) * 100
    : 0;

  const priorWasDNA = carryover.priorTimeCost === null
    || carryover.priorTimeCost === undefined;
  if (priorWasDNA) return freqDelta;

  const priorTime = Number(carryover.priorTimeCost) || 0;
  const newTime = draft.timeDNA ? 0 : (Number(draft.time_cost_minutes) || 0);
  const durationDelta = priorTime !== 0
    ? ((newTime - priorTime) / priorTime) * 100
    : 0;

  return freqDelta + durationDelta;
}

/**
 * Called on app load, before the Today view renders. If the active cycle's
 * grace window (through day 34 of the cycle) has expired, auto-closes it
 * with status/core_outcome "incomplete" using whatever partial data exists.
 * Returns the current full protocols array (merged if a close happened).
 */
export async function runAutoCloseCheck(user) {
  if (!user) return [];
  const normalizedUser = user.toLowerCase();
  const pv = await storage.get('4x4_protocols_' + normalizedUser);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const active = all.filter(r => r.status === 'active');
  if (active.length === 0) return all;

  const cycleStart = await resolveCycleStart(user, active);
  if (!isGraceExpired(cycleStart, todayStr())) return all;

  const graceEndISO = isoDate(graceDeadlineDate(cycleStart));
  const result = await closeActivePeriod(normalizedUser, graceEndISO, {
    status: 'incomplete',
    core_outcome: 'incomplete',
    coach_overridden: false,
  });
  return result.protocols;
}
