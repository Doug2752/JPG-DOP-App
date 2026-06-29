import React from 'react';
import { GOLD, GOLD_LIGHT, DARK, BORDER } from '../utils/constants';
import { AM_SUB_IDS } from '../utils/constants';
import { inp, lbl } from './styles';
import { CheckRow, PITButton, QuoteBox, TapScore } from './Shared';

export default function AMBlock({
  form, setup, allAMRows, amDone,
  toggleAM, toggleAMPitAll, upd, saveForm, quote,
}) {
  return (
    <>
      <PITButton />

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
                    color: '#000',
                    background: allSubChecked ? GOLD : GOLD_LIGHT,
                    border: '1.5px solid #000', borderRadius: 4,
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
        <div style={{ margin: '8px 0 0', padding: '16px 18px', background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, #fff 100%)`, border: `1.5px solid ${GOLD}`, borderRadius: 5, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            {form.amLocked ? 'AM Block — Locked' : 'AM Block Complete'}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: DARK, fontStyle: 'italic', marginBottom: 12 }}>
            Foundation set. Move into the day.
          </div>
          <button
            onClick={() => saveForm({ ...form, amLocked: !form.amLocked, amLockedAt: !form.amLocked ? new Date().toISOString() : null })}
            style={{
              padding: '8px 20px', borderRadius: 6,
              border: form.amLocked ? 'none' : '1.5px solid #000',
              background: form.amLocked ? '#2ecc71' : GOLD_LIGHT,
              color: form.amLocked ? '#fff' : '#000', fontWeight: 800, fontSize: 12,
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            }}
          >{form.amLocked ? '✓ AM Locked' : 'Lock AM Block'}</button>
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <QuoteBox quote={quote} />
        </div>
      </div>
    </>
  );
}
