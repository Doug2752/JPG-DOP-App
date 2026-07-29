import React from 'react';
import { GOLD, GOLD_LIGHT, STEEL, DARK, BORDER } from '../utils/constants';
import { PIT_URL } from '../utils/constants';

export function RecommendedBadge() {
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, color: '#000', background: GOLD,
      borderRadius: 3, padding: '1px 5px', marginLeft: 5,
      textTransform: 'uppercase', letterSpacing: 0.5,
      border: '1.5px solid #000',
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
        {item.graduated_from_4x4 ? (
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#000', background: GOLD,
            border: '1.5px solid #000', borderRadius: 5, padding: '2px 8px',
            marginLeft: 8, letterSpacing: 0.5, textTransform: 'uppercase',
          }}>
            4x4 Graduate
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

export function PITButton({ userId }) {
  return (
    <a
      href={userId ? `${PIT_URL}?hub_user=${userId}` : PIT_URL}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: GOLD_LIGHT, border: '1.5px solid #000', borderRadius: 5,
        padding: '5px 14px', width: '100%', textDecoration: 'none', marginBottom: 14, cursor: 'pointer',
      }}
    >
      <span style={{ color: '#000', fontWeight: 900, fontSize: 15, letterSpacing: 1 }}>
        Open Personal Investment Time (PIT)
      </span>
    </a>
  );
}

export function QuoteBox({ quote }) {
  if (!quote) return null;
  return (
    <div style={{
      background: '#ede4cf', borderRadius: 5, padding: '16px 20px',
      border: `1px solid ${GOLD}`, textAlign: 'center', width: '100%',
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Today's Takeaway
      </div>
      <div style={{ fontSize: 14, color: '#222', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 8 }}>
        "{quote.text}"
      </div>
      <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
        — {quote.author}
      </div>
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
