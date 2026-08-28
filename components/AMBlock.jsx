import React, { useState } from 'react';
import { GOLD, GOLD_LIGHT, DARK, MID, RED, BORDER, AM_SUB_IDS } from '../utils/constants';
import { inp, lbl } from './styles';
import { CheckRow, QuoteBox, TapScore } from './Shared';
import FormInstructionsModal from './FormInstructionsModal';

export default function AMBlock({
  form, setup, allAMRows, amDone,
  toggleAM, toggleAMPitAll, upd, saveForm, quote,
  showInstructions, onCloseInstructions, user,
}) {
  const [confirmUnlockAM, setConfirmUnlockAM] = useState(false);
  return (
    <>
      <div style={{
        width: '100%',
        background: GOLD_LIGHT,
        border: '1.5px solid #000',
        borderRadius: 5,
        padding: '5px 14px',
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: '#000',
            letterSpacing: 1, textTransform: 'uppercase' }}>
            Never Twice
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#000',
            letterSpacing: 0.3 }}>
            Miss one — never miss the second.
          </span>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6,
          cursor: 'pointer', fontSize: 11, fontWeight: 700, color: '#000',
          letterSpacing: 0.3, userSelect: 'none', whiteSpace: 'nowrap' }}>
          <input
            type="checkbox"
            checked={form.neverTwiceRead || false}
            onChange={e => upd('neverTwiceRead', e.target.checked)}
            style={{ width: 13, height: 13, cursor: 'pointer',
              accentColor: GOLD }}
          />
          I've read this. Never twice.
        </label>
      </div>

      {showInstructions && (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', boxSizing: 'border-box', width: '100%' }}>
          <FormInstructionsModal onClose={onCloseInstructions} />
        </div>
      )}

      {/* Morning Evaluation */}
      <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, padding: '16px 18px', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: GOLD, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
          Morning Evaluation — How Do I Feel Right Now?
        </div>
        <TapScore value={form.morningEval} onChange={v => upd('morningEval', v)} color={GOLD} />
      </div>

      {/* AM Checklist */}
      <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ background: GOLD, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase' }}>AM Block</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{amDone} / {allAMRows.length} done</span>
        </div>

        {allAMRows.map(item => {
          if (item.id === 'pit') {
            const allSubChecked = AM_SUB_IDS.every(id => !!(form.amChecks && form.amChecks[id]));
            return (
              <div key="pit" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                borderBottom: `1px solid ${BORDER}`,
                background: form.amChecks?.pit ? GOLD_LIGHT : 'transparent',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: form.amChecks?.pit ? GOLD : DARK }}>PIT</span>
                  <span style={{ color: '#999', fontSize: 11, marginLeft: 6 }}>
                    — Personal Investment Time — No Phone Until PIT Is Complete
                  </span>
                  <span style={{ fontSize: 9, color: GOLD, fontWeight: 700, marginLeft: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Required</span>
                </div>
                <button
                  onClick={toggleAMPitAll}
                  style={{
                    fontSize: 10, fontWeight: 800,
                    color: DARK,
                    background: allSubChecked ? GOLD : GOLD_LIGHT,
                    border: `1.5px solid ${DARK}`, borderRadius: 4,
                    padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: 0.5,
                  }}
                >{allSubChecked ? '✓ All Done' : 'Check All'}</button>
                <button
                  onClick={() => toggleAM('pit')}
                  style={{
                    width: 36, height: 36, borderRadius: 6,
                    border: `2px solid ${form.amChecks?.pit ? GOLD : BORDER}`,
                    background: form.amChecks?.pit ? GOLD : '#fff',
                    color: form.amChecks?.pit ? '#fff' : '#ccc',
                    cursor: 'pointer', fontSize: 17, fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >{form.amChecks?.pit ? '✓' : ''}</button>
              </div>
            );
          }
          return (
            <CheckRow
              key={item.id}
              item={item}
              checked={!!(form.amChecks && form.amChecks[item.id])}
              onToggle={() => toggleAM(item.id)}
              duration={setup.durations[item.id]}
              blockColor={GOLD}
            />
          );
        })}

        {/* AM Deviation */}
        <div style={{ padding: '12px 16px 4px', borderTop: `1px solid ${GOLD_LIGHT}` }}>
          <label style={lbl}>
            AM Deviation{' '}
            <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>(optional)</span>
          </label>
          <textarea
            value={form.amDeviation || ''}
            onChange={e => upd('amDeviation', e.target.value)}
            rows={2}
            style={{ ...inp, resize: 'vertical', marginBottom: 14 }}
            placeholder="Note anything abnormal or items not completed..."
          />
        </div>

        {/* AM Lock + Quote */}
        <div style={{ margin: '8px 0 0', padding: '16px 18px', background: GOLD, border: `1.5px solid ${GOLD}`, borderRadius: 5, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: DARK, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            {form.amLocked ? 'AM Block — Locked' : 'AM Block Complete'}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: DARK, fontStyle: 'italic', marginBottom: 12 }}>
            Foundation set. Move into the day.
          </div>
          <button
            onClick={() => {
              if (form.amLocked) { setConfirmUnlockAM(true); return; }
              saveForm({ ...form, amLocked: true, amLockedAt: new Date().toISOString() });
            }}
            style={{
              padding: '8px 20px', borderRadius: 6,
              border: form.amLocked ? 'none' : `1.5px solid ${DARK}`,
              background: form.amLocked ? GOLD : GOLD_LIGHT,
              color: DARK, fontWeight: 800, fontSize: 12,
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            }}
          >{form.amLocked ? 'Unlock AM Block' : 'Mark AM Block Complete'}</button>

          {form.amLocked && confirmUnlockAM && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: RED, fontWeight: 600, marginBottom: 6 }}>
                Unlock AM block? Locked entries may be edited.
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    saveForm({ ...form, amLocked: false, amLockedAt: null });
                    setConfirmUnlockAM(false);
                  }}
                  style={{
                    padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                    background: 'transparent', color: RED, border: `1.5px solid ${RED}`,
                    cursor: 'pointer', letterSpacing: 0.3, whiteSpace: 'nowrap',
                  }}
                >Confirm</button>
                <button
                  onClick={() => setConfirmUnlockAM(false)}
                  style={{
                    padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                    background: 'transparent', color: MID, border: `1.5px solid ${BORDER}`,
                    cursor: 'pointer', letterSpacing: 0.3, whiteSpace: 'nowrap',
                  }}
                >Cancel</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '0 0 16px', marginTop: 16 }}>
          <QuoteBox quote={quote} />
        </div>
      </div>
    </>
  );
}
