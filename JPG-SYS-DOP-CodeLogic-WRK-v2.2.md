# JPG — DOP CODE LOGIC
## Daily Operational Process — Full App Code Logic and Build Reference
**Document ID:** JPG-SYS-DOP-CodeLogic-WRK-v2.2
**Date:** 07/15/2026 | **Prepared by:** Claude | **State:** WRK
**Classification:** CLASS 1 — CONFIDENTIAL
**SCOPE:** Full DOP app — 4x4 Matrix logic, UI parameters, color system, component decisions, build status, and pending verification list. Single source of truth for everything DOP.

---

## PURPOSE OF THIS DOCUMENT

This is the single source of truth for everything about the DOP app — logic rules, UI parameters, color values, component decisions, build status, and locked design decisions.

**Update rule:** at the end of every DOP session, add new decisions to the appropriate section before handoff. Nothing about DOP is decided in chat and not recorded here.

**Travels with:**
- JPG-SYS-PRIMER-SessionHandoff-WRK (current version)
- JPG-SYS-Apps-TroubleshootingGuide-WRK (current version)

---

## SECTION A — DOP APP IDENTITY

- **App name:** Daily Operational Process (DOP)
- **Dev port:** 5173
- **Repo:** Doug2752/JPG-DOP-App
- **Local folder:** C:\JPG-PROJECTS\JPG-DOP-App
- **Framework:** React + Vite, Class 3 modular structure
- **Storage:** localStorage (pre-Supabase)
- **Test login:** Test / JPG2026 (case-insensitive)
- **Browser for testing:** Firefox (localhost:5173)
- **Daily-use browser:** Brave (auto-opens 5173 — stop Brave before starting dev server during work hours)
- **CLAUDE.md:** exists in repo root. Refreshed 07/15/2026 — CURRENT BUILD STATE is current as of this session.

---

## SECTION B — COLOR SYSTEM (LOCKED)

All color constants live in utils\constants.js.

| Constant | Hex | Role |
|---|---|---|
| GOLD | #B8860B | Informational/non-interactive elements. Section headers, footer CONFIDENTIAL, NEVER TWICE box background, result panels, status bars, 4x4 GRADUATE badge, grace window banner. Black text + 1.5px solid black border on light backgrounds. |
| GOLD_LIGHT | #ddb94a | Clickable/action elements. +Add, nav buttons, ENTER button, toggles, Open PIT button background. Black text + 1.5px solid black border on light backgrounds. |
| STEEL | #4a6fa5 | AM block distinction. Used in AMBlock.jsx/PMBlock.jsx and Setup screen. |
| DARK | #1a1a1a | Dark backgrounds (Tomorrow's Priorities header). |
| BORDER | #d0c8b8 | Table/box borders. |

**Two-tier gold rule (locked):** GOLD_LIGHT = clickable/action. GOLD = informational/non-interactive. Both: black text + 1.5px solid black border on light/white backgrounds. Exception: elements on dark/black nav bar get NO black border.

**NEVER use #B8962E** — deprecated gold.

**RED/RED_LIGHT:** scoped exclusively to Tomorrow's Priorities section. Leave untouched.

---

## SECTION C — UI PARAMETERS (LOCKED)

### Footer
- **Doc ID:** JPG-PROJ-APP-DOP-BUILD-v13
- **CONFIDENTIAL color:** GOLD (#B8860B), fontWeight 700
- **File:** components\PMBlock.jsx lines 163–169
- **Committed:** 07/07/2026

### Open PIT Button (PITButton)
- **File:** components\Shared.jsx
- **Background:** GOLD_LIGHT (#ddb94a), Border: 1.5px solid #000, BorderRadius: 5
- **Padding:** 5px 14px, Display: flex width 100%, FontSize: 15, FontWeight: 900
- **Committed:** 07/07/2026

### NEVER TWICE Box
- **File:** components\BrandBar.jsx lines 66–81
- **Background:** GOLD (#B8860B), Border: 1.5px solid #000, BorderRadius: 5
- **Title:** fontSize 15, fontWeight 900, color #000, uppercase
- **Subtitle:** fontSize 8, fontWeight 600, color #000

### Tomorrow's Priorities Box
- **File:** components\PMBlock.jsx lines 72–107
- **All corners:** fully square (borderRadius: 0)
- **Committed:** 07/07/2026

### AM/PM Block Completion Counters
- **AM:** {amDone} / {allAMRows.length} done
- **PM:** {pmDone} / {allPMRows.filter(i => i.id !== 'pm_eval').length} done (pm_eval excluded)
- **Files:** AMBlock.jsx line 35, PMBlock.jsx line 15

### AM Common Life Tasks — Default Order
Make Bed (Recommended), AM Fitness (Recommended), Personal Prep (Recommended), Breakfast (Recommended). AM Routine Complete: last item.
- **Committed:** 07/07/2026

### Grace Window Reminder Banner (07/07/2026)
- **File:** components\PMBlock.jsx
- **Position:** inside PMBlock, lines 139–147, immediately above PM Lock box
- **Visibility:** active 4x4 period exists + current date within close window + period not yet closed (showGraceBanner flag at line 15)
- **Copy:** "Your [Month] period is ready to close — You have [X] days left before it auto-closes." (day 0: "0 days left, closing today.")
- **Styling:** background GOLD, 1.5px solid #000, borderRadius 5, padding 10px 16px, fontWeight 700, fontSize 13, textAlign center
- **Committed:** 07/07/2026. Real-world verification pending Section H.

### 4x4 GRADUATE Badge (07/07/2026)
- **File:** components\Shared.jsx lines 64–72 (CheckRow component)
- **Data flag:** graduated_from_4x4: true on item record
- **Styling:** gold pill, black text, renders inline with item label on Today and Archive
- **Committed:** 07/07/2026. Real-world verification pending Section H.

### "Show instructions on first visit" flag
- **Storage key:** dop_instructions_seen (raw localStorage.getItem — not the storage service)
- **File:** DOPApp.jsx lines 98, 292, 305, 353
- **Behavior:** modal opens automatically if key is absent AND setup.setupComplete is true; can be reopened manually
- **Status:** confirmed built. Investigated 07/15/2026 — no removeItem exists anywhere in the app. Logout clears React state only; localStorage persists. The "flag not resetting when setup key is cleared" scenario is DevTools-only, not a client-facing bug. Closed — no fix needed pre-launch.

### 4x4 Setup Auto-Save (07/13/2026)
- **File:** components\FourX4View.jsx
- **Storage key per card:** dop_4x4_draft_{user}_{slot} where slot = 0–3
- **Write trigger:** every call to updateDraft() writes the updated draft object to storage synchronously via services/storage.js. Write happens inside updateDraft (line 493) immediately after setDrafts, guarded by `if (updated)`. Not awaited (underlying localStorage.setItem is synchronous).
- **Mount precedence (lines 382–401):** for each slot 0–3, if active protocol record exists (loaded[i]), load record and ignore draft. If loaded[i] absent, draft-fallback branch (lines 390–401) reads draft from `dop_4x4_draft_${user}_${i}`, JSON.parse inside try/catch, falls back to emptyDraft() on parse error or absence.
- **Draft clear (lines 738–740):** runSave 4-iteration loop clearing `dop_4x4_draft_${user}_0` through `_3` via storage.delete, positioned after successful protocol write (734–737) and before setSaved(true) (742).
- **Enforcement rules:** unchanged — still fire only at Save, not on draft writes.
- **Mid-period edit warning modal:** unchanged — still fires at Save on committed protocols only.
- **Committed:** 07/13/2026 (commit 82615ba)

### Mount Field Load Fix (07/13/2026)
- **File:** components\FourX4View.jsx lines 382–386
- **Issue:** mount useEffect nextDrafts mapping omitted the 5 enforcement fields added in v2.0 build. Existing records loaded them back as undefined.
- **Fix:** added measurable_value (`?? null`), measurable_unit (`|| ''`), deact_declaration (`|| ''`), deact_frequency (`?? null`), deact_uses_weekly_target (`=== true`) to the mapping with correct fallbacks.
- **Committed:** 07/13/2026 (commit 82615ba)

### Setup Instructions — 4x4 Pointer (07/15/2026)
- **File:** components\FormInstructionsModal.jsx
- **Position:** index 9 in SECTIONS array — after Today's Takeaway (index 8), before Evening Evaluation (index 9, now shifted to 10)
- **Total sections:** 18
- **Copy:** "The 4x4 Matrix has its own instructions panel. Go to the 4x4 tab and select Instructions to view setup guidance, protocol rules, and examples."
- **Committed:** 07/15/2026

### UTC Date Rollover — Known Behavior (documented 07/15/2026)
- **File:** utils/date.js line 2
- **Behavior:** `todayStr()` uses `new Date().toISOString().slice(0,10)` — UTC. At ~5pm Pacific (UTC-7), app displays the next calendar day.
- **Decision:** leave as-is. Period close logic and daily card calculations are deliberately UTC-anchored throughout (fourX4Period.js, FourX4DailyCard.jsx, PMBlock.jsx). Changing todayStr() would affect the entire chain.
- **Client impact:** minimal — most daily entry happens in the morning. Edge case only at end of day.

---

## SECTION D — KNOWN GAPS / BACKLOG

### Active scoping — not yet built:

1. **Setup Instructions full copy pass** — Step 5/Priority 2. Writing rules: spell out N-I-T as "Notes – Ideas – Thoughts" on first use; ~30-minute total DOP time frame should include PIT's AM time; day-complete canonical wording locked: "Score both AM and PM evaluations and minimally check off completed required items to mark the day complete." HOLD: Alteration protocol type must be built first — instructions should reflect final feature set.

2. **Alteration protocol type** — third option beyond activation/deactivation for significant activity alteration. Dedicated scoping session required before any code. Confirmed absent from codebase.

3. **AM Lock box styling fix + Today's Takeaway sizing** — confirmed done 07/15/2026 per Doug. Remove from backlog.

4. **4x4 period start date backdate** — under review. Decision pending. Do not build without explicit direction.

5. **CLAUDE.md build state** — refreshed 07/15/2026. Current.

### Flagged, not scoped:
- 4x4 Matrix Alteration option — dedicated scoping session required (see Item 2 above)

### Post-Supabase (do not build):
- Tomorrow's Priorities → PIT transfer
- PIT-link buttons (placeholder URL)
- AI quote API key wiring

### Closed / Verified (not build items):

**DOP day-complete requires both AM and PM — VERIFIED CLOSED
(07/15/2026)**
Concern: clicking AM Lock alone might mark the day complete.
Verified via Sonnet code read: isDayComplete() in utils/form.js
requires all four conditions — morningEval !== null, eveningEval
!== null, at least one amChecks value truthy, and at least one
pmChecks value truthy OR pmGood/pmBad text filled. AM Lock writes
only amLocked and amLockedAt — it touches none of those four
fields. No side effects or auto-set paths exist anywhere in the
codebase. The behavior is correct as-built. No code change needed.

---

## SECTION E — COMPONENT ARCHITECTURE

Key files:
- **app\DOPApp.jsx** — root, state, storage, routing
- **components\FourX4View.jsx** — entire 4x4 matrix UI and save logic
- **components\FourX4DailyCard.jsx** — daily checkoff card (Today tab)
- **components\AMBlock.jsx** — AM block
- **components\PMBlock.jsx** — PM block, footer, grace window banner
- **components\BrandBar.jsx** — NEVER TWICE box
- **components\Shared.jsx** — Open PIT button, CheckRow (with GRADUATE badge), QuoteBox
- **components\FormInstructionsModal.jsx** — DOP Setup Instructions modal (18 sections)
- **utils\fourX4Period.js** — period close, graduation, remediate, tier cap
- **utils\form.js** — emptyForm, form helpers
- **utils\date.js** — todayStr() (UTC), fmtDate() (local display)
- **utils\constants.js** — color constants, AM_COMMON, FOUNDATIONS, etc.

---

## SECTION F — STORAGE KEYS (CONFIRMED IN CODE 07/13/2026)

| Key pattern | File(s) using it |
|---|---|
| `{user}_dop7_setup` | DOPApp.jsx, fourX4Period.js |
| `{sk}form_{date}` | DOPApp.jsx, fourX4Period.js |
| `{sk}archiveDates` | DOPApp.jsx, fourX4Period.js |
| `{sk}streak` | DOPApp.jsx |
| `dop_quote_{today}` | DOPApp.jsx |
| `dop_instructions_seen` (raw localStorage) | DOPApp.jsx |
| `4x4_tier_{user}` | FourX4View.jsx, fourX4Period.js |
| `4x4_protocols_{user}` | FourX4View.jsx, fourX4Period.js |
| `4x4_history_{user}` | FourX4View.jsx, fourX4Period.js |
| `dop_4x4_draft_{user}_{0-3}` | FourX4View.jsx — auto-save draft keys only |

---

## SECTION G — 4x4 MATRIX SYSTEM LOGIC

### CATEGORY 01 — DATA MODEL AND FIELD DEFINITIONS

**Protocol Record — full field list:**

| Field | Type | Notes |
|---|---|---|
| id | string | 4x4_{timestamp}_{foundation_core} |
| foundation_core | string | fitness / nutrition / sleep / mental_spiritual |
| name | string | Client-entered, uppercased. No minimum word count enforced (Rule 1 removed 07/15/2026). |
| type | string | activation / deactivation |
| time_of_day | string | am / pm / both |
| frequency | string | daily / weekly_target |
| weekly_target | integer or null | Min 3 when frequency: weekly_target. Null when daily. |
| time_cost_minutes | number or null | Signed integer. Null = DNA. Activations: min 10 (unless DNA). Deactivations: client enters positive value, app auto-negates to negative on onChange. |
| measurable_value | number or null | Required for activations. Null for deactivations. |
| measurable_unit | string or null | Unit from dropdown (10 options — minutes and hours removed 07/15/2026). Required for activations. minutes/hours blocked by Rule 2. |
| deact_declaration | string or null | Required for deactivations. Min 3 chars. |
| deact_frequency | integer or null | Optional for deactivations when deact_uses_weekly_target true. Min 3. |
| deact_uses_weekly_target | boolean | Whether deactivation uses weekly frequency (vs binary). |
| month_set | string | ISO year-month e.g. 2026-07 |
| active_from | string | ISO date. Always 1st of month_set. |
| active_until | string or null | Actual close date. Null while active. |
| status | string | active / history / incomplete |
| core_outcome | string or null | advanced / retry / incomplete. Null while active. |
| cycle_id | string | Groups records across retry/continuation chains. |
| attempt_number | integer | Sequence within cycle_id chain. |
| linked_to | string or null | id of prior record in chain. |
| coach_overridden | boolean | Always false — coach dashboard feature (post-Supabase). |
| coach_override_min_frequency | boolean | Always false — post-Supabase. |
| is_keepin4x4 | boolean | Client chose Keep in 4x4 at graduation. |
| is_remediate_carry | boolean | System-forced carry from Remediate outcome. |
| prior_frequency | integer or null | Previous period's weekly_target (for 25% growth). |
| prior_time_cost | number or null | Previous period's time_cost_minutes (for 25% growth). |
| graduated_to_dop | boolean | Promoted to DOP AM/PM at graduation. |
| dop_item_id | string or null | DOP item ID for promoted protocol. |

### CATEGORY 02 — emptyDraft() SHAPE (confirmed 07/13/2026 lines 317–335)

```javascript
{
  foundation_core: null,
  name: '',
  type: null,
  time_of_day: null,
  frequency: null,
  weekly_target: null,
  time_cost_minutes: null,
  timeDNA: false,
  measurable_value: null,
  measurable_unit: '',
  deact_declaration: '',
  deact_frequency: null,
  deact_uses_weekly_target: false,
  carryover: null,
  is_remediate_carry: false,
}
```

### CATEGORY 03 — TIERED TIME GOVERNOR

- **Tier 1 (baseline):** net daily time cost cap = +30 minutes
- **Tier 2 (earned):** unlocks at ≥85% prior period consistency score. Cap = +60 minutes.
- **Hard ceiling:** +60 minutes absolute max. Coach dashboard bypass only (post-Supabase).
- **Formula:** net = sum(activation time costs) − sum(deactivation time saved)
- **DNA:** contributes 0 to net cost.
- **Graduated protocols:** time_cost_minutes stops counting toward budget.

### CATEGORY 04 — AUDIT BANDS

| completion_rate | audit_outcome | Result |
|---|---|---|
| >= 0.85 | unlocked | Progress, may unlock Tier 2 |
| 0.75 – 0.84 | standard | Progress, Tier 1 cap maintained |
| < 0.75 | remediate | Auto-carry into next period |

### CATEGORY 05 — PERIOD CLOSE LOGIC

- **Valid close window:** last day of target month through last day + 5 grace days
- **Manual close:** writes History Snapshot per Foundation Core. core_outcome set to null (graduation decides).
- **Auto-close on grace expiry:** runs on DOP load via runAutoCloseCheck(). Sets status: incomplete, core_outcome: incomplete.
- **Files:** components/FourX4View.jsx, app/DOPApp.jsx, utils/fourX4Period.js

### CATEGORY 06 — GRADUATION WORKFLOW

**Decision Screen:** appears after period close. One card per Foundation Core. Remediate cards: cream background, dashed gold border. Must choose all 4 before proceeding.

**PROMOTE:** graduated_to_dop true. core_outcome: advanced. New DOP AM/PM item with graduated_from_4x4: true. Renders 4x4 GRADUATE badge.

**DROP:** core_outcome: retry. Slot opens for new protocol.

**KEEP IN 4x4:** is_keepin4x4 true. cycle_id carried. 25% growth rule enforced at next Save.

**Summary Screen:** Promoted / Dropped / Continuing in 4x4. DONE button returns to Today.

### CATEGORY 07 — HISTORY SCREEN RULES

- Attempt N label: shown when attempt_number > 1, Remediate chains only
- Month N label: shown when attempt_number > 1, Keep-in-4x4 chains only
- Label hidden when attempt_number = 1

### CATEGORY 08 — FREQUENCY AND SCHEDULING

- **Daily:** binary toggle each day.
- **Weekly target:** target count per Mon-Sun week. Min 3 enforced at save.
- **No fixed-day scheduling** — daily or weekly target only.

### CATEGORY 09 — FOUNDATION CORES

Four cores, one per protocol card per period:
- Fitness (Output)
- Nutrition (Fuel)
- Sleep (Recovery)
- Mental / Spiritual Health (Processing)

Each Core claimed by one card only. Clicking a Core already claimed moves it to the new card and clears from old card.

### CATEGORY 10 — DNA FIELD RULES

- DNA and numeric time input are mutually exclusive.
- DNA deactivation satisfies minimum-1-deactivation rule.
- DNA contribution to net time cost = 0.
- Turning DNA on clears time_cost_minutes in same update.

### CATEGORY 11 — SETUP SCREEN (4x4 TAB)

- 4x4 tab greyed out until DOP Configure completed.
- Four internal sections: Set Up/Edit, Instructions, History, Metrics.
- Daily checkoff lives in Today tab — NOT in 4x4 tab.
- Manual Save button — auto-save for draft-only field changes is built (see Section C — 4x4 Setup Auto-Save). Save button still commits protocols with full enforcement.

### CATEGORY 12 — COMMON PROTOCOL EXAMPLES

- Static reference list in Set Up/Edit screen, top-right.
- Sorted by Foundation Core: Fitness (line 1056), Nutrition (1074), Sleep (1094), Mental / Spiritual Health (1111).
- Each section has ACTIVATIONS and DEACTIVATIONS subsections.
- All values use bracket notation [distance], [duration], [frequency], [quantity], [time], [temperature], [specific food] — client fills in their own values.
- Ideas only, not requirements. Coach quality-reviews at weekly submission.
- **Committed:** 07/13/2026 (rewritten from prior vague list)

### CATEGORY 13 — MID-PERIOD EDIT WARNING

Modal fires when: active period exists AND client changed a field vs prefilled values.
Copy: "Your current progress is saved. Changes apply from today forward. Continue?"
CONFIRM: runs full save flow. CANCEL: dismisses.
**BUILT AND COMMITTED — FourX4View.jsx lines 983–1000+.**

### CATEGORY 14 — PERIOD EDGE CASES

- DNA-only period: valid. Net cost = 0.
- Deactivation savings > activation costs: valid. Net can be negative.
- Zero-completion period: valid. Records 0/N rate.

### CATEGORY 15 — LOCKED TERMINOLOGY

- "Protocol" — not "habit," "task," or "rule."
- Card titles: Protocol #1 through Protocol #4.
- Foundation Core selector: explicit client assignment.

### CATEGORY 16 — PROTOCOL ENFORCEMENT RULES (updated 07/15/2026)

All rules enforced at Save in runSave() (FourX4View.jsx). Current block order:

**Rule 1 — REMOVED (07/15/2026):**
5-word name minimum removed. Coach reviews naming quality at weekly submission. The shortName const and if block are gone from runSave().

**Rule 2 — Activation measurable target required (refined 07/15/2026) — lines 593–608:**
```
const TIME_UNITS = ['minutes', 'hours'];
const missingMeasurable = drafts.find(
  d => d.type === 'activation' &&
    (d.measurable_value === null ||
     !d.measurable_unit ||
     TIME_UNITS.includes(d.measurable_unit))
);
```
Blocks when: measurable_value null, measurable_unit empty, OR unit is minutes/hours.
Error message points client to Time added field for time-based targets.
Unit dropdown reduced from 12 to 10 options — minutes and hours removed from UI.

**Rule 3 — Activation time floor 10 minutes (unless DNA):**
d.type === 'activation' && !timeDNA && time_cost_minutes !== null && time_cost_minutes < 10 → blocked.

**Rule 4 — Deactivation declaration required:**
d.type === 'deactivation' && (!deact_declaration || deact_declaration.trim().length < 3) → blocked.

**Rule 5 — Deactivation weekly target minimum 3 (when used):**
d.type === 'deactivation' && deact_uses_weekly_target && (deact_frequency === null || deact_frequency < 3) → blocked.
Note: deact_frequency input also clamps on onChange (v < 3 ? 3 : v) — UI-level defense before enforcement fires.

**Deactivation Time saved field (updated 07/15/2026):**
- Label: 'Time saved (min)' (simplified — "enter negative number" instruction removed)
- max attribute: removed (was max=0)
- onChange: auto-negates positive input — client enters 15, stored as -15. Negative values stored as-is. Zero stored as-is.

**Card UI fields:**
- Activation only: Measurable Target — number input + unit dropdown (10 options: times, grams, ounces, calories, miles, meters, kilometers, steps, servings, other)
- Deactivation only: "What specific behavior are you stopping or reducing?" text input
- Deactivation only: Frequency — Binary / Weekly Target toggle. Weekly Target shows min-3 number input.

**Coach override:** coach_overridden and coach_override_min_frequency fields exist in data model (always false currently). Post-Supabase coach dashboard will set these to bypass enforcement gates.

### CATEGORY 17 — VITEST TEST INFRASTRUCTURE (07/15/2026)

- **Location:** tests/ folder in project root (separate from app code)
- **Config:** vitest.config.js in project root — separate from vite.config.js (untouched)
- **Setup:** tests/setupTests.js — imports @testing-library/jest-dom
- **Test files:**
  - tests/smoke.test.jsx — 1 test, confirms JSX render pipeline
  - tests/enforcement.test.js — 15 tests, Rules 1–5 logic (reproduced conditions, no component mount)
  - tests/autosave.test.js — 5 tests, storage write / draft restore / draft clear
- **Total:** 21 passing tests (3 files)
- **Run command:** npm test (vitest run)
- **Note:** enforcement and autosave tests use reproduced logic copies — they test contracts, not live component code. Changes inside FourX4View.jsx will not be caught unless test helpers are updated.
- **Committed:** 07/15/2026

---

### CATEGORY 18 — ALTERATION PROTOCOL TYPE (SCOPED 07/15/2026)

**What it is:** A modification to an existing committed protocol.
Not new, not removed — parameters changed. Two directions: scale
down (target was too aggressive) or scale up (client wants more).

**How it's initiated:** "Alter" button appears on each committed
protocol card in Set Up/Edit. Not available on empty cards. No
standalone Alteration type in the type selector.

**Hard limit:** One alteration per protocol per period. Once a
protocol has been altered, the Alter button is disabled for that
card for the remainder of the period.

**Workflow:**
1. Client clicks Alter on a committed card
2. Existing protocol fields pre-fill with current values
3. Client edits only what they want to change
4. Save runs full enforcement rules (inherited from underlying type)
5. Net time budget recalculates against current tier cap —
   blocked if over

**Mid-period alteration:** Allowed but not encouraged.
Pre-alteration completion history does not count toward consistency
score. Clock resets at alteration date.

**Data / history:**
- Original protocol record archived, not overwritten
- New altered record created, linked to original via linked_to /
  cycle_id / attempt_number chain
- Both records appear on History screen, judged independently

**Graduation decision screen:**
- Both original and altered versions appear as separate cards
- Each judged independently at period close

**Today tab daily checkoff:**
- Client sees altered version only after alteration date
- Original no longer appears on Today

**Enforcement:**
- Inherits rules of underlying type (activation or deactivation)
- Net time budget recalculates — tier cap enforced at Save

**Coach notification flag:** Post-Supabase only. No pre-launch
build. Flag fires when alteration occurs mid-period or when
altered protocol appears in period close history.

**Build status:** SCOPED ONLY — not yet built. Dedicated build
session required. Setup Instructions full copy pass is on hold
until this feature is built — instructions must reflect final
feature set.

---

## SECTION H — PENDING REAL-WORLD VERIFICATION (July 31 period close)

### Primary (must verify at first real period close):
- reloadFourX4 fix — promoted protocols appear on Today without reload (code present in DOPApp.jsx, not yet committed — awaiting July 31 verification)
- evaluateAndWriteTierCap — 30→60 minute cap unlock fires correctly (code present in fourX4Period.js, not yet committed — awaiting July 31 verification)
- Grace Window Reminder banner — correct copy, appears/disappears at right times
- 4x4 GRADUATE badge — renders on Today and Archive for promoted items

### Secondary (verified with simulated data, re-verify naturally):
- Graduation Decision screen
- Period Closed — Summary screen
- Period Close pieces 1–3

### Natural verification event:
First real period close at end of July 2026 (July 31 through Aug 5 grace window).

### Session-verified 07/13/2026:
- Test 1 — 5 new fields persist across reload: PASS (browser-verified Firefox localhost:5173)
- Auto-save wiring: PASS (code-trace-verified by Sonnet)

### Session-verified 07/15/2026:
- Unit dropdown — minutes and hours absent, 10 options confirmed: PASS (browser-verified)
- Deactivation Time saved auto-negate — entering 15 stores -15: PASS (browser-verified)
- 4x4 Matrix pointer in Setup Instructions at index 9: PASS (browser-verified)
- All 21 Vitest tests passing: PASS

---

## VERSION HISTORY

| VERSION | DATE | CHANGES |
|---|---|---|
| v1.0–v1.4 | 07/01–07/03/2026 | 4x4 Matrix initial build sessions. Data model, save validation, time governor, period close, graduation workflow. |
| v1.5 | 07/04/2026 | Mid-period edit warning, tier cap evaluation, weekly tally, reloadFourX4 fix built. |
| v1.6 | 07/05/2026 | Dead code removal. |
| v1.7 | 07/07/2026 | Document renamed from 4x4-CodeLogic to DOP-CodeLogic. Scope expanded to full DOP app. Sections A–F added. |
| v1.8 | 07/07/2026 | Grace window reminder banner built. 4x4 GRADUATE badge built. Section H added. |
| v1.9 | 07/11/2026 | amCustomItems null guard crash fix built. |
| v2.0 | 07/13/2026 | FourX4DailyCard infinite loop fix. Protocol enforcement rules built (5 rules). emptyDraft updated with 5 new fields. Card UI updated. Common Protocol Examples rewritten. Category 16 added. |
| v2.1 | 07/13/2026 | Mount field load fix. Per-card auto-save built. Section C, D, F, Category 11, 16 updated. |
| v2.2 | 07/15/2026 | Rule 1 (5-word name minimum) removed from runSave(). Rule 2 refined — TIME_UNITS constant blocks minutes/hours as measurable-target units; unit dropdown reduced from 12 to 10 options; error message updated. Deactivation Time saved field: label simplified, max=0 cap removed, onChange auto-negates positive input. Vitest Tier 1 test infrastructure added (tests/ folder, vitest.config.js, 21 passing tests — Category 17 added). Setup Instructions 4x4 pointer added at index 9 in FormInstructionsModal.jsx. CLAUDE.md refreshed. UTC date rollover behavior documented (Section C). "Show instructions on first visit" flag investigated — DevTools-only scenario, not a client bug, closed. AM Lock box confirmed done, removed from backlog. Section D backlog updated. |

---

*JPG-SYS-DOP-CodeLogic-WRK-v2.2 | Jones Performance Group LLC | CONFIDENTIAL | 07/15/2026*
