import React from 'react';
import { GOLD } from '../utils/constants';

const SECTIONS = [
  { h: 'What is the DOP?', b: 'The Daily Operational Process is your external execution system. PIT builds your internal foundation each morning. The DOP channels that foundation into structured, disciplined action throughout the day. Together they form one unified performance system.' },
  { h: 'No Phone Until PIT Is Complete', b: 'Your phone stays down until PIT is finished each morning. Research has shown that waking up quietly with a clear mind and investing in yourself first is one of the most effective paths to daily productivity. It also sets the stage for noise reduction, cognitive capacity, and a disciplined mindset. Resist the urge to reach for your phone immediately after waking. Prioritize yourself, your health, and your mental clarity. If you commit to this, you will often find yourself entering a state of flow while completing PIT — offloading stress and arriving at the day sharp and ready.' },
  { h: 'Morning Evaluation (1–10)', b: 'Tap your score before you begin the AM checklist. This is how you feel when you wake up — honest and raw. Over time this data reveals patterns in sleep, recovery, and consistency.' },
  { h: 'AM Checklist', b: 'Work through each item in your personal order. Tap the checkbox on the right to mark it complete. PIT is required and cannot be removed.' },
  { h: "Today's Takeaway", b: 'A new quote appears at the end of your AM block every day. Read it before you move on. Centered on discipline, time, and growth.' },
  { h: 'Evening Evaluation (1–10)', b: 'Tap your score at the top of the PM block. This is your overall day rating. Combined with your Morning Evaluation, it creates your daily performance picture over time.' },
  { h: 'PM PIT', b: 'PM PIT is your nightly investment in self-awareness. Log your Day Evaluation score, note what went well, and note what to improve. This closes the loop on the day — honest, brief, and consistent.' },
  { h: "Tomorrow's Priorities", b: "Lock in your One Thing for tomorrow before you close the day. This single action — written the night before — is one of the most effective performance habits you can build. The appointments section is optional and supplementary." },
  { h: 'Never Twice', b: 'Miss one day — never miss the second. One missed day is an interruption. Two is a pattern.' },
];

export default function FormInstructionsModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
      zIndex: 1000, display: 'flex', alignItems: 'flex-start',
      justifyContent: 'center', padding: '20px 16px', overflowY: 'auto',
    }}>
      <div style={{ background: '#fff', borderRadius: 10, width: '100%', maxWidth: 560, boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
        <div style={{
          background: GOLD, borderRadius: '10px 10px 0 0', padding: '16px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 15 }}>DOP Instructions</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>How to use the Daily Operational Process</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', fontWeight: 700 }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px', maxHeight: '68vh', overflowY: 'auto' }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: '#222', marginBottom: 5 }}>{s.h}</div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{s.b}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid #eee', textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{ background: GOLD, border: 'none', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: '9px 24px', borderRadius: 6 }}
          >Got It</button>
        </div>
      </div>
    </div>
  );
}
