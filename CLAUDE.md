# CLAUDE.md — JPG-DOP-App

## APP IDENTITY

- **App name:** Daily Operational Process (DOP)
- **Dev port:** 5173
- **Repo:** Doug2752/JPG-DOP-App
- **Local folder:** C:\JPG-PROJECTS\JPG-DOP-App
- **Framework:** React + Vite, Class 3 modular structure
- **Storage:** localStorage (pre-Supabase)

## CREDENTIALS

- Doug / JPG2026
- Test / JPG2026
- Login comparison is case-insensitive on both sides

## NON-NEGOTIABLE WORKING RULES

1. **Investigation before action.** Read actual source files before changing anything. If assumptions do not match what's in the code, stop and report — do not silently fill gaps or proceed past an unexpected finding.
2. **Never assume.** Never guess app behavior, credentials, prior decisions, or file contents. Verify by reading source, browser-testing, or asking Doug. If uncertain, say so explicitly.
3. **Never act without asking first.** Do not create files, draft documents, run destructive commands, or take any constructive action without explicit go-ahead from Doug.
4. **One task at a time.** Logic changes stay isolated from styling from copy. Do not batch across concern types in a single pass.
5. **Plan mode always on.** Every action must be reviewed and approved before it executes. Auto-accept mode is never enabled.
6. **GitHub Desktop is the only trusted push mechanism.** After any commit, remind Doug to verify in GitHub Desktop (Push origin button, commits waiting to push count).
7. **Browser-verify before commit.** Every feature must be verified in Firefox (localhost:5173) before it is committed.
8. **Never redraft finalized copy from scratch.** Always retrieve the actual original live text before editing.
9. **Never touch .md files in this repo during code builds.**

## MODEL SELECTION

- **Opus** — complex multi-file logic builds, cross-component refactors, anything touching state management or period logic.
- **Sonnet** — small edits, investigations, styling changes, copy edits, cleanup passes.
- State the model at the top of every prompt. Never leave model choice as a question.

## BROWSER AND PORT REFERENCE

- **Firefox** — code/build testing. Default browser at the OS level (localhost:5173).
- **Brave** — auto-opens 5173 on startup — do not assume Brave is closed during dev work. Stop Brave before starting dev server.
- **Edge** — Doug's browser for Claude.ai chat sessions.

## COLOR SYSTEM (LOCKED — do not change)

All color constants live in utils/constants.js.

| Constant | Hex | Role |
|---|---|---|
| GOLD | #B8860B | Informational/non-interactive elements. Section headers, footer CONFIDENTIAL, NEVER TWICE box background, result panels, status bars, 4x4 GRADUATE badge, grace window banner. Black text + 1.5px solid black border on light backgrounds. |
| GOLD_LIGHT | #ddb94a | Clickable/action elements. +Add, nav buttons, ENTER button, toggles, Open PIT button background, Alter This Protocol button. Black text + 1.5px solid black border on light backgrounds. |
| STEEL | #2C4A6B | PM block distinction. Used in PMBlock.jsx and SetupScreen.jsx only. AMBlock does NOT import STEEL. |
| STEEL_LIGHT | defined | PM light variant. PMBlock.jsx and SetupScreen.jsx. |
| STEEL_MID | defined | PM mid variant. SetupScreen.jsx only (PM Recommended Items header). |
| STEEL_DARK | defined | PM dark variant. SetupScreen.jsx only (PM Common Life Tasks header and ReorderPanel). |
| DARK | #1a1a1a | Dark backgrounds (Tomorrow's Priorities header, nav bar). |
| BORDER | #d0c8b8 | Table/box borders. |
| RED | #c0392b | Validation errors, error banners, unlock confirmation text. Used in load/save error banners (DOPApp) and AM/PM unlock confirmation blocks (AMBlock, PMBlock). |
| RED_LIGHT | defined | Light red variant. |
| MID | #3a3a3a | Mid-tone text. |
| BG | #f8f8f6 | App background. |
| GREEN_SAVE | #27ae60 | Saved indicator green (PMBlock saved feedback). |
| GREY | #888888 | Incomplete state color (PMBlock day-complete display). |
| GOLD_TEXT | #7a5c00 | CheckRow description text (checked state). Defined in Shared.jsx. |
| QUOTE_BG | #ede4cf | QuoteBox background. Defined in Shared.jsx. |
| DIVIDER_BG | #E0E0E0 | Instructions panel background (FormInstructionsModal and FourX4View INSTR_PANEL). |
| NAV_TEXT | #aaaaaa | Nav bar username text color. |
| WHITE | #ffffff | Input backgrounds, button text (styles.js). |

**NOTE:** NAV_TEXT_DIM (#666666) was removed from constants.js 08/07/2026 — exported but used nowhere.

**Two-tier gold rule (locked):** GOLD_LIGHT = clickable/action. GOLD = informational/non-interactive. Both: black text + 1.5px solid black border on light/white backgrounds. Exception: elements on dark/black nav bar get NO black border.

**STEEL scope (locked):** STEEL family used in PMBlock.jsx and SetupScreen.jsx only. AMBlock does not import any STEEL constant.

**RED scope (locked):** RED used for Tomorrow's Priorities validation AND load/save error banners (DOPApp) AND AM/PM unlock confirmation text (AMBlock, PMBlock).

**NEVER use #B8962E** — deprecated gold. Must never appear.

## UI PARAMETERS (LOCKED)

### AM/PM Lock Box
- **Button label when unlocked:** "Mark AM Block Complete" / "Mark PM Block Complete"
- **Button label when locked:** "Unlock AM Block" / "Unlock PM Block"
- **Button size:** always padding 8px 20px — never collapses when locked
- **Unlock confirmation:** tapping Unlock shows inline warning below the button.
  AM text: "Unlock AM block? Locked entries may be edited."
  PM text: "Unlock PM block? Locked entries may be edited."
  fontSize 11, color RED, fontWeight 600. Confirm button (RED border/text) fires unlock. Cancel dismisses.
- **State variables:** confirmUnlockAM (AMBlock), confirmUnlockPM (PMBlock)

### Open PIT Button
- **Background:** GOLD_LIGHT, Border: 1.5px solid DARK, BorderRadius: 5
- **URL:** http://localhost:5174?hub_user={userId}
- **File:** components/Shared.jsx

### NEVER TWICE Box
- **Background:** GOLD (#B8860B), Border: 1.5px solid #000, BorderRadius: 5
- **File:** components/BrandBar.jsx

### Grace Window Reminder Banner (UPDATED 08/08/2026)
- **Position:** inside PMBlock, immediately above PM Lock box
- **Timing:** fires when today >= cycle_start + 30 days; stops when today > cycle_start + 34 days. Anchored to client's 30-day cycle start date — no calendar month logic.
- **Source field:** reads fourX4Protocols[0]?.cycle_start (not month_set)
- **Month name:** derived from cycle_start ISO date via toLocaleDateString — NOT from splitting a YYYY-MM string
- **Copy:** "Your [Month] period is ready to close — You have [X] days left before it auto-closes."
- **Styling:** background GOLD, 1.5px solid DARK, borderRadius 5, padding 10px 16px, fontWeight 700, fontSize 13, textAlign center

### 4x4 GRADUATE Badge
- Designed to appear on protocol cards promoted out of 4x4 into permanent DOP.
- **BUG STILL OPEN** — DOPApp drops graduated_from_4x4 flag when rebuilding custom rows. CheckRow checks item.graduated_from_4x4 but never receives it. Verify at August period close — fix required if badge does not render after promotion.

### Close This Period Button (BUILT 08/07/2026)
- **Location:** Set Up / Edit section of 4x4 tab, below Save 4x4 button
- **Visibility:** renders only when an active period exists
- **Behavior:** click opens inline confirm dialog; dialog auto-scrolls into view; Confirm fires handleManualClose(); Cancel dismisses
- **Styling:** background DARK, color GOLD, fontWeight 700, fontSize 13, padding 8px 20px, borderRadius 5, border 1.5px solid GOLD

### Header
- Disabled 4x4 button shows "Complete Configure to unlock" label below it (fontSize 9, NAV_TEXT color).

### Day Complete Display (PMBlock — four states)
1. Neither AM nor PM complete — no indicator
2. AM complete only — "✓ AM Complete"
3. AM complete + PM items done but PM not clicked — "✓ AM Complete · ✓ PM Items Done — PM Block Complete not yet clicked"
4. All complete — "✓ Day Complete — Well executed."

## LOCKED TERMINOLOGY

- "Protocol" — not "habit," "task," or "rule."
- Card titles: Protocol #1 through Protocol #4.
- Foundation Cores (client-facing): Fitness, Nutrition, Sleep, Mental/Spiritual Health.

## LOCKED RULES

- **isDayComplete() gates:** 7 required conditions including amLocked and pmLocked. Module-level pure function — no hooks, no dependencies.
- **4x4 promoted protocol time-cost rule:** when a protocol graduates out of 4x4 into permanent DOP, its time_cost_minutes stops counting toward the Time Governor budget.
- **Configure behavior:** Required items = always-on, cannot be unchecked. Recommended = on-by-default but user-toggleable.
- **Protocol enforcement Rule 2 (UPDATED 08/07/2026):** measurable target is optional when time_cost_minutes is non-null and non-zero. Required when time cost is null, zero, or DNA. Minutes and hours are valid measurable target units.
- **Alter This Protocol is the only supported mid-period modification path (locked 08/07/2026):** direct field edits in Set Up / Edit are blocked mid-period by the canClose gate. Warning dialog removed — canClose error is the only response.
- **Alteration is a full replacement (locked 08/07/2026):** client can change any field during alteration including type and foundation core. One alteration per protocol per period.
- **Incomplete tag removed (locked 08/07/2026):** auto-closed periods no longer display an Incomplete tag in History.
- **cycle_start is the authoritative period anchor (locked 08/08/2026):** all date math uses cycle_start (YYYY-MM-DD). month_set is retired. New and altered protocol records write cycle_start. active_from = todayISO on period save.
- **Streak system deferred (08/12/2026):** streak badge concept dropped from active backlog. Do not build until explicitly re-scoped.

## 30-DAY CYCLE ARCHITECTURE (BUILT 08/08/2026)

Status: FULLY BUILT. fourX4Period.js and all consumer files migrated to cycle_start anchoring.

- **getCycleData(username)** — reads hub_clients from localStorage, returns { cycle_start, tracking_start_date, onramp_end }. Falls back to cycle_start: '2026-08-01' when no matching record found.
- **cycle_start** — replaces month_set throughout. YYYY-MM-DD format. Sourced from hub_clients via getCycleData.
- **Grace window:** cycle_start + 30 days (open) through cycle_start + 34 days (auto-close).
- **Remediate carry active_from:** nextCycleOf(cycle_start).cycleStart = cycle_start + 30 days.
- **active_from on new period:** todayISO (not first of month).
- **HUB owns all cycle/tier data** — DOP reads hub_clients via getCycleData(), never writes.
- **Phase gating enforced in HUB WheelView** — not in DOP itself.
- **Dev fallback:** cycle_start '2026-08-01' used when no hub_clients record matches login username.

## CURRENT BUILD STATE (confirmed in source 08/12/2026)

### Built and committed
- Full AM/PM block with lock system — labels, padding, unlock confirmation
- Four-state Day Complete display in PMBlock
- isDayComplete() — 7 required conditions including amLocked and pmLocked
- Grace window reminder banner (PMBlock, above PM Lock) — cycle_start anchored
- 4x4 Matrix full feature set — Set Up/Edit, Instructions, History, Metrics
- Period close:
  - Auto-close on grace expiry (cycle_start + 34 days)
  - Manual close button — Close This Period (BUILT 08/07/2026)
- Graduation decision screen — four options:
  - Promote with AM/PM selection step (BUILT 08/07/2026)
  - Drop
  - Keep In 4x4 with 25% combined growth gate
  - Modify — full inline edit form with 9 validation gates (BUILT 08/07/2026)
- Alteration system — full replacement, type and foundation core changeable, one per period
- Alteration draft clear on save (FIXED 08/07/2026)
- Foundation core auto-save in selectFoundationCore (FIXED 08/07/2026)
- Tier cap 30→60. Weekly tally. Keep-in-4x4 carry. Remediate auto-carry.
- Per-card auto-save drafts. Common Protocol Examples.
- Setup Instructions modal (18 sections)
- Configure tab (SetupScreen)
- Archive — Last 30 Days
- Open PIT button (localhost:5174?hub_user={userId})
- NEVER TWICE box
- AI quote with BACKUP_QUOTES fallback (API key not wired — intentional, post-Supabase)
- Load error banner and Save error banner (DOPApp)
- Header "Complete Configure to unlock" label below disabled 4x4 button
- migrateSetup fix — amCommonSelected injection
- All hardcoded colors replaced with named constants
- Dead code removed: progressLabel, NAV_TEXT_DIM, storage.list(), LoginScreen hardcoded hex
- **30-Day Cycle Architecture — BUILT 08/08/2026:** fourX4Period.js fully rewritten. FourX4View.jsx and PMBlock.jsx consumer migration complete.
- **Cleanup pass — BUILT 08/12/2026:**
  - AUDIT_LEGEND: all three strings updated from "next month" to "next cycle" / "next cycle's"
  - Instructions panel copy: "Each period," / "At the end of every period," / "end-of-period review" — all corrected
  - Dead `card` export removed from components/styles.js (was imported by nothing)
  - Unreachable placeholder section block removed from FourX4View.jsx
  - Enforcement tests: Rule 1 test block deleted, hasMissingMeasurable updated with hasTimeCost exemption, blocked test cases updated with time_cost_minutes: null
  - 19/19 tests passing (down from 21 — 2 Rule 1 tests correctly removed)

### styles.js exports (current — 08/12/2026)
- `inp` — imported by PMBlock.jsx, AMBlock.jsx, SetupScreen.jsx, SetupRow.jsx, BrandBar.jsx
- `lbl` — imported by PMBlock.jsx, AMBlock.jsx
- `gbtn` — imported by SetupScreen.jsx, BrandBar.jsx, Header.jsx
- `card` — **REMOVED 08/12/2026** — was imported by nothing

### Known bugs (not yet fixed)
- **GRADUATE badge will not render** — DOPApp drops graduated_from_4x4 flag when rebuilding custom rows. Verify at August period close — fix required if badge does not appear.
- "Stay logged in" checkbox in LoginScreen is dead UI — post-Supabase

### Post-Supabase (do not build)
- Tomorrow's Priorities → PIT transfer
- AI quote API key wiring
- Alteration coach notification flag
- Streak persistence

## VITEST

- 19/19 passing tests across 3 files: smoke.test.jsx (1), enforcement.test.js (13), autosave.test.js (5)
- Run: npm test
- Note: enforcement tests updated 08/12/2026 — hasMissingMeasurable now matches shipping code with hasTimeCost exemption

## GOVERNING DOCUMENT

- **Code Logic doc:** JPG-SYS-DOP-CodeLogic-WRK-v3.3
- This file is a context loader only — do not reproduce the full Code Logic doc here.

## SESSION START PROTOCOL

First instruction in every Desktop Code session is always read-only:

> "Read CLAUDE.md and confirm you understand — do not run any commands yet."

Wait for Claude Code to confirm it has read this file and understood the rules. Only after confirmation, proceed to development work.

---

*DOP CLAUDE.md — v1.4 — updated 08/12/2026. Cleanup pass: AUDIT_LEGEND "next cycle" copy, Instructions panel "period" language, dead card export removed from styles.js, unreachable placeholder block removed from FourX4View, enforcement tests synced to shipping code. 19/19 tests passing. Streak system dropped from active backlog. Code Logic reference updated to v3.3.*
