import React from 'react';
import { GOLD, DARK, BORDER } from '../utils/constants';
import { RecommendedBadge } from './Shared';

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

  if (allItems.length === 0) return null;

  return (
    <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
      <div style={{ background: c, padding: '11px 16px' }}>
        <div style={{ color: '#fff', fontWeight: 900, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          {title || 'Reorder Items'}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>
          Use ▲ ▼ to arrange in the order of your daily routine
        </div>
      </div>
      {allItems.map((item, idx) => (
        <div
          key={item.id}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: `1px solid ${BORDER}` }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <button
              onClick={() => onMove(idx, -1)}
              disabled={idx === 0}
              style={{
                width: 28, height: 22, border: `1px solid ${BORDER}`, borderRadius: 4,
                background: idx === 0 ? '#f5f5f5' : '#fff',
                cursor: idx === 0 ? 'not-allowed' : 'pointer',
                fontSize: 12, color: idx === 0 ? '#ccc' : c, fontWeight: 700, padding: 0,
              }}
            >▲</button>
            <button
              onClick={() => onMove(idx, 1)}
              disabled={idx === allItems.length - 1}
              style={{
                width: 28, height: 22, border: `1px solid ${BORDER}`, borderRadius: 4,
                background: idx === allItems.length - 1 ? '#f5f5f5' : '#fff',
                cursor: idx === allItems.length - 1 ? 'not-allowed' : 'pointer',
                fontSize: 12, color: idx === allItems.length - 1 ? '#ccc' : c, fontWeight: 700, padding: 0,
              }}
            >▼</button>
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{item.label}</span>
            {item.recommended ? <RecommendedBadge /> : null}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#ccc', minWidth: 22, textAlign: 'center' }}>
            {idx + 1}
          </span>
        </div>
      ))}
    </div>
  );
}
