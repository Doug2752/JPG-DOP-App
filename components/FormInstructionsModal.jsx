import React from 'react';
import { GOLD, DARK, MID } from '../utils/constants';

const tTitle  = { fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 3 };
const tBody   = { fontSize: 12, color: MID, lineHeight: 1.7 };
const topItem = { marginBottom: 10, display: 'flex', alignItems: 'flex-start' };
const bul     = { color: GOLD, fontWeight: 700, minWidth: 14, flexShrink: 0 };

const SECTIONS = [
  {
    h: 'What is the DOP?',
    b: (
      <>
        <div style={{ ...tBody, marginBottom: 6 }}>The Daily Operational Process is your external execution system. PIT builds your internal foundation each morning. The DOP channels that foundation into structured, disciplined action throughout the day. Together they form one unified performance system.</div>
        <div style={{ ...tTitle, marginTop: 8, marginBottom: 3 }}>A Note on PIT</div>
        <div style={{ ...tBody, marginBottom: 6 }}>Within DOP, you'll see the term "PIT" appear in both your AM and PM sections. This isn't a separate task — it's a check-off confirming that your PIT (Personal Investment Time) work was completed.</div>
        <div style={{ ...tBody, marginBottom: 6 }}>The real work happens in the PIT spoke of the app, typically in the morning. DOP simply verifies that it was done. There's no separate PM PIT to complete on its own — instead, the PM side includes a quick evening evaluation along with a short "what went well" and "what to improve" section.</div>
        <div style={tBody}>For more detail on PIT and what it covers, see the Education spoke and the full guides for each foundation.</div>
      </>
    ),
  },
  {
    h: 'Configuring Your DOP',
    b: (
      <>
        <div style={{ ...tBody, marginBottom: 6 }}>Initially, you have to configure the DOP app. It's completely customizable to you and your activities. When you configure DOP, include every topic or action you do throughout the week — even ones you don't do every single day. Items can vary on weekends or non-work days, but build your DOP with all of these components included from the start. Part of the value of DOP is spotting trends over time, and that's only possible when actions are tracked consistently on the days they actually happen.</div>
        <div style={{ ...tBody, marginBottom: 4 }}>Each AM and PM section has three groups of items:</div>
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}><span style={bul}>•</span><span style={tBody}><strong>Required</strong> — these are locked in automatically and always included. They can't be unchecked.</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}><span style={bul}>•</span><span style={tBody}><strong>Recommended</strong> — these are checked by default, but you can uncheck any of them if they don't apply to you.</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}><span style={bul}>•</span><span style={tBody}><strong>Common Life Tasks (All Other)</strong> — everything else, available to add as you see fit. You can also write in your own custom items if something isn't already listed.</span></div>
        </div>
        <div style={{ ...tTitle, marginTop: 8, marginBottom: 3 }}>Saving Your Configuration</div>
        <div style={{ ...tBody, marginBottom: 6 }}>Once you've set up your AM and PM items, click Save to lock in your configuration. Your selections will now appear every day in Today mode, in the order you've arranged them. You can come back to Configure anytime to adjust, add, or remove your items.</div>
        <div style={{ ...tBody, marginBottom: 8 }}>Note: Configure does not auto-save. You must click <strong>"Save Setup — Enter DOP"</strong> to save your configuration.</div>
        <div style={{ ...tTitle, marginBottom: 3 }}>Using Today Mode</div>
        <div style={{ ...tBody, marginBottom: 6 }}>Today mode is where you'll spend your time day to day. It shows your AM items in the morning and your PM items in the evening, based on exactly what you set up in Configure. Most clients check items off twice a day — completing the AM DOP after finishing AM PIT in the morning, then completing the PM DOP in the evening. This saves you from having to constantly open the app throughout the day to check off items one at a time.</div>
        <div style={{ ...tBody, marginBottom: 6 }}>PIT (Personal Investment Time) is required once a day, normally in the AM. DOP just verifies it as being completed.</div>
        <div style={{ ...tBody, marginBottom: 8 }}>Score both AM and PM evaluations and minimally check off completed required items to mark the day complete.</div>
        <div style={{ ...tTitle, marginBottom: 3 }}>Never Twice</div>
        <div style={tBody}>Miss one day — never miss the second. One missed day is an interruption. Two is a pattern.</div>
      </>
    ),
  },
  { h: 'Morning Evaluation (1–10)', b: 'Tap your score before you begin the AM checklist. This is how you feel when you wake up — honest and raw. Over time this data reveals patterns in sleep, recovery, and consistency.' },
  { h: 'AM Checklist', b: 'Work through each item in your personal order. Tap the checkbox on the right to mark it complete. PIT is required and cannot be removed.' },
  { h: 'AM Required Items', b: 'PIT is required and cannot be removed. All sub-categories are locked: Thankful For, To Accomplish, N-I-T (Notes – Ideas – Thoughts), Daily Devotional, and Daily Book Study.' },
  { h: 'AM Common Life Tasks', b: 'These are optional items that many people include in their morning routine. Recommended items are pre-selected. Toggle any on or off.' },
  { h: 'Custom AM Items', b: 'Write your own AM checklist items. Use the + Add button to create as many as you need. Type a name in each box — it will appear in your daily checklist.' },
  { h: 'Reorder AM Items', b: 'Arrange your selected AM items in the exact order you complete them each morning. Use the arrows to move items up or down.' },
  { h: "Today's Takeaway", b: 'A new quote appears at the end of your AM block every day. Read it before you move on. Centered on discipline, time, and growth.' },
  { h: 'Evening Evaluation (1–10)', b: 'Tap your score at the top of the PM block. This is your overall day rating. Combined with your Morning Evaluation, it creates your daily performance picture over time.' },
  { h: 'PM PIT', b: 'PM PIT is your nightly investment in self-awareness. Log your Day Evaluation score, note what went well, and note what to improve. This closes the loop on the day — honest, brief, and consistent.' },
  { h: 'PM Required Items', b: 'PM PIT is required and cannot be removed — it includes your Day Evaluation score, what went well, and what to improve. This is your nightly close-out — brief, honest, and consistent.' },
  { h: 'PM Common Life Tasks', b: 'Select evening tasks that apply to your personal routine.' },
  { h: 'Custom PM Items', b: 'Write your own PM checklist items. Use the + Add button to create as many as you need. Type a name in each box — it will appear in your daily checklist.' },
  { h: 'Reorder PM Items', b: 'Arrange your selected PM items in the order you complete them each evening.' },
  { h: "Tomorrow's Priorities", b: "Lock in your One Thing for tomorrow before you close the day. This single action — written the night before — is one of the most effective performance habits you can build. The appointments section is optional and supplementary." },
  { h: 'Target Bedtime', b: 'Set your target bedtime once. It will appear on your Bed item each day as your personal standard.' },
];

export default function FormInstructionsModal({ onClose }) {
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
          <li style={{ marginBottom: 4 }}>Note: Configure does not auto-save. You must click 'Save Setup — Enter DOP' to save your configuration.</li>
          <li>Everything you enter in your daily AM/PM form saves automatically as you go — there is no Save button on the Today screen.</li>
        </ol>
      </div>
    </div>
  );
}
