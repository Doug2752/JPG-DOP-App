# CLAUDE.md — JPG-DOP-App
**Version:** v1.4 | **Date:** 08/13/2026 | **Repo:** Doug2752/JPG-DOP-App

This file is a context loader for Claude Code. Read this first, then read actual source files for full technical detail. Do not replace this file with a stripped-down version — produce targeted updates only.

---

## APP IDENTITY

- **Name:** Daily Operational Process (DOP)
- **Port:** 5173
- **Framework:** React + Vite
- **Storage:** localStorage (pre-Supabase)
- **Test login:** Doug / JPG2026 (case-insensitive)
- **Daily-use browser:** Brave (port 5173 — stop Brave before dev server during work hours)
- **Dev/test browser:** Firefox

---

## REPO STRUCTURE

```
app/
  DOPApp.jsx          — root, state, routing, storage
components/
  AMBlock.jsx         — AM checklist, evaluation, lock
  PMBlock.jsx         — PM checklist, evaluation, lock, grace banner, footer
  FourX4View.jsx      — 4x4 Matrix: setup, instructions, history, metrics, graduation
  FourX4DailyCard.jsx — daily protocol checkoff card with weekly % display
  SetupScreen.jsx     — Configure tab
  BrandBar.jsx        — logo, date, NEVER TWICE box, streak badge
  Header.jsx          — nav bar
  FormInstructionsModal.jsx — setup instructions panel
  Shared.jsx          — CheckRow, PITButton, QuoteBox, RecommendedBadge, TapScore
  SetupRow.jsx        — AM/PM setup row
  styles.js           — inp, lbl, gbtn (card export removed 08/12/2026)
utils/
  fourX4Period.js     — full period engine: getCycleData, evaluateAndWriteTierCap, closeActivePeriod, countCompletions, all period functions
  date.js             — todayStr(), fmtDate()
  constants.js        — all color constants
services/
  storage.js          — localStorage wrapper (storage.list removed 08/07/2026)
```

---

## KEY STORAGE KEYS

| Key | Purpose |
|---|---|
| `{user}_dop7_setup` | AM/PM configure settings |
| `{user}_dop7_form_{date}` | Daily form data |
| `{user}_dop7_archiveDates` | Array of saved form dates |
| `4x4_protocols_{user}` | Active and history protocol records |
| `4x4_history_{user}` | Period close history records |
| `4x4_tier_{user}` | `{ tier, cap }` — written by evaluateAndWriteTierCap |
| `dop_4x4_draft_{user}_0..3` | Per-slot draft state |
| `hub_clients` | Read-only via getCycleData() — provides cycle_start, tier, cap_override_minutes |

---

## CRITICAL LOGIC — getCycleData()

Located in `utils/fourX4Period.js`. Reads `hub_clients` from localStorage. Returns:
```js
{ cycle_start, tracking_start_date, onramp_end, tier, cap_override_minutes }
```
Falls back to `CYCLE_FALLBACK = { cycle_start: '2026-08-01', tracking_start_date: null, onramp_end: null, tier: 4, cap_override_minutes: null }` when no matching record found.

Called on mount, in handleManualClose, and in runSave — always destructure `tier` and `cap_override_minutes` as well as `cycle_start`.

---

## CRITICAL LOGIC — evaluateAndWriteTierCap()

Located in `utils/fourX4Period.js`. **Signature (REBUILT 08/13/2026):**
```js
evaluateAndWriteTierCap(user, storage, tier, capOverride)
```
- capOverride (positive int) → cap = capOverride
- tier === 1 → cap = 60
- all other tiers → cap = 30
- Writes `{ tier, cap }` to `4x4_tier_{user}`
- **Prior completion-rate / historyRecords logic has been removed entirely**

---

## CRITICAL LOGIC — FourX4DailyCard Weekly %

Located in `components/FourX4DailyCard.jsx`.

- `cycleWeekRange(cycleStart)` — 7-day rolling window from cycle_start (not Mon–Sun calendar)
- Reads localStorage directly (synchronous) — does NOT use async storage service
- `weeklyCounts` state populated for all protocols (daily and weekly_target)
- weekly_target display: `{count} of {target} this week — {pct}%`
- daily display: `{pct}%` only
- pctColor: green (#2E7D32) ≥75%, yellow (#F9A825) ≥50%, red (#C0392B) <50%

---

## COLOR SYSTEM (LOCKED)

| Constant | Hex | Use |
|---|---|---|
| GOLD | #B8860B | Informational/non-interactive |
| GOLD_LIGHT | #ddb94a | Clickable/action elements |
| STEEL | #2C4A6B | PM block (PMBlock + SetupScreen only) |
| DARK | #1a1a1a | Dark backgrounds, nav bar |
| RED | #c0392b | Validation errors |
| GREEN_SAVE | #27ae60 | Saved indicator |
| BG | #f8f8f6 | App background |
| BORDER | #d0c8b8 | Table/box borders |

**Two-tier gold rule:** GOLD_LIGHT = clickable. GOLD = informational. Both get black text + 1.5px black border on light backgrounds. No border on dark/nav backgrounds.

**NEVER use #B8962E** — deprecated.

---

## LOCKED RULES

- **Protocol terminology:** "Protocol" only — never "habit," "task," or "rule"
- **cycle_start is the authoritative anchor** — month_set is retired everywhere
- **Alter This Protocol is the only mid-period modification path** — canClose gate blocks direct edits
- **Measurable target optional** when time_cost_minutes is non-null and non-zero
- **Graduated protocols excluded from Time Governor budget** — structural invariant: promoted checklist items carry no time_cost_minutes
- **Tier cap rule (locked 08/13/2026):** Tier 1 = 60 min, Tiers 2/3/4 = 30 min. cap_override_minutes takes precedence when set.
- **Weekly % window:** 7-day rolling from cycle_start — never Mon–Sun calendar week
- **Streak system deferred** — do not build until explicitly re-scoped
- **STEEL family:** PMBlock.jsx and SetupScreen.jsx only — AMBlock never imports STEEL

---

## VITEST TESTS

19/19 passing. Files: `smoke.test.jsx`, `enforcement.test.js`, `autosave.test.js`. Run with `npm test`. Rule 1 test block deleted 08/12/2026.

---

## STANDING RULES FOR CLAUDE CODE

- Investigation before build — always read actual source files before making changes
- Do not modify .md files in the repo
- Do not start the dev server
- Do not commit
- One task at a time — no batching logic changes with styling

*CLAUDE.md v1.4 | JPG-DOP-App | 08/13/2026*
