import React, { useState, useEffect, useRef } from 'react';
import { BG, GOLD, GOLD_LIGHT, DARK, MID } from '../utils/constants';
import { storage } from '../services/storage';
import { todayStr } from '../utils/date';
import {
  canClose, closeActivePeriod, describeCloseWindow,
  runAutoCloseCheck, graceDeadlineDate,
  getPendingGraduationDecisions, promoteProtocol, dropProtocol,
  keepIn4x4Protocol, getKeepIn4x4Carryovers, keepIn4x4GrowthPercent,
  countCompletions,
} from '../utils/fourX4Period';

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

function metricColumns(columns, opts = {}) {
  const divider = !!opts.divider;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {columns.map((col, idx) => (
        <div
          key={col.key}
          style={{
            flex: 1,
            minWidth: 100,
            textAlign: 'center',
            padding: '8px 4px',
            borderRadius: 5,
            background: col.bg || 'transparent',
            borderRight: (divider && idx < columns.length - 1)
              ? '1px solid #d0c8b8'
              : 'none',
          }}
        >
          <div style={{
            fontSize: 12,
            fontWeight: 700,
            color: col.color || '#000',
            marginBottom: 6,
          }}>{col.header}</div>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: col.color || '#000',
          }}>{col.value}</div>
        </div>
      ))}
    </div>
  );
}

const AUDIT_LEGEND = {
  unlocked: "You executed at 85% or higher. You've earned the " +
    'ability to add up to 30 more minutes of invested time to ' +
    "next month's protocols, raising your daily cap from 30 " +
    'to 60 minutes.',
  standard: 'You executed between 75% and 84%. You advance to ' +
    'next month at the standard 30-minute daily time cap.',
  remediate: 'You executed below 75%. Lagging protocols carry ' +
    'into next month and no new protocols can be added until ' +
    'consistency improves.',
};

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

const INSTR_PANEL = {
  background: '#E0E0E0',
  border: `2px solid ${GOLD}`,
  borderRadius: 8,
  padding: '18px 20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  position: 'relative',
};

const INSTR_TITLEBAR = {
  fontWeight: 800,
  fontSize: 13,
  color: DARK,
  textTransform: 'uppercase',
  letterSpacing: 1.5,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: `2px solid ${GOLD}`,
};

const INSTR_CLOSE_BTN = {
  position: 'absolute',
  top: 14,
  right: 16,
  background: 'transparent',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
  color: DARK,
  fontWeight: 700,
  lineHeight: 1,
  padding: 0,
};

const INSTR_TOP_ITEM = {
  marginBottom: 14,
  display: 'flex',
  alignItems: 'flex-start',
};

const INSTR_DOT = {
  color: GOLD,
  fontWeight: 700,
  minWidth: 14,
  flexShrink: 0,
};

const INSTR_TOP_TITLE = {
  fontSize: 13,
  fontWeight: 800,
  color: DARK,
  marginBottom: 3,
};

const INSTR_SUBHEAD = {
  fontSize: 13,
  fontWeight: 800,
  color: DARK,
  marginTop: 8,
  marginBottom: 3,
};

const INSTR_BODY = {
  fontSize: 12,
  color: MID,
  lineHeight: 1.7,
  marginBottom: 8,
};

const INSTR_QUOTE = {
  fontSize: 12,
  color: MID,
  lineHeight: 1.7,
  marginBottom: 8,
  fontStyle: 'italic',
};

const INSTR_ITEM = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 6,
};

const INSTR_MARK = {
  color: GOLD,
  fontWeight: 700,
  minWidth: 18,
  flexShrink: 0,
};

const INSTR_EXAMPLE_BOX = {
  background: GOLD_LIGHT,
  borderRadius: 5,
  padding: 12,
  marginTop: 8,
  marginBottom: 8,
};

const INSTR_EXAMPLE_TITLE = {
  fontSize: 12,
  fontWeight: 800,
  color: '#000',
  marginBottom: 6,
};

const INSTR_EXAMPLE_DETAIL = {
  fontSize: 12,
  color: '#000',
  lineHeight: 1.6,
  marginBottom: 6,
};

function InstrItem({ mark, children }) {
  return (
    <div style={INSTR_ITEM}>
      <span style={INSTR_MARK}>{mark}</span>
      <span style={INSTR_BODY}>{children}</span>
    </div>
  );
}

function emptyDraft() {
  return {
    foundation_core: null,
    name: '',
    type: null,
    time_of_day: null,
    frequency: null,
    weekly_target: null,
    time_cost_minutes: null,
    timeDNA: false,
    carryover: null,
    is_remediate_carry: false,
  };
}

export default function FourX4View({ onBack, user, onSave }) {
  const [section, setSection] = useState(null);
  const [drafts, setDrafts] = useState(
    Array.from({ length: 4 }, () => emptyDraft())
  );
  const [tier, setTier] = useState({ tier: 1, cap: 30 });
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [pendingGrad, setPendingGrad] = useState([]);
  const [gradBusy, setGradBusy] = useState(null);
  const [gradSummary, setGradSummary] = useState([]);
  const [showMidPeriodWarning, setShowMidPeriodWarning] = useState(false);
  const originalDraftsRef = useRef(null);
  const hasActivePeriodRef = useRef(false);
  const hasProgressRef = useRef(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const tv = await storage.get('4x4_tier_' + user);
      if (tv && tv.value) {
        setTier(JSON.parse(tv.value));
      }

      const pv = await storage.get('4x4_protocols_' + user);
      const loaded = pv && pv.value
        ? JSON.parse(pv.value).filter(p => p.status === 'active')
        : [];
      const carryovers = await getKeepIn4x4Carryovers(user);

      const nextDrafts = Array.from({ length: 4 }, (_, i) => {
        const ex = loaded[i];
        if (!ex) return emptyDraft();
        return {
          foundation_core: ex.foundation_core || null,
          name: ex.name || '',
          type: ex.type || null,
          time_of_day: ex.time_of_day || null,
          frequency: ex.frequency || null,
          weekly_target: ex.weekly_target ?? null,
          time_cost_minutes: ex.time_cost_minutes,
          timeDNA: ex.time_cost_minutes === null,
          carryover: null,
          is_remediate_carry: ex.is_remediate_carry === true,
        };
      });

      let anyProgress = false;
      for (const ex of loaded) {
        const c = await countCompletions(
          user, ex.id, ex.active_from, todayStr()
        );
        if (c > 0) { anyProgress = true; break; }
      }
      hasProgressRef.current = anyProgress;

      carryovers.forEach(co => {
        const slotIdx = nextDrafts.findIndex(d => !d.foundation_core);
        if (slotIdx === -1) return;
        nextDrafts[slotIdx] = {
          foundation_core: co.foundation_core,
          name: co.name,
          type: co.type,
          time_of_day: co.time_of_day,
          frequency: co.frequency,
          weekly_target: co.weekly_target,
          time_cost_minutes: co.time_cost_minutes,
          timeDNA: co.time_cost_minutes === null,
          carryover: {
            id: co.id,
            priorFrequency: co.weekly_target,
            priorTimeCost: co.time_cost_minutes,
            attemptNumber: co.attempt_number,
            cycleId: co.cycle_id,
            wasRemediate: co.audit_outcome === 'remediate',
          },
          is_remediate_carry: false,
        };
      });

      hasActivePeriodRef.current = loaded.length > 0;
      originalDraftsRef.current = nextDrafts;
      setDrafts(nextDrafts);
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const pending = await getPendingGraduationDecisions(user);
      setPendingGrad(pending);
    })();
  }, [user]);

  useEffect(() => {
    if (!user || (section !== 'History' && section !== 'Metrics')) return;
    (async () => {
      const hv = await storage.get('4x4_history_' + user);
      if (!hv || !hv.value) {
        setHistoryRecords([]);
        return;
      }
      try {
        const records = JSON.parse(hv.value);
        const pv = await storage.get('4x4_protocols_' + user);
        const protocols = pv && pv.value ? JSON.parse(pv.value) : [];
        const byId = {};
        protocols.forEach(p => { byId[p.id] = p; });
        setHistoryRecords(records.map(r => ({
          ...r,
          is_keepin4x4: byId[r.id]
            ? !!byId[r.id].is_keepin4x4
            : !!r.is_keepin4x4,
        })));
      } catch (_) {
        setHistoryRecords([]);
      }
    })();
  }, [user, section]);

  const displayHistoryRecords = historyRecords;
  const displayActiveProtocols = drafts.filter(d => d.foundation_core);

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

  function selectFoundationCore(i, value) {
    setDrafts(prev => prev.map((d, idx) => {
      if (idx === i) return { ...d, foundation_core: value };
      if (d.foundation_core === value) return { ...d, foundation_core: null };
      return d;
    }));
  }

  function draftsChanged() {
    return JSON.stringify(drafts) !== JSON.stringify(originalDraftsRef.current);
  }

  const netCost = drafts.reduce((sum, d) => {
    if (d.timeDNA || d.time_cost_minutes === null) {
      return sum;
    }
    return sum + (Number(d.time_cost_minutes) || 0);
  }, 0);

  function handleSave() {
    if (
      hasActivePeriodRef.current
      && hasProgressRef.current
      && draftsChanged()
    ) {
      setShowMidPeriodWarning(true);
      return;
    }
    runSave();
  }

  async function runSave() {
    setSaveError(null);
    setSaved(false);

    const todayISO = todayStr();
    const pv = await storage.get('4x4_protocols_' + user);
    const existingAll = pv && pv.value ? JSON.parse(pv.value) : [];
    const existingActive = existingAll.filter(r => r.status === 'active');
    if (existingActive.length > 0) {
      const monthSet = existingActive[0].month_set;
      if (!canClose(monthSet, todayISO)) {
        setSaveError(
          `Current period can't close yet. It can be closed ` +
          `${describeCloseWindow(monthSet)}.`
        );
        return;
      }
    }

    if (!drafts.every(d => d.foundation_core)) {
      setSaveError(
        'All 4 protocols must have a Foundation Core selected.'
      );
      return;
    }
    if (new Set(drafts.map(d => d.foundation_core)).size < 4) {
      setSaveError(
        'Each Foundation Core can only be used once.'
      );
      return;
    }
    if (!drafts.every(d => d.name.trim())) {
      setSaveError('All 4 protocols must have a name.');
      return;
    }
    if (!drafts.every(d => d.type)) {
      setSaveError('All 4 protocols must have a Type selected.');
      return;
    }
    if (!drafts.every(d => d.time_of_day)) {
      setSaveError(
        'All 4 protocols must have a Time of Day selected.'
      );
      return;
    }
    if (!drafts.every(d => d.frequency)) {
      setSaveError(
        'All 4 protocols must have a Frequency selected.'
      );
      return;
    }
    if (!drafts.every(
      d => d.timeDNA || d.time_cost_minutes !== null
    )) {
      setSaveError(
        'All 4 protocols must have a Time value or DNA selected.'
      );
      return;
    }
    if (!drafts.some(d => d.type === 'deactivation')) {
      setSaveError(
        'At least 1 protocol must be a deactivation.'
      );
      return;
    }
    const stalledKeepIn = drafts
      .filter(d => d.carryover && !d.is_remediate_carry)
      .map(d => ({
        draft: d,
        combined: keepIn4x4GrowthPercent(d, d.carryover),
      }))
      .find(x => x.combined < 25);
    if (stalledKeepIn) {
      const combined = stalledKeepIn.combined;
      const gap = 25 - combined;
      setSaveError(
        `"${stalledKeepIn.draft.name}" is continuing from Keep ` +
        `in 4x4 and must grow by at least 25% combined ` +
        `(frequency + time) versus last period. Current ` +
        `combined growth: ${combined.toFixed(1)}% — needs ` +
        `${gap.toFixed(1)}% more.`
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
    const records = drafts.map(d => {
      const co = d.carryover;
      return {
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
        cycle_id: co
          ? co.cycleId
          : ('4x4_' + ts + '_' + d.foundation_core),
        attempt_number: co ? (co.attemptNumber || 1) + 1 : 1,
        linked_to: co ? co.id : null,
        coach_overridden: false,
        coach_override_min_frequency: false,
        is_keepin4x4: false,
        is_remediate_carry: false,
        prior_frequency: co ? co.priorFrequency : null,
        prior_time_cost: co ? co.priorTimeCost : null,
        graduated_to_dop: false,
        dop_item_id: null,
      };
    });

    if (existingActive.length > 0) {
      await closeActivePeriod(user, todayISO, { status: 'history' });
      const tv = await storage.get('4x4_tier_' + user);
      if (tv && tv.value) setTier(JSON.parse(tv.value));
    }
    const pv2 = await storage.get('4x4_protocols_' + user);
    const base = pv2 && pv2.value ? JSON.parse(pv2.value) : [];
    await storage.set(
      '4x4_protocols_' + user,
      JSON.stringify(base.concat(records))
    );
    if (onSave) await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function recordGradChoice(record, choice) {
    setGradSummary(prev => [...prev, {
      id: record.id,
      name: record.name,
      foundation_core: record.foundation_core,
      choice,
    }]);
    setPendingGrad(prev => prev.filter(p => p.id !== record.id));
    setGradBusy(null);
  }

  async function handlePromote(record) {
    setGradBusy(record.id);
    await promoteProtocol(user, record.id);
    recordGradChoice(record, 'promote');
  }

  async function handleDrop(record) {
    setGradBusy(record.id);
    await dropProtocol(user, record.id);
    recordGradChoice(record, 'drop');
  }

  async function handleKeepIn4x4(record) {
    setGradBusy(record.id);
    await keepIn4x4Protocol(user, record.id);
    recordGradChoice(record, 'keepin');
  }

  async function finishGraduationFlow() {
    setGradSummary([]);
    if (onSave) await onSave();
    if (onBack) onBack();
  }

  // ── Graduation decision screen ──────────────────────
  if (pendingGrad.length > 0) {
    return (
      <div style={PAGE}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 6,
          }}>Period Closed — Decide Each Protocol</div>
          <div style={{
            fontSize: 13,
            color: '#666',
            marginBottom: 20,
          }}>
            Choose Promote or Drop for all 4 protocols before
            continuing.
          </div>

          {FOUNDATIONS.map(f => {
            const rec = pendingGrad.find(
              p => p.foundation_core === f.value
            );
            if (!rec) return null;
            const isRemediate = rec.audit_outcome === 'remediate';
            const badge = auditBadge(rec.audit_outcome);
            const busy = gradBusy === rec.id;
            return (
              <div
                key={rec.id}
                style={isRemediate
                  ? {
                    ...CARD,
                    background: '#f3ead2',
                    border: '1px dashed ' + GOLD,
                  }
                  : CARD}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <div>
                    <div style={{
                      fontSize: 12,
                      color: '#B8860B',
                      fontWeight: 700,
                      marginBottom: 2,
                    }}>{f.label}</div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}>{rec.name}</div>
                  </div>
                  <div style={{
                    ...BADGE,
                    background: isRemediate ? '#e8dcc0' : badge.bg,
                    color: isRemediate ? DARK : badge.color,
                  }}>
                    {isRemediate ? 'Remediate' : badge.label}
                  </div>
                </div>

                {isRemediate && (
                  <div style={{
                    fontSize: 12,
                    color: '#8a7550',
                    marginTop: 8,
                    fontStyle: 'italic',
                  }}>
                    This protocol fell below the consistency
                    threshold this period.
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: 14,
                }}>
                  <button
                    disabled={busy}
                    onClick={() => handlePromote(rec)}
                    style={{
                      flex: 1,
                      background: GOLD,
                      color: '#000',
                      fontWeight: 700,
                      fontSize: 14,
                      borderRadius: 5,
                      padding: '12px 0',
                      border: 'none',
                      cursor: busy ? 'default' : 'pointer',
                      opacity: busy ? 0.6 : 1,
                    }}
                  >PROMOTE</button>
                  <button
                    disabled={busy}
                    onClick={() => handleDrop(rec)}
                    style={{
                      flex: 1,
                      background: '#1a1a1a',
                      color: GOLD,
                      fontWeight: 700,
                      fontSize: 14,
                      borderRadius: 5,
                      padding: '12px 0',
                      border: '1.5px solid ' + GOLD,
                      cursor: busy ? 'default' : 'pointer',
                      opacity: busy ? 0.6 : 1,
                    }}
                  >DROP</button>
                  <button
                    disabled={busy}
                    onClick={() => handleKeepIn4x4(rec)}
                    style={{
                      flex: 1,
                      background: GOLD_LIGHT,
                      color: '#000',
                      fontWeight: 700,
                      fontSize: 14,
                      borderRadius: 5,
                      padding: '12px 0',
                      border: '1.5px solid ' + GOLD,
                      cursor: busy ? 'default' : 'pointer',
                      opacity: busy ? 0.6 : 1,
                    }}
                  >KEEP IN 4x4</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Graduation confirmation summary ─────────────────
  if (gradSummary.length > 0) {
    const promoted = gradSummary.filter(g => g.choice === 'promote');
    const dropped = gradSummary.filter(g => g.choice === 'drop');
    const keptIn = gradSummary.filter(g => g.choice === 'keepin');
    return (
      <div style={PAGE}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 20,
          }}>Period Closed — Summary</div>

          <div style={CARD}>
            <div style={GROUP_TITLE}>Promoted</div>
            {promoted.length === 0 && (
              <div style={{ fontSize: 13, color: '#666' }}>
                None
              </div>
            )}
            {promoted.map(g => (
              <div key={g.id} style={{
                fontSize: 14,
                marginBottom: 6,
              }}>{g.name}</div>
            ))}
          </div>

          <div style={CARD}>
            <div style={GROUP_TITLE}>Dropped</div>
            {dropped.length === 0 && (
              <div style={{ fontSize: 13, color: '#666' }}>
                None
              </div>
            )}
            {dropped.map(g => (
              <div key={g.id} style={{
                fontSize: 14,
                marginBottom: 6,
              }}>{g.name}</div>
            ))}
          </div>

          <div style={CARD}>
            <div style={GROUP_TITLE}>Continuing in 4x4</div>
            {keptIn.length === 0 && (
              <div style={{ fontSize: 13, color: '#666' }}>
                None
              </div>
            )}
            {keptIn.map(g => (
              <div key={g.id} style={{
                fontSize: 14,
                marginBottom: 6,
              }}>{g.name}</div>
            ))}
          </div>

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
              marginTop: 8,
            }}
            onClick={finishGraduationFlow}
          >DONE</button>
        </div>
      </div>
    );
  }

  // ── Set Up / Edit screen ────────────────────────────
  if (section === 'Set Up / Edit') {
    if (showMidPeriodWarning) {
      return (
        <div style={PAGE}>
          <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
            <div style={{ color: DARK, fontSize: 16, fontWeight: 600, marginBottom: 24, lineHeight: 1.5 }}>
              Your current progress is saved. Changes apply from today forward. Continue?
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                style={{ padding: '12px 28px', borderRadius: 5, border: 'none', background: '#ddd', color: DARK, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
                onClick={() => setShowMidPeriodWarning(false)}
              >CANCEL</button>
              <button
                style={{ padding: '12px 28px', borderRadius: 5, border: 'none', background: GOLD, color: 'black', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
                onClick={() => { setShowMidPeriodWarning(false); runSave(); }}
              >CONFIRM</button>
            </div>
          </div>
        </div>
      );
    }
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
          >Back</button>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 20,
          }}>
            <div style={{
              color: '#B8860B',
              fontSize: 22,
              fontWeight: 700,
            }}>4x4 Matrix — Set Up / Edit</div>
            <button
              style={selBtn(showExamples)}
              onClick={() => setShowExamples(true)}
            >Common Protocol Examples</button>
          </div>

          {showExamples && (
            <div style={INSTR_PANEL}>
              <div style={INSTR_TITLEBAR}>
                Common Protocol Examples
              </div>

              <button
                onClick={() => setShowExamples(false)}
                style={INSTR_CLOSE_BTN}
                aria-label="Close"
              >✕</button>

              <div style={INSTR_TOP_ITEM}>
                <span style={INSTR_DOT}>•</span>
                <div style={{ flex: 1 }}>
                  <div style={INSTR_TOP_TITLE}>Fitness</div>
                  <InstrItem mark="—">Add a morning or evening walk into your daily routine</InstrItem>
                  <InstrItem mark="—">Start stretching in the morning after getting out of bed</InstrItem>
                  <InstrItem mark="—">Incorporate some strength training at least four times a week</InstrItem>
                  <InstrItem mark="—">Some sort of workout which makes me sweat at least 4 times a week</InstrItem>
                </div>
              </div>

              <div style={INSTR_TOP_ITEM}>
                <span style={INSTR_DOT}>•</span>
                <div style={{ flex: 1 }}>
                  <div style={INSTR_TOP_TITLE}>Nutrition</div>
                  <InstrItem mark="—">Take supplements every morning</InstrItem>
                  <InstrItem mark="—">Cut out [blank] from my diet</InstrItem>
                  <InstrItem mark="—">Drink more water every day, at least 32 ounces</InstrItem>
                  <InstrItem mark="—">Reduce alcohol consumption to only two times a week</InstrItem>
                  <InstrItem mark="—">Take my lunch to work at least 4 times a week</InstrItem>
                  <InstrItem mark="—">Limit eating processed foods</InstrItem>
                  <InstrItem mark="—">Consume at least 150g of protein a day</InstrItem>
                  <InstrItem mark="—">Reduce caloric intake by [blank] percentage every day</InstrItem>
                  <InstrItem mark="—">Track what I eat and drink every day</InstrItem>
                  <InstrItem mark="—">Make coffee at home before I leave for work instead of buying coffee out</InstrItem>
                  <InstrItem mark="—">Take a cooking class to learn to eat healthy</InstrItem>
                </div>
              </div>

              <div style={INSTR_TOP_ITEM}>
                <span style={INSTR_DOT}>•</span>
                <div style={{ flex: 1 }}>
                  <div style={INSTR_TOP_TITLE}>Sleep</div>
                  <InstrItem mark="—">Not leaving the TV on while you sleep at night</InstrItem>
                  <InstrItem mark="—">No scrolling right before bed</InstrItem>
                  <InstrItem mark="—">Read before bed</InstrItem>
                  <InstrItem mark="—">No phone use after getting in bed every night</InstrItem>
                  <InstrItem mark="—">Commit to going to bed by a specific time 5 times a week</InstrItem>
                </div>
              </div>

              <div style={{ ...INSTR_TOP_ITEM, marginBottom: 0 }}>
                <span style={INSTR_DOT}>•</span>
                <div style={{ flex: 1 }}>
                  <div style={INSTR_TOP_TITLE}>Mental/Spiritual Health</div>
                  <InstrItem mark="—">Reduce the amount of phone social media scrolling</InstrItem>
                  <InstrItem mark="—">Make a purposeful phone call to someone you love</InstrItem>
                  <InstrItem mark="—">Spend designated time on relationships or family members after work</InstrItem>
                  <InstrItem mark="—">Protect mental bandwidth by not having meaningless conversations</InstrItem>
                  <InstrItem mark="—">Work on the ability to say no more often when it's not productive</InstrItem>
                  <InstrItem mark="—">Commit time every week for a date night</InstrItem>
                  <InstrItem mark="—">Commit at least 10 minutes a day to my hobby ([hobby])</InstrItem>
                  <InstrItem mark="—">Take a cold shower on the weekends, minimum of five minutes</InstrItem>
                  <InstrItem mark="—">Check in with a mentor or someone I trust weekly</InstrItem>
                  <InstrItem mark="—">Spend 10 minutes in the evening four times a week reading scripture</InstrItem>
                  <InstrItem mark="—">Spend 5 minutes a day learning something new, at least four times a week</InstrItem>
                </div>
              </div>
            </div>
          )}

          <div style={{
            fontSize: 11,
            color: '#888',
            marginBottom: 12,
            fontStyle: 'italic',
          }}>Black = selected</div>

          {drafts.map((d, i) => {
            const isDeact = d.type === 'deactivation';
            const coreLabel = `Protocol #${i + 1}`;
            const isRemediateCarry = d.is_remediate_carry === true;
            return (
              <div key={i} style={CARD}>

                <div style={{
                  color: '#B8860B',
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 10,
                }}>{coreLabel}</div>

                {d.carryover && d.carryover.wasRemediate && (
                  <div style={{
                    fontSize: 11,
                    color: '#8a7550',
                    fontStyle: 'italic',
                    marginBottom: 8,
                  }}>
                    Carried from a Remediate outcome — review
                    before continuing.
                  </div>
                )}

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
                    fontStyle: d.carryover && d.carryover.wasRemediate
                      ? 'italic'
                      : 'normal',
                  }}
                  placeholder="Describe your protocol..."
                  value={d.name}
                  onChange={e =>
                    updateDraft(
                      i,
                      'name',
                      e.target.value.toUpperCase()
                    )
                  }
                />

                {/* Foundation Core */}
                <div style={{ marginBottom: 8 }}>
                  <div style={LBL}>Foundation Core</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {FOUNDATIONS.map(f => (
                      <button
                        key={f.value}
                        disabled={isRemediateCarry}
                        style={isRemediateCarry
                          ? {
                            ...selBtn(d.foundation_core === f.value),
                            background: '#ddd',
                            color: '#888',
                            border: '1.5px solid #ccc',
                            cursor: 'default',
                            opacity: 0.7,
                          }
                          : selBtn(d.foundation_core === f.value)}
                        onClick={() => {
                          if (!isRemediateCarry) {
                            selectFoundationCore(i, f.value);
                          }
                        }}
                      >{f.label}</button>
                    ))}
                  </div>
                  {isRemediateCarry && (
                    <div style={{
                      fontSize: 11,
                      color: '#999',
                      fontStyle: 'italic',
                      marginTop: 4,
                    }}>Auto-carried — Remediate</div>
                  )}
                </div>

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
                    <span style={{
                      fontSize: 12,
                      color: '#666',
                    }}>
                      Select if there is no time addition or reduction
                    </span>
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
            }}>4x4 protocols saved!</div>
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
          >Back</button>

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
                let carryLabel = null;
                if (r.attempt_number > 1) {
                  if (r.is_remediate_carry) {
                    carryLabel = `Attempt ${r.attempt_number}`;
                  } else if (r.is_keepin4x4) {
                    carryLabel = `Month ${r.attempt_number}`;
                  }
                }
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
                        {carryLabel && (
                          <div style={{
                            fontSize: 11,
                            color: '#999',
                            fontStyle: 'italic',
                            marginTop: 2,
                          }}>{carryLabel}</div>
                        )}
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

  // ── Metrics screen ──────────────────────────────────
  if (section === 'Metrics') {
    const coreStats = FOUNDATIONS.map(f => {
      const recs = displayHistoryRecords.filter(
        r => r.foundation_core === f.value
      );
      if (recs.length === 0) return null;
      const avg = recs.reduce(
        (sum, r) => sum + (Number(r.completion_rate) || 0), 0
      ) / recs.length;
      return {
        key: f.value,
        label: f.label,
        name: recs[0].name,
        avg,
      };
    }).filter(Boolean);

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
          >Back</button>

          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 20,
          }}>4x4 Matrix — Metrics</div>

          <div style={{ maxWidth: 420 }}>
            <div style={GROUP_TITLE}>Current Status</div>
            <div style={CARD}>
              {metricColumns([
                {
                  key: 'net',
                  header: 'Net Daily Time Cost',
                  value: `${netCost} min`,
                },
                {
                  key: 'cap',
                  header: 'Allowable Minutes Cap',
                  value: `${tier.cap} min`,
                },
              ], { divider: true })}
            </div>
          </div>

          <div>
            <div style={GROUP_TITLE}>Time Cost by Protocol</div>
            <div style={CARD}>
              {metricColumns(FOUNDATIONS.map(f => {
                const p = displayActiveProtocols.find(
                  a => a.foundation_core === f.value
                );
                return {
                  key: f.value,
                  header: p ? p.name : f.label,
                  value: !p
                    ? 'Not yet set'
                    : (p.timeDNA
                      ? 'DNA'
                      : (
                        (p.time_cost_minutes >= 0 ? '+' : '') +
                        p.time_cost_minutes + ' min'
                      )),
                };
              }), { divider: true })}
            </div>
          </div>

          {displayHistoryRecords.length > 0 && (
            <>
              <div>
                <div style={GROUP_TITLE}>
                  {displayHistoryRecords.length > 1
                    ? 'Past Month Stats'
                    : 'Past Month Stat'}
                </div>
                <div style={CARD}>
                  {metricColumns(coreStats.map(cs => ({
                    key: cs.key,
                    header: `${cs.label} (${cs.name})`,
                    value: pctLabel(cs.avg),
                  })), { divider: true })}
                </div>
              </div>

              <div>
                <div style={GROUP_TITLE}>Audit Outcomes</div>
                <div style={CARD}>
                  {metricColumns(displayHistoryRecords.map(r => {
                    const badge = auditBadge(r.audit_outcome);
                    return {
                      key: r.id,
                      header: r.name,
                      value: badge.label,
                      bg: badge.bg,
                      color: badge.color,
                    };
                  }))}

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginTop: 12,
                  }}>
                    {['unlocked', 'standard', 'remediate'].map(
                      key => {
                        const badge = auditBadge(key);
                        return (
                          <div
                            key={key}
                            style={{
                              fontSize: 12,
                              color: '#444',
                              lineHeight: 1.4,
                            }}
                          >
                            <span style={{
                              fontWeight: 700,
                              color: badge.bg,
                            }}>{badge.label}:</span>{' '}
                            {AUDIT_LEGEND[key]}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Instructions screen ─────────────────────────────
  if (section === 'Instructions') {
    return (
      <div style={PAGE}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={INSTR_PANEL}>
            <div style={INSTR_TITLEBAR}>
              4x4 Matrix — Set-Up and Instructions
            </div>

            <button
              onClick={() => setSection(null)}
              style={INSTR_CLOSE_BTN}
              aria-label="Close"
            >✕</button>

            <div style={INSTR_TOP_ITEM}>
              <span style={INSTR_DOT}>•</span>
              <div style={{ flex: 1 }}>
                <div style={INSTR_TOP_TITLE}>What Is the 4x4 Matrix</div>

                <div style={INSTR_SUBHEAD}>The Four Fundamentals</div>
                <div style={INSTR_BODY}>Everything in your daily execution is built on four core fundamentals: Fitness, Nutrition, Sleep, and Mental/Spiritual Health. These are your Four Foundation Cores — they're interdependent, and neglecting one drags the others down with it. The 4x4 Matrix is the system that puts real, trackable change into all four, one deliberate step at a time.</div>
                <div style={INSTR_BODY}>The name, 4x4 Matrix, comes from its structure: 4 Foundation Cores, 4 protocols — one per Core, every month.</div>

                <div style={INSTR_SUBHEAD}>The Theory</div>
                <div style={INSTR_QUOTE}>"To make lasting improvements in our lives we need to do positive things in small increments, consistently over time."</div>
                <div style={INSTR_BODY}>Most programs fail for a simple reason: they typically only add tasks. New workouts, new habits, new routines pile onto a day that is already full. Eventually the day runs out of room, motivation runs out with it, and the whole system collapses.</div>
                <div style={INSTR_BODY}>The 4x4 Matrix works differently. Every addition to your day is paired with an equal commitment to reducing or eliminating something that isn't serving you. You don't just add positive behavior — you make room for it by cutting the negative and non-gainful behavior that's already crowding your time. That trade is the entire foundation of the system.</div>

                <div style={INSTR_SUBHEAD}>How It Works</div>
                <div style={INSTR_BODY}>Each month, you set exactly 4 protocols — one for each Foundation Core. Every protocol is either an Activation (something you're adding) or a Deactivation (something you're reducing or removing). At least 1 of your 4 protocols must be a Deactivation, every month, without exception.</div>
                <div style={INSTR_BODY}>In the DOP app, specifically the 4x4 Matrix section, the app itself tracks, calculates, and walks you through both setup and monthly implementation. It may seem complicated at first — that's because of the checks and balances built in to make the system actually work. In short order, you'll become comfortable with it, and the app will keep you aligned and on track.</div>
                <div style={INSTR_BODY}>It's also worth using the History section within the 4x4 Matrix to look back at your past protocols and results. The numbers guide us on our journey.</div>

                <div style={INSTR_SUBHEAD}>How It Fits Inside DOP (Daily Operational Process)</div>
                <div style={INSTR_BODY}>Once you set your 4x4 protocols, they appear right in your Today checklist alongside your AM and PM items — same daily habit of checking them off. What sets them apart is how they're measured. Standard DOP items are already locked in as part of your routine. 4x4 protocols are still being proven — each one carries its own weekly and monthly score, tracking whether it's ready to become a permanent part of your day.</div>

                <div style={INSTR_SUBHEAD}>How It Progresses</div>
                <div style={{ ...INSTR_BODY, marginBottom: 0 }}>At the end of every monthly period, you look at each of your 4 protocols and decide what happens to it next: keep building on it, promote it into a permanent part of your daily standard, or drop it. Protocols that prove out over time graduate out of the 4x4 and into your permanent DOP roadmap — freeing that slot for something new. The 4x4 space always stays reserved for what's currently changing, not for what's already become who you are.</div>
              </div>
            </div>

            <div style={INSTR_TOP_ITEM}>
              <span style={INSTR_DOT}>•</span>
              <div style={{ flex: 1 }}>
                <div style={INSTR_TOP_TITLE}>How to Add a Protocol</div>

                <div style={INSTR_BODY}>Every protocol you set is built from a few core parts: Foundation Core, a name, Type (Activation or Deactivation), Time of Day, Frequency, and a Time Value. Here's how to walk through setting one up:</div>

                <InstrItem mark="1.">Choose your Foundation Core. Each of your 4 slots is tied to one Foundation Core — Fitness, Nutrition, Sleep, or Mental/Spiritual Health. Use your best judgment on which Core a protocol belongs to — a walk falls under Fitness, eliminating soda falls under Nutrition, cutting back on scrolling falls under Mental/Spiritual Health, and so on. Each Core can only be used once per month, so once a Core is selected on one card, it won't be available to choose on another.</InstrItem>
                <InstrItem mark="2.">Name your protocol. Type in a short description of what you're adding or removing (e.g. "Walk after work" or "No phone until PIT is done"). This becomes the label you'll see on your daily checklist.</InstrItem>
                <InstrItem mark="3.">Choose Activation or Deactivation. Activation means you're adding something new. Deactivation means you're reducing or eliminating something. Every month, at least 1 of your 4 protocols must be a Deactivation.</InstrItem>
                <InstrItem mark="4.">Choose Time of Day. AM, PM, or Both — whenever this protocol will happen in your day.</InstrItem>
                <InstrItem mark="5.">Choose Frequency. Daily means it's expected every day. Weekly Target means you choose how many days a week you'll complete it (for example, 4 out of 7).</InstrItem>
                <InstrItem mark="6.">Enter your Time Value, or select DNA. This is where you tell the system how many minutes this protocol adds to or saves from your day.</InstrItem>
                <div style={{ paddingLeft: 26 }}>
                  <InstrItem mark="—">If it has a real time cost or time savings, enter the number of minutes.</InstrItem>
                  <InstrItem mark="—">If it doesn't have a meaningful time value — something you're simply doing or not doing, with no clock attached — select DNA (Does Not Apply) instead. DNA protocols still count toward your progress and your monthly score. They just don't factor into your Time Budget.</InstrItem>
                </div>
                <InstrItem mark="7.">Save. Once all 4 of your Foundation Core slots are filled and at least 1 is a Deactivation, you're set for the month.</InstrItem>

                <div style={INSTR_EXAMPLE_BOX}>
                  <div style={INSTR_EXAMPLE_TITLE}>Example — Activation with a Time Value</div>
                  <div style={INSTR_EXAMPLE_DETAIL}>Foundation Core: Fitness | Protocol: "Walk after work" | Type: Activation | Time of Day: PM | Frequency: Daily | Time Value: 20 minutes</div>
                  <div style={{ ...INSTR_EXAMPLE_DETAIL, marginBottom: 0 }}>This adds 20 minutes to your day, every day you complete it, and counts against your monthly Time Budget.</div>
                </div>

                <div style={{ ...INSTR_EXAMPLE_BOX, marginBottom: 0 }}>
                  <div style={INSTR_EXAMPLE_TITLE}>Example — Deactivation with DNA</div>
                  <div style={INSTR_EXAMPLE_DETAIL}>Foundation Core: Mental/Spiritual Health | Protocol: "No phone until morning PIT is done" | Type: Deactivation | Time of Day: AM | Frequency: Daily | Time Value: DNA</div>
                  <div style={{ ...INSTR_EXAMPLE_DETAIL, marginBottom: 0 }}>This protocol has no time value to track — you either do it or you don't. It still counts toward your monthly score for Mental/Spiritual Health, but it doesn't offset or add to your Time Budget.</div>
                </div>
              </div>
            </div>

            <div style={INSTR_TOP_ITEM}>
              <span style={INSTR_DOT}>•</span>
              <div style={{ flex: 1 }}>
                <div style={INSTR_TOP_TITLE}>How Your Progress Is Measured</div>

                <div style={INSTR_BODY}>Your progress is tracked two ways — weekly and monthly.</div>
                <div style={INSTR_BODY}>Weekly: For protocols with a weekly target, you're on track for the week as long as you complete it on more days than you miss it. Missing a day here and there is expected — the standard is majority, not perfection.</div>
                <div style={INSTR_BODY}>But don't let a miss become a pattern. This is where NEVER TWICE applies — life happens, and the first miss is human. The second miss is a choice.</div>
                <div style={INSTR_BODY}>Monthly: At the end of each period, each of your 4 Foundation Cores is scored on its own consistency for the month:</div>

                <InstrItem mark="—">85% or higher — Unlocked. You've earned the ability to add more time to next month's protocols.</InstrItem>
                <InstrItem mark="—">75–84% — Standard. You move forward at your current time budget.</InstrItem>
                <div style={{ marginBottom: 0 }}>
                  <InstrItem mark="—">Below 75% — Remediate. That protocol carries into next month, and no new addition is allowed for that Core until it's back on track.</InstrItem>
                </div>
              </div>
            </div>

            <div style={INSTR_TOP_ITEM}>
              <span style={INSTR_DOT}>•</span>
              <div style={{ flex: 1 }}>
                <div style={INSTR_TOP_TITLE}>Your Overall Time Budget</div>

                <div style={INSTR_BODY}>Your daily time budget isn't set Core-by-Core — it's set by looking at your whole month together.</div>

                <div style={INSTR_SUBHEAD}>What the 30-Minute Cap Means</div>
                <div style={INSTR_BODY}>Every client starts with a 30-minute daily time budget. This is the total amount of added time you can build into your day across all 4 new protocols combined — spread however you want.</div>
                <div style={INSTR_BODY}>That 30 minutes isn't just a spending limit — it's offset by your deactivations. Every minute you save by reducing or eliminating a negative behavior gives you room to spend elsewhere.</div>
                <div style={INSTR_BODY}>Example: You add a 20-minute walk after work, 4 times a week. You also reduce your TV time by 15 minutes a day. That 15-minute reduction offsets your budget, leaving you 25 minutes remaining to spend across your other 2 protocols.</div>

                <div style={INSTR_SUBHEAD}>Earning the 60-Minute Budget</div>
                <div style={INSTR_BODY}>Your budget grows from 30 to 60 minutes when at least 2 of your 4 Foundation Cores hit 85% or higher for the month, and your other 2 Cores are each still holding at 50% or better.</div>
                <div style={INSTR_BODY}>Example: Fitness and Nutrition both hit 90% for the month. Sleep lands at 60%, Mental/Spiritual Health at 55%. Your budget still grows to 60 minutes — Fitness and Nutrition earned it, and Sleep and Mental/Spiritual Health are both still above the 50% floor, even though neither hit 85%.</div>
                <div style={{ ...INSTR_BODY, marginBottom: 0 }}>What this means: one Core struggling doesn't shut down your progress everywhere else. If your strong areas are strong and your weaker areas haven't fallen apart, your capacity to invest more time keeps growing — even while a specific protocol works through a Remediate carry-forward (see below). Progress where you're winning isn't held hostage by a struggle somewhere else.</div>
              </div>
            </div>

            <div style={{ ...INSTR_TOP_ITEM, marginBottom: 0 }}>
              <span style={INSTR_DOT}>•</span>
              <div style={{ flex: 1 }}>
                <div style={INSTR_TOP_TITLE}>Closing Out the Month</div>

                <div style={INSTR_BODY}>At the end of every period, what happens to a protocol depends on how it scored.</div>
                <div style={INSTR_BODY}>If the protocol scored Standard or Unlocked (75% or higher), you choose:</div>

                <InstrItem mark="—">Promote it — it becomes a permanent part of your daily roadmap, and that Foundation Core opens up for something new.</InstrItem>
                <InstrItem mark="—">Drop it — it's done. That Core opens up for a new protocol next month.</InstrItem>
                <InstrItem mark="—">Keep it in the 4x4 — you keep building on it. Since it's continuing, it has to grow — you can't repeat the same habit at the same level and expect a different result.</InstrItem>

                <div style={{ ...INSTR_BODY, marginTop: 8 }}>When you promote a protocol, it no longer counts against your 4x4 time budget. By that point it's simply part of how you live — your routine has already adjusted to it. Your full 30 or 60 minutes resets and becomes available again for genuinely new protocols. This is by design: if adopted protocols kept consuming your budget month after month, you'd eventually have no room left to add anything new. The time budget is there to govern what you're currently building and testing — not to carry the weight of everything you've already made part of your life.</div>

                <div style={{ ...INSTR_BODY, marginBottom: 0 }}>If the protocol scored Remediate (below 75%), there's no choice to make — it automatically carries into next month as-is, and no new addition can be added to that Core until it's back on track. This isn't a penalty. It's the system keeping your focus where it's needed before letting you take on more.</div>
              </div>
            </div>
          </div>
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
          >Back</button>
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
          >Back</button>
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
