import React, { useState, useEffect } from 'react';
import { BG, GOLD, GOLD_LIGHT } from '../utils/constants';
import { storage } from '../services/storage';

const FOUNDATIONS = [
  { label: 'Fitness',               value: 'fitness' },
  { label: 'Nutrition',             value: 'nutrition' },
  { label: 'Sleep',                 value: 'sleep' },
  { label: 'Mental/Spiritual Health', value: 'mental_spiritual' },
];

const SECTIONS = [
  'Set Up / Edit',
  'Instructions',
  'History',
  'Metrics',
];

const TOD_OPTS = [
  { value: 'am',   label: 'AM' },
  { value: 'pm',   label: 'PM' },
  { value: 'both', label: 'Both' },
];

const PAGE = {
  minHeight: '100vh',
  background: BG,
  fontFamily: 'sans-serif',
  padding: '24px 16px',
};

const CARD = {
  background: 'white',
  borderRadius: 5,
  padding: 16,
  border: '1px solid #d0c8b8',
  marginBottom: 12,
};

const NUM_INPUT = {
  width: 80,
  fontSize: 14,
  padding: 6,
  borderRadius: 5,
  border: '1px solid #ccc',
};

const LBL = {
  fontSize: 12,
  color: '#666',
  marginBottom: 4,
};

const LAND_BTN = {
  alignSelf: 'flex-start',
  minWidth: 220,
  padding: '14px 32px',
  borderRadius: '5px',
  background: '#1a1a1a',
  color: GOLD,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  border: '1.5px solid #333',
  textAlign: 'left',
};

function selBtn(active) {
  return {
    background: active ? '#111' : GOLD,
    color: active ? GOLD : '#000',
    border: active
      ? '1.5px solid ' + GOLD
      : '1.5px solid #000',
    borderRadius: '5px',
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
  };
}

function pctLabel(rate) {
  if (rate === null || rate === undefined || isNaN(Number(rate))) {
    return '—';
  }
  const n = Number(rate);
  const v = n <= 1 ? n * 100 : n;
  return Math.round(v) + '%';
}

function auditBadge(outcome) {
  switch (outcome) {
    case 'unlocked':
      return { label: 'Unlocked', bg: '#1a1a1a', color: GOLD };
    case 'remediate':
      return { label: 'Remediate', bg: '#CC2222', color: '#000' };
    case 'standard':
    default:
      return { label: 'Standard', bg: GOLD_LIGHT, color: '#000' };
  }
}

const GROUP_TITLE = {
  color: '#B8860B',
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 10,
  marginTop: 4,
};

const BADGE = {
  fontSize: 11,
  fontWeight: 700,
  padding: '3px 10px',
  borderRadius: 12,
  whiteSpace: 'nowrap',
};

const NEUTRAL_TAG = {
  fontSize: 11,
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: 4,
  background: '#eee',
  color: '#666',
};

const EMPTY_STATE = {
  textAlign: 'center',
  color: '#666',
  fontSize: 14,
  padding: '40px 20px',
  background: 'white',
  borderRadius: 5,
  border: '1px solid #d0c8b8',
};

function emptyDraft(fc) {
  return {
    foundation_core: fc,
    name: '',
    type: null,
    time_of_day: null,
    frequency: null,
    weekly_target: null,
    time_cost_minutes: null,
    timeDNA: false,
  };
}

export default function FourX4View({ onBack, user, onSave }) {
  const [section, setSection] = useState(null);
  const [drafts, setDrafts] = useState(
    FOUNDATIONS.map(f => emptyDraft(f.value))
  );
  const [tier, setTier] = useState({ tier: 1, cap: 30 });
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const tv = await storage.get('4x4_tier_' + user);
      const pv = await storage.get(
        '4x4_protocols_' + user
      );
      if (tv && tv.value) {
        setTier(JSON.parse(tv.value));
      }
      if (pv && pv.value) {
        const loaded = JSON.parse(pv.value);
        setDrafts(FOUNDATIONS.map(f => {
          const ex = loaded.find(
            p => p.foundation_core === f.value
          );
          if (!ex) return emptyDraft(f.value);
          return {
            foundation_core: f.value,
            name: ex.name || '',
            type: ex.type || 'activation',
            time_of_day: ex.time_of_day || 'am',
            frequency: ex.frequency || 'daily',
            weekly_target: ex.weekly_target ?? null,
            time_cost_minutes: ex.time_cost_minutes,
            timeDNA: ex.time_cost_minutes === null,
          };
        }));
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!user || section !== 'History') return;
    (async () => {
      const hv = await storage.get('4x4_history_' + user);
      if (hv && hv.value) {
        try {
          setHistoryRecords(JSON.parse(hv.value));
        } catch (_) {
          setHistoryRecords([]);
        }
      } else {
        setHistoryRecords([]);
      }
    })();
  }, [user, section]);

  function updateDraft(i, field, val) {
    setDrafts(prev => {
      const next = [...prev];
      const upd = { ...next[i], [field]: val };
      if (field === 'timeDNA' && val) {
        upd.time_cost_minutes = null;
      }
      next[i] = upd;
      return next;
    });
  }

  const netCost = drafts.reduce((sum, d) => {
    if (d.timeDNA || d.time_cost_minutes === null) {
      return sum;
    }
    return sum + (Number(d.time_cost_minutes) || 0);
  }, 0);

  async function handleSave() {
    setSaveError(null);
    setSaved(false);
    if (!drafts.every(d => d.name.trim())) {
      setSaveError('All 4 activities must have a name.');
      return;
    }
    if (!drafts.every(d => d.type)) {
      setSaveError('All 4 activities must have a Type selected.');
      return;
    }
    if (!drafts.every(d => d.time_of_day)) {
      setSaveError(
        'All 4 activities must have a Time of Day selected.'
      );
      return;
    }
    if (!drafts.every(d => d.frequency)) {
      setSaveError(
        'All 4 activities must have a Frequency selected.'
      );
      return;
    }
    if (!drafts.every(
      d => d.timeDNA || d.time_cost_minutes !== null
    )) {
      setSaveError(
        'All 4 activities must have a Time value or DNA selected.'
      );
      return;
    }
    if (!drafts.some(d => d.type === 'deactivation')) {
      setSaveError(
        'At least 1 activity must be a deactivation.'
      );
      return;
    }
    if (netCost > tier.cap) {
      setSaveError(
        `Net time (${netCost} min) exceeds ` +
        `cap (${tier.cap} min).`
      );
      return;
    }
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1)
      .padStart(2, '0');
    const monthSet = `${yyyy}-${mm}`;
    const activeFrom = `${yyyy}-${mm}-01`;
    const ts = Date.now();
    const records = drafts.map(d => ({
      id: '4x4_' + ts + '_' + d.foundation_core,
      foundation_core: d.foundation_core,
      name: d.name.trim(),
      type: d.type,
      time_of_day: d.time_of_day,
      frequency: d.frequency,
      weekly_target:
        d.frequency === 'weekly_target'
          ? (d.weekly_target ?? null)
          : null,
      time_cost_minutes: d.timeDNA
        ? null
        : (d.time_cost_minutes ?? null),
      month_set: monthSet,
      active_from: activeFrom,
      active_until: null,
      status: 'active',
      core_outcome: null,
      cycle_id: '4x4_' + ts + '_' + d.foundation_core,
      attempt_number: 1,
      linked_to: null,
      coach_overridden: false,
      coach_override_min_frequency: false,
      is_keepin4x4: false,
      prior_frequency: null,
      prior_time_cost: null,
      graduated_to_dop: false,
      dop_item_id: null,
    }));
    await storage.set(
      '4x4_protocols_' + user,
      JSON.stringify(records)
    );
    if (onSave) await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  // ── Set Up / Edit screen ────────────────────────────
  if (section === 'Set Up / Edit') {
    return (
      <div style={PAGE}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <button
            style={{
              background: '#1a1a1a',
              color: GOLD,
              border: '1.5px solid ' + GOLD,
              borderRadius: '5px',
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 20,
            }}
            onClick={() => setSection(null)}
          >← Back</button>

          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 20,
          }}>4x4 Matrix — Set Up / Edit</div>

          <div style={{
            fontSize: 11,
            color: '#888',
            marginBottom: 12,
            fontStyle: 'italic',
          }}>Black = selected</div>

          {FOUNDATIONS.map((f, i) => {
            const d = drafts[i];
            const isDeact = d.type === 'deactivation';
            return (
              <div key={f.value} style={CARD}>

                <div style={{
                  color: '#B8860B',
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 10,
                }}>{f.label}</div>

                <input
                  type="text"
                  style={{
                    width: '100%',
                    background: '#f0f0f0',
                    borderRadius: 5,
                    padding: 8,
                    border: '1px solid #ccc',
                    fontSize: 14,
                    marginBottom: 10,
                    boxSizing: 'border-box',
                  }}
                  placeholder="Describe your activity..."
                  value={d.name}
                  onChange={e =>
                    updateDraft(
                      i,
                      'name',
                      e.target.value.toUpperCase()
                    )
                  }
                />

                {/* Type */}
                <div style={{ marginBottom: 8 }}>
                  <div style={LBL}>Type</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      style={selBtn(
                        d.type === 'activation'
                      )}
                      onClick={() =>
                        updateDraft(
                          i, 'type', 'activation'
                        )
                      }
                    >Activation</button>
                    <button
                      style={selBtn(
                        d.type === 'deactivation'
                      )}
                      onClick={() =>
                        updateDraft(
                          i, 'type', 'deactivation'
                        )
                      }
                    >Deactivation</button>
                  </div>
                </div>

                {/* Time of day */}
                <div style={{ marginBottom: 8 }}>
                  <div style={LBL}>Time of Day</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {TOD_OPTS.map(t => (
                      <button
                        key={t.value}
                        style={selBtn(
                          d.time_of_day === t.value
                        )}
                        onClick={() =>
                          updateDraft(
                            i, 'time_of_day', t.value
                          )
                        }
                      >{t.label}</button>
                    ))}
                  </div>
                </div>

                {/* Frequency */}
                <div style={{ marginBottom: 8 }}>
                  <div style={LBL}>Frequency</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      style={selBtn(
                        d.frequency === 'daily'
                      )}
                      onClick={() =>
                        updateDraft(
                          i, 'frequency', 'daily'
                        )
                      }
                    >Daily</button>
                    <button
                      style={selBtn(
                        d.frequency === 'weekly_target'
                      )}
                      onClick={() =>
                        updateDraft(
                          i, 'frequency', 'weekly_target'
                        )
                      }
                    >Weekly Target</button>
                  </div>
                </div>

                {/* Weekly target */}
                {d.frequency === 'weekly_target' && (
                  <div style={{ marginBottom: 8 }}>
                    <div style={LBL}>
                      Times per week (min 3)
                    </div>
                    <input
                      type="number"
                      min={3}
                      style={NUM_INPUT}
                      value={d.weekly_target ?? ''}
                      onChange={e => {
                        const v = parseInt(
                          e.target.value, 10
                        );
                        updateDraft(
                          i,
                          'weekly_target',
                          isNaN(v) ? null : (v < 3 ? 3 : v)
                        );
                      }}
                    />
                  </div>
                )}

                {/* Time cost / DNA */}
                <div>
                  <div style={LBL}>
                    {isDeact
                      ? 'Time saved (min) — enter negative number'
                      : 'Time added (min)'}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                  }}>
                    {!d.timeDNA && (
                      <input
                        type="number"
                        min={isDeact ? undefined : 0}
                        max={isDeact ? 0 : undefined}
                        style={NUM_INPUT}
                        value={d.time_cost_minutes ?? ''}
                        onChange={e => updateDraft(
                          i,
                          'time_cost_minutes',
                          e.target.value === ''
                            ? null
                            : Number(e.target.value)
                        )}
                      />
                    )}
                    <button
                      style={selBtn(d.timeDNA)}
                      onClick={() =>
                        updateDraft(
                          i, 'timeDNA', !d.timeDNA
                        )
                      }
                    >DNA</button>
                  </div>
                </div>

              </div>
            );
          })}

          {/* Net time cost */}
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 0',
            color: '#000',
          }}>
            Net daily time cost: {netCost} min
            {'  |  '}Cap: {tier.cap} min
            {'  |  '}Remaining: {tier.cap - netCost} min
          </div>

          {saveError && (
            <div style={{
              color: 'red',
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}>{saveError}</div>
          )}

          {saved && (
            <div style={{
              color: 'green',
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}>4x4 activities saved!</div>
          )}

          <button
            style={{
              width: '100%',
              background: GOLD,
              color: 'black',
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 5,
              padding: 14,
              border: 'none',
              cursor: 'pointer',
              marginTop: 16,
            }}
            onClick={handleSave}
          >Save 4x4</button>
        </div>
      </div>
    );
  }

  // ── History screen ──────────────────────────────────
  if (section === 'History') {
    // TEMP TEST DATA - REMOVE AFTER VISUAL VERIFICATION
    const displayHistoryRecords = [
      {
        id: 'h1', foundation_core: 'fitness', name: 'Morning Run',
        type: 'activation', time_of_day: 'am', frequency: 'daily',
        weekly_target: null, time_cost_minutes: 20,
        month_set: '2026-05', active_from: '2026-05-01',
        active_until: '2026-05-31', status: 'closed',
        core_outcome: 'advanced', cycle_id: 'c1', attempt_number: 1,
        linked_to: null, times_completed: 28, times_expected: 31,
        completion_rate: 0.90, net_time_cost_snapshot: 20,
        period_date_range: '2026-05-01 to 2026-05-31',
        audit_outcome: 'unlocked',
      },
      {
        id: 'h2', foundation_core: 'nutrition', name: 'No Sugar',
        type: 'deactivation', time_of_day: 'both', frequency: 'daily',
        weekly_target: null, time_cost_minutes: -10,
        month_set: '2026-05', active_from: '2026-05-01',
        active_until: '2026-05-31', status: 'incomplete',
        core_outcome: 'retry', cycle_id: 'c2', attempt_number: 1,
        linked_to: null, times_completed: 14, times_expected: 31,
        completion_rate: 0.45, net_time_cost_snapshot: -10,
        period_date_range: '2026-05-01 to 2026-05-31',
        audit_outcome: 'remediate',
      },
      {
        id: 'h3', foundation_core: 'sleep', name: 'Bed by 10pm',
        type: 'activation', time_of_day: 'pm', frequency: 'daily',
        weekly_target: null, time_cost_minutes: 0,
        month_set: '2026-04', active_from: '2026-04-01',
        active_until: '2026-04-30', status: 'closed',
        core_outcome: 'retry', cycle_id: 'c3', attempt_number: 2,
        linked_to: 'h0-prev', times_completed: 22, times_expected: 30,
        completion_rate: 0.73, net_time_cost_snapshot: 0,
        period_date_range: '2026-04-01 to 2026-04-30',
        audit_outcome: 'standard',
      },
    ];
    // TEMP TEST DATA - REMOVE AFTER VISUAL VERIFICATION
    const grouped = FOUNDATIONS.map(f => ({
      label: f.label,
      value: f.value,
      records: displayHistoryRecords
        .filter(r => r.foundation_core === f.value)
        .sort((a, b) => {
          const ad = a.active_from || a.period_date_range || '';
          const bd = b.active_from || b.period_date_range || '';
          return bd.localeCompare(ad);
        }),
    })).filter(g => g.records.length > 0);

    return (
      <div style={PAGE}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <button
            style={{
              background: '#1a1a1a',
              color: GOLD,
              border: '1.5px solid ' + GOLD,
              borderRadius: '5px',
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 20,
            }}
            onClick={() => setSection(null)}
          >← Back</button>

          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 20,
          }}>4x4 Matrix — History</div>

          {displayHistoryRecords.length === 0 && (
            <div style={EMPTY_STATE}>
              No history yet. Complete your first month to
              see results here.
            </div>
          )}

          {grouped.map(g => (
            <div key={g.value} style={{ marginBottom: 24 }}>
              <div style={GROUP_TITLE}>{g.label}</div>
              {g.records.map(r => {
                const badge = auditBadge(r.audit_outcome);
                const isRetry = !!(
                  (r.attempt_number && r.attempt_number > 1)
                  || r.linked_to
                );
                return (
                  <div key={r.id} style={CARD}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                      <div>
                        <div style={{
                          fontWeight: 700,
                          fontSize: 14,
                        }}>{r.name}</div>
                        <div style={{
                          fontSize: 12,
                          color: '#666',
                          marginTop: 2,
                        }}>{r.period_date_range}</div>
                      </div>
                      <div style={{
                        ...BADGE,
                        background: badge.bg,
                        color: badge.color,
                      }}>{badge.label}</div>
                    </div>

                    <div style={{ fontSize: 13, marginTop: 8 }}>
                      {r.times_completed} / {r.times_expected}
                      {'  completed  —  '}
                      {pctLabel(r.completion_rate)}
                    </div>

                    {(r.status === 'incomplete' || isRetry) && (
                      <div style={{
                        display: 'flex',
                        gap: 8,
                        marginTop: 8,
                      }}>
                        {r.status === 'incomplete' && (
                          <span style={NEUTRAL_TAG}>
                            Incomplete
                          </span>
                        )}
                        {isRetry && (
                          <span style={NEUTRAL_TAG}>
                            Retry #{r.attempt_number || '?'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Placeholder sections ────────────────────────────
  if (section) {
    return (
      <div style={PAGE}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          background: 'white',
          borderRadius: '5px',
          padding: '24px',
        }}>
          <button
            style={{
              background: '#1a1a1a',
              color: GOLD,
              border: '1.5px solid ' + GOLD,
              borderRadius: '5px',
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 20,
            }}
            onClick={() => setSection(null)}
          >← Back</button>
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
            background: '#1a1a1a',
            borderRadius: '5px',
            padding: '40px',
          }}>
            {section}
          </div>
        </div>
      </div>
    );
  }

  // ── Landing screen ──────────────────────────────────
  return (
    <div style={PAGE}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        background: 'white',
        borderRadius: '5px',
        padding: '24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <button
            onClick={onBack}
            style={{
              background: '#1a1a1a',
              color: GOLD,
              border: '1.5px solid ' + GOLD,
              borderRadius: '5px',
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              marginRight: 16,
            }}
          >← Back</button>
          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
          }}>4x4 Matrix</div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          {SECTIONS.map(label => (
            <button
              key={label}
              style={LAND_BTN}
              onClick={() => setSection(label)}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
