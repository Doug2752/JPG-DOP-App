# DOP — Duration Field Investigation

---

## Question 1: Does anything in SetupScreen.jsx or SetupRow.jsx read or display a duration value back to the user anywhere besides the input box itself?

**Answer: No. Duration is only ever used as the `value` of an `<input>` element in SetupRow. It is never rendered as text, a label, a total, or in any other display context within Setup.**

---

### SetupRow.jsx — the only rendering of `duration` in Setup (lines 40–49)

```jsx
<input
  type="text"
  value={duration || ''}
  onChange={e => onDurChange && onDurChange(e.target.value)}
  placeholder="min"
  style={{
    width: 54, padding: '5px 6px', borderRadius: 4, border: `1px solid ${BORDER}`,
    fontSize: 12, textAlign: 'center', color: '#888', background: '#fafafa',
  }}
/>
```

`duration` appears in SetupRow only here — as `value` of a free-text input. Nothing else in the component reads or displays it.

---

### SetupScreen.jsx — how durations flow into SetupRow

**State update function (line 32):**
```jsx
const setDur = (id, val) => setLocal(p => ({ ...p, durations: { ...p.durations, [id]: val } }));
```

**Every SetupRow call passes `local.durations[item.id]` as the `duration` prop:**

AM Required (line 134):
```jsx
<SetupRow key={item.id} item={item} checked={true} onToggle={() => {}}
  duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
  lightColor={GOLD_LIGHT} isLocked={true} />
```

AM Common (line 147):
```jsx
<SetupRow key={item.id} item={item}
  checked={local.amCommonSelected.includes(item.id)}
  onToggle={() => toggleAMCommon(item.id)}
  duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
  lightColor={GOLD_LIGHT} showBadge={!!item.recommended} />
```

AM Custom (line 156):
```jsx
<SetupRow key={id} item={{ id, label: '', desc: '', sub: false }}
  checked={hasLabel} onToggle={() => { if (hasLabel) setAMCust(id, ''); }}
  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
  labelVal={local.amCustomLabels[id]} onLabelChange={v => setAMCust(id, v)}
  lightColor="#f0f0f0" />
```

PM Required — special case for `pm_bed` (line 179):
```jsx
<SetupRow key={item.id} item={item} checked={isChecked}
  onToggle={() => { if (!item.sub && !item.locked) togglePMStd(item.id); }}
  duration={item.id === 'pm_bed' ? local.bedtime || '' : local.durations[item.id]}
  onDurChange={item.id === 'pm_bed' ? null : v => setDur(item.id, v)}
  lightColor={STEEL_LIGHT} isLocked={!!item.locked} />
```
*(Note: for `pm_bed`, the `duration` slot shows `local.bedtime` instead of a duration value. The `onDurChange` is `null`, making the input read-only there. This is purely cosmetic — the bedtime string is already stored separately as `setup.bedtime`.)*

PM Common (line 194):
```jsx
<SetupRow key={item.id} item={item}
  checked={(local.pmCommonSelected || []).includes(item.id)}
  onToggle={() => togglePMCommon(item.id)}
  duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
  lightColor={STEEL_LIGHT} />
```

PM Custom (line 203):
```jsx
<SetupRow key={id} item={{ id, label: '', desc: '', sub: false }}
  checked={hasLabel} onToggle={() => { if (hasLabel) setPMCust(id, ''); }}
  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
  labelVal={local.pmCustomLabels[id]} onLabelChange={v => setPMCust(id, v)}
  lightColor="#eef3f8" />
```

**In every case the prop goes only to the `<input value={duration || ''}>` in SetupRow. No summary, total, or derived display exists in SetupScreen.**

---

## Question 2: Is the durations object referenced in AMBlock.jsx, PMBlock.jsx, ArchiveView.jsx, or ai.js?

**Answer: Yes in AMBlock and PMBlock (passed to CheckRow as a display prop). No in ArchiveView and ai.js.**

---

### AMBlock.jsx — duration reference (line 76–78)

```jsx
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
```

This is inside the `allAMRows.map(item => { ... })` loop. The PIT row is rendered separately with a custom block (no duration shown there); all other AM rows go through `CheckRow` with `setup.durations[item.id]` passed in.

---

### PMBlock.jsx — duration reference (line 61–69)

```jsx
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
```

Same pattern — inside `allPMRows.map(item => { ... })`, after special-casing `pm_good`, `pm_bad`, and `pm_eval`.

---

### ArchiveView.jsx — no duration reference

The entire file:
```jsx
import React from 'react';
import { GOLD, DARK, BORDER, BG } from '../utils/constants';
import { fmtDate } from '../utils/date';

export default function ArchiveView({ archiveDates, loadArchive }) {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 16px 60px' }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: '18px 20px', border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: DARK, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
          Archive — Last 30 Days
        </div>
        {archiveDates.length === 0 ? (
          <div style={{ color: '#999', fontSize: 13 }}>No archived days yet.</div>
        ) : (
          archiveDates
            .slice()
            .sort((a, b) => a > b ? -1 : 1)
            .slice(0, 30)
            .map(d => (
              <button
                key={d}
                onClick={() => loadArchive(d)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 14px', borderRadius: 6, border: `1px solid ${BORDER}`,
                  background: '#fff', marginBottom: 8, cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, color: DARK,
                }}
              >
                {fmtDate(d)}
              </button>
            ))
        )}
      </div>
    </div>
  );
}
```

No reference to `duration`, `durations`, or `setup` anywhere.

---

### ai.js — no duration reference

The entire file:
```js
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

async function callAnthropic(prompt, maxTokens = 200) {
  const headers = {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };
  const resp = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const data = await resp.json();
  return data.content?.[0]?.text || '';
}

export async function fetchDailyQuote() {
  const raw = await callAnthropic(
    'Give me one short inspirational quote centered on discipline, protecting your time, or personal growth. Respond with only valid JSON, no markdown: {"text": "quote here", "author": "Author Name"}'
  );
  const q = JSON.parse(raw.replace(/```json|```/g, '').trim());
  if (!q.text || !q.author) throw new Error('Invalid quote response');
  return q;
}
```

No reference to `duration`, `durations`, or `setup` anywhere.

---

## Question 3: Is there any calculation, sum, comparison, or validation anywhere in the codebase that uses duration values?

**Answer: No. There is zero arithmetic, aggregation, or comparison involving duration values anywhere in the codebase.**

The complete grep results for `duration` across all `.js` and `.jsx` files:

```
components\AMBlock.jsx:76:              duration={setup.durations[item.id]}
components\SetupScreen.jsx:32:  const setDur = (id, val) => setLocal(p => ({ ...p, durations: { ...p.durations, [id]: val } }));
components\SetupScreen.jsx:134:                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
components\SetupScreen.jsx:147:                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
components\SetupScreen.jsx:156:                  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
components\SetupScreen.jsx:179:                  duration={item.id === 'pm_bed' ? local.bedtime || '' : local.durations[item.id]}
components\SetupScreen.jsx:194:                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
components\SetupScreen.jsx:203:                  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
components\PMBlock.jsx:66:            duration={setup.durations[item.id]}
components\SetupRow.jsx:8:  duration, onDurChange,
components\SetupRow.jsx:42:        value={duration || ''}
components\Shared.jsx:38:export function CheckRow({ item, checked, onToggle, duration, blockColor }) {
components\Shared.jsx:64:      {duration ? (
components\Shared.jsx:66:          {duration}
utils\form.js:14:export function defaultDurations() {
utils\form.js:33:    durations: defaultDurations(),
```

Every reference is either:
- A prop pass-through (`duration={...}`)
- A destructure in a function signature (`duration, onDurChange`)
- A controlled input value (`value={duration || ''}`)
- A conditional render of the raw string (`{duration ? <span>{duration}</span> : null}`)
- The `defaultDurations()` initializer in `form.js`

No `.reduce()`, no `+`, no `-`, no `*`, no `Math.*`, no `parseInt`, no `parseFloat`, no `Number()`, no accumulator — anywhere.

---

### How CheckRow renders duration in the daily form (Shared.jsx lines 64–68)

```jsx
{duration ? (
  <span style={{ fontSize: 11, color: checked ? '#7a5c00' : '#aaa', whiteSpace: 'nowrap', minWidth: 36, textAlign: 'right' }}>
    {duration}
  </span>
) : null}
```

If a duration string is truthy, it renders as a small read-only label to the right of the item's title (before the checkbox button). It is simply printed as-is — whatever string the user typed (e.g., `"30"`). Nothing derives from it.

---

## Question 4: Is the durations object actually persisted to localStorage as part of setup, or does it reset on reload?

**Answer: Yes — durations ARE persisted. The entire `setup` object is serialized and saved on every setup save, and fully reloaded on login.**

---

### Save path — DOPApp.jsx lines 141–145

```js
async function saveSetup(s) {
  setSetup(s);
  try { await storage.set(sk + 'setup', JSON.stringify(s)); } catch (_) {}
  setView('form');
}
```

`s` is the full local setup object from `SetupScreen`, which includes `s.durations`. `JSON.stringify(s)` serializes the entire object — durations included — and writes it to the key `{user}_dop7_setup`.

---

### Load path — DOPApp.jsx lines 57–59 (inside the `useEffect` on login)

```js
const sv = await storage.get(sk + 'setup');
if (sv && sv.value) setSetup(JSON.parse(sv.value));
```

On login, `JSON.parse(sv.value)` restores the full saved setup object including `durations`, which then flows through as `setup.durations` to AMBlock, PMBlock, and SetupScreen.

---

### storage.js — the underlying store

```js
function getStore() {
  if (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function') {
    return window.storage;
  }
  const mem = {};
  return {
    get: k => Promise.resolve(mem[k] !== undefined ? { key: k, value: mem[k] } : null),
    set: (k, v) => { mem[k] = v; return Promise.resolve({ key: k, value: v }); },
    delete: k => { delete mem[k]; return Promise.resolve({ key: k, deleted: true }); },
    list: p => {
      const ks = Object.keys(mem).filter(k => !p || k.startsWith(p));
      return Promise.resolve({ keys: ks });
    },
  };
}

export const storage = getStore();
```

The store prefers `window.storage` (a browser-provided persistent store) and falls back to an in-memory object. In the browser environment this app is deployed to, `window.storage` is expected to provide actual persistence (not the in-memory fallback). The data survives reloads as long as `window.storage` is available.

---

## Summary

| Question | Finding |
|----------|---------|
| Displayed beyond the input box in Setup? | **No** — only ever `value` of `<input>` in SetupRow |
| Displayed in daily form (AMBlock/PMBlock)? | **Yes** — `CheckRow` renders it as a small read-only inline label next to each item; no interactivity |
| Referenced in ArchiveView? | **No** |
| Referenced in ai.js? | **No** |
| Any math / totals / comparisons? | **No** — zero arithmetic anywhere in the codebase |
| Persisted to localStorage? | **Yes** — serialized inside the full `setup` object at `{user}_dop7_setup`, restored on login |
