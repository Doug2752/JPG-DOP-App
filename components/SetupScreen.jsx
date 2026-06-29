import React, { useState } from 'react';
import { GOLD, GOLD_LIGHT, STEEL, STEEL_LIGHT, STEEL_MID, STEEL_DARK, BORDER, DARK, MID } from '../utils/constants';
import { AM_STANDARD, AM_COMMON, AM_CUSTOM_IDS, PM_STANDARD, PM_COMMON, PM_CUSTOM_IDS } from '../utils/constants';
import { inp } from './styles';
import { ColumnHeader, SectionDivider, RecommendedBadge } from './Shared';
import SetupRow from './SetupRow';
import ReorderPanel from './ReorderPanel';
import BrandBar from './BrandBar';
import FormInstructionsModal from './FormInstructionsModal';

function findAMItem(id) {
  return AM_STANDARD.find(i => i.id === id) || AM_COMMON.find(i => i.id === id) || null;
}
function findPMItem(id) {
  return PM_STANDARD.find(i => i.id === id) || PM_COMMON.find(i => i.id === id) || null;
}

function SH({ color, label, sub }) {
  return (
    <div style={{ background: color, padding: '12px 16px' }}>
      <div style={{ color: '#fff', fontWeight: 900, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>
      {sub ? <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 3 }}>{sub}</div> : null}
    </div>
  );
}

export default function SetupScreen({ setup, onSave, onCancel, isFirstTime, form, upd, showDatePicker, setShowDatePicker, goToday, loadArchive, showInstructions, onCloseInstructions }) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(setup)));

  const setDur = (id, val) => setLocal(p => ({ ...p, durations: { ...p.durations, [id]: val } }));
  const setAMCust = (id, val) => setLocal(p => {
    const labels = { ...p.amCustomLabels, [id]: val };
    const order = p.amOrder.slice();
    if (val.trim() && !order.includes(id)) order.push(id);
    if (!val.trim()) { const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    return { ...p, amCustomLabels: labels, amOrder: order };
  });
  const setPMCust = (id, val) => setLocal(p => {
    const labels = { ...p.pmCustomLabels, [id]: val };
    const order = p.pmOrder.slice();
    if (val.trim() && !order.includes(id)) order.push(id);
    if (!val.trim()) { const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    return { ...p, pmCustomLabels: labels, pmOrder: order };
  });
  const toggleAMCommon = id => setLocal(p => {
    const sel = p.amCommonSelected.slice();
    const order = p.amOrder.slice();
    const idx = sel.indexOf(id);
    if (idx >= 0) { sel.splice(idx, 1); const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    else { sel.push(id); if (!order.includes(id)) order.push(id); }
    return { ...p, amCommonSelected: sel, amOrder: order };
  });
  const togglePMStd = id => {
    const item = PM_STANDARD.find(i => i.id === id);
    if (item && item.locked) return;
    setLocal(p => {
      const sel = p.pmSelected.slice();
      const order = p.pmOrder.slice();
      const idx = sel.indexOf(id);
      if (idx >= 0) { sel.splice(idx, 1); const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
      else { sel.push(id); if (!order.includes(id)) order.push(id); }
      return { ...p, pmSelected: sel, pmOrder: order };
    });
  };
  const togglePMCommon = id => setLocal(p => {
    const sel = (p.pmCommonSelected || []).slice();
    const order = p.pmOrder.slice();
    const idx = sel.indexOf(id);
    if (idx >= 0) { sel.splice(idx, 1); const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    else { sel.push(id); if (!order.includes(id)) order.push(id); }
    return { ...p, pmCommonSelected: sel, pmOrder: order };
  });
  const moveAM = (idx, dir) => setLocal(p => {
    const order = p.amOrder.slice();
    const ni = idx + dir;
    if (ni < 0 || ni >= order.length) return p;
    [order[idx], order[ni]] = [order[ni], order[idx]];
    return { ...p, amOrder: order };
  });
  const movePM = (idx, dir) => setLocal(p => {
    const order = p.pmOrder.slice();
    const ni = idx + dir;
    if (ni < 0 || ni >= order.length) return p;
    [order[idx], order[ni]] = [order[ni], order[idx]];
    return { ...p, pmOrder: order };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f6', padding: '0 0 60px', fontFamily: 'sans-serif' }}>
      <BrandBar
        form={form}
        upd={upd}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        goToday={goToday}
        loadArchive={loadArchive}
        readOnlyDate={setup.lastUpdated ?? null}
      />
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ padding: '20px 16px 0' }}>
          {/* Bedtime */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{
              background: '#333', padding: '14px 18px', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
            }}>
              <div>
                <div style={{ color: GOLD, fontWeight: 900, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Target Bedtime</div>
                <div style={{ color: '#aaa', fontSize: 11, marginTop: 3 }}>Set once — appears on your Bed item every day as your personal standard</div>
              </div>
              <input
                type="text"
                value={local.bedtime || ''}
                onChange={e => setLocal({ ...local, bedtime: e.target.value })}
                placeholder="e.g. 9:00 PM"
                style={{ background: '#222', border: `1px solid ${GOLD}`, color: '#fff', borderRadius: 5, padding: '7px 12px', fontSize: 14, width: 120, textAlign: 'center' }}
              />
            </div>
          </div>

          {showInstructions && (
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', boxSizing: 'border-box', width: '100%' }}>
              <FormInstructionsModal onClose={onCloseInstructions} />
            </div>
          )}

          {/* AM Required */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={GOLD} label="AM Required Items" sub="PIT is required and cannot be removed. All sub-categories are locked." />
            <ColumnHeader />
            {AM_STANDARD.map(item => (
              <SetupRow key={item.id} item={item} checked={true} onToggle={() => {}}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={GOLD_LIGHT} isLocked={true} />
            ))}
          </div>

          {/* AM Common */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color="#7A6010" label="AM Common Life Tasks" sub="Recommended items are pre-selected. Select any that apply to your morning." />
            <ColumnHeader />
            {AM_COMMON.map(item => (
              <SetupRow key={item.id} item={item}
                checked={local.amCommonSelected.includes(item.id)}
                onToggle={() => toggleAMCommon(item.id)}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={GOLD_LIGHT} showBadge={!!item.recommended} />
            ))}
            <SectionDivider label="Write Your Own — Custom AM Items" />
            {AM_CUSTOM_IDS.map(id => {
              const hasLabel = !!(local.amCustomLabels[id] && local.amCustomLabels[id].trim());
              return (
                <SetupRow key={id} item={{ id, label: '', desc: '', sub: false }}
                  checked={hasLabel} onToggle={() => { if (hasLabel) setAMCust(id, ''); }}
                  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
                  labelVal={local.amCustomLabels[id]} onLabelChange={v => setAMCust(id, v)}
                  lightColor="#f0f0f0" />
              );
            })}
          </div>

          <ReorderPanel
            order={local.amOrder} findItem={findAMItem}
            customLabels={local.amCustomLabels} customIds={AM_CUSTOM_IDS}
            onMove={moveAM} color={GOLD}
            title="Reorder AM Items — Match Your Morning Routine"
          />

          {/* PM Required */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL} label="PM Required Items" sub="PM PIT, Prep for Tomorrow, and Evening Meal are required." />
            <ColumnHeader />
            {PM_STANDARD.map(item => {
              const isChecked = local.pmSelected.includes(item.id) || !!item.locked;
              return (
                <SetupRow key={item.id} item={item} checked={isChecked}
                  onToggle={() => { if (!item.sub && !item.locked) togglePMStd(item.id); }}
                  duration={item.id === 'pm_bed' ? local.bedtime || '' : local.durations[item.id]}
                  onDurChange={item.id === 'pm_bed' ? null : v => setDur(item.id, v)}
                  lightColor={STEEL_LIGHT} isLocked={!!item.locked} />
              );
            })}
          </div>

          {/* PM Common */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL_MID} label="PM Common Life Tasks" sub="Select evening tasks that apply to your routine." />
            <ColumnHeader />
            {PM_COMMON.map(item => (
              <SetupRow key={item.id} item={item}
                checked={(local.pmCommonSelected || []).includes(item.id)}
                onToggle={() => togglePMCommon(item.id)}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={STEEL_LIGHT} />
            ))}
            <SectionDivider label="Write Your Own — Custom PM Items" />
            {PM_CUSTOM_IDS.map(id => {
              const hasLabel = !!(local.pmCustomLabels[id] && local.pmCustomLabels[id].trim());
              return (
                <SetupRow key={id} item={{ id, label: '', desc: '', sub: false }}
                  checked={hasLabel} onToggle={() => { if (hasLabel) setPMCust(id, ''); }}
                  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
                  labelVal={local.pmCustomLabels[id]} onLabelChange={v => setPMCust(id, v)}
                  lightColor="#eef3f8" />
              );
            })}
          </div>

          <ReorderPanel
            order={local.pmOrder} findItem={findPMItem}
            customLabels={local.pmCustomLabels} customIds={PM_CUSTOM_IDS}
            onMove={movePM} color={STEEL_DARK}
            title="Reorder PM Items — Match Your Evening Routine"
          />

          <button
            onClick={() => onSave({ ...local, setupComplete: true })}
            style={{
              width: '100%', padding: 16, borderRadius: 8, border: '1.5px solid #000',
              background: GOLD_LIGHT, color: '#000', fontWeight: 900, fontSize: 16,
              cursor: 'pointer', letterSpacing: 0.5, marginBottom: 10,
            }}
          >
            Save Setup — Enter DOP
          </button>

          {!isFirstTime && onCancel && (
            <button
              onClick={onCancel}
              style={{
                width: '100%', padding: 12, borderRadius: 8, border: `1px solid ${BORDER}`,
                background: '#fff', color: MID, fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}
            >
              Cancel — Back to Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
