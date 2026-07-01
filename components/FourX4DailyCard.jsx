import React from 'react';
import { GOLD, BORDER } from '../utils/constants';
const SHADOW = '0 1px 4px rgba(0,0,0,0.06)';
export default function FourX4DailyCard({
  protocols, form, saveForm,
}) {
  const checks = form.fourX4Checks || {};
  const checkedCount = protocols.filter(
    p => !!checks[p.id]
  ).length;
  const total = protocols.length;
  const allDone =
    checkedCount === total && total > 0;
  function toggle(id) {
    const next = { ...checks, [id]: !checks[id] };
    saveForm({ ...form, fourX4Checks: next });
  }
  return (
    <div style={{
      background: 'white',
      borderRadius: 5,
      border: '1px solid ' + BORDER,
      marginBottom: 14,
      overflow: 'hidden',
      boxShadow: SHADOW,
    }}>
      <div style={{
        background: '#111',
        padding: '12px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          color: '#fff',
          fontWeight: 900,
          fontSize: 15,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>4x4 Matrix<span style={{
          fontSize: 10,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          marginLeft: 10,
        }}>Your Added Program Actions</span></span>
        <span style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 11,
        }}>{checkedCount} / {total} done</span>
      </div>
      <div style={{ padding: '4px 0' }}>
        {protocols.map((p, i) => {
          const checked = !!checks[p.id];
          const isLast = i === protocols.length-1;
          const coreLabel =
            p.foundation_core.replace(/_/g, ' ');
          const todLabel =
            p.time_of_day === 'both'
              ? 'AM + PM'
              : p.time_of_day.toUpperCase();
          return (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                borderBottom: isLast
                  ? 'none'
                  : '1px solid #f0f0f0',
              }}
            >
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0 4px',
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#222',
                }}>{p.name}</span>
                <span style={{
                  fontSize: 13,
                  color: '#999',
                  fontWeight: 400,
                  marginLeft: 4,
                  textTransform: 'capitalize',
                }}>{'— '}{coreLabel}</span>
                <span style={{
                  marginLeft: 8,
                  background: '#f0f0f0',
                  color: '#555',
                  fontSize: 10,
                  padding: '1px 6px',
                  borderRadius: 8,
                  textTransform: 'uppercase',
                }}>{todLabel}</span>
              </div>
              <button
                onClick={() => toggle(p.id)}
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  borderRadius: 4,
                  border: checked
                    ? '1.5px solid ' + GOLD
                    : '1.5px solid #ccc',
                  background: checked
                    ? GOLD : 'white',
                  color: '#000',
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  marginLeft: 12,
                }}
              >{checked ? '✓' : ''}</button>
            </div>
          );
        })}
        {allDone && (
          <div style={{
            color: GOLD,
            fontSize: 12,
            fontWeight: 700,
            textAlign: 'center',
            padding: '8px 0 12px',
          }}>4x4 complete for today</div>
        )}
      </div>
    </div>
  );
}
