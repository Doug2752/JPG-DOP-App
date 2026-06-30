import React, { useState } from 'react';
import { GOLD, GOLD_LIGHT, STEEL, STEEL_LIGHT, STEEL_MID, STEEL_DARK, BORDER, DARK, MID } from '../utils/constants';
import { AM_STANDARD, AM_COMMON, PM_STANDARD, PM_COMMON } from '../utils/constants';
import { inp, gbtn } from './styles';
import { ColumnHeader } from './Shared';
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
    const items = p.amCustomItems.map(i => i.id === id ? { ...i, label: val } : i);
    const order = p.amOrder.slice();
    if (val.trim() && !order.includes(id)) order.push(id);
    if (!val.trim()) { const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    return { ...p, amCustomItems: items, amOrder: order };
  });
  const setPMCust = (id, val) => setLocal(p => {
    const items = p.pmCustomItems.map(i => i.id === id ? { ...i, label: val } : i);
    const order = p.pmOrder.slice();
    if (val.trim() && !order.includes(id)) order.push(id);
    if (!val.trim()) { const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    return { ...p, pmCustomItems: items, pmOrder: order };
  });
  const addAMCustom = () => setLocal(p => ({
    ...p, amCustomItems: [...p.amCustomItems, { id: 'am_custom_' + Date.now(), label: '' }],
  }));
  const addPMCustom = () => setLocal(p => ({
    ...p, pmCustomItems: [...p.pmCustomItems, { id: 'pm_custom_' + Date.now(), label: '' }],
  }));
  const removeAMCustom = id => setLocal(p => ({
    ...p,
    amCustomItems: p.amCustomItems.filter(i => i.id !== id),
    amOrder: p.amOrder.filter(oid => oid !== id),
  }));
  const removePMCustom = id => setLocal(p => ({
    ...p,
    pmCustomItems: p.pmCustomItems.filter(i => i.id !== id),
    pmOrder: p.pmOrder.filter(oid => oid !== id),
  }));
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
            <div style={{
              background: '#f5f5f5', borderTop: `1px solid ${BORDER}`,
              borderBottom: `1px solid ${BORDER}`, padding: '7px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                Write Your Own — Custom AM Items
              </span>
              <button onClick={addAMCustom} style={gbtn({ padding: '3px 10px', fontSize: 10 })}>+ Add</button>
            </div>
            {local.amCustomItems.map((item, idx) => {
              const hasLabel = !!(item.label && item.label.trim());
              return (
                <SetupRow key={item.id} item={{ id: item.id, label: '', desc: '', sub: false }}
                  checked={hasLabel} onToggle={() => { if (hasLabel) setAMCust(item.id, ''); }}
                  duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                  labelVal={item.label} onLabelChange={v => setAMCust(item.id, v)}
                  lightColor="#f0f0f0"
                  onRemove={idx > 0 ? () => removeAMCustom(item.id) : null} />
              );
            })}
          </div>

          <ReorderPanel
            order={local.amOrder} findItem={findAMItem}
            customLabels={Object.fromEntries(local.amCustomItems.map(i => [i.id, i.label]))}
            customIds={local.amCustomItems.map(i => i.id)}
            onMove={moveAM} color={GOLD}
            title="Reorder AM Items — Match Your Morning Routine"
          />

          {/* PM Required */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL} label="PM Required Items" sub="PM PIT is required and cannot be removed. All sub-items are locked." />
            <ColumnHeader />
            {PM_STANDARD.map(item => {
              const isChecked = local.pmSelected.includes(item.id) || !!item.locked;
              return (
                <SetupRow key={item.id} item={item} checked={isChecked}
                  onToggle={() => { if (!item.sub && !item.locked) togglePMStd(item.id); }}
                  duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                  lightColor={STEEL_LIGHT} isLocked={!!item.locked} />
              );
            })}
          </div>

          {/* PM Recommended */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL_MID} label="PM Recommended Items" sub="Recommended items are pre-selected. Select any that apply to your evening." />
            <ColumnHeader />
            {PM_COMMON.filter(item => item.recommended).map(item => (
              <SetupRow key={item.id} item={item}
                checked={(local.pmCommonSelected || []).includes(item.id)}
                onToggle={() => togglePMCommon(item.id)}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={STEEL_LIGHT} showBadge={true} />
            ))}
          </div>

          {/* PM Common */}
          <div style={{ background: '#fff', borderRadius: 5, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL_DARK} label="PM Common Life Tasks" sub="Select additional evening tasks that apply to your routine." />
            <ColumnHeader />
            {PM_COMMON.filter(item => !item.recommended).map(item => (
              <SetupRow key={item.id} item={item}
                checked={(local.pmCommonSelected || []).includes(item.id)}
                onToggle={() => togglePMCommon(item.id)}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={STEEL_LIGHT} />
            ))}
            <div style={{
              background: '#f5f5f5', borderTop: `1px solid ${BORDER}`,
              borderBottom: `1px solid ${BORDER}`, padding: '7px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                Write Your Own — Custom PM Items
              </span>
              <button onClick={addPMCustom} style={gbtn({ padding: '3px 10px', fontSize: 10 })}>+ Add</button>
            </div>
            {local.pmCustomItems.map((item, idx) => {
              const hasLabel = !!(item.label && item.label.trim());
              return (
                <SetupRow key={item.id} item={{ id: item.id, label: '', desc: '', sub: false }}
                  checked={hasLabel} onToggle={() => { if (hasLabel) setPMCust(item.id, ''); }}
                  duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                  labelVal={item.label} onLabelChange={v => setPMCust(item.id, v)}
                  lightColor="#eef3f8"
                  onRemove={idx > 0 ? () => removePMCustom(item.id) : null} />
              );
            })}
          </div>

          <ReorderPanel
            order={local.pmOrder} findItem={findPMItem}
            customLabels={Object.fromEntries(local.pmCustomItems.map(i => [i.id, i.label]))}
            customIds={local.pmCustomItems.map(i => i.id)}
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
