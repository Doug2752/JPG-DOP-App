import React, { useState, useEffect } from 'react';
import { GOLD, DARK, BG } from '../utils/constants';
import {
  AM_STANDARD, AM_COMMON, AM_CUSTOM_IDS, AM_SUB_IDS,
  PM_STANDARD, PM_COMMON, PM_CUSTOM_IDS, PM_SUB_IDS,
  BACKUP_QUOTES,
} from '../utils/constants';
import { todayStr, fmtDate } from '../utils/date';
import { emptyForm, defaultSetup, isDayComplete, getDailyQuote } from '../utils/form';
import { storage } from '../services/storage';
import { fetchDailyQuote } from '../services/ai';

import LoginScreen from '../components/LoginScreen';
import SetupScreen from '../components/SetupScreen';
import FormInstructionsModal from '../components/FormInstructionsModal';
import ArchiveView from '../components/ArchiveView';
import AMBlock from '../components/AMBlock';
import PMBlock from '../components/PMBlock';

const LOGO_SRC = '/jpglogo.png';

function findAMItem(id) {
  return AM_STANDARD.find(i => i.id === id) || AM_COMMON.find(i => i.id === id) || null;
}
function findPMItem(id) {
  return PM_STANDARD.find(i => i.id === id) || PM_COMMON.find(i => i.id === id) || null;
}

export default function DOPApp() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [view, setView] = useState('form');
  const [setup, setSetup] = useState(defaultSetup());
  const [form, setForm] = useState(emptyForm());
  const [archiveDates, setArchiveDates] = useState([]);
  const [archiveDate, setArchiveDate] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [quote, setQuote] = useState(null);
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const sk = (user || 'guest') + '_dop7_';

  // Load user data on login
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const sv = await storage.get(sk + 'setup');
        if (sv && sv.value) setSetup(JSON.parse(sv.value));
        const today = todayStr();
        const fd = await storage.get(sk + 'form_' + today);
        if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(today));
        const ad = await storage.get(sk + 'archiveDates');
        if (ad && ad.value) setArchiveDates(JSON.parse(ad.value));
        const st = await storage.get(sk + 'streak');
        if (st && st.value) setStreak(parseInt(st.value) || 0);
      } catch (_) {}
    })();
    loadQuote();
  }, [user]);

  // Auto-check pm_pit when pmGood and pmBad are both filled
  useEffect(() => {
    if (!user) return;
    const bothFilled = !!(form.pmGood && form.pmGood.trim()) && !!(form.pmBad && form.pmBad.trim());
    const currentPit = !!(form.pmChecks && form.pmChecks['pm_pit']);
    if (bothFilled !== currentPit) {
      const c = { ...form.pmChecks };
      c['pm_pit'] = bothFilled;
      saveForm({ ...form, pmChecks: c });
    }
  }, [form.pmGood, form.pmBad]);

  async function loadQuote() {
    const fallback = getDailyQuote(BACKUP_QUOTES);
    try {
      const today = todayStr();
      const cached = await storage.get('dop_quote_' + today);
      if (cached && cached.value) { setQuote(JSON.parse(cached.value)); return; }
      const q = await fetchDailyQuote();
      setQuote(q);
      try { await storage.set('dop_quote_' + today, JSON.stringify(q)); } catch (_) {}
    } catch (_) {
      setQuote(fallback);
    }
  }

  async function saveForm(next) {
    setForm(next);
    try {
      await storage.set(sk + 'form_' + next.date, JSON.stringify(next));
      const dates = archiveDates.slice();
      if (!dates.includes(next.date)) {
        dates.push(next.date);
        setArchiveDates(dates);
        await storage.set(sk + 'archiveDates', JSON.stringify(dates));
      }
    } catch (_) {}
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  const upd = (f, v) => saveForm({ ...form, [f]: v });

  const toggleAM = id => {
    const c = { ...form.amChecks };
    c[id] = !c[id];
    saveForm({ ...form, amChecks: c });
  };
  const toggleAMPitAll = () => {
    const c = { ...form.amChecks };
    const allChecked = AM_SUB_IDS.every(id => !!c[id]);
    AM_SUB_IDS.forEach(id => { c[id] = !allChecked; });
    c['pit'] = !allChecked;
    saveForm({ ...form, amChecks: c });
  };
  const togglePM = id => {
    const c = { ...form.pmChecks };
    c[id] = !c[id];
    saveForm({ ...form, pmChecks: c });
  };

  async function saveSetup(s) {
    setSetup(s);
    try { await storage.set(sk + 'setup', JSON.stringify(s)); } catch (_) {}
    setView('form');
  }

  function goToday() {
    setArchiveDate(null);
    setView('form');
    (async () => {
      try {
        const today = todayStr();
        const fd = await storage.get(sk + 'form_' + today);
        if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(today));
      } catch (_) { setForm(emptyForm()); }
    })();
  }

  async function loadArchive(dateStr) {
    try {
      const fd = await storage.get(sk + 'form_' + dateStr);
      if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(dateStr));
    } catch (_) { setForm(emptyForm(dateStr)); }
    setArchiveDate(dateStr);
    setView('form');
  }

  // ─── Login gate ───────────────────────────────────────────────────────────
  if (!user) {
    return <LoginScreen onLogin={u => { setUser(u); setFirstName(u); }} />;
  }

  // ─── First-time setup gate ─────────────────────────────────────────────────
  if (!setup.setupComplete) {
    return <SetupScreen setup={setup} onSave={saveSetup} isFirstTime={true} />;
  }

  // ─── Setup view ───────────────────────────────────────────────────────────
  if (view === 'setup') {
    return <SetupScreen setup={setup} onSave={saveSetup} onCancel={() => setView('form')} isFirstTime={false} />;
  }

  // ─── Build ordered row lists ───────────────────────────────────────────────
  const amOrder = setup.amOrder || ['pit'];
  const allAMRows = [];
  amOrder.forEach(id => {
    if (id === 'pit') {
      allAMRows.push(AM_STANDARD[0]);
      AM_SUB_IDS.forEach(subId => {
        const si = AM_STANDARD.find(i => i.id === subId);
        if (si) allAMRows.push(si);
      });
      return;
    }
    const item = findAMItem(id);
    if (!item) {
      const label = setup.amCustomLabels?.[id];
      if (label && label.trim()) allAMRows.push({ id, label, sub: false });
      return;
    }
    if (setup.amCommonSelected.includes(id)) allAMRows.push(item);
  });

  const pmOrder = setup.pmOrder || ['prep_tomorrow', 'evening_meal', 'pm_pit'];
  const allPMRows = [];
  pmOrder.forEach(id => {
    if (id === 'pm_pit') {
      const pitItem = PM_STANDARD.find(i => i.id === 'pm_pit');
      if (pitItem) allPMRows.push(pitItem);
      PM_SUB_IDS.forEach(subId => {
        const si = PM_STANDARD.find(i => i.id === subId);
        if (si) allPMRows.push(si);
      });
      return;
    }
    const item = findPMItem(id);
    if (!item) {
      const label = setup.pmCustomLabels?.[id];
      if (label && label.trim()) allPMRows.push({ id, label, sub: false });
      return;
    }
    const inStd = setup.pmSelected?.includes(id);
    const inCom = (setup.pmCommonSelected || []).includes(id);
    if (inStd || inCom || item.locked) {
      if (id === 'pm_bed') allPMRows.push({ ...item, desc: 'Target: ' + (setup.bedtime || '9:00 PM') });
      else allPMRows.push(item);
    }
  });

  const amDone = allAMRows.filter(i => form.amChecks?.[i.id]).length;
  const pmDone = allPMRows.filter(i => form.pmChecks?.[i.id]).length;
  const totalDone = amDone + pmDone + (form.morningEval !== null ? 1 : 0) + (form.eveningEval !== null ? 1 : 0);
  const totalItems = allAMRows.length + allPMRows.length + 2;
  const complete = isDayComplete(form);
  const isToday = !archiveDate || archiveDate === todayStr();
  const progressLabel = complete ? 'Day Complete' : `${totalDone} / ${totalItems}`;

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'sans-serif' }} onClick={() => setShowDatePicker(false)}>
      {showInstructions && <FormInstructionsModal onClose={() => setShowInstructions(false)} />}

      {/* Sticky Nav */}
      <div style={{
        background: '#111', borderBottom: `2px solid ${GOLD}`, minHeight: 56,
        display: 'flex', alignItems: 'center', padding: '0 16px',
        position: 'sticky', top: 0, zIndex: 100, gap: 12,
      }}>
        <img src={LOGO_SRC} alt="JPG" style={{ height: 36, width: 'auto', flexShrink: 0 }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0 }}>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>D</span>
          <span style={{ color: '#ccc', fontWeight: 600, fontSize: 10, marginRight: 3 }}>aily</span>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>O</span>
          <span style={{ color: '#ccc', fontWeight: 600, fontSize: 10, marginRight: 3 }}>perational</span>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>P</span>
          <span style={{ color: '#ccc', fontWeight: 600, fontSize: 10 }}>rocess</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
          {[
            ['Today', goToday, view === 'form' && isToday],
            ['Archive', () => setView('archive'), view === 'archive'],
            ['Setup', () => setView('setup'), view === 'setup'],
          ].map(([label, onClick, active]) => (
            <button key={label} onClick={onClick} style={{
              background: 'transparent', border: 'none',
              color: active ? GOLD : '#888', fontWeight: 600, fontSize: 12,
              cursor: 'pointer', padding: '4px 8px',
            }}>{label}</button>
          ))}
          <button
            onClick={() => setShowInstructions(true)}
            style={{ background: GOLD, border: 'none', color: '#fff', fontWeight: 700, fontSize: 11, cursor: 'pointer', padding: '3px 8px', borderRadius: 4, marginLeft: 4 }}
          >? Help</button>
        </div>

        <div style={{ marginLeft: 8 }}>
          <div style={{
            background: complete ? GOLD : '#2a2a2a',
            color: complete ? '#fff' : '#888',
            borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, transition: 'all 0.3s',
          }}>{progressLabel}</div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {streak > 0 && (
            <div style={{ background: GOLD, color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
              {streak}🔥
            </div>
          )}
          <span style={{ color: '#aaa', fontSize: 12 }}>{firstName}</span>
          <button
            onClick={() => { setUser(null); setFirstName(''); }}
            style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}
          >Logout</button>
        </div>
      </div>

      {/* Archive view */}
      {view === 'archive' && <ArchiveView archiveDates={archiveDates} loadArchive={loadArchive} />}

      {/* Main form view */}
      {view === 'form' && (
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 0 60px' }}>
          {/* Brand bar */}
          <div style={{ background: '#fff', borderBottom: `1px solid ${GOLD}`, padding: '16px 20px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="JPG" style={{ height: 76, width: 'auto', flexShrink: 0, display: 'block' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
                <span style={{ fontSize: 38, fontWeight: 900, color: '#000', lineHeight: 1 }}>D</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: 0.5, marginRight: 6 }}>aily</span>
                <span style={{ fontSize: 38, fontWeight: 900, color: '#000', lineHeight: 1 }}>O</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: 0.5, marginRight: 6 }}>perational</span>
                <span style={{ fontSize: 38, fontWeight: 900, color: '#000', lineHeight: 1 }}>P</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: 0.5 }}>rocess</span>
              </div>

              {/* Date picker */}
              <div style={{ position: 'relative', display: 'inline-block', marginTop: 2 }} onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setShowDatePicker(p => !p)}
                  style={{
                    background: '#fff', border: `1px solid ${GOLD}`, borderRadius: 5,
                    padding: '4px 14px', fontSize: 12, fontWeight: 600, color: DARK,
                    cursor: 'pointer', letterSpacing: 0.3,
                  }}
                >
                  {fmtDate(form.date)}
                  <span style={{ marginLeft: 8, fontSize: 16, color: GOLD, lineHeight: 1 }}>▾</span>
                </button>
                {showDatePicker && (
                  <div style={{
                    position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)',
                    background: '#fff', border: `1px solid ${GOLD}`, borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: 12, zIndex: 200, minWidth: 260,
                  }}>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Jump to date
                    </div>
                    <input
                      type="date"
                      value={form.date}
                      max={todayStr()}
                      onChange={e => {
                        const newDate = e.target.value;
                        if (!newDate) return;
                        setShowDatePicker(false);
                        if (newDate === todayStr()) goToday(); else loadArchive(newDate);
                      }}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: 5, border: `1px solid ${GOLD}`, fontSize: 13, fontFamily: 'sans-serif', boxSizing: 'border-box' }}
                    />
                    {archiveDate && (
                      <button
                        onClick={() => { setShowDatePicker(false); goToday(); }}
                        style={{ width: '100%', marginTop: 8, padding: '6px', borderRadius: 5, border: `1px solid ${GOLD}`, background: '#fff', color: DARK, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                      >Back to Today</button>
                    )}
                  </div>
                )}
              </div>

              {/* Never Twice */}
              <div style={{ marginTop: 8, border: `1.5px solid ${GOLD}`, borderRadius: 5, padding: '3px 12px', display: 'inline-block' }}>
                <span style={{ fontWeight: 800, fontSize: 11, color: DARK }}>Never Twice</span>
                <span style={{ fontSize: 9, color: GOLD, marginLeft: 8 }}>Miss one — never miss the second.</span>
              </div>
            </div>
            <div style={{ width: 72, flexShrink: 0 }} />
          </div>

          {/* Archive banner */}
          {!isToday && (
            <div style={{ background: '#fff3cd', borderBottom: '2px solid #ffc107', padding: '8px 20px', fontSize: 12, color: '#856404', fontWeight: 600 }}>
              Viewing: {fmtDate(form.date)} —{' '}
              <span onClick={goToday} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Back to Today</span>
            </div>
          )}

          <div style={{ padding: '14px 16px 0' }}>
            <AMBlock
              form={form}
              setup={setup}
              allAMRows={allAMRows}
              amDone={amDone}
              toggleAM={toggleAM}
              toggleAMPitAll={toggleAMPitAll}
              upd={upd}
              saveForm={saveForm}
              quote={quote}
            />
            <PMBlock
              form={form}
              setup={setup}
              allPMRows={allPMRows}
              pmDone={pmDone}
              togglePM={togglePM}
              upd={upd}
              saveForm={saveForm}
              complete={complete}
              saved={saved}
            />
          </div>
        </div>
      )}
    </div>
  );
}
