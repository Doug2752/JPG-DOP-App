import { storage } from '../services/storage';
import { todayStr } from './date';

const DAY_MS = 24 * 60 * 60 * 1000;

function isoDate(d) {
  return d.toISOString().slice(0, 10);
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

export function monthEndDate(monthSet) {
  const [y, m] = monthSet.split('-').map(Number);
  return new Date(Date.UTC(y, m, 0));
}

export function graceDeadlineDate(monthSet) {
  return new Date(monthEndDate(monthSet).getTime() + 5 * DAY_MS);
}

export function canClose(monthSet, todayISO) {
  return todayISO >= isoDate(monthEndDate(monthSet));
}

export function isGraceExpired(monthSet, todayISO) {
  return todayISO > isoDate(graceDeadlineDate(monthSet));
}

export function describeCloseWindow(monthSet) {
  const start = isoDate(monthEndDate(monthSet));
  const end = isoDate(graceDeadlineDate(monthSet));
  return `${fmtMonthDay(start)} through ${fmtMonthDay(end)}`;
}

export function periodDateRange(fromISO, untilISO) {
  const days = daysBetweenInclusive(fromISO, untilISO);
  return `${fmtMonthDay(fromISO)} - ${fmtMonthDay(untilISO)} (${days} days)`;
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
  const pv = await storage.get('4x4_protocols_' + user);
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

    const base = {
      ...p,
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

  const hv = await storage.get('4x4_history_' + user);
  const existingHistory = hv && hv.value ? JSON.parse(hv.value) : [];
  await storage.set(
    '4x4_history_' + user,
    JSON.stringify(existingHistory.concat(historyRecords))
  );

  const rest = all.filter(r => r.status !== 'active');
  const merged = rest.concat(closedProtocols);
  await storage.set('4x4_protocols_' + user, JSON.stringify(merged));

  return { closed: true, protocols: merged };
}

/**
 * Returns closed protocol records (status !== 'active') that have not yet
 * been through a Promote/Drop graduation decision — i.e. core_outcome is
 * still null (manual close) or 'incomplete' (auto-close), not yet
 * 'advanced' or 'retry'. Each record is annotated with audit_outcome
 * pulled from its matching History snapshot (same id).
 */
export async function getPendingGraduationDecisions(user) {
  const pv = await storage.get('4x4_protocols_' + user);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const pending = all.filter(r => (
    r.status !== 'active'
    && r.core_outcome !== 'advanced'
    && r.core_outcome !== 'retry'
  ));
  if (pending.length === 0) return [];

  const hv = await storage.get('4x4_history_' + user);
  const history = hv && hv.value ? JSON.parse(hv.value) : [];

  return pending.map(p => {
    const h = history.find(r => r.id === p.id);
    return { ...p, audit_outcome: h ? h.audit_outcome : null };
  });
}

/**
 * Promote outcome: marks the protocol advanced/graduated and writes a new
 * custom AM and/or PM item (per time_of_day) into the client's DOP setup
 * so it appears on the daily checklist, carrying a "Graduated from 4x4"
 * marker in its label. That protocol's time_cost_minutes stops counting
 * toward the 4x4 Time Governor budget automatically, since only
 * status:'active' records feed the Set Up / Edit net-cost calculation.
 */
export async function promoteProtocol(user, protocolId) {
  const sk = (user || 'guest') + '_dop7_';

  const pv = await storage.get('4x4_protocols_' + user);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const idx = all.findIndex(r => r.id === protocolId);
  if (idx === -1) return null;
  const protocol = all[idx];

  const dopItemId = 'grad_' + Date.now() + '_' + protocol.foundation_core;
  const label = protocol.name + ' (Graduated from 4x4)';

  const sv = await storage.get(sk + 'setup');
  const setup = sv && sv.value ? JSON.parse(sv.value) : null;
  if (setup) {
    if (protocol.time_of_day === 'am' || protocol.time_of_day === 'both') {
      const id = 'am_custom_' + dopItemId;
      setup.amCustomItems = [...(setup.amCustomItems || []), { id, label }];
      setup.amOrder = [...(setup.amOrder || []), id];
    }
    if (protocol.time_of_day === 'pm' || protocol.time_of_day === 'both') {
      const id = 'pm_custom_' + dopItemId;
      setup.pmCustomItems = [...(setup.pmCustomItems || []), { id, label }];
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
  await storage.set('4x4_protocols_' + user, JSON.stringify(all));
  return all[idx];
}

/**
 * Drop outcome: marks the protocol retry. The already-written History
 * snapshot stands as-is; nothing else continues, no DOP item is created.
 */
export async function dropProtocol(user, protocolId) {
  const pv = await storage.get('4x4_protocols_' + user);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const idx = all.findIndex(r => r.id === protocolId);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], core_outcome: 'retry' };
  await storage.set('4x4_protocols_' + user, JSON.stringify(all));
  return all[idx];
}

/**
 * Called on app load, before the Today view renders. If the active period's
 * grace window (5 days past month-end) has expired, auto-closes it with
 * status/core_outcome "incomplete" using whatever partial data exists.
 * Returns the current full protocols array (merged if a close happened).
 */
export async function runAutoCloseCheck(user) {
  if (!user) return [];
  const pv = await storage.get('4x4_protocols_' + user);
  const all = pv && pv.value ? JSON.parse(pv.value) : [];
  const active = all.filter(r => r.status === 'active');
  if (active.length === 0) return all;

  const monthSet = active[0].month_set;
  if (!isGraceExpired(monthSet, todayStr())) return all;

  const graceEndISO = isoDate(graceDeadlineDate(monthSet));
  const result = await closeActivePeriod(user, graceEndISO, {
    status: 'incomplete',
    core_outcome: 'incomplete',
    coach_overridden: false,
  });
  return result.protocols;
}
