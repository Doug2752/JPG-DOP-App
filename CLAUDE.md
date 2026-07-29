# CLAUDE.md — JPG-DOP-App

## APP IDENTITY

- App name: Daily Operational Process (DOP)
- Dev port: 5173
- Repo: Doug2752/JPG-DOP-App
- Local folder: C:\JPG-PROJECTS\JPG-DOP-App
- Framework: React + Vite, Class 3 modular structure
- Storage: localStorage (pre-Supabase)

## CREDENTIALS

- doug / jpg2026
- test / JPG2026
- Login comparison is case-insensitive on both sides

## NON-NEGOTIABLE WORKING RULES

1. Read this file first. Confirm you have read it before any action.
2. Investigation prompt before every build — read actual source files before writing any code.
3. One task at a time. Never bundle logic changes with styling or copy changes.
4. Never touch .md files in this repo during code builds.
5. Never start the dev server.
6. Never commit — Doug commits via GitHub Desktop only.
7. Opus for complex multi-file builds. Sonnet for small edits and investigations.
8. Plan mode always on — present plan, wait for approval before executing.

## BROWSER AND PORT

- Firefox is the test browser (localhost:5173)
- Brave auto-opens 5173 on startup — do not assume Brave is closed during dev work

## CURRENT BUILD STATE (as of 07/28/2026)

### Built and committed

- Full AM/PM block with lock system — AM Lock and PM Lock buttons always visible (padding 8px 20px always). Labels: "Mark AM Block Complete" / "Unlock AM Block" and "Mark PM Block Complete" / "Unlock PM Block." Unlock requires inline confirmation.
- Four-state Day Complete display in PMBlock
- isDayComplete() — 7 required conditions including amLocked and pmLocked
- Grace window reminder banner (PMBlock, above PM Lock)
- 4x4 Matrix full feature set — Set Up/Edit, Instructions, History, Metrics
- Period close, graduation, keep-in-4x4, alteration
- Tier cap 30→60
- Auto-close on grace expiry
- Weekly tally (FourX4DailyCard)
- Per-card auto-save drafts
- Common Protocol Examples
- Mid-period edit warning
- Setup Instructions modal (18 sections) — duplicate footer note removed
- Configure tab (SetupScreen)
- Archive — Last 30 Days
- Open PIT button (localhost:5174?hub_user={userId})
- NEVER TWICE box
- Streak badge display (streak key never written — badge never appears in practice)
- AI quote with BACKUP_QUOTES fallback
- Load error banner (below Header when storage fails on login)
- Save error banner (below load banner when save fails)
- Header "Complete Configure to unlock" label below disabled 4x4 button
- Measurable target hint corrected — "4 sets" not "30 minutes"
- "Past Period Stats" label (always plural)
- Vitest test suite — 21 passing tests
- migrateSetup fix — amCommonSelected injection

### Known bugs (not yet fixed)

- GRADUATE badge will not render — DOPApp drops graduated_from_4x4 flag when rebuilding custom rows. Fix required before July 31.
- Foundation Core selection not auto-saved — selectFoundationCore() bypasses updateDraft() storage write
- Alteration saves never clear drafts — draft-clear loop is after alteration early-return
- Grace banner Instructions panel copy is inaccurate — says "last 5 days" but fires at/after month end
- "Stay logged in" checkbox in LoginScreen is uncontrolled — dead UI
- progressLabel computed in DOPApp but never used
- NAV_TEXT_DIM exported from constants but used nowhere
- styles.js card export imported by nothing
- FourX4View placeholder section branch is unreachable
- storage.list() exported but used nowhere
- Enforcement tests test local copies of rules, not shipping code

### Post-Supabase (do not build)

- Tomorrow's Priorities → PIT transfer
- AI quote API key wiring
- Alteration coach notification flag
- Streak persistence
- 30-Day Cycle Architecture (designed, not built — requires dedicated build session)

## GOVERNING DOCUMENT

Code Logic doc: JPG-SYS-DOP-CodeLogic-WRK-v2.8
This file is a context loader only — do not reproduce the full Code Logic doc here.
