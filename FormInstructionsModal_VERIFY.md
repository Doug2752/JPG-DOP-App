```jsx
import React from 'react';
import { GOLD, DARK, MID } from '../utils/constants';

const SECTIONS = [
  { h: 'What is the DOP?', b: 'The Daily Operational Process is your external execution system. PIT builds your internal foundation each morning. The DOP channels that foundation into structured, disciplined action throughout the day. Together they form one unified performance system.' },
  { h: 'No Phone Until PIT Is Complete', b: 'Your phone stays down until PIT is finished each morning. Research has shown that waking up quietly with a clear mind and investing in yourself first is one of the most effective paths to daily productivity. It sets the stage for noise reduction, cognitive capacity, and disciplined mindset. Resist the urge to reach for your phone immediately after waking. Prioritize yourself, your health, and your mental clarity. If you commit to this, you will often find yourself entering a state of flow while completing PIT — offloading stress and arriving at the day sharp and ready.' },
  { h: 'Morning Evaluation (1–10)', b: 'Tap your score before you begin the AM checklist. This is how you feel when you wake up — honest and raw. Over time this data reveals patterns in sleep, recovery, and consistency.' },
  { h: 'AM Checklist', b: 'Work through each item in your personal order. Tap the checkbox on the right to mark it complete. PIT is required and cannot be removed.' },
  { h: "Today's Takeaway", b: 'A new quote appears at the end of your AM block every day. Read it before you move on. Centered on discipline, time, and growth.' },
  { h: 'Evening Evaluation (1–10)', b: 'Tap your score at the top of the PM block. This is your overall day rating. Combined with your Morning Evaluation, it creates your daily performance picture over time.' },
  { h: 'PM PIT', b: 'PM PIT is your nightly investment in self-awareness. Log your Day Evaluation score, note what went well, and note what to improve. This closes the loop on the day — honest, brief, and consistent.' },
  { h: "Tomorrow's Priorities", b: "Lock in your One Thing for tomorrow before you close the day. This single action — written the night before — is one of the most effective performance habits you can build. The appointments section is optional and supplementary." },
  { h: 'Never Twice', b: 'Miss one day — never miss the second. One missed day is an interruption. Two is a pattern.' },
];

export default function FormInstructionsModal({ onClose }) {
  const tTitle  = { fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 3 };
  const tBody   = { fontSize: 12, color: MID, lineHeight: 1.7 };
  const topItem = { marginBottom: 10, display: 'flex', alignItems: 'flex-start' };
  const bul     = { color: GOLD, fontWeight: 700, minWidth: 14, flexShrink: 0 };

  return (
    <div style={{ background: '#E0E0E0', border: `2px solid ${GOLD}`, borderRadius: 8, padding: '18px 20px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative' }}>
      <div style={{ fontWeight: 800, fontSize: 13, color: DARK, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, paddingBottom: 8, borderBottom: `2px solid ${GOLD}` }}>
        DOP — Set-Up and Instructions
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 14, right: 16, background: 'transparent', border: 'none', fontSize: 16, cursor: 'pointer', color: DARK, fontWeight: 700, lineHeight: 1, padding: 0 }}
          aria-label="Close"
        >
          ✕
        </button>
      )}

      {SECTIONS.map((s, i) => (
        <div key={i} style={topItem}>
          <span style={bul}>•</span>
          <div style={{ flex: 1 }}>
            <div style={tTitle}>{s.h}</div>
            <div style={tBody}>{s.b}</div>
          </div>
        </div>
      ))}

      <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.07)', borderRadius: 4, fontSize: 11, color: MID, fontStyle: 'italic', lineHeight: 1.6 }}>
        <strong style={{ fontStyle: 'normal' }}>NOTES:</strong>
        <ol style={{ margin: '4px 0 0 0', paddingLeft: 20 }}>
          <li style={{ marginBottom: 4 }}>The Setup screen is the one exception — you must click 'Save Setup — Enter DOP' to save your configuration there.</li>
          <li>Everything you enter in your daily AM/PM form saves automatically as you go — there is no Save button on the Today screen.</li>
        </ol>
      </div>
    </div>
  );
}
```
