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
| NAV_TEXT_DIM | #666666 | Exported but currently unused in any component. |
| WHITE | #ffffff | Input backgrounds, button text (styles.js). |

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

### Grace Window Reminder Banner
- **Position:** inside PMBlock, immediately above PM Lock box
- **Timing:** fires when today >= month-end date; stops when today > month-end + 5 days. Fires AT and AFTER month end — NOT the 5 days before. The 4x4 Instructions panel copy stating "last 5 days of every period" is inaccurate — held pending period logic redesign.
- **Copy:** "Your [Month] period is ready to close — You have [X] days left before it auto-closes."
- **Styling:** background GOLD, 1.5px solid DARK, borderRadius 5, padding 10px 16px, fontWeight 700, fontSize 13, textAlign center

### 4x4 GRADUATE Badge
- Designed to appear on protocol cards promoted out of 4x4 into permanent DOP.
- **CURRENTLY NOT RENDERING** — DOPApp drops graduated_from_4x4 flag when rebuilding custom rows. Fix required before July 31 period close verification.

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
- **Protocol enforcement Rule 2:** measurable target required — blocks when measurable_value null, measurable_unit empty, OR unit is minutes/hours. Hint text: "4 sets."
## 30-DAY CYCLE ARCHITECTURE

Status: DESIGNED — NOT BUILT as of 08/03/2026
- program_start_date: auto-set when coach unlocks OBT access
- tracking_start_date: client-set, anchors the 30-day cycle
- Days 1–14: OBT Foundation Tracking only
- Days 15–21: Analysis Week — DOP/PIT locked, coaching outside apps
- Days 22–30: Onramp — DOP/PIT open, no enforcement
- Day 31+: Full enforcement, Cycle 1 begins
- month_set field to be retired — replaced with cycle_start: "YYYY-MM-DD"
- All period date math in fourX4Period.js will be replaced
- HUB owns cycle and tier data — spokes read only

## CURRENT BUILD STATE (confirmed in source 07/28/2026)

### Built and committed
- Full AM/PM block with lock system — labels, padding, unlock confirmation
- Four-state Day Complete display in PMBlock
- isDayComplete() — 7 required conditions including amLocked and pmLocked
- Grace window reminder banner (PMBlock, above PM Lock)
- 4x4 Matrix full feature set — Set Up/Edit, Instructions, History, Metrics
- Period close, graduation, keep-in-4x4, alteration
- Tier cap 30→60. Auto-close on grace expiry. Weekly tally.
- Per-card auto-save drafts. Common Protocol Examples. Mid-period edit warning.
- Setup Instructions modal (18 sections)
- Configure tab (SetupScreen)
- Archive — Last 30 Days
- Open PIT button (localhost:5174?hub_user={userId})
- NEVER TWICE box
- AI quote with BACKUP_QUOTES fallback
- Load error banner and Save error banner (DOPApp)
- Header "Complete Configure to unlock" label below disabled 4x4 button
- Measurable target hint corrected — "4 sets" not "30 minutes"
- "Past Period Stats" label (always plural)
- Vitest test suite — 21 passing tests (3 files)
- migrateSetup fix — amCommonSelected injection
- All hardcoded colors replaced with named constants across 7 files
- Dead imports cleaned (DOPApp, AMBlock, PMBlock, Shared — SectionDivider removed)
- timeDNA null check corrected
- Retry label guarded
- False-positive Saved fixed — only fires on successful save
- Duplicate FormInstructionsModal footer note removed

### Known bugs (not yet fixed)
- **GRADUATE badge will not render** — DOPApp drops graduated_from_4x4 flag when rebuilding custom rows. Fix required before July 31.
- Foundation Core selection not auto-saved — selectFoundationCore() bypasses updateDraft() storage write
- Alteration saves never clear drafts — draft-clear loop is after alteration early-return
- Grace banner Instructions panel copy inaccurate — held pending period logic redesign
- "Stay logged in" checkbox in LoginScreen is dead UI — post-Supabase
- progressLabel computed in DOPApp but never used
- NAV_TEXT_DIM exported from constants but used nowhere
- styles.js card export imported by nothing
- FourX4View placeholder section branch is unreachable
- storage.list() exported but used nowhere
- Enforcement tests test local copies of rules, not shipping code
- Streak badge display wired but streak key never written — badge never appears

### Post-Supabase (do not build)
- Tomorrow's Priorities → PIT transfer
- AI quote API key wiring
- Alteration coach notification flag
- Streak persistence
- 30-Day Cycle Architecture (dedicated build session required first)

## VITEST

- 21 passing tests across 3 files: smoke.test.jsx, enforcement.test.js, autosave.test.js
- Run: npm test
- Note: enforcement tests test local copies of rules, not shipping code

## GOVERNING DOCUMENT

- **Code Logic doc:** JPG-SYS-DOP-CodeLogic-WRK-v2.9
- This file is a context loader only — do not reproduce the full Code Logic doc here.

## SESSION START PROTOCOL

First instruction in every Desktop Code session is always read-only:

> "Read CLAUDE.md and confirm you understand — do not run any commands yet."

Wait for Claude Code to confirm it has read this file and understood the rules. Only after confirmation, proceed to development work.

---

*DOP CLAUDE.md — v1.1 — updated 07/29/2026. Full color system, UI parameters, locked rules, and build state added. Aligned to Code Logic v2.9.*
