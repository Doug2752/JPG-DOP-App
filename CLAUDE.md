# CLAUDE.md — DOP (Daily Operational Process)

## APP IDENTITY

- Name: DOP — Daily Operational Process
- Full folder: C:\JPG-PROJECTS\JPG-DOP-App
- GitHub repo: Doug2752/JPG-DOP-App
- Dev port: 5173 (5174 fallback)
- Purpose: Client's daily roadmap — AM/PM checklist housing
  the process for the day. Contains the 4x4 Matrix feature.
- Architecture: React + Vite, Class 3 modular, localStorage.

## NON-NEGOTIABLE WORKING RULES

1. Investigation before action.
2. Never assume.
3. Never act without asking first.
4. One task at a time (logic / styling / copy stay isolated).
5. Plan mode always on.
6. GitHub Desktop is the only trusted push mechanism.
7. Browser-verify before commit.
8. Never redraft finalized copy from scratch.

## MODEL SELECTION

- Opus — complex multi-file logic.
- Sonnet — small edits, investigations, styling, cleanup.
- Model stated at top of every prompt.

## BROWSER AND PORT REFERENCE

- Firefox — code/build testing, OS default.
- Brave — daily DOP/PIT entries only (localhost:5173).
- Edge — Claude.ai chat sessions.
- vite.config.js should carry server: { open: false, port: 5173 }.

## CURRENT BUILD STATE

Built and committed:

- AM/PM blocks, Configure, two-tier gold color system
- 4x4 Matrix: Set Up/Edit, Instructions, History, Metrics
- Period Close Pieces 1-3, Graduation workflow,
  Keep-in-4x4 pre-fill, weekly tally
- Mid-period edit warning modal
- Grace window reminder banner (PMBlock.jsx)
- 4x4 GRADUATE badge (Shared.jsx)
- Protocol enforcement rules (Rules 1-5 in runSave();
  Rule 1 removed 07/15/2026, Rule 2 refined to block
  minutes/hours)
- Deactivation Time saved auto-negate (07/15/2026)
- Per-card auto-save draft system (dop_4x4_draft keys)
- Mount field load fix (5 enforcement fields)
- Alteration protocol type — full build (07/15/2026)
- Vitest Tier 1 test infrastructure (tests/ folder,
  21 passing tests)
- Setup Instructions full copy pass (07/16/2026)
- 4x4 Instructions panel Section 5 expanded —
  GRADUATE badge paragraph and grace window banner
  paragraph added (07/16/2026)

NOT YET COMMITTED (awaiting July 31 real-period
verification):

- reloadFourX4 fix
- evaluateAndWriteTierCap (30→60 min cap unlock)

NOT YET BUILT:

- AM Lock box styling fix + Today's Takeaway sizing
  (grouped — awaiting Doug's direction)

Known credentials: Test / JPG2026 (case-insensitive).
Brave opens localhost:5173 automatically on startup —
do not change this port.

## KEY ARCHITECTURAL FACTS

React + Vite, npm run dev port 5173, localStorage, no backend,
case-insensitive login matching per CS v1.8 §8.2.
DOP→PIT data transfer not possible until Supabase migration.
4x4 Matrix lives inside DOP as a feature, not a separate app.
Daily checkoff card lives in TODAY tab after AM/PM blocks.

## REFERENCED GOVERNING DOCUMENTS

Core Standard v1.8, Troubleshooting Guide v4.5,
DOP Code Logic v2.4, Session Handoff Primer v2.7.

## SESSION START PROTOCOL

First instruction is always read-only:
"Read CLAUDE.md and confirm you understand —
do not run any commands yet."
