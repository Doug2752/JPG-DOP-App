# Custom Items Investigation Report

Investigation of `amCustomLabels`, `pmCustomLabels`, `AM_CUSTOM_IDS`, `PM_CUSTOM_IDS`,
and related custom/write-your-own item code across the DOP App codebase.

---

## Part 1 — AMBlock.jsx: Custom Item References

**Zero direct references.** `AMBlock.jsx` does not import or reference `amCustomLabels`,
`AM_CUSTOM_IDS`, or anything custom-item-specific. It receives `allAMRows` already built
by `DOPApp.jsx` and maps over it blindly — custom items arrive as plain objects
`{ id, label, sub: false }`, indistinguishable from standard items at this layer.

The only relevant code is the generic row renderer (`AMBlock.jsx:38–88`):

```jsx
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
```

Custom items fall through to the `<CheckRow>` branch with no special handling.

---

## Part 2 — PMBlock.jsx: Custom Item References

**Zero direct references.** Same pattern as AMBlock. Receives `allPMRows` pre-built by
`DOPApp.jsx`, maps over it generically. Custom items are already plain objects in that
array — PMBlock has no knowledge they are custom.

The generic row renderer (`PMBlock.jsx:30–70`):

```jsx
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
```

---

## Part 3 — All Other Files Referencing Custom Item Symbols

Files searched: `components/`, `app/`, `utils/`. Excluded the already-documented
`SetupScreen.jsx`, `utils/constants.js`, and `utils/form.js`.

### `app/DOPApp.jsx`

**Line 3–7** — imports:

```js
import {
  AM_STANDARD, AM_COMMON, AM_CUSTOM_IDS, AM_SUB_IDS,
  PM_STANDARD, PM_COMMON, PM_CUSTOM_IDS, PM_SUB_IDS,
  BACKUP_QUOTES,
} from '../utils/constants';
```

**Lines 177–195** — AM row builder (only runtime read of `amCustomLabels`):

```js
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
```

**Lines 197–221** — PM row builder (only runtime read of `pmCustomLabels`):

```js
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
```

### `components/ReorderPanel.jsx`

**Line 5** — receives `customLabels` and `customIds` as props (passed from `SetupScreen.jsx`).
**Line 11** — the only place `customIds` is consumed:

```js
export default function ReorderPanel({ order, findItem, customLabels, customIds, onMove, color, title }) {
  const c = color || GOLD;
  const allItems = order
    .map(id => {
      const item = findItem(id);
      if (item) return item;
      if (customIds && customIds.includes(id)) return { id, label: customLabels?.[id] || '', custom: true };
      return { id, label: id };
    })
    .filter(i => i && i.label && i.label.trim());
```

No other files (`AMBlock.jsx`, `PMBlock.jsx`, `Header.jsx`, `Shared.jsx`,
`SetupRow.jsx`, `BrandBar.jsx`, `ArchiveView.jsx`, `LoginScreen.jsx`,
`FormInstructionsModal.jsx`, `SetupInstructions.jsx`) reference any custom item symbol.

---

## Part 4 — Done-Count Calculation

Custom items are **fully included** in the done-count and total-items count.

`DOPApp.jsx:223–229`:

```js
const amDone = allAMRows.filter(i => form.amChecks?.[i.id]).length;
const pmDone = allPMRows.filter(i => form.pmChecks?.[i.id]).length;
const totalDone = amDone + pmDone + (form.morningEval !== null ? 1 : 0)
                                   + (form.eveningEval !== null ? 1 : 0);
const totalItems = allAMRows.length + allPMRows.length + 2;
const complete = isDayComplete(form);
const isToday = !archiveDate || archiveDate === todayStr();
const progressLabel = complete ? 'Day Complete' : `${totalDone} / ${totalItems}`;
```

Because custom items with non-empty labels are pushed into `allAMRows` / `allPMRows`
during the row-builder loops (Part 3 above), they contribute to:

- `amDone` / `pmDone` — numerator (checked custom items count as done)
- `totalItems` — denominator (every filled-in custom item adds 1)
- The `X / Y done` header badge in `AMBlock.jsx:35` (`{amDone} / {allAMRows.length} done`)
- The `X / Y done` header badge in `PMBlock.jsx:15` (`{pmDone} / {allPMRows.length} done`)

An unfilled custom slot (empty label) is excluded from `allAMRows`/`allPMRows` at
build time and therefore never counted in any total.

---

## Touch-Point Summary

| File | Role |
|---|---|
| `utils/constants.js` | Defines `AM_CUSTOM_IDS`, `PM_CUSTOM_IDS` ID arrays |
| `utils/form.js` | `defaultCustomLabels()` seeds the `{ am_c1: '', ... }` shape; `defaultDurations()` seeds duration slots for custom IDs |
| `app/DOPApp.jsx` | Reads `amCustomLabels`/`pmCustomLabels` to build `allAMRows`/`allPMRows`; imports `AM_CUSTOM_IDS`/`PM_CUSTOM_IDS` |
| `components/SetupScreen.jsx` | Reads + writes `amCustomLabels`/`pmCustomLabels`; maps `AM_CUSTOM_IDS`/`PM_CUSTOM_IDS` to render input rows |
| `components/ReorderPanel.jsx` | Reads `customLabels` + `customIds` props (passed from SetupScreen) |
| `components/AMBlock.jsx` | **No direct access** — sees pre-built rows only |
| `components/PMBlock.jsx` | **No direct access** — sees pre-built rows only |
