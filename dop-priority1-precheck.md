# DOP Priority 1 Pre-Check

---

## 1. utils/constants.js

```js
export const GOLD = '#B8860B';
export const GOLD_LIGHT = '#f5e6c8';
export const STEEL = '#2C4A6B';
export const STEEL_LIGHT = '#d0dceb';
export const STEEL_MID = '#1f3a5a';
export const STEEL_DARK = '#152840';
export const RED = '#c0392b';
export const RED_LIGHT = '#fdf0ee';
export const DARK = '#1a1a1a';
export const MID = '#3a3a3a';
export const BG = '#f8f8f6';
export const BORDER = '#d0c8b8';

export const PIT_URL = 'PASTE_PIT_APP_URL_HERE';

export const USERS = {
  Doug: { password: 'jpg2026', firstName: 'Doug' },
  Test: { password: 'test123', firstName: 'Test' },
};

export const BACKUP_QUOTES = [
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
  { text: 'The secret of your future is hidden in your daily routine.', author: 'Mike Murdock' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },
  { text: 'Guard your time fiercely. Busyness is no friend to achievement.', author: 'Tim Ferriss' },
  { text: 'The more disciplined you become, the easier life gets.', author: 'Steve Pavlina' },
  { text: 'Success is the sum of small efforts, repeated day in and day out.', author: 'Robert Collier' },
  { text: 'Protect your time like it is the most valuable thing you own. It is.', author: 'Unknown' },
  { text: "Don't count the days. Make the days count.", author: 'Muhammad Ali' },
  { text: 'The pain of discipline is far less than the pain of regret.', author: 'Sarah Bombell' },
  { text: 'An investment in yourself pays the best interest.', author: 'Benjamin Franklin' },
  { text: 'Time is the most valuable coin in your life. Only you can determine how it will be spent.', author: 'Carl Sandburg' },
  { text: 'Small daily improvements over time lead to stunning results.', author: 'Robin Sharma' },
  { text: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
  { text: 'Either you run the day or the day runs you.', author: 'Jim Rohn' },
  { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: 'Stephen Covey' },
  { text: 'Do something today that your future self will thank you for.', author: 'Sean Patrick Flanery' },
  { text: 'Nothing will work unless you do.', author: 'Maya Angelou' },
  { text: 'Success is nothing more than a few simple disciplines practiced every day.', author: 'Jim Rohn' },
  { text: "You don't rise to the level of your goals. You fall to the level of your systems.", author: 'James Clear' },
  { text: 'The amateur waits for inspiration. The professional gets to work.', author: 'Steven Pressfield' },
  { text: 'Champions keep playing until they get it right.', author: 'Billie Jean King' },
  { text: 'The difference between who you are and who you want to be is what you do.', author: 'Unknown' },
  { text: 'The measure of who we are is what we do with what we have.', author: 'Vince Lombardi' },
  { text: 'Your life does not get better by chance, it gets better by change.', author: 'Jim Rohn' },
  { text: "Hard work beats talent when talent doesn't work hard.", author: 'Tim Notke' },
  { text: 'Act as if what you do makes a difference. It does.', author: 'William James' },
  { text: 'Energy and persistence conquer all things.', author: 'Benjamin Franklin' },
  { text: 'I never dreamed about success. I worked for it.', author: 'Estee Lauder' },
  { text: 'The man who moves a mountain begins by carrying away small stones.', author: 'Confucius' },
  { text: 'Accountability breeds response-ability.', author: 'Stephen Covey' },
  { text: 'We must all suffer from one of two pains: the pain of discipline or the pain of regret.', author: 'Jim Rohn' },
  { text: 'The secret to getting ahead is getting started.', author: 'Mark Twain' },
  { text: "It always seems impossible until it's done.", author: 'Nelson Mandela' },
  { text: "Believe you can and you're halfway there.", author: 'Theodore Roosevelt' },
  { text: "Don't wish it were easier. Wish you were better.", author: 'Jim Rohn' },
  { text: 'Excellence is not a destination but a continuous journey that never ends.', author: 'Brian Tracy' },
  { text: 'Your future is created by what you do today, not tomorrow.', author: 'Robert Kiyosaki' },
  { text: 'One day or day one. You decide.', author: 'Unknown' },
  { text: 'A year from now you may wish you had started today.', author: 'Karen Lamb' },
  { text: 'Without self-discipline, success is impossible.', author: 'Lou Holtz' },
  { text: 'The successful warrior is the average man, with laser-like focus.', author: 'Bruce Lee' },
  { text: 'What you do speaks so loudly that I cannot hear what you say.', author: 'Ralph Waldo Emerson' },
  { text: 'The best investment you can make is in yourself.', author: 'Warren Buffett' },
  { text: "Be so good they can't ignore you.", author: 'Steve Martin' },
  { text: 'Done is better than perfect.', author: 'Sheryl Sandberg' },
  { text: 'Strength does not come from the body. It comes from the will of the soul.', author: 'Mahatma Gandhi' },
  { text: 'You were not born to be average.', author: 'Unknown' },
  { text: 'Knowing is not enough; we must apply. Willing is not enough; we must do.', author: 'Goethe' },
  { text: 'Push yourself because no one else is going to do it for you.', author: 'Unknown' },
  { text: 'An ounce of performance is worth pounds of promises.', author: 'Mae West' },
  { text: 'Growth is never by mere chance; it is the result of forces working together.', author: 'James Cash Penney' },
  { text: "Opportunities don't happen. You create them.", author: 'Chris Grosser' },
  { text: 'You must do the things you think you cannot do.', author: 'Eleanor Roosevelt' },
  { text: 'Character is the ability to carry out a good resolution long after the excitement has passed.', author: 'Cavett Robert' },
  { text: 'Resilience is knowing that you are the only one with the power to pick yourself up.', author: 'Mary Holloway' },
  { text: 'Do not wait. The time will never be just right.', author: 'Napoleon Hill' },
  { text: 'Champions are made from something deep inside — a desire, a dream, a vision.', author: 'Muhammad Ali' },
  { text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt' },
  { text: 'Motivation gets you started. Discipline keeps you going.', author: 'Unknown' },
  { text: 'Small steps in the right direction can turn out to be the biggest step of your life.', author: 'Unknown' },
];

export const AM_STANDARD = [
  { id: 'pit', label: 'PIT', desc: 'Personal Investment Time — No Phone Until PIT Is Complete', locked: true },
  { id: 'thankful_for', label: 'Thankful For', desc: 'Three entries required each day', locked: true, sub: true, parentId: 'pit' },
  { id: 'to_accomplish', label: 'To Accomplish', desc: 'Your One Thing — required daily', locked: true, sub: true, parentId: 'pit' },
  { id: 'nit', label: 'N-I-T', desc: 'Notes – Ideas – Thoughts', locked: true, sub: true, parentId: 'pit' },
  { id: 'dd', label: 'Daily Devotional / Silence & Reflection', desc: 'Mental and spiritual investment', locked: true, sub: true, parentId: 'pit' },
  { id: 'dbs', label: 'Daily Book Study', desc: 'Any genre — knowledge is power', locked: true, sub: true, parentId: 'pit' },
];

export const AM_SUB_IDS = ['thankful_for', 'to_accomplish', 'nit', 'dd', 'dbs'];

export const AM_COMMON = [
  { id: 'am_fitness', label: 'AM Fitness', desc: 'Morning workout — gym, run, training session', recommended: true },
  { id: 'personal_prep', label: 'Personal Prep', desc: 'Shower / Dress', recommended: true },
  { id: 'breakfast', label: 'Breakfast', desc: 'Fuel your body — whole foods, protein, minimal processed foods', recommended: true },
  { id: 'make_bed', label: 'Make Bed (if able)', desc: 'Start the day with one thing done', recommended: true },
  { id: 'meditation', label: 'Meditation', desc: 'Quiet focus, breathwork, mindfulness practice' },
  { id: 'review_email', label: 'Review Email', desc: 'Quick scan only — can run alongside breakfast. Do not get bogged down' },
  { id: 'am_routine_complete', label: 'AM Routine Complete', desc: 'Final wrap-up — confirm you have everything needed for the day. Out the door, commute, move on' },
  { id: 'children_meals', label: "Prepare Children's Meals", desc: 'Lunches, snacks, school items' },
  { id: 'school_run', label: 'Take Child to School', desc: 'Drop-off / transport' },
  { id: 'child_activities', label: 'Child Activity Prep', desc: 'Sports gear, instruments, after-school needs' },
  { id: 'pet_care', label: 'Pet Care', desc: 'Walking dog, feeding, medication, morning routine' },
  { id: 'medication', label: 'Medication / Supplements', desc: 'Morning dose — follow your protocol' },
  { id: 'health_check', label: 'Health Check', desc: 'Blood pressure, glucose, or daily health metric' },
  { id: 'review_calendar', label: 'Review Calendar', desc: 'Appointments and priorities for today' },
  { id: 'review_work_priorities', label: 'Review Work Priorities', desc: 'Top tasks and deliverables for today' },
  { id: 'check_work_messages', label: 'Check Work Messages', desc: 'Brief scan — urgent items only, after PIT' },
  { id: 'team_checkin', label: 'Team / Staff Check-In', desc: 'Morning standup, accountability call, or brief sync' },
  { id: 'client_prep', label: 'Client / Case Prep', desc: "Review notes or materials for today's engagements" },
  { id: 'admin_tasks', label: 'Admin Tasks', desc: 'Brief admin — forms, logs, paperwork, reports' },
  { id: 'household_task', label: 'Household Task', desc: 'Dishes, laundry, quick clean, home maintenance' },
  { id: 'family_checkin', label: 'Family Check-In', desc: 'Call or message spouse, children, or parents' },
  { id: 'personal_finance', label: 'Personal Finance Review', desc: 'Bills, accounts, brief financial scan' },
  { id: 'outdoor_time', label: 'Outdoor Time', desc: 'Fresh air, brief walk, nature exposure before heading out' },
  { id: 'vehicle_gear_prep', label: 'Vehicle / Gear Prep', desc: 'Vehicle check, equipment ready' },
  { id: 'errand_planning', label: 'Errand Planning', desc: 'Batch and plan errands — grocery, post office, etc.' },
];

export const AM_CUSTOM_IDS = ['am_c1', 'am_c2', 'am_c3', 'am_c4', 'am_c5'];

export const PM_STANDARD = [
  { id: 'prep_tomorrow', label: 'Prep for Tomorrow', desc: 'Prepare as many things as possible for tomorrow morning (food, clothes, items to take, etc.)', defaultOn: true, locked: false },
  { id: 'evening_meal', label: 'Evening Meal / Snack', desc: '', defaultOn: true, locked: false },
  { id: 'pm_pit', label: 'PM PIT', desc: 'Evening Personal Investment Time — log your day', defaultOn: true, locked: true },
  { id: 'pm_eval', label: 'Day Evaluation', desc: '1–10 score for today', defaultOn: true, locked: true, sub: true, parentId: 'pm_pit' },
  { id: 'pm_good', label: 'What Went Well', desc: 'Write in — wins, progress, positives', defaultOn: true, locked: true, sub: true, parentId: 'pm_pit' },
  { id: 'pm_bad', label: 'What to Improve', desc: 'Write in — honest assessment of the day', defaultOn: true, locked: true, sub: true, parentId: 'pm_pit' },
];

export const PM_SUB_IDS = ['pm_eval', 'pm_good', 'pm_bad'];

export const PM_COMMON = [
  { id: 'pm_fitness', label: 'PM Fitness', desc: 'Evening Workout — Home or Gym' },
  { id: 'pm_read', label: 'Read / Study / Learning', desc: 'Books, course material, certification, skill development' },
  { id: 'pm_bed', label: 'Bed', desc: '' },
  { id: 'pm_lights_out', label: 'Lights Out', desc: '' },
  { id: 'pm_pet_care', label: 'Pet Care', desc: 'Evening walk, feeding, medication' },
  { id: 'pm_children_hw', label: "Children's Homework / School Help", desc: 'Review assignments, school prep for tomorrow' },
  { id: 'pm_family_time', label: 'Family Time', desc: 'Deliberate, present time with spouse or children' },
  { id: 'pm_family_call', label: 'Family / Friend Call', desc: 'Call parent, sibling, close friend — maintain connection' },
  { id: 'pm_medication', label: 'Evening Medication / Supplements', desc: 'PM dose — follow your protocol' },
  { id: 'pm_household', label: 'Household Tasks', desc: 'Dishes, laundry, cleaning, tidying up' },
  { id: 'pm_groceries', label: 'Grocery / Errands', desc: 'Pick up food or run necessary errands on the way home' },
  { id: 'pm_finance', label: 'Personal Finance', desc: 'Bill review, account check, financial log' },
  { id: 'pm_vehicle', label: 'Vehicle Check / Gear Staging', desc: 'Fuel, maintenance check, equipment ready for tomorrow' },
  { id: 'pm_meditation', label: 'Evening Meditation', desc: 'Wind-down, breathwork, quiet reflection' },
  { id: 'pm_journaling', label: 'Journaling', desc: 'Capture the day — wins, lessons, thoughts' },
  { id: 'pm_faith', label: 'Faith Practice', desc: 'Evening prayer, scripture, or spiritual reading' },
  { id: 'pm_social', label: 'Social / Relationship Time', desc: 'Intentional time with people that matter' },
  { id: 'pm_selfcare', label: 'Personal Care', desc: 'Grooming, hygiene, health routine' },
];

export const PM_CUSTOM_IDS = ['pm_c1', 'pm_c2', 'pm_c3', 'pm_c4', 'pm_c5'];

export const AM_DEFAULT_RECOMMENDED = ['am_fitness', 'personal_prep', 'breakfast', 'make_bed'];
export const PM_DEFAULT_COMMON = ['pm_fitness', 'pm_read', 'pm_bed', 'pm_lights_out'];
export const PM_DEFAULT_TOP = ['prep_tomorrow', 'evening_meal', 'pm_pit'];
```

---

## 2. components/AMBlock.jsx

```jsx
import React from 'react';
import { GOLD, GOLD_LIGHT, DARK, BORDER } from '../utils/constants';
import { AM_SUB_IDS } from '../utils/constants';
import { inp, lbl } from './styles';
import { CheckRow, PITButton, QuoteBox, TapScore } from './Shared';

export default function AMBlock({
  form, setup, allAMRows, amDone,
  toggleAM, toggleAMPitAll, upd, saveForm, quote,
}) {
  return (
    <>
      <PITButton />

      {/* Morning Evaluation */}
      <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, padding: '16px 18px', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: GOLD, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
          Morning Evaluation — How Do I Feel Right Now?
        </div>
        <TapScore value={form.morningEval} onChange={v => upd('morningEval', v)} color={GOLD} />
      </div>

      {/* AM Checklist */}
      <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ background: GOLD, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase' }}>AM Block</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{amDone} / {allAMRows.length} done</span>
        </div>

        {allAMRows.map(item => {
          if (item.id === 'pit') {
            const allSubChecked = AM_SUB_IDS.every(id => !!(form.amChecks && form.amChecks[id]));
            return (
              <div key="pit" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                borderBottom: `1px solid ${BORDER}`,
                background: form.amChecks?.pit ? GOLD_LIGHT : 'transparent',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: form.amChecks?.pit ? GOLD : DARK }}>PIT</span>
                  <span style={{ color: '#999', fontSize: 11, marginLeft: 6 }}>
                    — Personal Investment Time — No Phone Until PIT Is Complete
                  </span>
                  <span style={{ fontSize: 9, color: GOLD, fontWeight: 700, marginLeft: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Required</span>
                </div>
                <button
                  onClick={toggleAMPitAll}
                  style={{
                    fontSize: 10, fontWeight: 800,
                    color: allSubChecked ? '#fff' : GOLD,
                    background: allSubChecked ? GOLD : 'transparent',
                    border: `1.5px solid ${GOLD}`, borderRadius: 4,
                    padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: 0.5,
                  }}
                >{allSubChecked ? '✓ All Done' : 'Check All'}</button>
                <button
                  onClick={() => toggleAM('pit')}
                  style={{
                    width: 36, height: 36, borderRadius: 6,
                    border: `2px solid ${form.amChecks?.pit ? GOLD : BORDER}`,
                    background: form.amChecks?.pit ? GOLD : '#fff',
                    color: form.amChecks?.pit ? '#fff' : '#ccc',
                    cursor: 'pointer', fontSize: 17, fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >{form.amChecks?.pit ? '✓' : ''}</button>
              </div>
            );
          }
          return (
            <CheckRow
              key={item.id}
              item={item}
              checked={!!(form.amChecks && form.amChecks[item.id])}
              onToggle={() => toggleAM(item.id)}
              duration={setup.durations[item.id]}
              blockColor={GOLD}
            />
          );
        })}

        {/* AM Deviation */}
        <div style={{ padding: '12px 16px 4px', borderTop: `1px solid ${GOLD_LIGHT}` }}>
          <label style={lbl}>
            AM Deviation{' '}
            <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>(optional)</span>
          </label>
          <textarea
            value={form.amDeviation || ''}
            onChange={e => upd('amDeviation', e.target.value)}
            rows={2}
            style={{ ...inp, resize: 'vertical', marginBottom: 14 }}
            placeholder="Note anything abnormal or items not completed..."
          />
        </div>

        {/* AM Lock + Quote */}
        <div style={{ margin: '8px 0 0', padding: '16px 18px', background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, #fff 100%)`, border: `1.5px solid ${GOLD}`, borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            {form.amLocked ? 'AM Block — Locked' : 'AM Block Complete'}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: DARK, fontStyle: 'italic', marginBottom: 12 }}>
            Foundation set. Move into the day.
          </div>
          <button
            onClick={() => saveForm({ ...form, amLocked: !form.amLocked, amLockedAt: !form.amLocked ? new Date().toISOString() : null })}
            style={{
              padding: '8px 20px', borderRadius: 6, border: 'none',
              background: form.amLocked ? '#2ecc71' : GOLD,
              color: '#fff', fontWeight: 800, fontSize: 12,
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            }}
          >{form.amLocked ? '✓ AM Locked' : 'Lock AM Block'}</button>
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <QuoteBox quote={quote} />
        </div>
      </div>
    </>
  );
}
```

---

## 3. components/PMBlock.jsx

```jsx
import React from 'react';
import { GOLD, GOLD_LIGHT, STEEL, STEEL_LIGHT, RED, RED_LIGHT, DARK, BORDER } from '../utils/constants';
import { inp, lbl } from './styles';
import { CheckRow, PITButton, TapScore } from './Shared';

export default function PMBlock({
  form, setup, allPMRows, pmDone,
  togglePM, upd, saveForm, complete, saved,
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* PM Block header */}
      <div style={{ background: STEEL, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase' }}>PM Block</span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{pmDone} / {allPMRows.length} done</span>
      </div>

      {/* Evening Evaluation */}
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${STEEL_LIGHT}` }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: STEEL, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
          Evening Evaluation — How Did Today Go?
        </div>
        <TapScore value={form.eveningEval} onChange={v => upd('eveningEval', v)} color={STEEL} />
        <div style={{ marginTop: 10, fontSize: 11, color: '#999', fontStyle: 'italic', lineHeight: 1.5 }}>
          Complete PM PIT before bed — score your day, note what went well and what to improve, then check Bed and Lights Out as part of your closing routine.
        </div>
      </div>

      {/* PM Rows */}
      {allPMRows.map(item => {
        if (item.id === 'pm_good') {
          return (
            <div key="pm_good" style={{ padding: '10px 14px 10px 36px', borderBottom: `1px solid ${BORDER}`, background: STEEL_LIGHT }}>
              <label style={{ ...lbl, color: STEEL, marginBottom: 5 }}>What Went Well Today</label>
              <textarea
                value={form.pmGood || ''}
                onChange={e => upd('pmGood', e.target.value)}
                rows={2}
                style={{ ...inp, resize: 'vertical' }}
                placeholder="Wins, progress, positives from today..."
              />
            </div>
          );
        }
        if (item.id === 'pm_bad') {
          return (
            <div key="pm_bad" style={{ padding: '10px 14px 10px 36px', borderBottom: `1px solid ${BORDER}`, background: STEEL_LIGHT }}>
              <label style={{ ...lbl, color: STEEL, marginBottom: 5 }}>What to Improve</label>
              <textarea
                value={form.pmBad || ''}
                onChange={e => upd('pmBad', e.target.value)}
                rows={2}
                style={{ ...inp, resize: 'vertical' }}
                placeholder="Honest assessment — what would you do differently?"
              />
            </div>
          );
        }
        if (item.id === 'pm_eval') return null;
        return (
          <CheckRow
            key={item.id}
            item={item}
            checked={!!(form.pmChecks && form.pmChecks[item.id])}
            onToggle={() => togglePM(item.id)}
            duration={setup.durations[item.id]}
            blockColor={STEEL}
          />
        );
      })}

      {/* Tomorrow's Priorities */}
      <div style={{ background: '#1a1a1a', padding: '10px 16px', borderTop: `2px solid ${RED}` }}>
        <div style={{ color: RED, fontWeight: 900, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
          Tomorrow's Priorities
        </div>
      </div>
      <div style={{ padding: '14px 16px', background: RED_LIGHT, borderBottom: `2px solid ${RED}` }}>
        <label style={{ ...lbl, color: RED, marginBottom: 6 }}>Tomorrow's One Thing</label>
        <input
          type="text"
          value={form.tomorrowOneThing || ''}
          onChange={e => upd('tomorrowOneThing', e.target.value)}
          style={{ ...inp, border: `2px solid ${RED}`, background: '#fff' }}
          placeholder="The single most important action tomorrow..."
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
        <span style={{ fontSize: 10, fontWeight: 800, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Optional</span>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
      </div>
      <div style={{ padding: '4px 16px 14px' }}>
        <label style={lbl}>
          Tomorrow's Appointments & Must-Do's{' '}
          <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>(also in PIT)</span>
        </label>
        <textarea
          value={form.tomorrowAppts || ''}
          onChange={e => upd('tomorrowAppts', e.target.value)}
          rows={3}
          style={{ ...inp, resize: 'vertical', marginBottom: 12 }}
          placeholder="Key appointments and tasks for tomorrow..."
        />
      </div>

      {/* PM Deviation */}
      <div style={{ padding: '0 16px 14px' }}>
        <label style={lbl}>
          PM Deviation{' '}
          <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>(optional)</span>
        </label>
        <textarea
          value={form.pmDeviation || ''}
          onChange={e => upd('pmDeviation', e.target.value)}
          rows={2}
          style={{ ...inp, resize: 'vertical' }}
          placeholder="Note anything abnormal or items not completed this evening..."
        />
      </div>

      {/* PM Lock */}
      <div style={{
        margin: '12px 16px 0', padding: '16px 18px',
        background: `linear-gradient(135deg, ${STEEL_LIGHT} 0%, #fff 100%)`,
        border: `1.5px solid ${STEEL}`, borderRadius: 8, textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: STEEL, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
          {form.pmLocked ? 'PM Block — Locked' : 'PM Block Complete'}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: DARK, fontStyle: 'italic', marginBottom: 12 }}>
          Day closed. Rest with diligence.
        </div>
        <button
          onClick={() => saveForm({ ...form, pmLocked: !form.pmLocked, pmLockedAt: !form.pmLocked ? new Date().toISOString() : null })}
          style={{
            padding: '8px 20px', borderRadius: 6, border: 'none',
            background: form.pmLocked ? '#2ecc71' : STEEL,
            color: '#fff', fontWeight: 800, fontSize: 12,
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}
        >{form.pmLocked ? '✓ PM Locked' : 'Lock PM Block'}</button>
      </div>

      {/* Day Complete + Saved indicator */}
      <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, padding: '12px 20px', margin: '14px 16px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        {complete ? (
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 14 }}>✓ Day Complete — Well executed.</div>
        ) : (
          <div style={{ color: '#888', fontSize: 13 }}>
            Score both evaluations and complete at least one AM and one PM item to mark the day done.
          </div>
        )}
        {saved && <div style={{ color: '#27ae60', fontSize: 11, marginTop: 4 }}>Saved.</div>}
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <PITButton />
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
        <span style={{ fontSize: 10, color: '#bbb' }}>JPG-DOP-001-v13</span>
        <span style={{ fontSize: 10, color: '#bbb' }}>Jones Performance Group LLC</span>
        <span style={{ fontSize: 10, color: '#bbb' }}>Daily Operational Process</span>
        <span style={{ fontSize: 10, color: '#bbb', fontWeight: 700 }}>CONFIDENTIAL</span>
      </div>
    </div>
  );
}
```

---

## 4. components/LoginScreen.jsx

```jsx
import React, { useState } from 'react';

export const VALID_CREDENTIALS = { Doug: 'JPG2026', Test: 'JPG2026' };

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const key = Object.keys(VALID_CREDENTIALS).find(k => k.toLowerCase() === username.trim().toLowerCase());
    const expected = key ? VALID_CREDENTIALS[key] : undefined;
    if (!expected || password.toLowerCase() !== expected.toLowerCase()) {
      setError('Invalid username or password.');
      return;
    }
    setError('');
    onLogin(username.trim());
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#B8860B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        width: '420px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        border: '2px solid #000000',
      }}>
        <div style={{ padding: '32px 40px 16px 40px' }}>
          <img
            src="/jpglogo.png"
            style={{ width: '260px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '0px', position: 'relative', left: '-14px' }}
          />
          <div style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '0.08em', color: '#000000', textAlign: 'center', margin: 0, padding: 0, marginTop: '-12px', marginLeft: '-28px' }}>
            DOP
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textAlign: 'center', marginTop: '4px', marginBottom: '20px', marginLeft: '-28px' }}>
            DAILY OPERATIONAL PROCESS
          </div>
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em', color: '#000000', marginBottom: '4px', display: 'block' }}>
              USER
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CCCCCC', background: '#F0F0F0', color: '#2A2A2A', fontSize: '14px', boxSizing: 'border-box' }}
            />
            <label style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em', color: '#000000', marginTop: '16px', marginBottom: '4px', display: 'block' }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
              autoComplete="current-password"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CCCCCC', background: '#F0F0F0', color: '#2A2A2A', fontSize: '14px', boxSizing: 'border-box' }}
            />
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', color: '#B8860B', textAlign: 'center', marginTop: '16px', marginBottom: '12px' }}>
              EXISTING OUTSIDE OF BOUNDARIES
            </div>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#CCCCCC', cursor: 'pointer' }}>
              <input type="checkbox" style={{ margin: 0 }} />
              Stay logged in for 30 days
            </label>

            {error && (
              <div style={{ color: '#B02020', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', background: '#B8860B', color: '#000000', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.1em', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '20px' }}
            >
              ENTER
            </button>
          </form>
          <div style={{ marginTop: '12px', textAlign: 'center', lineHeight: 1.8, fontSize: '11px', color: '#000000', letterSpacing: '0.08em' }}>
            <div>JONES PERFORMANCE GROUP LLC</div>
            <div>ACCESS BY AUTHORIZATION ONLY</div>
          </div>
        </div>
        <div style={{ background: '#FFFFFF', borderTop: '1px solid #EEEEEE', height: '28px', lineHeight: '28px', textAlign: 'center', fontSize: '9px', color: '#888888', letterSpacing: '0.05em' }}>
          © 2026 Jones Performance Group LLC · DOP · Confidential · All Rights Reserved
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Project-wide grep for `USERS`

Search: `USERS` across all `.js` and `.jsx` files

```
utils\constants.js:16:export const USERS = {
```

**1 match total.** `USERS` is defined only in `utils/constants.js` at line 16. It is not imported or referenced anywhere else in the codebase. The active credential system is `VALID_CREDENTIALS` exported from `components/LoginScreen.jsx`.

---

## 6. components/SetupRow.jsx

```jsx
import React from 'react';
import { GOLD, GOLD_LIGHT, DARK, BORDER } from '../utils/constants';
import { inp } from './styles';
import { RecommendedBadge } from './Shared';

export default function SetupRow({
  item, checked, onToggle,
  duration, onDurChange,
  labelVal, onLabelChange,
  lightColor, isLocked, showBadge,
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
        type="text"
        value={duration || ''}
        onChange={e => onDurChange && onDurChange(e.target.value)}
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
    </div>
  );
}
```

---

## 7. components/SetupScreen.jsx

```jsx
import React, { useState } from 'react';
import { GOLD, GOLD_LIGHT, STEEL, STEEL_LIGHT, STEEL_MID, STEEL_DARK, BORDER, DARK, MID } from '../utils/constants';
import { AM_STANDARD, AM_COMMON, AM_CUSTOM_IDS, PM_STANDARD, PM_COMMON, PM_CUSTOM_IDS } from '../utils/constants';
import { inp } from './styles';
import { ColumnHeader, SectionDivider, RecommendedBadge } from './Shared';
import SetupRow from './SetupRow';
import ReorderPanel from './ReorderPanel';
import SetupInstructions from './SetupInstructions';

const LOGO_SRC = '/jpglogo.png';

function findAMItem(id) {
  return AM_STANDARD.find(i => i.id === id) || AM_COMMON.find(i => i.id === id) || null;
}
function findPMItem(id) {
  return PM_STANDARD.find(i => i.id === id) || PM_COMMON.find(i => i.id === id) || null;
}

function SH({ color, label, sub }) {
  return (
    <div style={{ background: color, padding: '12px 16px' }}>
      <div style={{ color: '#fff', fontWeight: 900, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>
      {sub ? <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 3 }}>{sub}</div> : null}
    </div>
  );
}

export default function SetupScreen({ setup, onSave, onCancel, isFirstTime }) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(setup)));
  const [instrOpen, setInstrOpen] = useState(true);

  const setDur = (id, val) => setLocal(p => ({ ...p, durations: { ...p.durations, [id]: val } }));
  const setAMCust = (id, val) => setLocal(p => {
    const labels = { ...p.amCustomLabels, [id]: val };
    const order = p.amOrder.slice();
    if (val.trim() && !order.includes(id)) order.push(id);
    if (!val.trim()) { const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    return { ...p, amCustomLabels: labels, amOrder: order };
  });
  const setPMCust = (id, val) => setLocal(p => {
    const labels = { ...p.pmCustomLabels, [id]: val };
    const order = p.pmOrder.slice();
    if (val.trim() && !order.includes(id)) order.push(id);
    if (!val.trim()) { const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    return { ...p, pmCustomLabels: labels, pmOrder: order };
  });
  const toggleAMCommon = id => setLocal(p => {
    const sel = p.amCommonSelected.slice();
    const order = p.amOrder.slice();
    const idx = sel.indexOf(id);
    if (idx >= 0) { sel.splice(idx, 1); const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    else { sel.push(id); if (!order.includes(id)) order.push(id); }
    return { ...p, amCommonSelected: sel, amOrder: order };
  });
  const togglePMStd = id => {
    const item = PM_STANDARD.find(i => i.id === id);
    if (item && item.locked) return;
    setLocal(p => {
      const sel = p.pmSelected.slice();
      const order = p.pmOrder.slice();
      const idx = sel.indexOf(id);
      if (idx >= 0) { sel.splice(idx, 1); const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
      else { sel.push(id); if (!order.includes(id)) order.push(id); }
      return { ...p, pmSelected: sel, pmOrder: order };
    });
  };
  const togglePMCommon = id => setLocal(p => {
    const sel = (p.pmCommonSelected || []).slice();
    const order = p.pmOrder.slice();
    const idx = sel.indexOf(id);
    if (idx >= 0) { sel.splice(idx, 1); const oi = order.indexOf(id); if (oi >= 0) order.splice(oi, 1); }
    else { sel.push(id); if (!order.includes(id)) order.push(id); }
    return { ...p, pmCommonSelected: sel, pmOrder: order };
  });
  const moveAM = (idx, dir) => setLocal(p => {
    const order = p.amOrder.slice();
    const ni = idx + dir;
    if (ni < 0 || ni >= order.length) return p;
    [order[idx], order[ni]] = [order[ni], order[idx]];
    return { ...p, amOrder: order };
  });
  const movePM = (idx, dir) => setLocal(p => {
    const order = p.pmOrder.slice();
    const ni = idx + dir;
    if (ni < 0 || ni >= order.length) return p;
    [order[idx], order[ni]] = [order[ni], order[idx]];
    return { ...p, pmOrder: order };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f6', padding: '0 0 60px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: '#fff', borderBottom: `2px solid ${GOLD}`, padding: '28px 28px 24px', textAlign: 'center' }}>
          <img src={LOGO_SRC} alt="JPG" style={{ width: 200, marginBottom: 16 }} />
          <div style={{ fontSize: 34, fontWeight: 900, color: DARK, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
            DOP Setup
          </div>
          <div style={{ fontSize: 13, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
            Daily Operational Process
          </div>
          <div style={{ fontSize: 13, color: MID }}>Configure your personal daily system.</div>
        </div>

        <div style={{ padding: '20px 16px 0' }}>
          <SetupInstructions open={instrOpen} onToggle={() => setInstrOpen(!instrOpen)} />

          {/* Bedtime */}
          <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{
              background: '#333', padding: '14px 18px', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
            }}>
              <div>
                <div style={{ color: GOLD, fontWeight: 900, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Target Bedtime</div>
                <div style={{ color: '#aaa', fontSize: 11, marginTop: 3 }}>Set once — appears on your Bed item every day as your personal standard</div>
              </div>
              <input
                type="text"
                value={local.bedtime || ''}
                onChange={e => setLocal({ ...local, bedtime: e.target.value })}
                placeholder="e.g. 9:00 PM"
                style={{ background: '#222', border: `1px solid ${GOLD}`, color: '#fff', borderRadius: 5, padding: '7px 12px', fontSize: 14, width: 120, textAlign: 'center' }}
              />
            </div>
          </div>

          {/* AM Required */}
          <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={GOLD} label="AM Required Items" sub="PIT is required and cannot be removed. All sub-categories are locked." />
            <ColumnHeader />
            {AM_STANDARD.map(item => (
              <SetupRow key={item.id} item={item} checked={true} onToggle={() => {}}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={GOLD_LIGHT} isLocked={true} />
            ))}
          </div>

          {/* AM Common */}
          <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color="#7A6010" label="AM Common Life Tasks" sub="Recommended items are pre-selected. Select any that apply to your morning." />
            <ColumnHeader />
            {AM_COMMON.map(item => (
              <SetupRow key={item.id} item={item}
                checked={local.amCommonSelected.includes(item.id)}
                onToggle={() => toggleAMCommon(item.id)}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={GOLD_LIGHT} showBadge={!!item.recommended} />
            ))}
            <SectionDivider label="Write Your Own — Custom AM Items" />
            {AM_CUSTOM_IDS.map(id => {
              const hasLabel = !!(local.amCustomLabels[id] && local.amCustomLabels[id].trim());
              return (
                <SetupRow key={id} item={{ id, label: '', desc: '', sub: false }}
                  checked={hasLabel} onToggle={() => { if (hasLabel) setAMCust(id, ''); }}
                  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
                  labelVal={local.amCustomLabels[id]} onLabelChange={v => setAMCust(id, v)}
                  lightColor="#f0f0f0" />
              );
            })}
          </div>

          <ReorderPanel
            order={local.amOrder} findItem={findAMItem}
            customLabels={local.amCustomLabels} customIds={AM_CUSTOM_IDS}
            onMove={moveAM} color={GOLD}
            title="Reorder AM Items — Match Your Morning Routine"
          />

          {/* PM Required */}
          <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL} label="PM Required Items" sub="PM PIT, Prep for Tomorrow, and Evening Meal are required." />
            <ColumnHeader />
            {PM_STANDARD.map(item => {
              const isChecked = local.pmSelected.includes(item.id) || !!item.locked;
              return (
                <SetupRow key={item.id} item={item} checked={isChecked}
                  onToggle={() => { if (!item.sub && !item.locked) togglePMStd(item.id); }}
                  duration={item.id === 'pm_bed' ? local.bedtime || '' : local.durations[item.id]}
                  onDurChange={item.id === 'pm_bed' ? null : v => setDur(item.id, v)}
                  lightColor={STEEL_LIGHT} isLocked={!!item.locked} />
              );
            })}
          </div>

          {/* PM Common */}
          <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 14, overflow: 'hidden' }}>
            <SH color={STEEL_MID} label="PM Common Life Tasks" sub="Select evening tasks that apply to your routine." />
            <ColumnHeader />
            {PM_COMMON.map(item => (
              <SetupRow key={item.id} item={item}
                checked={(local.pmCommonSelected || []).includes(item.id)}
                onToggle={() => togglePMCommon(item.id)}
                duration={local.durations[item.id]} onDurChange={v => setDur(item.id, v)}
                lightColor={STEEL_LIGHT} />
            ))}
            <SectionDivider label="Write Your Own — Custom PM Items" />
            {PM_CUSTOM_IDS.map(id => {
              const hasLabel = !!(local.pmCustomLabels[id] && local.pmCustomLabels[id].trim());
              return (
                <SetupRow key={id} item={{ id, label: '', desc: '', sub: false }}
                  checked={hasLabel} onToggle={() => { if (hasLabel) setPMCust(id, ''); }}
                  duration={local.durations[id]} onDurChange={v => setDur(id, v)}
                  labelVal={local.pmCustomLabels[id]} onLabelChange={v => setPMCust(id, v)}
                  lightColor="#eef3f8" />
              );
            })}
          </div>

          <ReorderPanel
            order={local.pmOrder} findItem={findPMItem}
            customLabels={local.pmCustomLabels} customIds={PM_CUSTOM_IDS}
            onMove={movePM} color={STEEL_DARK}
            title="Reorder PM Items — Match Your Evening Routine"
          />

          <button
            onClick={() => onSave({ ...local, setupComplete: true })}
            style={{
              width: '100%', padding: 16, borderRadius: 8, border: 'none',
              background: GOLD, color: '#fff', fontWeight: 900, fontSize: 16,
              cursor: 'pointer', letterSpacing: 0.5, marginBottom: 10,
            }}
          >
            Save Setup — Enter DOP
          </button>

          {!isFirstTime && onCancel && (
            <button
              onClick={onCancel}
              style={{
                width: '100%', padding: 12, borderRadius: 8, border: `1px solid ${BORDER}`,
                background: '#fff', color: MID, fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}
            >
              Cancel — Back to Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 8. Header/Nav-Bar Component — Confirmed File Name and Contents

**There is no separate header/nav-bar component file.** The sticky navigation bar is rendered inline inside `app/DOPApp.jsx`. It is not extracted into its own component. The relevant JSX block begins at line 247 of `DOPApp.jsx` (the `{/* Sticky Nav */}` comment) and runs through line 304. The full file is included below.

### app/DOPApp.jsx (full contents)

```jsx
import React, { useState, useEffect } from 'react';
import { GOLD, DARK, BG } from '../utils/constants';
import {
  AM_STANDARD, AM_COMMON, AM_CUSTOM_IDS, AM_SUB_IDS,
  PM_STANDARD, PM_COMMON, PM_CUSTOM_IDS, PM_SUB_IDS,
  BACKUP_QUOTES,
} from '../utils/constants';
import { todayStr, fmtDate } from '../utils/date';
import { emptyForm, defaultSetup, isDayComplete, getDailyQuote } from '../utils/form';
import { storage } from '../services/storage';
import { fetchDailyQuote } from '../services/ai';

import LoginScreen, { VALID_CREDENTIALS } from '../components/LoginScreen';
import SetupScreen from '../components/SetupScreen';
import FormInstructionsModal from '../components/FormInstructionsModal';
import ArchiveView from '../components/ArchiveView';
import AMBlock from '../components/AMBlock';
import PMBlock from '../components/PMBlock';

const LOGO_SRC = '/jpglogo.png';

function findAMItem(id) {
  return AM_STANDARD.find(i => i.id === id) || AM_COMMON.find(i => i.id === id) || null;
}
function findPMItem(id) {
  return PM_STANDARD.find(i => i.id === id) || PM_COMMON.find(i => i.id === id) || null;
}

export default function DOPApp() {
  const [user, setUser] = useState(() => {
    const raw = new URLSearchParams(window.location.search).get('hub_user');
    if (!raw) return null;
    return Object.keys(VALID_CREDENTIALS).find(k => k.toLowerCase() === raw.trim().toLowerCase()) ?? null;
  });
  const [firstName, setFirstName] = useState(() => {
    const raw = new URLSearchParams(window.location.search).get('hub_user');
    if (!raw) return '';
    return Object.keys(VALID_CREDENTIALS).find(k => k.toLowerCase() === raw.trim().toLowerCase()) ?? '';
  });
  const [view, setView] = useState('form');
  const [setup, setSetup] = useState(defaultSetup());
  const [form, setForm] = useState(emptyForm());
  const [archiveDates, setArchiveDates] = useState([]);
  const [archiveDate, setArchiveDate] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [quote, setQuote] = useState(null);
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const sk = (user || 'guest') + '_dop7_';

  // Load user data on login
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const sv = await storage.get(sk + 'setup');
        if (sv && sv.value) setSetup(JSON.parse(sv.value));
        const today = todayStr();
        const fd = await storage.get(sk + 'form_' + today);
        if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(today));
        const ad = await storage.get(sk + 'archiveDates');
        if (ad && ad.value) setArchiveDates(JSON.parse(ad.value));
        const st = await storage.get(sk + 'streak');
        if (st && st.value) setStreak(parseInt(st.value) || 0);
      } catch (_) {}
    })();
    loadQuote();
  }, [user]);

  // Auto-check pm_pit when pmGood and pmBad are both filled
  useEffect(() => {
    if (!user) return;
    const bothFilled = !!(form.pmGood && form.pmGood.trim()) && !!(form.pmBad && form.pmBad.trim());
    const currentPit = !!(form.pmChecks && form.pmChecks['pm_pit']);
    if (bothFilled !== currentPit) {
      const c = { ...form.pmChecks };
      c['pm_pit'] = bothFilled;
      saveForm({ ...form, pmChecks: c });
    }
  }, [form.pmGood, form.pmBad]);

  // Auto-open instructions modal on first-ever visit (after login + setup complete)
  useEffect(() => {
    if (!user || !setup.setupComplete) return;
    if (!localStorage.getItem('dop_instructions_seen')) {
      setShowInstructions(true);
    }
  }, [user, setup.setupComplete]);

  async function loadQuote() {
    const fallback = getDailyQuote(BACKUP_QUOTES);
    try {
      const today = todayStr();
      const cached = await storage.get('dop_quote_' + today);
      if (cached && cached.value) { setQuote(JSON.parse(cached.value)); return; }
      const q = await fetchDailyQuote();
      setQuote(q);
      try { await storage.set('dop_quote_' + today, JSON.stringify(q)); } catch (_) {}
    } catch (_) {
      setQuote(fallback);
    }
  }

  async function saveForm(next) {
    setForm(next);
    try {
      await storage.set(sk + 'form_' + next.date, JSON.stringify(next));
      const dates = archiveDates.slice();
      if (!dates.includes(next.date)) {
        dates.push(next.date);
        setArchiveDates(dates);
        await storage.set(sk + 'archiveDates', JSON.stringify(dates));
      }
    } catch (_) {}
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  const upd = (f, v) => saveForm({ ...form, [f]: v });

  const toggleAM = id => {
    const c = { ...form.amChecks };
    c[id] = !c[id];
    saveForm({ ...form, amChecks: c });
  };
  const toggleAMPitAll = () => {
    const c = { ...form.amChecks };
    const allChecked = AM_SUB_IDS.every(id => !!c[id]);
    AM_SUB_IDS.forEach(id => { c[id] = !allChecked; });
    c['pit'] = !allChecked;
    saveForm({ ...form, amChecks: c });
  };
  const togglePM = id => {
    const c = { ...form.pmChecks };
    c[id] = !c[id];
    saveForm({ ...form, pmChecks: c });
  };

  async function saveSetup(s) {
    setSetup(s);
    try { await storage.set(sk + 'setup', JSON.stringify(s)); } catch (_) {}
    setView('form');
  }

  function goToday() {
    setArchiveDate(null);
    setView('form');
    (async () => {
      try {
        const today = todayStr();
        const fd = await storage.get(sk + 'form_' + today);
        if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(today));
      } catch (_) { setForm(emptyForm()); }
    })();
  }

  async function loadArchive(dateStr) {
    try {
      const fd = await storage.get(sk + 'form_' + dateStr);
      if (fd && fd.value) setForm(JSON.parse(fd.value)); else setForm(emptyForm(dateStr));
    } catch (_) { setForm(emptyForm(dateStr)); }
    setArchiveDate(dateStr);
    setView('form');
  }

  // ─── Login gate ───────────────────────────────────────────────────────────
  if (!user) {
    return <LoginScreen onLogin={u => { setUser(u); setFirstName(u); }} />;
  }

  // ─── First-time setup gate ─────────────────────────────────────────────────
  if (!setup.setupComplete) {
    return <SetupScreen setup={setup} onSave={saveSetup} isFirstTime={true} />;
  }

  // ─── Setup view ───────────────────────────────────────────────────────────
  if (view === 'setup') {
    return <SetupScreen setup={setup} onSave={saveSetup} onCancel={() => setView('form')} isFirstTime={false} />;
  }

  // ─── Build ordered row lists ───────────────────────────────────────────────
  const amOrder = setup.amOrder || ['pit'];
  const allAMRows = [];
  amOrder.forEach(id => {
    if (id === 'pit') {
      allAMRows.push(AM_STANDARD[0]);
      AM_SUB_IDS.forEach(subId => {
        const si = AM_STANDARD.find(i => i.id === subId);
        if (si) allAMRows.push(si);
      });
      return;
    }
    const item = findAMItem(id);
    if (!item) {
      const label = setup.amCustomLabels?.[id];
      if (label && label.trim()) allAMRows.push({ id, label, sub: false });
      return;
    }
    if (setup.amCommonSelected.includes(id)) allAMRows.push(item);
  });

  const pmOrder = setup.pmOrder || ['prep_tomorrow', 'evening_meal', 'pm_pit'];
  const allPMRows = [];
  pmOrder.forEach(id => {
    if (id === 'pm_pit') {
      const pitItem = PM_STANDARD.find(i => i.id === 'pm_pit');
      if (pitItem) allPMRows.push(pitItem);
      PM_SUB_IDS.forEach(subId => {
        const si = PM_STANDARD.find(i => i.id === subId);
        if (si) allPMRows.push(si);
      });
      return;
    }
    const item = findPMItem(id);
    if (!item) {
      const label = setup.pmCustomLabels?.[id];
      if (label && label.trim()) allPMRows.push({ id, label, sub: false });
      return;
    }
    const inStd = setup.pmSelected?.includes(id);
    const inCom = (setup.pmCommonSelected || []).includes(id);
    if (inStd || inCom || item.locked) {
      if (id === 'pm_bed') allPMRows.push({ ...item, desc: 'Target: ' + (setup.bedtime || '9:00 PM') });
      else allPMRows.push(item);
    }
  });

  const amDone = allAMRows.filter(i => form.amChecks?.[i.id]).length;
  const pmDone = allPMRows.filter(i => form.pmChecks?.[i.id]).length;
  const totalDone = amDone + pmDone + (form.morningEval !== null ? 1 : 0) + (form.eveningEval !== null ? 1 : 0);
  const totalItems = allAMRows.length + allPMRows.length + 2;
  const complete = isDayComplete(form);
  const isToday = !archiveDate || archiveDate === todayStr();
  const progressLabel = complete ? 'Day Complete' : `${totalDone} / ${totalItems}`;

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'sans-serif' }} onClick={() => setShowDatePicker(false)}>
      {showInstructions && (
        <FormInstructionsModal onClose={() => {
          setShowInstructions(false);
          localStorage.setItem('dop_instructions_seen', '1');
        }} />
      )}

      {/* Sticky Nav */}
      <div style={{
        background: '#111', borderBottom: `2px solid ${GOLD}`, minHeight: 56,
        display: 'flex', alignItems: 'center', padding: '0 16px',
        position: 'sticky', top: 0, zIndex: 100, gap: 12,
      }}>
        <img src={LOGO_SRC} alt="JPG" style={{ height: 36, width: 'auto', flexShrink: 0 }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0 }}>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>D</span>
          <span style={{ color: '#ccc', fontWeight: 600, fontSize: 10, marginRight: 3 }}>aily</span>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>O</span>
          <span style={{ color: '#ccc', fontWeight: 600, fontSize: 10, marginRight: 3 }}>perational</span>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>P</span>
          <span style={{ color: '#ccc', fontWeight: 600, fontSize: 10 }}>rocess</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
          {[
            ['Today', goToday, view === 'form' && isToday],
            ['Archive', () => setView('archive'), view === 'archive'],
            ['Setup', () => setView('setup'), view === 'setup'],
          ].map(([label, onClick, active]) => (
            <button key={label} onClick={onClick} style={{
              background: 'transparent', border: 'none',
              color: active ? GOLD : '#888', fontWeight: 600, fontSize: 12,
              cursor: 'pointer', padding: '4px 8px',
            }}>{label}</button>
          ))}
          <button
            onClick={() => setShowInstructions(true)}
            style={{ background: GOLD, border: 'none', color: '#fff', fontWeight: 700, fontSize: 11, cursor: 'pointer', padding: '3px 8px', borderRadius: 4, marginLeft: 4 }}
          >Set-Up and Instructions</button>
        </div>

        <div style={{ marginLeft: 8 }}>
          <div style={{
            background: complete ? GOLD : '#2a2a2a',
            color: complete ? '#fff' : '#888',
            borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, transition: 'all 0.3s',
          }}>{progressLabel}</div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {streak > 0 && (
            <div style={{ background: GOLD, color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
              {streak}🔥
            </div>
          )}
          <span style={{ color: '#aaa', fontSize: 12 }}>{firstName}</span>
          <button
            onClick={() => { setUser(null); setFirstName(''); }}
            style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}
          >Logout</button>
        </div>
      </div>

      {/* Archive view */}
      {view === 'archive' && <ArchiveView archiveDates={archiveDates} loadArchive={loadArchive} />}

      {/* Main form view */}
      {view === 'form' && (
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 0 60px' }}>
          {/* Brand bar */}
          <div style={{ background: '#fff', borderBottom: `1px solid ${GOLD}`, padding: '16px 20px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="JPG" style={{ height: 76, width: 'auto', flexShrink: 0, display: 'block' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
                <span style={{ fontSize: 38, fontWeight: 900, color: '#000', lineHeight: 1 }}>D</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: 0.5, marginRight: 6 }}>aily</span>
                <span style={{ fontSize: 38, fontWeight: 900, color: '#000', lineHeight: 1 }}>O</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: 0.5, marginRight: 6 }}>perational</span>
                <span style={{ fontSize: 38, fontWeight: 900, color: '#000', lineHeight: 1 }}>P</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: 0.5 }}>rocess</span>
              </div>

              {/* Date picker */}
              <div style={{ position: 'relative', display: 'inline-block', marginTop: 2 }} onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setShowDatePicker(p => !p)}
                  style={{
                    background: '#fff', border: `1px solid ${GOLD}`, borderRadius: 5,
                    padding: '4px 14px', fontSize: 12, fontWeight: 600, color: DARK,
                    cursor: 'pointer', letterSpacing: 0.3,
                  }}
                >
                  {fmtDate(form.date)}
                  <span style={{ marginLeft: 8, fontSize: 16, color: GOLD, lineHeight: 1 }}>▾</span>
                </button>
                {showDatePicker && (
                  <div style={{
                    position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)',
                    background: '#fff', border: `1px solid ${GOLD}`, borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: 12, zIndex: 200, minWidth: 260,
                  }}>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Jump to date
                    </div>
                    <input
                      type="date"
                      value={form.date}
                      max={todayStr()}
                      onChange={e => {
                        const newDate = e.target.value;
                        if (!newDate) return;
                        setShowDatePicker(false);
                        if (newDate === todayStr()) goToday(); else loadArchive(newDate);
                      }}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: 5, border: `1px solid ${GOLD}`, fontSize: 13, fontFamily: 'sans-serif', boxSizing: 'border-box' }}
                    />
                    {archiveDate && (
                      <button
                        onClick={() => { setShowDatePicker(false); goToday(); }}
                        style={{ width: '100%', marginTop: 8, padding: '6px', borderRadius: 5, border: `1px solid ${GOLD}`, background: '#fff', color: DARK, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                      >Back to Today</button>
                    )}
                  </div>
                )}
              </div>

              {/* Never Twice */}
              <div style={{ marginTop: 8, border: `1.5px solid ${GOLD}`, borderRadius: 5, padding: '3px 12px', display: 'inline-block' }}>
                <span style={{ fontWeight: 800, fontSize: 11, color: DARK }}>Never Twice</span>
                <span style={{ fontSize: 9, color: GOLD, marginLeft: 8 }}>Miss one — never miss the second.</span>
              </div>
            </div>
            <div style={{ width: 72, flexShrink: 0 }} />
          </div>

          {/* Archive banner */}
          {!isToday && (
            <div style={{ background: '#fff3cd', borderBottom: '2px solid #ffc107', padding: '8px 20px', fontSize: 12, color: '#856404', fontWeight: 600 }}>
              Viewing: {fmtDate(form.date)} —{' '}
              <span onClick={goToday} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Back to Today</span>
            </div>
          )}

          <div style={{ padding: '14px 16px 0' }}>
            <AMBlock
              form={form}
              setup={setup}
              allAMRows={allAMRows}
              amDone={amDone}
              toggleAM={toggleAM}
              toggleAMPitAll={toggleAMPitAll}
              upd={upd}
              saveForm={saveForm}
              quote={quote}
            />
            <PMBlock
              form={form}
              setup={setup}
              allPMRows={allPMRows}
              pmDone={pmDone}
              togglePM={togglePM}
              upd={upd}
              saveForm={saveForm}
              complete={complete}
              saved={saved}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 9. Instructions Components — Confirmed File Names and Contents

There are **two** instructions-related components in this codebase:

| File | Role |
|------|------|
| `components/FormInstructionsModal.jsx` | Full-screen modal overlay — triggered by "Set-Up and Instructions" button in the nav bar, and auto-shown on first visit after setup |
| `components/SetupInstructions.jsx` | Collapsible accordion panel — rendered at the top of `SetupScreen` only |

Both are included in full below.

### components/FormInstructionsModal.jsx

```jsx
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
```

### components/SetupInstructions.jsx

```jsx
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
```
