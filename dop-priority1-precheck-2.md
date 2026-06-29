# DOP Priority 1 Pre-Check 2

---

## components/Shared.jsx

```jsx
import React from 'react';
import { GOLD, GOLD_LIGHT, STEEL, DARK, BORDER } from '../utils/constants';
import { PIT_URL } from '../utils/constants';

export function RecommendedBadge() {
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, color: '#fff', background: GOLD,
      borderRadius: 3, padding: '1px 5px', marginLeft: 5,
      textTransform: 'uppercase', letterSpacing: 0.5,
    }}>
      Recommended
    </span>
  );
}

export function TapScore({ value, onChange, color }) {
  const c = color || GOLD;
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {[1,2,3,4,5,6,7,8,9,10].map(n => (
        <button
          key={n}
          onClick={() => onChange(value === n ? null : n)}
          style={{
            width: 40, height: 40, borderRadius: 6,
            border: `2px solid ${value === n ? c : BORDER}`,
            background: value === n ? c : '#fff',
            color: value === n ? '#fff' : DARK,
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}
        >{n}</button>
      ))}
    </div>
  );
}

export function CheckRow({ item, checked, onToggle, duration, blockColor }) {
  const bc = blockColor || GOLD;
  const isSteel = bc === STEEL;
  const bg = checked ? (isSteel ? '#e8eff7' : GOLD_LIGHT) : 'transparent';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: item.sub ? '9px 14px 9px 36px' : '10px 14px',
      borderBottom: `1px solid ${BORDER}`,
      background: bg, transition: 'background 0.15s',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: checked ? bc : DARK }}>
          {item.label || ''}
        </span>
        {item.desc ? (
          <span style={{ color: checked ? '#7a5c00' : '#999', fontSize: 11, marginLeft: 6 }}>
            — {item.desc}
          </span>
        ) : null}
        {item.locked ? (
          <span style={{ fontSize: 9, color: GOLD, fontWeight: 700, marginLeft: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
            Required
          </span>
        ) : null}
      </div>
      {duration ? (
        <span style={{ fontSize: 11, color: checked ? '#7a5c00' : '#aaa', whiteSpace: 'nowrap', minWidth: 36, textAlign: 'right' }}>
          {duration}
        </span>
      ) : null}
      <button
        onClick={onToggle}
        style={{
          width: 36, height: 36, borderRadius: 6,
          border: `2px solid ${checked ? bc : BORDER}`,
          background: checked ? bc : '#fff',
          color: checked ? '#fff' : '#ccc',
          cursor: 'pointer', fontSize: 17, fontWeight: 900,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >{checked ? '✓' : ''}</button>
    </div>
  );
}

export function PITButton() {
  return (
    <a
      href={PIT_URL}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        background: '#111', border: `2px solid ${GOLD}`, borderRadius: 8,
        padding: '14px 20px', textDecoration: 'none', marginBottom: 14, cursor: 'pointer',
      }}
    >
      <span style={{ color: '#fff', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>Open</span>
      <span style={{ color: GOLD, fontWeight: 900, fontSize: 20, letterSpacing: 4 }}>PIT</span>
      <span style={{ color: '#aaa', fontSize: 11, letterSpacing: 1 }}>Personal Investment Time</span>
      <span style={{ color: GOLD, fontSize: 18, fontWeight: 900 }}>↗</span>
    </a>
  );
}

export function QuoteBox({ quote }) {
  if (!quote) return null;
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: 8, padding: '16px 20px',
      border: `1px solid ${GOLD}`, textAlign: 'center',
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Today's Takeaway
      </div>
      <div style={{ fontSize: 14, color: '#fff', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 8 }}>
        "{quote.text}"
      </div>
      <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
        — {quote.author}
      </div>
    </div>
  );
}

export function SectionDivider({ label }) {
  return (
    <div style={{
      background: '#f5f5f5', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
      padding: '7px 14px',
    }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1.5 }}>
        {label}
      </span>
    </div>
  );
}

export function ColumnHeader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px',
      background: '#fafafa', borderBottom: `1px solid ${BORDER}`,
    }}>
      <div style={{ flex: 1, fontSize: 9, fontWeight: 800, color: '#bbb', textTransform: 'uppercase', letterSpacing: 1 }}>Item</div>
      <div style={{ width: 54, fontSize: 9, fontWeight: 800, color: '#bbb', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>Min</div>
      <div style={{ width: 28, fontSize: 9, fontWeight: 800, color: '#bbb', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', marginLeft: 8 }}>On</div>
    </div>
  );
}
```
