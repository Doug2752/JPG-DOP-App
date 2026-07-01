import React, { useState, useEffect } from 'react';
import { BG, GOLD } from '../utils/constants';
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
    borderRadius: 5,
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    background: active ? GOLD : '#333',
    color: active ? 'black' : 'white',
  };
}

function emptyDraft(fc) {
  return {
    foundation_core: fc,
    name: '',
    type: 'activation',
    time_of_day: 'am',
    frequency: 'daily',
    weekly_target: null,
    time_cost_minutes: null,
    timeDNA: false,
  };
}

export default function FourX4View({ onBack, user }) {
  const [section, setSection] = useState(null);
  const [drafts, setDrafts] = useState(
    FOUNDATIONS.map(f => emptyDraft(f.value))
  );
  const [tier, setTier] = useState({ tier: 1, cap: 30 });
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);

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
                    updateDraft(i, 'name', e.target.value)
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
