```jsx
import React from 'react';
import { GOLD, DARK, MID, BORDER } from '../utils/constants';

export default function HelpPanel({ onClose }) {
  const tTitle  = { fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 3 };
  const tBody   = { fontSize: 12, color: MID, lineHeight: 1.7 };
  const sTitle  = { fontSize: 12, fontWeight: 700, color: DARK, marginBottom: 2 };
  const topItem = { marginBottom: 10, display: 'flex', alignItems: 'flex-start' };
  const bul     = { color: GOLD, fontWeight: 700, minWidth: 14, flexShrink: 0 };
  const subItem = { display: 'flex', alignItems: 'flex-start' };
  const hyp     = { minWidth: 12, flexShrink: 0, color: MID };

  return (
    <div style={{ background: '#E0E0E0', border: `2px solid ${GOLD}`, borderRadius: 8, padding: '18px 20px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative' }}>
      <div style={{ fontWeight: 800, fontSize: 13, color: DARK, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, paddingBottom: 8, borderBottom: `2px solid ${GOLD}` }}>
        PIT — Set-Up and Instructions
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

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>What is PIT?</div>
          <div style={tBody}>PIT stands for Personal Investment Time — your daily check-in with yourself and mental alignment. While DOP (Daily Operational Process) is your roadmap for what to do each day — including both AM and PM components — PIT is where you internalize your day's actions and invest a small amount of time in reflection, planning, and personal growth. This is done once per day. It works best when done at a consistent time, ideally on a computer rather than your phone, so you can give it real attention.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>How to use it:</div>
          <div style={{ ...tBody, marginBottom: 6 }}>Each day, complete the 10 Required Fields and any additional fields you choose. There is substantial personal value in going above the 10, but that is your choice. Fields marked with an asterisk (*) are required to mark a day complete. The 10 Required Fields, in order:</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: DARK, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Daily Trackables (Items 1-5)</div>
          <ol style={{ fontSize: 12, color: MID, lineHeight: 1.7, marginBottom: 0, paddingLeft: 32, marginTop: 0 }}>
            <li>Wake Up Time</li>
            <li>Weight</li>
            <li>Work / Off</li>
            <li>Sleep Score</li>
            <li>Fitness Yesterday</li>
            <li>Thankful For #1</li>
            <li>Thankful For #2</li>
            <li>Thankful For #3</li>
            <li>The One Thing</li>
            <li>Notes — Ideas — Thoughts</li>
          </ol>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Never Twice</div>
          <div style={tBody}>Check the box each day confirming you've read and committed to never missing the same action twice in a row.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>To Accomplish</div>
          <div style={{ ...tBody, marginBottom: 6 }}>Your daily task list, in priority order:</div>
          <div style={{ paddingLeft: 16 }}>
            <div style={{ ...subItem, marginBottom: 6 }}>
              <span style={hyp}>-</span>
              <div style={{ flex: 1 }}>
                <div style={sTitle}>The One Thing:</div>
                <div style={tBody}>The single task that, if completed, makes everything else easier or unnecessary. Include a First Action/Set-Up step to define exactly how you'll begin.</div>
              </div>
            </div>
            <div style={{ ...subItem, marginBottom: 6 }}>
              <span style={hyp}>-</span>
              <div style={{ flex: 1 }}>
                <div style={sTitle}>Daily Tasks:</div>
                <div style={tBody}>Up to two additional tasks for today.</div>
              </div>
            </div>
            <div style={{ ...subItem, marginBottom: 0 }}>
              <span style={hyp}>-</span>
              <div style={{ flex: 1 }}>
                <div style={sTitle}>Future Tasks:</div>
                <div style={tBody}>Reference items not tied to today, capped at 3. Use the Add button to reveal each one as needed.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Thankful For</div>
          <div style={tBody}>Add the first 3 things that come to mind.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Notes — Ideas — Thoughts</div>
          <div style={tBody}>A space to clear mental stress and mental noise by physically writing down your thoughts. Anything can go in here — jot down the first things that come to mind. Action items will often surface during this process; capture them here. Some clients keep a parallel notepad for items they'll later move into Future Tasks, Appointments, or Quotes.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Daily Devotional / Silence &amp; Reflection</div>
          <div style={tBody}>Choose either a Two-Minute Prayer or Silence &amp; Reflection, mark it complete, and add any reflections. Use Scripture Search / Reflection Search to find a topic, passage, or theme to focus on. Whichever mode you choose will become your default each day going forward — you can switch back and forth anytime using the toggle.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Daily Book Study</div>
          <div style={tBody}>Track the book you're currently reading: page, author, and topic. Use Notes for key takeaways, and Ask About This Book to explore concepts or questions about it. Quotes discovered while reading are often worth adding to the Quotes &amp; Inspiration section below, referenced by author. Check "Finished book" only once you complete it, to add it to your log.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Quotes &amp; Inspiration</div>
          <div style={tBody}>Capture quotes that stand out to you today, or use Quote and Inspiration Research to search by topic, feeling, or author.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Today's Appointments</div>
          <div style={tBody}>Track up to 5 appointments, each with a title, time, duration, location, and prep needed. SMS reminders are coming soon — for now, checking the box and setting a reminder time saves your preference, but no text message will be sent yet. Use the Add button to create new ones.</div>
        </div>
      </div>

      <div style={topItem}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>AI Summary</div>
          <div style={tBody}>Generates a summary of today plus your last 7 archived days.</div>
        </div>
      </div>

      <div style={{ ...topItem, marginBottom: 8 }}>
        <span style={bul}>•</span>
        <div style={{ flex: 1 }}>
          <div style={tTitle}>Submit to Coach</div>
          <div style={tBody}>Once you have 7 complete days in the week, the submit button unlocks. Use Partial Submit if you need to send fewer days.</div>
        </div>
      </div>

      <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.07)', borderRadius: 4, fontSize: 11, color: MID, fontStyle: 'italic', lineHeight: 1.6 }}>
        <strong style={{ fontStyle: 'normal' }}>NOTES:</strong>
        <ol style={{ margin: '4px 0 0 0', paddingLeft: 20 }}>
          <li style={{ marginBottom: 4 }}>Everything you enter in PIT saves automatically as you go — there is no Save button anywhere in this app. Saved information can be accessed with the Archive tab at the top of the page.</li>
          <li>For the most accurate Sleep Score, a wearable monitor is recommended. If you don't have one, many phone apps can provide a ballpark sleep score as an alternative.</li>
        </ol>
      </div>
    </div>
  );
}
```
