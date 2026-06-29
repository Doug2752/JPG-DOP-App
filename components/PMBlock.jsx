import React from 'react';
import { GOLD, GOLD_LIGHT, STEEL, STEEL_LIGHT, RED, RED_LIGHT, DARK, BORDER } from '../utils/constants';
import { inp, lbl } from './styles';
import { CheckRow, PITButton, TapScore } from './Shared';

export default function PMBlock({
  form, setup, allPMRows, pmDone,
  togglePM, upd, saveForm, complete, saved,
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* PM Block header */}
      <div style={{ background: STEEL, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase' }}>PM Block</span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{pmDone} / {allPMRows.length} done</span>
      </div>

      {/* Evening Evaluation */}
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${STEEL_LIGHT}` }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: STEEL, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
          Evening Evaluation — How Did Today Go?
        </div>
        <TapScore value={form.eveningEval} onChange={v => upd('eveningEval', v)} color={STEEL} />
        <div style={{ marginTop: 10, fontSize: 11, color: '#999', fontStyle: 'italic', lineHeight: 1.5 }}>
          Complete PM PIT before bed — score your day, note what went well and what to improve, then check Bed and Lights Out as part of your closing routine.
        </div>
      </div>

      {/* PM Rows */}
      {allPMRows.map(item => {
        if (item.id === 'pm_good') {
          return (
            <div key="pm_good" style={{ padding: '10px 14px 10px 36px', borderBottom: `1px solid ${BORDER}`, background: STEEL_LIGHT }}>
              <label style={{ ...lbl, color: STEEL, marginBottom: 5 }}>What Went Well Today</label>
              <textarea
                value={form.pmGood || ''}
                onChange={e => upd('pmGood', e.target.value)}
                rows={2}
                style={{ ...inp, resize: 'vertical' }}
                placeholder="Wins, progress, positives from today..."
              />
            </div>
          );
        }
        if (item.id === 'pm_bad') {
          return (
            <div key="pm_bad" style={{ padding: '10px 14px 10px 36px', borderBottom: `1px solid ${BORDER}`, background: STEEL_LIGHT }}>
              <label style={{ ...lbl, color: STEEL, marginBottom: 5 }}>What to Improve</label>
              <textarea
                value={form.pmBad || ''}
                onChange={e => upd('pmBad', e.target.value)}
                rows={2}
                style={{ ...inp, resize: 'vertical' }}
                placeholder="Honest assessment — what would you do differently?"
              />
            </div>
          );
        }
        if (item.id === 'pm_eval') return null;
        return (
          <CheckRow
            key={item.id}
            item={item}
            checked={!!(form.pmChecks && form.pmChecks[item.id])}
            onToggle={() => togglePM(item.id)}
            duration={setup.durations[item.id]}
            blockColor={STEEL}
          />
        );
      })}

      {/* Tomorrow's Priorities */}
      <div style={{ background: '#1a1a1a', padding: '10px 16px', borderTop: `2px solid ${RED}` }}>
        <div style={{ color: RED, fontWeight: 900, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
          Tomorrow's Priorities
        </div>
      </div>
      <div style={{ padding: '14px 16px', background: RED_LIGHT, borderBottom: `2px solid ${RED}` }}>
        <label style={{ ...lbl, color: RED, marginBottom: 6 }}>Tomorrow's One Thing</label>
        <input
          type="text"
          value={form.tomorrowOneThing || ''}
          onChange={e => upd('tomorrowOneThing', e.target.value)}
          style={{ ...inp, border: `2px solid ${RED}`, background: '#fff' }}
          placeholder="The single most important action tomorrow..."
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
        <span style={{ fontSize: 10, fontWeight: 800, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Optional</span>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
      </div>
      <div style={{ padding: '4px 16px 14px' }}>
        <label style={lbl}>
          Tomorrow's Appointments & Must-Do's{' '}
          <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>(also in PIT)</span>
        </label>
        <textarea
          value={form.tomorrowAppts || ''}
          onChange={e => upd('tomorrowAppts', e.target.value)}
          rows={3}
          style={{ ...inp, resize: 'vertical', marginBottom: 12 }}
          placeholder="Key appointments and tasks for tomorrow..."
        />
      </div>

      {/* PM Deviation */}
      <div style={{ padding: '0 16px 14px' }}>
        <label style={lbl}>
          PM Deviation{' '}
          <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>(optional)</span>
        </label>
        <textarea
          value={form.pmDeviation || ''}
          onChange={e => upd('pmDeviation', e.target.value)}
          rows={2}
          style={{ ...inp, resize: 'vertical' }}
          placeholder="Note anything abnormal or items not completed this evening..."
        />
      </div>

      {/* PM Lock */}
      <div style={{
        margin: '12px 16px 0', padding: '16px 18px',
        background: `linear-gradient(135deg, ${STEEL_LIGHT} 0%, #fff 100%)`,
        border: `1.5px solid ${STEEL}`, borderRadius: 5, textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: STEEL, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
          {form.pmLocked ? 'PM Block — Locked' : 'PM Block Complete'}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: DARK, fontStyle: 'italic', marginBottom: 12 }}>
          Day closed. Rest with diligence.
        </div>
        <button
          onClick={() => saveForm({ ...form, pmLocked: !form.pmLocked, pmLockedAt: !form.pmLocked ? new Date().toISOString() : null })}
          style={{
            padding: '8px 20px', borderRadius: 6, border: 'none',
            background: form.pmLocked ? '#2ecc71' : STEEL,
            color: '#fff', fontWeight: 800, fontSize: 12,
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}
        >{form.pmLocked ? '✓ PM Locked' : 'Lock PM Block'}</button>
      </div>

      {/* Day Complete + Saved indicator */}
      <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, padding: '12px 20px', margin: '14px 16px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {complete ? (
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 14 }}>✓ Day Complete — Well executed.</div>
        ) : (
          <div style={{ color: '#888', fontSize: 13 }}>
            Score both evaluations and complete at least one AM and one PM item to mark the day done.
          </div>
        )}
        {saved && <div style={{ color: '#27ae60', fontSize: 11, marginTop: 4 }}>Saved.</div>}
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <PITButton />
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
        <span style={{ fontSize: 10, color: '#bbb' }}>JPG-DOP-001-v13</span>
        <span style={{ fontSize: 10, color: '#bbb' }}>Jones Performance Group LLC</span>
        <span style={{ fontSize: 10, color: '#bbb' }}>Daily Operational Process</span>
        <span style={{ fontSize: 10, color: '#bbb', fontWeight: 700 }}>CONFIDENTIAL</span>
      </div>
    </div>
  );
}
