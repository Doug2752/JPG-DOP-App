import React, { useState, useEffect } from 'react';
import { GOLD, BORDER } from '../utils/constants';
import { todayStr } from '../utils/date';
const SHADOW = '0 1px 4px rgba(0,0,0,0.06)';

function cycleWeekRange(_cycleStart) {
  const iso = x => x.toISOString().slice(0, 10);
  const DAY_MS = 24 * 60 * 60 * 1000;
  const today = new Date(todayStr() + 'T00:00:00Z');
  const windowStart = new Date(today.getTime() - 6 * DAY_MS);
  return { windowStart: iso(windowStart), windowEnd: iso(today) };
}

function pctColor(pct) {
  if (pct >= 75) return '#2E7D32';
  if (pct >= 50) return '#F9A825';
  return '#C0392B';
}

export default function FourX4DailyCard({
  protocols, form, saveForm, user,
}) {
  const checks = form.fourX4Checks || {};
  const checkedCount = protocols.filter(p => !!checks[p.id]).length;
  const total = protocols.length;
  const allDone = checkedCount === total && total > 0;
  const [weeklyCounts, setWeeklyCounts] = useState({});

  useEffect(() => {
    if (!user || protocols.length === 0) return;
    const cycleStart = protocols[0]?.cycle_start || '2026-08-01';
    const { windowStart, windowEnd } = cycleWeekRange(cycleStart);
    const sk = user + '_dop7_';
    let dates = [];
    try {
      dates = JSON.parse(localStorage.getItem(sk + 'archiveDates')) || [];
    } catch (_) { dates = []; }
    const inRange = dates.filter(d => d >= windowStart && d <= windowEnd);
    const results = {};
    for (const p of protocols) {
      let count = 0;
      for (const d of inRange) {
        try {
          const raw = localStorage.getItem(sk + 'form_' + d);
          if (raw) {
            const f = JSON.parse(raw);
            if (f.fourX4Checks && f.fourX4Checks[p.id]) count++;
          }
        } catch (_) { /* skip unparsable day */ }
      }
      results[p.id] = count;
    }
    setWeeklyCounts(results);
  }, [user, protocols.length, protocols.map(p => p.id).join(',')]);

  function toggle(id) {
    const next = { ...checks, [id]: !checks[id] };
    saveForm({ ...form, fourX4Checks: next });
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: 5,
      border: '1px solid ' + BORDER,
      marginBottom: 14,
      overflow: 'hidden',
      boxShadow: SHADOW,
    }}>
      <div style={{
        background: '#111',
        padding: '12px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          color: '#fff',
          fontWeight: 900,
          fontSize: 15,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>4x4 Matrix<span style={{
          fontSize: 10,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          marginLeft: 10,
        }}>Your Added Program Actions</span></span>
        <span style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 11,
        }}>{checkedCount} / {total} done</span>
      </div>
      <div style={{ padding: '4px 0' }}>
        {protocols.map((p, i) => {
          const checked = !!checks[p.id];
          const isLast = i === protocols.length - 1;
          const coreLabel = p.foundation_core.replace(/_/g, ' ');
          const todLabel =
            p.time_of_day === 'both'
              ? 'AM + PM'
              : p.time_of_day.toUpperCase();
          const count = weeklyCounts[p.id];
          const hasCount = count !== undefined && count !== 'error';
          const denom = p.frequency === 'weekly_target' ? p.weekly_target : 7;
          const pct = hasCount && denom > 0
            ? Math.min(100, Math.round((count / denom) * 100))
            : null;
          return (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                borderBottom: isLast ? 'none' : '1px solid #f0f0f0',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0 4px',
                }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#222',
                  }}>{p.name}</span>
                  <span style={{
                    fontSize: 13,
                    color: '#999',
                    fontWeight: 400,
                    marginLeft: 4,
                    textTransform: 'capitalize',
                  }}>{'— '}{coreLabel}</span>
                  <span style={{
                    marginLeft: 8,
                    background: '#f0f0f0',
                    color: '#555',
                    fontSize: 10,
                    padding: '1px 6px',
                    borderRadius: 8,
                    textTransform: 'uppercase',
                  }}>{todLabel}</span>
                </div>
                {p.frequency === 'weekly_target' && (
                  <div style={{
                    fontSize: 11,
                    color: '#999',
                    marginTop: 2,
                  }}>
                    {hasCount ? count : '—'}
                    {' of '}{p.weekly_target}{' this week'}
                    {pct !== null && (
                      <span style={{ color: pctColor(pct) }}>
                        {' — '}{pct}{'%'}
                      </span>
                    )}
                  </div>
                )}
                {p.frequency === 'daily' && pct !== null && (
                  <div style={{
                    fontSize: 11,
                    color: pctColor(pct),
                    marginTop: 2,
                  }}>
                    {pct}{'%'}
                  </div>
                )}
              </div>
              <button
                onClick={() => toggle(p.id)}
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  borderRadius: 4,
                  border: checked
                    ? '1.5px solid ' + GOLD
                    : '1.5px solid #ccc',
                  background: checked ? GOLD : 'white',
                  color: '#000',
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  marginLeft: 12,
                }}
              >{checked ? '✓' : ''}</button>
            </div>
          );
        })}
        {allDone && (
          <div style={{
            color: GOLD,
            fontSize: 12,
            fontWeight: 700,
            textAlign: 'center',
            padding: '8px 0 12px',
          }}>4x4 complete for today</div>
        )}
      </div>
    </div>
  );
}
