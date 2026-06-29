import React from 'react';
import { GOLD, GOLD_LIGHT, DARK, BORDER } from '../utils/constants';
import { inp } from './styles';
import { RecommendedBadge } from './Shared';

export default function SetupRow({
  item, checked, onToggle,
  duration, onDurChange,
  labelVal, onLabelChange,
  lightColor, isLocked, showBadge,
  onRemove,
}) {
  const bg = lightColor || GOLD_LIGHT;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: item.sub ? '9px 14px 9px 34px' : '9px 14px',
      borderBottom: `1px solid ${BORDER}`,
      background: checked ? bg : '#fff',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {onLabelChange ? (
          <input
            type="text"
            value={labelVal || ''}
            onChange={e => onLabelChange(e.target.value)}
            placeholder="Enter item name..."
            style={{ ...inp, fontSize: 12, padding: '5px 8px' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{item.label}</span>
            {showBadge ? <RecommendedBadge /> : null}
            {item.desc ? <span style={{ fontSize: 11, color: '#aaa', marginLeft: 3 }}>— {item.desc}</span> : null}
            {isLocked ? (
              <span style={{ fontSize: 9, color: GOLD, fontWeight: 700, marginLeft: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Required</span>
            ) : null}
          </div>
        )}
      </div>
      <input
        type="number"
        min="0"
        value={duration || ''}
        onChange={e => onDurChange && onDurChange(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder="min"
        style={{
          width: 54, padding: '5px 6px', borderRadius: 4, border: `1px solid ${BORDER}`,
          fontSize: 12, textAlign: 'center', color: '#888', background: '#fafafa',
        }}
      />
      <input
        type="checkbox"
        checked={!!checked}
        onChange={onToggle}
        disabled={!!isLocked}
        style={{
          width: 20, height: 20, cursor: isLocked ? 'not-allowed' : 'pointer',
          accentColor: GOLD, flexShrink: 0, marginLeft: 8,
        }}
      />
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none', border: 'none', color: '#c0392b',
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
            padding: '0 2px', letterSpacing: 0.3, whiteSpace: 'nowrap',
          }}
        >Remove</button>
      )}
    </div>
  );
}
