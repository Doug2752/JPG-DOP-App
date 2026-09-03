# JPG — DOP CODE LOGIC
## Daily Operational Process — Full App Code Logic and Build Reference
**Document ID:** JPG-SYS-DOP-CodeLogic-WRK-v3.6
**Date:** 08/28/2026 | **Prepared by:** Claude | **State:** WRK
**Classification:** CLASS 1 — CONFIDENTIAL
**Supersedes:** JPG-SYS-DOP-CodeLogic-WRK-v3.5

**SCOPE:** Full DOP app — 4x4 Matrix logic, UI parameters, color system, component decisions, build status, and pending build list. Single source of truth for everything DOP.

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
- **Test login:** Test / JPG2026 and Doug / JPG2026 (case-insensitive)
- **Browser for testing:** Firefox (localhost:5173)
- **Daily-use browser:** Brave (auto-opens 5173 — stop Brave before starting dev server during work hours)
- **CLAUDE.md:** v1.6 — updated 09/03/2026

---

## SECTION B — COLOR SYSTEM (LOCKED)

All color constants live in utils/constants.js.

| Constant | Hex | Role |
|---|---|---|
| GOLD | #B8860B | Informational/non-interactive elements. Section headers, footer CONFIDENTIAL, result panels, status bars, 4x4 GRADUATE badge, grace window banner. Black text + 1.5px solid black border on light backgrounds. |
| GOLD_LIGHT | #ddb94a | Clickable/action elements. +Add, nav buttons, ENTER button, toggles, Never Twice bar background, Alter This Protocol button. Black text + 1.5px solid black border on light backgrounds. |
| STEEL | #2C4A6B | PM block distinction. Used in PMBlock.jsx and SetupScreen.jsx only. |
| STEEL_LIGHT | defined | PM light variant. PMBlock.jsx and SetupScreen.jsx only. |
| STEEL_MID | defined | PM mid variant. SetupScreen.jsx only. |
| STEEL_DARK | defined | PM dark variant. SetupScreen.jsx only. |
| DARK | #1a1a1a | Dark backgrounds (Tomorrow's Priorities header, nav bar). |
| BORDER | #d0c8b8 | Table/box borders. |
| RED | #c0392b | Validation errors, error banners, unlock confirmation text. |
| RED_LIGHT | defined | Light red variant. |
| MID | #3a3a3a | Mid-tone text. |
| BG | #f8f8f6 | App background. |
| GREEN_SAVE | #27ae60 | Saved indicator green. |
| GREY | #888888 | Incomplete state color. |
| GOLD_TEXT | #7a5c00 | CheckRow description text (checked state). Defined in Shared.jsx. |

**Two-tier gold rule (locked):** GOLD_LIGHT = clickable/action. GOLD = informational/non-interactive. Both get black text + 1.5px solid black border on light backgrounds. No border on dark nav bar elements.

**STEEL scope (locked):** PMBlock.jsx and SetupScreen.jsx only. AMBlock never imports STEEL.

**NEVER use #B8962E** — deprecated gold.

---

## SECTION C — UI DESIGN (UPDATED 08/28/2026)

### Header.jsx — Flat Text Nav
- Nav items: Configure, Today, Archive, 4x4 Matrix — flat text spans, no buttons
- Active state: color GOLD (#B8860B), fontWeight 700, fontSize 13, borderBottom 2px solid #B8860B, paddingBottom 2
- Inactive state: color rgba(255,255,255,0.5), fontWeight 500, fontSize 13
- 4x4 Matrix disabled when !setupComplete: color rgba(255,255,255,0.2), cursor not-allowed; "Complete Configure to unlock" label below, fontSize 9, color rgba(255,255,255,0.3)
- Streak: gold text (color GOLD, fontWeight 700, fontSize 12) inline after 4x4 Matrix, preceded by grey separator (width 1.5, height 16, background rgba(255,255,255,0.25))
- Right group: Set-Up and Instructions | firstName | Logout — flat text spans with grey separator bars (width 1.5, height 16, background rgba(255,255,255,0.25)) between each

### BrandBar.jsx — Three-Zone Layout (BUILT 08/28/2026)
- Outer container: background #fff, borderBottom 2px solid GOLD (reduced from 4px), padding 10px 20px
- Inner layout: display flex, justifyContent space-between
- Left zone (flex:1): JPG logo, width 260px, unchanged
- Center zone (flex:2): DOP heading 52px fontWeight 900, "Daily Operational Process" subtitle 15px fontWeight 600
- Right zone (flex:1): date picker only — uses fmtDateShort() for short format display, alignItems flex-end
- Never Twice block: REMOVED from BrandBar entirely

### fmtDateShort() — Added to utils/date.js (08/28/2026)
```js
export function fmtDateShort(str) {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
```
Used in BrandBar date picker button only. fmtDate() unchanged — still used elsewhere.

### Never Twice Bar — AMBlock.jsx (BUILT 08/28/2026)
- Replaces top PITButton in AMBlock.jsx
- Full-width GOLD_LIGHT bar, inline row, border 1.5px solid #000, borderRadius 5
- Left: "NEVER TWICE" (fontSize 15, fontWeight 900, uppercase) + tagline "Miss one — never miss the second." (fontSize 11)
- Right: checkbox wired to form.neverTwiceRead via upd(), label "I've read this. Never twice."
- Bottom PITButton in PMBlock.jsx: UNCHANGED

---

## SECTION D — STORAGE KEYS

| Key | Purpose |
|---|---|
| {user}_dop7_setup | AM/PM configure settings |
| {user}_dop7_form_{date} | Daily form data — includes neverTwiceRead field |
| {user}_dop7_archiveDates | Array of saved form dates |
| 4x4_protocols_{user} | Active and history protocol records |
| 4x4_history_{user} | Period close history records |
| 4x4_tier_{user} | { tier, cap } — written by evaluateAndWriteTierCap |
| dop_4x4_draft_{user}_0..3 | Per-slot draft state |
| hub_clients | Read-only via getCycleData() — provides cycle_start, tier, cap_override_minutes |

---

## SECTION E — KEY DATA FLOWS

- hub_clients: DOP read-only via getCycleData() in fourX4Period.js → returns cycle_start, tracking_start_date, onramp_end, tier, cap_override_minutes
- neverTwiceRead: form field in {user}_dop7_form_{date} — boolean, default false. Checkbox in Never Twice bar wired to this field.
- hub_user URL passthrough (BUILT 09/03/2026): DOPApp.jsx reads hub_user from URL on mount. If present and non-empty after trim, sets user and firstName directly to the trimmed value — no VALID_CREDENTIALS or hub_clients lookup required. HUB has already authenticated the client. Falls through to login screen if absent or empty. VALID_CREDENTIALS unchanged for direct logins.

---

## SECTION F — COMPONENT ARCHITECTURE

| Component | File | Notes |
|---|---|---|
| DOPApp | app/DOPApp.jsx | Root, state, storage, routing. 15 state variables. hub_user URL passthrough built 09/03/2026. |
| LoginScreen | components/LoginScreen.jsx | Login gate. VALID_CREDENTIALS export. HUB clients bypass via hub_user param. |
| Header | components/Header.jsx | Flat text nav bar with grey separators and gold streak text. Updated 08/28/2026. |
| BrandBar | components/BrandBar.jsx | Three-zone layout: logo left, DOP center, date picker right. Never Twice removed. fmtDateShort used for date display. Updated 08/28/2026. |
| AMBlock | components/AMBlock.jsx | AM checklist, evaluation, lock. Top PITButton replaced by Never Twice bar 08/28/2026. |
| PMBlock | components/PMBlock.jsx | PM checklist, evaluation, lock, grace banner, footer. Grace banner reads cycle_start not month_set. Tomorrow's Appointments & Must-Do's removed 08/22/2026. PM Deviation repositioned above Tomorrow's Priorities 08/22/2026. Bottom PITButton unchanged. |
| SetupScreen | components/SetupScreen.jsx | Configure tab. STEEL color family used here. |
| FourX4View | components/FourX4View.jsx | 4x4 Matrix — all four tabs plus graduation screen plus summary screen. Period logic via fourX4Period.js. AUDIT_LEGEND uses "next cycle" language. Instructions panel uses "period" language throughout. On mount and after period close: calls getCycleData() to get hubTier and capOverride, then calls evaluateAndWriteTierCap() and setTier(). |
| FourX4DailyCard | components/FourX4DailyCard.jsx | Daily checkoff card in Today tab. Weekly completion % per protocol. 7-day rolling window anchored to cycle_start. Reads localStorage directly. |
| FormInstructionsModal | components/FormInstructionsModal.jsx | Setup Instructions panel. |
| Shared | components/Shared.jsx | CheckRow, PITButton, QuoteBox, RecommendedBadge, TapScore, ColumnHeader. |
| fourX4Period | utils/fourX4Period.js | Full period engine — 30-day cycle architecture BUILT 08/08/2026. Tier cap system rebuilt 08/13/2026. |
| date | utils/date.js | todayStr(), fmtDate(), fmtDateShort() added 08/28/2026. |
| constants | utils/constants.js | All color constants and config values. |
| storage | services/storage.js | localStorage wrapper. |
| styles | components/styles.js | inp, lbl, gbtn. |

---

## SECTION G — LOCKED RULES AND DECISIONS

- **Day-complete canonical wording (locked):** "Score both AM and PM evaluations and minimally check off completed required items to mark the day complete."
- **pm_pit auto-check:** DOPApp useEffect auto-checks pm_pit when pmGood and pmBad are both filled.
- **4x4 promoted protocol time-cost rule (locked):** when a protocol graduates out of 4x4, its time_cost_minutes stops counting toward Time Governor budget. Promoted items carry no time_cost_minutes field.
- **Configure behavior (locked):** Required items = always-on, cannot be unchecked. Recommended = on-by-default but user-toggleable.
- **STEEL color scope (locked):** PMBlock.jsx and SetupScreen.jsx only. AMBlock never imports STEEL.
- **Locked terminology:** "Protocol" — not "habit," "task," or "rule." Card titles: Protocol #1 through Protocol #4.
- **Alter This Protocol is the only supported mid-period modification path (locked 08/07/2026).**
- **Alteration is a full replacement (locked 08/07/2026):** client can change any field including type and foundation core. One alteration per protocol per period.
- **Incomplete tag removed (locked 08/07/2026):** Audit outcome badges (Unlocked/Standard/Remediate) are sufficient.
- **Measurable target optional when time cost filled (locked 08/07/2026).**
- **cycle_start is the authoritative period anchor (locked 08/08/2026):** all date math uses cycle_start. month_set is retired.
- **Tier cap rule (locked 08/13/2026):** Tier 1 = 60 min, Tiers 2/3/4 = 30 min. cap_override_minutes takes precedence when set.
- **4x4 Suggested Protocol Library stays in DOP (locked 08/28/2026):** static reference list in Set Up/Edit screen. Not moving to HUB Education spoke.
- **BrandBar three-zone layout (locked 08/28/2026):** logo left flex:1, DOP center flex:2, date picker right flex:1. Bottom border 2px. fmtDateShort() for date display.
- **Never Twice bar location (locked 08/28/2026):** AMBlock.jsx, replaces top PITButton. GOLD_LIGHT background. Wired to form.neverTwiceRead. Bottom PITButton in PMBlock unchanged.

---

## SECTION H — AM/PM BLOCK KEY BEHAVIORS

### AM Lock / PM Lock
- Lock button: "Lock AM Block" / "Lock PM Block"
- Confirmation inline dialog — "Lock AM block? Locked entries may be edited." / "Lock PM block? Locked entries may be edited." — fontSize 11, color RED, fontWeight 600. Confirm fires lock. Cancel dismisses.
- Unlock confirmation mirrors lock — same inline dialog pattern.

### Grace Window Reminder Banner
- File: components/PMBlock.jsx
- Timing: fires when today >= cycle_start + 30 days; stops when today > cycle_start + 34 days.
- Month name derived from cycle_start ISO date via toLocaleDateString.
- Copy: "Your [Month] period is ready to close — You have [X] days left before it auto-closes."
- Styling: background GOLD, 1.5px solid DARK, borderRadius 5, fontWeight 700, fontSize 13, textAlign center

### 4x4 GRADUATE Badge
- File: components/Shared.jsx (CheckRow component)
- Data flag: graduated_from_4x4: true on item record
- Styling: gold pill, black text, renders inline with item label
- **STATUS: BUG STILL OPEN** — DOPApp.jsx drops graduated_from_4x4 flag when rebuilding custom rows. CheckRow never receives flag. Verify at August period close.

### PMBlock — PM Section Layout (UPDATED 08/22/2026)

Section order:
1. PM checklist rows
2. PM Deviation
3. Tomorrow's Priorities (Tomorrow's One Thing only)
4. Grace banner (if applicable)
5. PM Lock button
6. Day Complete
7. PITButton (Open Personal Investment Time — unchanged)
8. Footer

**Tomorrow's Appointments & Must-Do's: REMOVED (08/22/2026)**

---

## SECTION I — OPEN BACKLOG

### Active open items
- GRADUATE badge still broken — verify at August period close. Fix required if badge does not render.
- Full period close flow verification — verify at live close: graduation decision, period closed summary, reloadFourX4, evaluateAndWriteTierCap, AM/PM selection at promotion, manual close button, grace banner, tier cap HUB read.
- DOP Setup Instructions Step 5 copy — not yet written.
- Client tier patch rendering system — on hold pending Doug's rendering decision. Dedicated scoping session required before any code.

### Post-Supabase (do not build)
- Stay logged in checkbox — dead UI in Login.jsx
- DOP→PIT Tomorrow's Priorities transfer — cross-origin localStorage limitation
- AI quote API key server-side wiring (DOP falls back to BACKUP_QUOTES silently — unwired by design)

---

## SECTION J — CATEGORY REFERENCE (CONDENSED)

### CATEGORY 11 — SETUP SCREEN (4x4 TAB)
4x4 tab greyed out until DOP Configure completed. Disabled state shows "Complete Configure to unlock" label. Four internal sections: Set Up/Edit, Instructions, History, Metrics. Daily checkoff lives in Today tab.

### CATEGORY 12 — COMMON PROTOCOL EXAMPLES (STAYS IN DOP — LOCKED 08/28/2026)
Static reference list in Set Up/Edit screen, top-right. Sorted by Foundation Core. All values use bracket notation. Ideas only, not requirements. Confirmed stays in DOP — not moving to HUB Education spoke.

### CATEGORY 13 — MID-PERIOD EDIT WARNING — REMOVED
Mid-period warning dialog removed 08/07/2026. Direct edits blocked by canClose gate. Alter This Protocol is the only supported mid-period modification path.

### CATEGORY 14 — PERIOD EDGE CASES
DNA-only period: valid. Deactivation savings > activation costs: valid. Zero-completion period: valid.

### CATEGORY 15 — LOCKED TERMINOLOGY
"Protocol" — not "habit," "task," or "rule." Card titles: Protocol #1 through Protocol #4.

### CATEGORY 16 — PROTOCOL ENFORCEMENT RULES

**Rule 1 — REMOVED (07/15/2026)**

**Rule 2 — Activation measurable target conditional (UPDATED 08/07/2026):** optional when time_cost_minutes is non-null and non-zero. Required when time cost is null, zero, or DNA. Minutes and hours valid units.

**Rule 3 — Activation time floor 10 minutes (unless DNA).**

**Rule 4 — Deactivation declaration required:** >= 3 chars.

**Rule 5 — Deactivation weekly target minimum 3.**

**Rule 6 — Keep-in-4x4 25% combined growth gate.**

**Rule 7 — netCost vs cap gate.**

### CATEGORY 17 — VITEST TEST INFRASTRUCTURE
19/19 passing tests across 3 files (smoke.test.jsx: 1, enforcement.test.js: 13, autosave.test.js: 5).

### CATEGORY 18 — ALTERATION SYSTEM (UPDATED 08/07/2026)
Alter This Protocol button on committed cards only. One-per-period hard limit per protocol. Client can change type and foundation core during alteration. All validation gates apply. Original archived as altered_archived. Both versions evaluated at period close. Draft storage keys deleted after alteration save. Alteration record writes cycle_start not month_set.

---

## SECTION K — 30-DAY CYCLE ARCHITECTURE (BUILT 08/08/2026)

**Status:** FULLY BUILT. fourX4Period.js and all consumer files migrated. No calendar-month logic remains in DOP.

### utils/fourX4Period.js — key exports:
- getCycleData(username) — reads hub_clients, returns { cycle_start, tracking_start_date, onramp_end, tier, cap_override_minutes }. CYCLE_FALLBACK: { cycle_start: '2026-08-01', tracking_start_date: null, onramp_end: null, tier: 4, cap_override_minutes: null }
- graceDeadlineDate(cycleStart) — cycleStart + 34 days
- canClose(cycleStart, todayISO) — today >= cycleStart + 30 days
- isGraceExpired(cycleStart, todayISO) — today > cycleStart + 34 days
- describeCloseWindow(cycleStart) — formats day 30 through day 34
- nextCycleOf(cycleStart) — returns { cycleStart: cycleStart + 30 days }
- runAutoCloseCheck() — reads cycleStart via resolveCycleStart, passes to isGraceExpired and graceDeadlineDate
- closeActivePeriod() — uses resolveCycleStart for closingCycleStart

---

## SECTION L — TIER CAP SYSTEM (REBUILT 08/13/2026)

**evaluateAndWriteTierCap(user, storage, tier, capOverride):**
- capOverride (positive int) → cap = capOverride
- tier === 1 → cap = 60
- all other tiers → cap = 30
- Writes { tier, cap } to 4x4_tier_{user}
- Prior completion-rate / historyRecords logic removed entirely

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| v1.0–v2.4 | 07/04/2026–07/16/2026 | Initial builds through Setup Instructions copy pass. |
| v2.5 | 07/16/2026 | reloadFourX4 and evaluateAndWriteTierCap corrected to COMMITTED. CLAUDE.md refresh completed. |
| v2.6 | 07/23/2026 | isDayComplete() updated — amLocked added. Four-state Day Complete display built. |
| v2.7 | 07/25/2026 | migrateSetup fixed. PITButton wired with userId prop and correct PIT_URL. |
| v2.8 | 07/28/2026 | DOP operability review Pass 1–5. Dead imports cleaned. All hardcoded colors replaced. AM/PM Lock box updated. |
| v2.9 | 08/03/2026 | GRADUATE badge bug fix attempted. 30-Day Cycle Architecture Section K added. |
| v3.0 | 08/07/2026 | archiveDates stale closure bug fixed. Mid-period warning dialog removed. Type and foundation core changeable during alteration. |
| v3.1 | 08/07/2026 | Manual close button BUILT. AM/PM selection at promotion BUILT. Modify option at graduation BUILT. Foundation core auto-save FIXED. GRADUATE badge bug confirmed still open. |
| v3.2 | 08/08/2026 | 30-Day Cycle Architecture BUILT. fourX4Period.js fully rewritten. hub_clients added to storage key reference. |
| v3.3 | 08/12/2026 | Cleanup pass: AUDIT_LEGEND "next cycle" fix. Instructions panel "period" language. Dead code removed. 19/19 tests passing. Streak system dropped. |
| v3.4 | 08/13/2026 | evaluateAndWriteTierCap rebuilt — tier + cap_override_minutes params. getCycleData updated to return tier and cap_override_minutes. CYCLE_FALLBACK updated. FourX4View on-mount tier cap evaluation confirmed. |
| v3.5 | 08/22/2026 | PMBlock PM section layout updated — Tomorrow's Appointments & Must-Do's removed, PM Deviation repositioned above Tomorrow's Priorities. Tomorrow's One Thing retained. PM Deviation wrapper spacing confirmed. Pending verification items list updated for August period close. |
| v3.6 | 08/28/2026 | Header redesigned — flat text nav, grey separators, gold streak text, right group restyled. BrandBar redesigned — three-zone layout, DOP 52px title, 15px subtitle, date picker right only, 2px bottom border. fmtDateShort() added to utils/date.js. Never Twice bar built in AMBlock.jsx replacing top PITButton — GOLD_LIGHT full-width inline row wired to form.neverTwiceRead. 4x4 Suggested Protocol Library confirmed stays in DOP (not HUB). AM Lock box styling confirmed acceptable as-is. Show instructions flag confirmed working. 4x4 graduation items confirmed done via live period close. Streak badge confirmed dropped. |
| v1.6 | 09/03/2026 | hub_user URL passthrough built — DOPApp.jsx useState initializers for user and firstName now trust hub_user URL param directly. No VALID_CREDENTIALS lookup for HUB clients. No new storage keys. No new components. |

---

*JPG-SYS-DOP-CodeLogic-WRK-v1.6 | Jones Performance Group LLC | CONFIDENTIAL | 09/03/2026*
