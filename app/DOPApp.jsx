import React, { useState, useEffect } from 'react';
import { BG } from '../utils/constants';
import {
  AM_STANDARD, AM_COMMON, AM_SUB_IDS,
  PM_STANDARD, PM_COMMON, PM_SUB_IDS,
  BACKUP_QUOTES,
} from '../utils/constants';
import { todayStr, fmtDate } from '../utils/date';
import { emptyForm, defaultSetup, isDayComplete, getDailyQuote, migrateSetup } from '../utils/form';
import { storage } from '../services/storage';
import { fetchDailyQuote } from '../services/ai';

import LoginScreen, { VALID_CREDENTIALS } from '../components/LoginScreen';
import SetupScreen from '../components/SetupScreen';
import FormInstructionsModal from '../components/FormInstructionsModal';
import ArchiveView from '../components/ArchiveView';
import FourX4View from '../components/FourX4View';
import AMBlock from '../components/AMBlock';
import PMBlock from '../components/PMBlock';
import Header from '../components/Header';
import BrandBar from '../components/BrandBar';

function findAMItem(id) {
  return AM_STANDARD.find(i => i.id === id) || AM_COMMON.find(i => i.id === id) || null;
}
function findPMItem(id) {
  return PM_STANDARD.find(i => i.id === id) || PM_COMMON.find(i => i.id === id) || null;
}

export default function DOPApp() {
  const [user, setUser] = useState(() => {
    const raw = new URLSearchParams(window.location.search).get('hub_user');
    if (!raw) return null;
    return Object.keys(VALID_CREDENTIALS).find(k => k.toLowerCase() === raw.trim().toLowerCase()) ?? null;
  });
  const [firstName, setFirstName] = useState(() => {
    const raw = new URLSearchParams(window.location.search).get('hub_user');
    if (!raw) return '';
    return Object.keys(VALID_CREDENTIALS).find(k => k.toLowerCase() === raw.trim().toLowerCase()) ?? '';
  });
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
        if (sv && sv.value) setSetup(migrateSetup(JSON.parse(sv.value)));
        const today = todayStr();
        const fd = await storage.get(sk + 'form_' + today);
        if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(today));
        const ad = await storage.get(sk + 'archiveDates');
        if (ad && ad.value) setArchiveDates(JSON.parse(ad.value));
        const st = await storage.get(sk + 'streak');
        if (st && st.value) setStreak(parseInt(st.value) || 0);
      } catch (e) {
        console.error('[DOP] setup-load failed:', e);
      }
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

  // Auto-open instructions modal on first-ever visit (after login + setup complete)
  useEffect(() => {
    if (!user || !setup.setupComplete) return;
    if (!localStorage.getItem('dop_instructions_seen')) {
      setShowInstructions(true);
    }
  }, [user, setup.setupComplete]);

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
    const stamped = { ...s, lastUpdated: new Date().toISOString() };
    setSetup(stamped);
    try { await storage.set(sk + 'setup', JSON.stringify(stamped)); } catch (e) { console.error('[DOP] saveSetup failed:', e); }
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
      const ci = (setup.amCustomItems || []).find(i => i.id === id);
      const label = ci ? ci.label : null;
      if (label && label.trim()) allAMRows.push({ id, label, sub: false });
      return;
    }
    if (setup.amCommonSelected.includes(id)) allAMRows.push(item);
  });

  const pmOrder = setup.pmOrder || ['pm_pit'];
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
      const ci = (setup.pmCustomItems || []).find(i => i.id === id);
      const label = ci ? ci.label : null;
      if (label && label.trim()) allPMRows.push({ id, label, sub: false });
      return;
    }
    const inStd = setup.pmSelected?.includes(id);
    const inCom = (setup.pmCommonSelected || []).includes(id);
    if (inStd || inCom || item.locked) {
      if (id === 'pm_bed') allPMRows.push({ ...item, desc: 'Target: ' + (setup.bedtime || '9:00 PM') + '  ·  Can be checked off in advance, before bedtime actually happens.' });
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
      <Header
        view={view}
        goToday={goToday}
        setView={setView}
        isToday={isToday}
        setupComplete={setup.setupComplete}
        streak={streak}
        firstName={firstName}
        showInstructions={showInstructions}
        onInstructions={() => setShowInstructions(prev => !prev)}
        onLogout={() => { setUser(null); setFirstName(''); }}
      />

      {/* Setup view — first time or returning via nav */}
      {(!setup.setupComplete || view === 'setup') && (
        <SetupScreen
          setup={setup}
          onSave={saveSetup}
          onCancel={setup.setupComplete ? () => setView('form') : undefined}
          isFirstTime={!setup.setupComplete}
          form={form}
          upd={upd}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          goToday={goToday}
          loadArchive={loadArchive}
          showInstructions={showInstructions}
          onCloseInstructions={() => {
            setShowInstructions(false);
            localStorage.setItem('dop_instructions_seen', '1');
          }}
        />
      )}

      {/* Archive view */}
      {setup.setupComplete && view === 'archive' && (
        <ArchiveView
          archiveDates={archiveDates}
          loadArchive={loadArchive}
          showInstructions={showInstructions}
          onCloseInstructions={() => {
            setShowInstructions(false);
            localStorage.setItem('dop_instructions_seen', '1');
          }}
        />
      )}

      {/* 4x4 Matrix view */}
      {setup.setupComplete && view === '4x4' && (
        <FourX4View
          onBack={() => setView('form')}
          user={user}
        />
      )}

      {/* Main form view */}
      {setup.setupComplete && view === 'form' && (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 0 60px' }}>
          <BrandBar
            form={form}
            upd={upd}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            goToday={goToday}
            loadArchive={loadArchive}
          />

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
              showInstructions={showInstructions}
              onCloseInstructions={() => {
                setShowInstructions(false);
                localStorage.setItem('dop_instructions_seen', '1');
              }}
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
