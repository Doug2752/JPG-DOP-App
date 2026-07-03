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
