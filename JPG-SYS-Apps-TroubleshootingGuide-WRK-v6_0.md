# JPG — APPS TROUBLESHOOTING GUIDE
*Plain-Language Behavior & Troubleshooting Reference — DOP, PIT, OBT, HUB*

**Document ID:** JPG-SYS-Apps-TroubleshootingGuide-WRK-v6.0
**Date:** 07/28/2026 | **Prepared by:** Claude | **State:** WRK
**Classification:** CLASS 1 — CONFIDENTIAL
**Supersedes:** JPG-SYS-Apps-TroubleshootingGuide-WRK-v5.9

## PURPOSE OF THIS DOCUMENT

Written for Doug, not for building code. Describes what a beta client sees and experiences across the four JPG apps, in plain language.

**v6.0 update (07/28/2026):** DOP operability review completed. Multiple DOP behavior and UI updates. PIT: GREEN_COMPLETE constant, Remove button two-stage confirmation on all task levels, HelpPanel Lock Appointment copy corrected. See version history for full list.

**Format (locked):** short, bolded declarative statements. No field names, no code, no jargon.

**Accuracy rule:** every entry reflects behavior actually built and browser-verified.

---

# PART ONE — DOP (DAILY OPERATIONAL PROCESS)

DOP is the client's daily roadmap — a lightweight checklist of AM and PM items that houses the process for the day. The 4x4 Matrix is a feature inside DOP, not a separate app.

## SECTION 1A — LOGGING IN AND FIRST-VISIT INSTRUCTIONS

**DOP uses the shared JPG login screen — gold background, white card, black-on-white logo, "EXISTING OUTSIDE OF BOUNDARIES" tagline, gold Enter button. Login is case-insensitive.**

**The Setup Instructions modal opens automatically the very first time DOP is opened in a browser, and can be reopened at any time from the Setup tab, Archive, or main Form view.**

**The Setup Instructions panel includes a pointer to the 4x4 Matrix instructions.** The 4x4 tab has its own dedicated instructions panel — clients are directed there for setup guidance, protocol rules, and examples.

## SECTION 1B — SETUP INSTRUCTIONS PANEL

**The Setup Instructions panel covers 18 sections explaining every part of DOP configuration and daily use.**

**Section 2 (Configuring Your DOP) tells the client to plan for around 30 minutes total — including their AM PIT session.**

**Section 5 (AM Required Items) lists Notes – Ideas – Thoughts (N-I-T) as the full name of the NIT field, spelled out on first use.**

**Section 10 (4x4 Matrix) directs the client to the 4x4 tab Instructions panel** for all setup guidance, protocol rules, and examples. No 4x4 detail lives in the main Setup Instructions.

## SECTION 1C — GRACE WINDOW REMINDER BANNER

**A non-dismissible gold banner appears in the PM block at the end of each period and for 5 days after.**

It counts down and reminds the client to complete any outstanding items before the period closes. The banner cannot be dismissed — it stays visible until the window passes.

## SECTION 1D — 4x4 GRADUATE BADGE

**A gold GRADUATE badge is designed to appear on any protocol card that has been promoted out of the 4x4 Matrix into permanent DOP.**

Note: the badge is not currently rendering due to a known code issue being resolved before launch.

## SECTION 1E — ALTERATION PROTOCOL TYPE

**Alteration is a way to adjust an existing running protocol without starting over.**

A client uses the Alter button on any protocol card. The alteration creates a modified version while preserving the original for scoring purposes. Only one alteration is allowed per protocol per period. The clock resets at the alteration date. Full guidance on alteration is in the 4x4 Instructions panel at step 3a.

## SECTION 1F — PERIOD CLOSE AND GRADUATION

**At the end of each period, DOP evaluates every 4x4 protocol for graduation.**

Protocols that met their targets graduate to permanent DOP. Protocols that did not are remediated — carried forward into the next period with adjustable settings. A Period Closed Summary screen appears after graduation decisions are made.

## SECTION 1G — 4x4 MATRIX RULES

**The 4x4 Matrix enforces rules when a client sets up a protocol.**

Rule 2: Minutes and hours are not allowed as measurable-target units. Clients must choose from the approved unit list (e.g. grams, miles, sets).

**The 4x4 Matrix supports up to 20 future protocol slots** — 3 active slots plus 17 in the queue.

## SECTION 1H — DAY COMPLETE (DOP)

**DOP Day Complete requires four things: both AM and PM evaluations scored, AM Block Complete clicked, PM Block Complete clicked, and required items checked off.**

**The Day Complete indicator at the bottom of the PM block guides the client through the process in stages.**

When the AM block requirements are met, it shows "✓ AM Complete." When PM items are also done but PM Block Complete has not been clicked, it shows "✓ AM Complete · ✓ PM Items Done — PM Block Complete not yet clicked." When all requirements are met including both block complete buttons, it shows "✓ Day Complete — Well executed."

**Clicking AM Block Complete locks the AM block.** The button label changes to "Unlock AM Block." Clicking PM Block Complete locks the PM block. The button label changes to "Unlock PM Block." Neither button alone marks the day complete — both are required along with scored evaluations and checked items.

**Unlocking a locked block requires a confirmation step.** Tapping "Unlock AM Block" or "Unlock PM Block" shows an inline warning: "Unlock AM block? Locked entries may be edited." The client must tap Confirm to proceed, or Cancel to dismiss.

## SECTION 1I — AUTOMATED TESTS

**DOP has an automated test suite that runs with the command npm test.**

21 passing tests across 3 files. Tests confirm the render pipeline, enforcement rules, and auto-save behavior.

## SECTION 1J — UTC DATE DISPLAY

**DOP displays dates based on UTC time, not local time.**

Starting around 5pm Pacific, the app will show tomorrow's date while it is still today locally. This is intentional — period close logic is UTC-anchored throughout. This is not a bug.

## SECTION 1K — CONFIGURE TAB

**The Configure tab is where a client sets up their AM and PM daily items.**

**If the Configure tab ever shows a blank screen**, the fix is to clear DOP's browser storage and log back in. This can happen when stored setup data predates a software update. The code has been corrected to prevent this going forward, but clearing stale data in the browser resolves it immediately.

## SECTION 1L — OPEN PIT BUTTON

**The Open PIT button appears in both the AM and PM blocks.**

Clicking it opens the PIT app directly in a new tab, carrying the user's identity so PIT recognizes who is logging in.

## SECTION 1M — 4x4 MATRIX TAB — LOCKED UNTIL CONFIGURE IS COMPLETE

**The 4x4 Matrix tab is greyed out and non-functional until the client completes the Configure tab setup.**

A label below the greyed button reads "Complete Configure to unlock" so the client knows exactly what action is needed.

## SECTION 1N — DATA LOAD AND SAVE ERRORS

**If DOP cannot load stored data on login, a red error message appears at the top of the screen: "Unable to load your data. Please refresh the page."**

**If DOP cannot save data during use, a red error message appears: "Unable to save your data. Please refresh the page."**

Both messages appear only when an actual storage failure occurs. A successful save shows the normal "Saved." indicator. The save indicator only appears after data is confirmed saved.

---

# PART TWO — PIT (PERSONAL INVESTMENT TIME)

PIT is the client's daily personal performance log — a structured form covering fitness, nutrition, mindset, tasks, and reflection.

## SECTION 2A — LOGGING IN

**PIT uses the same login screen as DOP — gold background, white card, JPG logo, gold Enter button. Login is case-insensitive.**

## SECTION 2B — DAILY TRACKING FIELDS

**The top section of PIT captures the client's daily performance metrics.**

Required fields (count toward the 10-field completion check): Wake Up Time, Weight, Work/Off, Sleep Score, Fitness Yesterday. Additional tracking fields (not required): Location, PIT Time Frame, Energy Level, Mental Alignment / Meditation.

**Wake Up Time is a combobox** — the client can type a time or select from 15-minute increment options.

## SECTION 2C — FITNESS YESTERDAY — MULTI-ENTRY

**Clients can log multiple fitness activities for yesterday — one entry per activity.**

Each manual entry has a Remove button when more than one entry exists. Recurring entries show only a confirm-done checkbox — no editable fields, no Remove button.

**Each manual fitness entry includes an optional Notes field** for workout details, how it felt, or other notes. This field does not affect day completion.

**The Activity Type dropdown for manual entries includes "Rest and Recovery" as the first selectable option.** When "Rest and Recovery" is selected, the Track By selector does not appear.

**Switching Fitness Yesterday from Yes to No or Rest Day when data has been entered shows a confirmation prompt.** If the client confirms, entered fitness data is cleared. If they cancel, the selector reverts to Yes and the data is preserved.

## SECTION 2D — CONFIGURE RECURRING FITNESS

**The Configure tab lets the client set up recurring fitness activities once.**

Recurring entries auto-populate in Fitness Yesterday on the days selected. Removing a recurring activity shows a confirmation prompt before the activity is deleted.

## SECTION 2E — TO ACCOMPLISH SYSTEM

**The To Accomplish section has three levels: One Thing, Daily Tasks, and Future Tasks.**

One Thing is the single most important task for the day and is required for day completion. Daily Tasks hold up to two items. Future Tasks holds items not directly tied to today.

**Unchecked items carry forward automatically to the next day.**

**Tasks can be moved in any direction** — from One Thing to Daily or Future, from Daily to One Thing or Future, and from Future to Daily.

**When a One Thing is checked off manually**, any First Action Step text that was entered is folded into the task description in parentheses, and the First Action Step field is cleared.

**Future Tasks holds a maximum of 18 items.** When the limit is reached, a message appears explaining the cap and how to free up a slot.

**When moving a task, the move dialog shows the task text** so the client always knows which item they are moving.

**The Clear Items button removes all selected tasks at once.** If the client clicks Confirm without selecting anything, a message appears explaining that nothing was selected — the dialog stays open.

**All three task levels — One Thing, Daily Tasks, and Future Tasks — have a Remove button.** Tapping Remove does not delete immediately. An inline warning appears: "Task will not be recorded." The client must tap Confirm to permanently remove the task, or Cancel to keep it. Removed tasks are not memorialized — they disappear without a record. Checked-off tasks are memorialized in the archive.

**One Thing has a Remove button in the card header** — right of the Move button. Removing One Thing clears both the task text and the First Action / Set-Up field.

## SECTION 2F — DAY COMPLETE (PIT)

**The Mark Day Complete button becomes active once all 10 required fields are filled.**

Once clicked, all required fields lock to read-only. The header pill updates to show the day is complete. An Unlock button replaces the Mark Day Complete button if the client needs to make changes.

## SECTION 2G — AI SUMMARY

**The AI Summary pulls from every section of PIT across a fixed 7-day window — today plus the 7 prior days.**

The client cannot adjust the date range. The summary is available once per 7-day rolling window from the client's last use.

## SECTION 2H — APPOINTMENTS

**Appointments are date-stamped entries that persist until their date passes.**

Up to 5 future-dated appointments can be stored at a time. Past appointments drop off automatically.

**Each appointment has a Lock Appointment button in the appointment header.** Tapping it locks all fields so nothing can be accidentally changed. A gold left border and LOCKED badge appear on the card when locked. Tap Unlock Appointment to edit again. The Remove button is always available regardless of lock state.

## SECTION 2I — IMPORTANT DISCOVERIES

**The Important Discoveries section stores insights and key learnings in a persistent library.**

When no discoveries have been added yet, a placeholder message appears prompting the client to add their first one. If required fields are empty when the client tries to add an entry, an inline message explains what is missing. If the client begins editing a discovery and then cancels, a confirmation prompt appears before discarding any unsaved changes.

## SECTION 2J — BOOK STUDY

**The Book Study section tracks daily reading progress.**

Title, author, and page number carry forward when a book is in progress. Page numbers cannot be entered as negative values. When a book is marked complete, a green border and Completed badge appear on the card.

## SECTION 2K — DEVOTIONAL AND QUOTES

**The Scripture Search and Quotes Search fields retain the client's search text after closing a result.** The client can re-run or refine the same search without retyping.

---

# PART THREE — OBT (ONBOARDING AND TRACKING)

*(No changes to OBT section this session — content carried from v5.9)*

---

# PART FOUR — HUB

*(No changes to HUB section this session.)*

---

## VERSION HISTORY

| VERSION | DATE | CHANGES |
|---|---|---|
| v5.7 | 07/26/2026 | OBT tier patch display, SummaryResults clipping fix. |
| v5.8 | 07/28/2026 | OBT section color pass, duration split, rating boxes, button renames. |
| v5.9 | 07/28/2026 | PIT full operability pass — appointments lock, button renames, HelpPanel updates, fitness confirmation dialogs, track by hidden, one thing checkbox, book study page min, devotional toggle, never twice font, scripture/quotes close preserve query, discoveries empty state/validation/cancel confirm, clear items guard, move modal text, future tasks cap. |
| v6.0 | 07/28/2026 | DOP: AM/PM Lock box labels corrected (Mark/Unlock). Unlock confirmation step added. Header 4x4 disabled label added. Load/save error banners documented. "Complete Configure to unlock" label added. Grace banner timing clarified. GRADUATE badge noted as known issue. Section 1M and 1N added. PIT: Two-stage Remove confirmation on One Thing, Daily Tasks, Future Tasks — documented in Section 2E. One Thing Remove button noted (clears both fields). HelpPanel Appointments copy corrected — "in the appointment header" and LOCKED badge. Book Study completion green documented. |

---

*JPG-SYS-Apps-TroubleshootingGuide-WRK-v6.0 | Jones Performance Group LLC | CONFIDENTIAL | 07/28/2026*
