# JPG — DOP CODE LOGIC
## Daily Operational Process — Full App Code Logic and Build Reference
**Document ID:** JPG-SYS-DOP-CodeLogic-WRK-v2.7
**Date:** 07/25/2026 | **Prepared by:** Claude | **State:** WRK
**Classification:** CLASS 1 — CONFIDENTIAL
**Supersedes:** JPG-SYS-DOP-CodeLogic-WRK-v2.6
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
- **Test login:** Test / JPG2026 and Doug / JPG2026 (case-insensitive — confirmed in LoginScreen.jsx)
- **Browser for testing:** Firefox (localhost:5173)
- **Daily-use browser:** Brave (auto-opens 5173 — stop Brave before starting dev server during work hours)
- **CLAUDE.md:** exists in repo root. References DOP Code Logic v2.4 — update to v2.7 next session.

---

## SECTION B — COLOR SYSTEM (LOCKED)

All color constants live in utils\constants.js.

| Constant | Hex | Role |
|---|---|---|
| GOLD | #B8860B | Informational/non-interactive elements. Section headers, footer CONFIDENTIAL, NEVER TWICE box background, result panels, status bars, 4x4 GRADUATE badge, grace window banner. Black text + 1.5px solid black border on light backgrounds. |
| GOLD_LIGHT | #ddb94a | Clickable/action elements. +Add, nav buttons, ENTER button, toggles, Open PIT button background, Alter This Protocol button. Black text + 1.5px solid black border on light backgrounds. |
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
- **URL:** `http://localhost:5174?hub_user={userId}` — wired to userId prop (FIXED 07/25/2026)
- **userId prop:** passed from DOPApp → AMBlock and PMBlock → PITButton. `user` state available at all call sites.
- **Committed:** 07/07/2026; userId wiring added 07/25/2026

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

### Grace Window Reminder Banner
- **File:** components\PMBlock.jsx
- **Position:** inside PMBlock, immediately above PM Lock box
- **Visibility:** active 4x4 period exists + current date within close window + period not yet closed
- **Copy:** "Your [Month] period is ready to close — You have [X] days left before it auto-closes." (day 0: "0 days left, closing today.")
- **Styling:** background GOLD, 1.5px solid #000, borderRadius 5, padding 10px 16px, fontWeight 700, fontSize 13, textAlign center
- **Committed:** 07/07/2026. Real-world verification pending July 31.

### 4x4 GRADUATE Badge
- **File:** components\Shared.jsx lines 64–72 (CheckRow component)
- **Data flag:** graduated_from_4x4: true on item record
- **Styling:** gold pill, black text, renders inline with item label on Today and Archive
- **Committed:** 07/07/2026. Real-world verification pending July 31.

### "Show instructions on first visit" flag
- **Storage key:** dop_instructions_seen (raw localStorage.getItem)
- **File:** DOPApp.jsx lines 98, 292, 305, 353
- **Status:** CLOSED. No removeItem exists anywhere in the app. Logout clears React state only; localStorage persists. Not a client-facing bug.

### 4x4 Setup Auto-Save
- **File:** components\FourX4View.jsx
- **Storage key per card:** dop_4x4_draft_{user}_{slot} where slot = 0–3
- **Write trigger:** every call to updateDraft() writes the updated draft object to storage synchronously.
- **Mount precedence:** for each slot 0–3, if active protocol record exists, load record and ignore draft. If absent, draft-fallback branch reads draft from storage.
- **Draft clear:** runSave 4-iteration loop clearing all draft keys after successful protocol write.
- **Committed:** 07/13/2026

### Day Complete System (UPDATED 07/23/2026)
- **File:** utils\form.js — `isDayComplete()` function
- **Six required conditions (all must pass):**
  1. form must exist (non-null)
  2. morningEval must be non-null
  3. eveningEval must be non-null
  4. at least ONE amChecks value must be truthy
  5. pmLocked must be true (PM Block Complete button must have been clicked)
  6. amLocked must be true (AM Block Complete button must have been clicked) — ADDED 07/23/2026
  7. at least ONE pmChecks value truthy OR pmGood/pmBad has text
- **Canonical rule:** Score both AM and PM evaluations, minimally check off completed required items, and click both AM Block Complete and PM Block Complete to mark the day complete.

### Four-State Day Complete Display (NEW 07/23/2026)
- **File:** components\PMBlock.jsx
- **Replaces:** prior binary complete/incomplete display
- **State 1 — default/nothing done:** grey instructional text "Score both AM and PM evaluations and minimally check off completed required items to mark the day complete."
- **State 2 — AM done (morningEval non-null + amLocked + at least one amChecks truthy), PM not yet done:** gold text "✓ AM Complete"
- **State 3 — AM done + PM items done (eveningEval non-null + at least one pmChecks truthy) but pmLocked false:** gold text "✓ AM Complete · ✓ PM Items Done — PM Block Complete not yet clicked."
- **State 4 — all conditions met (complete prop true):** gold text "✓ Day Complete — Well executed."
- **amDone derivation:** `form.morningEval !== null && form.amLocked && form.amChecks && Object.values(form.amChecks).some(v => v)`
- **pmItemsDone derivation:** `form.eveningEval !== null && form.pmChecks && Object.values(form.pmChecks).some(v => v)`

### Mid-Period Edit Warning Modal
- **File:** components\FourX4View.jsx lines 983–1000+
- **Trigger:** active period exists AND client changed a field vs prefilled values
- **Copy:** "Your current progress is saved. Changes apply from today forward. Continue?"
- **CONFIRM:** runs full save flow. CANCEL: dismisses.
- **BUILT AND COMMITTED.**

### migrateSetup — amCommonSelected fix (FIXED 07/25/2026)
- **File:** utils\form.js
- **Bug:** the early-return `if (saved.amCustomItems && saved.pmCustomItems) return saved;` skipped injecting `amCommonSelected` when it was missing, causing SetupScreen to crash with a blank Configure tab.
- **Fix:** early-return branch now checks `if (!saved.amCommonSelected) return { ...saved, amCommonSelected: [] }` before returning saved object as-is.
- **Impact:** any browser with localStorage setup data predating the `amCommonSelected` field will now receive the missing field on next load instead of crashing.

### 4x4 Instructions Panel — Content (UPDATED 07/25/2026)
- **Sections:** 5 confirmed (What Is the 4x4 Matrix, How to Add a Protocol, How Your Progress Is Measured, Your Overall Time Budget, Closing Out the Month)
- **Section 3a — Altering a Protocol:** already present in How to Add a Protocol at step 3a. Full content confirmed in source — no new section needed.
- **Locked terminology fix (07/25/2026):** Section 5 "Closing Out the Month" — "habit" replaced with "protocol" per locked terminology rule. ("you can't repeat the same protocol at the same level and expect a different result.")
- **Grammar/punctuation pass:** completed 07/25/2026 — full text reviewed, one terminology fix applied (habit → protocol). No other grammar issues found.

---

## SECTION D — ACTIVE BUILD BACKLOG

### Active scoping — not yet built:
- (none — all active items closed this session)

### Pending real-world verification (July 31):
- reloadFourX4 fix — COMMITTED
- evaluateAndWriteTierCap — COMMITTED
- Grace Window Reminder banner — correct copy and timing
- 4x4 GRADUATE badge — renders correctly at graduation
- Alteration — both original and altered versions as separate graduation cards
- Graduation Decision screen
- Period Closed Summary screen
- Period Close pieces 1–3

### Post-Supabase (do not build):
- Tomorrow's Priorities → PIT transfer
- PIT-link buttons (production URL)
- AI quote API key wiring
- Alteration coach notification flag

### Closed this session:
- **Configure tab blank screen — FIXED 07/25/2026.** migrateSetup now injects amCommonSelected when missing. Browser localStorage cleared in Firefox to resolve stale data. Configure tab confirmed working.
- **AM Lock box styling fix — CLOSED 07/25/2026.** Reviewed in source — locked state button is gold-on-gold (no border, invisible). Doug confirmed acceptable as-is. No change needed.
- **4x4 Instructions panel: Alter This Protocol content — CLOSED 07/25/2026.** Content already exists at step 3a in How to Add a Protocol section. No new section needed.
- **4x4 Instructions panel: grammar/punctuation pass — CLOSED 07/25/2026.** Full text reviewed. One fix applied: "habit" → "protocol" in Section 5.

---

## SECTION E — COMPONENT ARCHITECTURE

Key files:
- **app\DOPApp.jsx** — root, state, storage, routing
- **components\FourX4View.jsx** — entire 4x4 matrix UI and save logic
- **components\FourX4DailyCard.jsx** — daily checkoff card (Today tab)
- **components\AMBlock.jsx** — AM block; now receives `user` prop for PITButton userId
- **components\PMBlock.jsx** — PM block, footer, grace window banner, four-state Day Complete display; now receives `user` prop for PITButton userId
- **components\BrandBar.jsx** — NEVER TWICE box
- **components\Shared.jsx** — PITButton (accepts userId prop, builds URL with hub_user param), CheckRow (with GRADUATE badge), QuoteBox
- **components\FormInstructionsModal.jsx** — DOP Setup Instructions modal (18 sections)
- **utils\fourX4Period.js** — period close, graduation, remediate, tier cap, alteration handling
- **utils\form.js** — emptyForm, isDayComplete (six-condition gate with amLocked and pmLocked), migrateSetup (amCommonSelected injection fix)
- **utils\date.js** — todayStr() (UTC), fmtDate() (local display)
- **utils\constants.js** — color constants, PIT_URL ('http://localhost:5174'), AM_COMMON, FOUNDATIONS, etc.

---

## SECTION F — STORAGE KEYS

- Per-user form prefix: `sk = <user>_dop7_`
- Daily form key pattern: `<user>_dop7_form_<date>`
- `dop_instructions_seen` — raw localStorage, global
- `4x4_history_<user>` — period history snapshots
- `dop_4x4_draft_<user>_0` through `_3` — per-card auto-save drafts
- `4x4_protocols_<user>` — active protocol records
- `4x4_tier_<user>` — tier cap tracking
- `dop_quote_<YYYY-MM-DD>` — daily quote cache

---

## SECTION G — KEY HANDLERS AND FUNCTIONS

**DOPApp.jsx:**
- `findAMItem`, `findPMItem` — item lookup helpers
- `loadQuote` — AI quote load with daily cache; falls back to BACKUP_QUOTES on API failure
- `saveForm` — writes form state to storage
- `upd` — generic field updater, dispatches to saveForm
- `toggleAMPitAll` — AM PIT items toggle
- `saveSetup` — writes setup to storage
- `reloadFourX4` — reloads protocol state
- `goToday` — navigates to Today view
- `loadArchive` — loads archive dates
- `runAutoCloseCheck(user)` — fires on load effect; evaluates grace expiry

---

## SECTION H — KNOWN DECISIONS AND CONSTRAINTS

- **UTC date display (locked):** DOP uses todayStr() which returns UTC date. Starting ~5pm Pacific, app shows tomorrow's date. Intentional — period close logic is UTC-anchored. Not a bug.
- **AM Lock button** — toggles amLocked / amLockedAt. Does NOT set morningEval. morningEval is set only by TapScore component.
- **PM Block Complete button** — toggles pmLocked / pmLockedAt. Does NOT set eveningEval. eveningEval is set only by TapScore component.
- **isDayComplete requires both amLocked and pmLocked (07/23/2026)** — Day Complete cannot show until both block complete buttons are clicked, regardless of eval scores or checked items.
- **Four-state Day Complete display (07/23/2026)** — replaces prior binary display. Guides user through the completion sequence progressively.
- **pm_pit auto-check** — DOPApp useEffect auto-checks pm_pit when pmGood and pmBad are both filled. Fires on mount but does nothing on empty form (both fields empty → condition false → no write).
- **4x4 promoted protocol time-cost rule (locked):** when a protocol graduates out of 4x4 into permanent DOP, its time_cost_minutes stops counting toward the Time Governor budget.
- **Configure behavior (locked):** Required items = always-on, cannot be unchecked. Recommended = on-by-default but user-toggleable.
- **Troubleshooting Guide style (locked):** short bolded declarative statements. No field names, no code, no jargon, no conditional phrasing.
- **STEEL color** — scoped to AM (GOLD) vs PM (STEEL) row distinction in AMBlock/PMBlock only. Not used elsewhere in DOP.
- **Locked terminology:** "Protocol" — not "habit," "task," or "rule." Card titles: Protocol #1 through Protocol #4. Enforced in Instructions panel and all copy.
- **PITButton userId:** `user` state from DOPApp is passed as prop to AMBlock and PMBlock, then to PITButton. URL built as `${PIT_URL}?hub_user=${userId}`. Post-Supabase the param goes away with central auth.
- **migrateSetup early-return (fixed 07/25/2026):** must check for amCommonSelected presence before returning — never skip field injection when either amCustomItems or amCommonSelected is missing.
- **Investigation before build (standing rule):** before acting on any backlog item involving existing content, verify the current app state first. Backlog items can go stale.

**30-Day Cycle Architecture (locked 07/26/2026):**
- All client cycles are exactly 30 days anchored to the client's chosen start date — not the calendar month
- Client sets their start date when they are ready to begin tracking (not automatic on first login)
- Period close fires on day 30. New cycle starts day 31. No exceptions.
- No calendar month alignment, no app suggestion to align to the 1st, no client choice about cycle length
- Months with 28, 29, 31 days are irrelevant — the cycle is always 30 days
- Start date is shared across DOP, PIT, and OBT — one value, stored under `{username}_jpg_start_date`
- Coach can adjust a client's start date if needed
- Staggered start dates across clients is intentional — distributes coaching workload evenly across the month
- Impact on DOP: 4x4 period close logic must anchor to client start date, not calendar month end
- Post-Supabase: start date moves to shared backend field

---

## SECTION I — VERIFICATION STATUS

### Awaiting July 31 real period close:
- reloadFourX4 fix — COMMITTED
- evaluateAndWriteTierCap — COMMITTED
- Grace Window Reminder banner — correct copy and timing
- 4x4 GRADUATE badge — renders correctly at graduation
- Alteration — both original and altered versions as separate graduation cards
- Graduation Decision screen
- Period Closed Summary screen
- Period Close pieces 1–3

### Session-verified 07/13/2026:
- Test 1 — 5 new fields persist across reload: PASS
- Auto-save wiring: PASS

### Session-verified 07/15/2026:
- Unit dropdown — minutes and hours absent, 10 options confirmed: PASS
- Deactivation Time saved auto-negate — entering 15 stores -15: PASS
- 4x4 Matrix pointer in Setup Instructions at index 9: PASS
- All 21 Vitest tests passing: PASS
- Alteration protocol type — full browser verification: PASS

### Session-verified 07/16/2026:
- Setup Instructions copy pass: PASS
- 4x4 Instructions GRADUATE badge and grace window paragraphs: PASS
- reloadFourX4 and evaluateAndWriteTierCap confirmed COMMITTED: PASS

### Session-verified 07/23/2026:
- Mock day test confirmed four-state Day Complete display works correctly — Day Complete does not appear until PM Block Complete is clicked
- amLocked gate confirmed in isDayComplete() — AM Block Complete now required

### Session-verified 07/25/2026:
- Configure tab blank screen fixed — migrateSetup injects amCommonSelected when missing: PASS
- Open PIT button opens 5174 with hub_user param: PASS
- 4x4 Instructions habit → protocol terminology fix: PASS

---

## SECTION J — CATEGORY REFERENCE (CONDENSED)

### CATEGORY 11 — SETUP SCREEN (4x4 TAB)
4x4 tab greyed out until DOP Configure completed. Four internal sections: Set Up/Edit, Instructions, History, Metrics. Daily checkoff lives in Today tab.

### CATEGORY 12 — COMMON PROTOCOL EXAMPLES
Static reference list in Set Up/Edit screen, top-right. Sorted by Foundation Core. All values use bracket notation. Ideas only, not requirements.
- **Committed:** 07/13/2026

### CATEGORY 13 — MID-PERIOD EDIT WARNING
Modal fires when: active period exists AND client changed a field vs prefilled values. BUILT AND COMMITTED.

### CATEGORY 14 — PERIOD EDGE CASES
DNA-only period: valid. Deactivation savings > activation costs: valid. Zero-completion period: valid.

### CATEGORY 15 — LOCKED TERMINOLOGY
"Protocol" — not "habit," "task," or "rule." Card titles: Protocol #1 through Protocol #4.

### CATEGORY 16 — PROTOCOL ENFORCEMENT RULES
All rules enforced at Save in runSave() (FourX4View.jsx).

**Rule 1 — REMOVED (07/15/2026):** 5-word name minimum removed.

**Rule 2 — Activation measurable target required:** blocks when measurable_value null, measurable_unit empty, OR unit is minutes/hours. Unit dropdown: 10 options.

**Rule 3 — Activation time floor 10 minutes (unless DNA).**

**Rule 4 — Deactivation declaration required:** deact_declaration must exist and be ≥ 3 chars.

**Rule 5 (implied) — Alteration save gating:** alteration saves only check alteration drafts, not all drafts.

### CATEGORY 17 — VITEST TEST INFRASTRUCTURE
21 passing tests across 3 files: smoke.test.jsx (render pipeline), enforcement.test.js (15 tests, Rules 1–5), autosave.test.js (5 tests). Command: npm test.

### CATEGORY 18 — ALTERATION PROTOCOL TYPE
"Alter This Protocol" button on committed cards only. One-per-period hard limit per protocol. Clock resets at alteration date. Original archived as `altered_archived`. Both versions appear as graduation cards at period close. BUILT AND COMMITTED 07/15/2026.
Content documented in 4x4 Instructions panel at step 3a (How to Add a Protocol section). No separate instructions section needed.

---

## VERSION HISTORY

| VERSION | DATE | CHANGES |
|---|---|---|
| v1.0–v1.4 | 07/01–07/03/2026 | 4x4 Matrix initial build sessions. |
| v1.5 | 07/04/2026 | Mid-period edit warning, tier cap evaluation, weekly tally, reloadFourX4 fix. |
| v1.6 | 07/05/2026 | Dead code removal. |
| v1.7 | 07/07/2026 | Document renamed. Scope expanded to full DOP app. |
| v1.8 | 07/07/2026 | Grace window reminder banner. GRADUATE badge. |
| v1.9 | 07/11/2026 | amCustomItems null guard crash fix. |
| v2.0 | 07/13/2026 | FourX4DailyCard infinite loop fix. Protocol enforcement rules. |
| v2.1 | 07/13/2026 | Mount field load fix. Per-card auto-save. |
| v2.2 | 07/15/2026 | Rule 1 removed. Rule 2 refined. Deactivation Time fixed. Vitest Tier 1. UTC date. |
| v2.3 | 07/15/2026 | Alteration protocol type fully built and browser-verified. DOP day-complete verified. |
| v2.4 | 07/16/2026 | Setup Instructions full copy pass. 4x4 Instructions panel expanded. |
| v2.5 | 07/16/2026 | reloadFourX4 and evaluateAndWriteTierCap corrected to COMMITTED. Period start date backdate closed. CLAUDE.md refresh completed. |
| v2.6 | 07/23/2026 | isDayComplete() updated — amLocked added as required condition (sixth gate). PM Block Complete (pmLocked) confirmed as required gate. Four-state Day Complete display built in PMBlock.jsx. Canonical day-complete rule updated. |
| v2.7 | 07/25/2026 | migrateSetup fixed — amCommonSelected injected when missing; Configure tab blank screen resolved. PITButton wired with userId prop and correct PIT_URL (localhost:5174); user prop threaded from DOPApp → AMBlock/PMBlock → PITButton. 4x4 Instructions grammar pass complete — "habit" replaced with "protocol" in Section 5. Alteration instructions confirmed present at step 3a — no new section needed. All four active backlog items closed. CLAUDE.md version reference stale (v2.4) — update next session. |

---

*JPG-SYS-DOP-CodeLogic-WRK-v2.7 | Jones Performance Group LLC | CONFIDENTIAL | 07/25/2026*
