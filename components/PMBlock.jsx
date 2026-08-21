import React, { useState } from 'react';
import { GOLD, STEEL, STEEL_LIGHT, RED, RED_LIGHT, DARK, MID, BORDER, GREEN_SAVE, GREY } from '../utils/constants';
import { inp, lbl } from './styles';
import { CheckRow, PITButton, TapScore } from './Shared';
import { todayStr } from '../utils/date';
import { canClose, isGraceExpired, graceDeadlineDate } from '../utils/fourX4Period';

export default function PMBlock({
  form, setup, allPMRows, pmDone,
  togglePM, upd, saveForm, complete, saved,
  fourX4Protocols = [], user,
}) {
  const [confirmUnlockPM, setConfirmUnlockPM] = useState(false);
  const cycleStart = fourX4Protocols[0]?.cycle_start;
  const today = todayStr();
  const showGraceBanner = !!cycleStart && canClose(cycleStart, today) && !isGraceExpired(cycleStart, today);
  let graceBannerText = '';
  if (showGraceBanner) {
    const deadline = graceDeadlineDate(cycleStart);
    const daysLeft = Math.round((deadline - new Date(today + 'T00:00:00Z')) / 86400000);
    const monthName = new Date(cycleStart + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    graceBannerText = daysLeft > 0
      ? `Your ${monthName} period is ready to close — You have ${daysLeft} days left before it auto-closes.`
      : `Your ${monthName} period is ready to close — 0 days left, closing today.`;
  }
  return (
    <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* PM Block header */}
      <div style={{ background: STEEL, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase' }}>PM Block</span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{pmDone} / {allPMRows.filter(i => i.id !== 'pm_eval').length} done</span>
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

      {/* PM Deviation */}
      <div style={{ padding: '12px 16px 14px', marginTop: 16, marginBottom: 8 }}>
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

      {/* Tomorrow's Priorities */}
      <div style={{ borderRadius: 0, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ background: DARK, padding: '10px 16px', borderTop: `2px solid ${RED}` }}>
          <div style={{ color: RED, fontWeight: 900, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
            Tomorrow's Priorities
          </div>
        </div>
        <div style={{ padding: '14px 16px', background: RED_LIGHT, borderBottom: `2px solid ${RED}`, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, overflow: 'hidden' }}>
          <label style={{ ...lbl, color: RED, marginBottom: 6 }}>Tomorrow's One Thing</label>
          <input
            type="text"
            value={form.tomorrowOneThing || ''}
            onChange={e => upd('tomorrowOneThing', e.target.value)}
            style={{ ...inp, border: `2px solid ${RED}`, background: '#fff' }}
            placeholder="The single most important action tomorrow..."
          />
        </div>
      </div>

      {showGraceBanner && (
        <div style={{
          margin: '0 16px 14px', padding: '10px 16px',
          background: GOLD, border: `1.5px solid ${DARK}`, borderRadius: 5,
          color: DARK, fontWeight: 700, fontSize: 13, textAlign: 'center',
        }}>
          {graceBannerText}
        </div>
      )}

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
          onClick={() => {
            if (form.pmLocked) { setConfirmUnlockPM(true); return; }
            saveForm({ ...form, pmLocked: true, pmLockedAt: new Date().toISOString() });
          }}
          style={{
            padding: '8px 20px', borderRadius: 6, border: 'none',
            background: form.pmLocked ? 'transparent' : STEEL,
            color: form.pmLocked ? DARK : '#fff', fontWeight: 800, fontSize: 12,
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}
        >{form.pmLocked ? 'Unlock PM Block' : 'Mark PM Block Complete'}</button>

        {form.pmLocked && confirmUnlockPM && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: RED, fontWeight: 600, marginBottom: 6 }}>
              Unlock PM block? Locked entries may be edited.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  saveForm({ ...form, pmLocked: false, pmLockedAt: null });
                  setConfirmUnlockPM(false);
                }}
                style={{
                  padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                  background: 'transparent', color: RED, border: `1.5px solid ${RED}`,
                  cursor: 'pointer', letterSpacing: 0.3, whiteSpace: 'nowrap',
                }}
              >Confirm</button>
              <button
                onClick={() => setConfirmUnlockPM(false)}
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

      {/* Day Complete + Saved indicator */}
      <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, padding: '12px 20px', margin: '14px 16px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {(() => {
          const amDone = form.morningEval !== null && form.amLocked && form.amChecks && Object.values(form.amChecks).some(v => v);
          const pmItemsDone = form.eveningEval !== null && form.pmChecks && Object.values(form.pmChecks).some(v => v);
          if (complete) return <div style={{ color: GOLD, fontWeight: 800, fontSize: 14 }}>✓ Day Complete — Well executed.</div>;
          if (amDone && pmItemsDone) return <div style={{ color: GOLD, fontWeight: 800, fontSize: 14 }}>✓ AM Complete · ✓ PM Items Done — PM Block Complete not yet clicked.</div>;
          if (amDone) return <div style={{ color: GOLD, fontWeight: 800, fontSize: 14 }}>✓ AM Complete</div>;
          return <div style={{ color: GREY, fontSize: 13 }}>Score both AM and PM evaluations and minimally check off completed required items to mark the day complete.</div>;
        })()}
        {saved && <div style={{ color: GREEN_SAVE, fontSize: 11, marginTop: 4 }}>Saved.</div>}
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <PITButton userId={user} />
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
        <span style={{ fontSize: 10, color: '#bbb' }}>JPG-PROJ-APP-DOP-BUILD-v13</span>
        <span style={{ fontSize: 10, color: '#bbb' }}>Jones Performance Group LLC</span>
        <span style={{ fontSize: 10, color: '#bbb' }}>Daily Operational Process</span>
        <span style={{ fontSize: 10, color: GOLD, fontWeight: 700 }}>CONFIDENTIAL</span>
      </div>
    </div>
  );
}
