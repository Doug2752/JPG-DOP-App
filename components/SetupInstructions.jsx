import React from 'react';
import { GOLD, BORDER } from '../utils/constants';

const SECTIONS = [
  { h: 'AM Required Items', b: 'PIT is required and cannot be removed. All sub-categories are locked: Thankful For, To Accomplish, N-I-T, Daily Devotional, and Daily Book Study.' },
  { h: 'AM Common Life Tasks', b: 'These are optional items that many people include in their morning routine. Recommended items are pre-selected. Toggle any on or off.' },
  { h: 'Custom AM Items', b: 'Write up to 5 of your own AM checklist items. Type a name — it will appear in your daily checklist.' },
  { h: 'Reorder AM Items', b: 'Arrange your selected AM items in the exact order you complete them each morning. Use the arrows to move items up or down.' },
  { h: 'PM Required Items', b: 'PM PIT, Prep for Tomorrow, and Evening Meal are required. PM PIT is your nightly close-out — brief, honest, and consistent.' },
  { h: 'PM Common Life Tasks', b: 'Select evening tasks that apply to your personal routine.' },
  { h: 'Custom PM Items', b: 'Write up to 5 of your own PM checklist items.' },
  { h: 'Reorder PM Items', b: 'Arrange your selected PM items in the order you complete them each evening.' },
  { h: 'Target Bedtime', b: 'Set your target bedtime once. It will appear on your Bed item each day as your personal standard.' },
];

export default function SetupInstructions({ open, onToggle }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 16, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '13px 18px', background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 13, color: GOLD, letterSpacing: 1, textTransform: 'uppercase' }}>
          Setup Instructions
        </span>
        <span style={{ fontSize: 18, color: GOLD, fontWeight: 700 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px' }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 12, color: '#333', marginBottom: 3 }}>{s.h}</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{s.b}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
