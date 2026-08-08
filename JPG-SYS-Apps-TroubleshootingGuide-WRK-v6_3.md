# JPG — APPS TROUBLESHOOTING GUIDE
*Plain-Language Behavior & Troubleshooting Reference — DOP, PIT, OBT, HUB*

**Document ID:** JPG-SYS-Apps-TroubleshootingGuide-WRK-v6.3
**Date:** 08/07/2026 | **Prepared by:** Claude | **State:** WRK
**Classification:** CLASS 1 — CONFIDENTIAL
**Supersedes:** JPG-SYS-Apps-TroubleshootingGuide-WRK-v6.2

## PURPOSE OF THIS DOCUMENT

Written for Doug, not for building code. Describes what a beta client sees and experiences across the four JPG apps, in plain language.

**v6.3 update (08/07/2026):** DOP Section 1F updated — manual close button is now built. DOP Section 1G updated — graduation decision now includes Modify option and AM/PM selection step at promotion. DOP Section 1H updated — foundation core auto-save fixed. HUB Part Four fully written for first time — login, client wheel, client management, spoke access.

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

**Section 10 (4x4 Matrix) directs the client to the 4x4 tab Instructions panel** for all setup guidance, protocol rules, and examples.

## SECTION 1C — GRACE WINDOW REMINDER BANNER

**A non-dismissible gold banner appears in the PM block at the end of each period and for 5 days after.**

It counts down and reminds the client to complete any outstanding items before the period closes. The banner cannot be dismissed — it stays visible until the window passes.

## SECTION 1D — 4x4 GRADUATE BADGE

**A gold GRADUATE badge is designed to appear on any protocol card that has been promoted out of the 4x4 Matrix into permanent DOP.**

The badge displays inline with the item label in the AM or PM daily checklist. Verification is pending the August period close — if the badge does not appear after a promotion, report it.

## SECTION 1E — ALTERATION SYSTEM (UPDATED 08/07/2026)

**Alter This Protocol is the only supported way to change a running protocol during an active period.**

**The client can change any field during an alteration — including the protocol type (Activation/Deactivation) and Foundation Core.** One alteration per protocol per period. After an alteration is saved, the Alter button disappears for that protocol for the rest of the period.

**The original protocol is preserved** with its own checkoff record up to the day of the alteration. The new version starts from the alteration date. Both are evaluated separately at period close.

**Attempting to edit protocol fields directly in Set Up / Edit without using Alter This Protocol** will result in an error message explaining that the period cannot close yet. Nothing is saved. This is expected behavior — Alter This Protocol is the correct path.

## SECTION 1F — PERIOD CLOSE AND GRADUATION (UPDATED 08/07/2026)

**At the end of each period, DOP evaluates every 4x4 protocol for graduation.**

**A manual Close This Period button now exists** in the Set Up / Edit section of the 4x4 tab. It appears only when an active period exists. Clicking it shows an inline confirmation dialog. Confirming closes the period immediately, evaluates all protocols, and loads the graduation decision screen.

**The period also closes automatically** when the grace window expires (5 days past month-end) on next app load.

**Protocols that met their completion target** (75% or better) are eligible for a graduation decision — Promote, Drop, Keep In 4x4, or Modify.

**Protocols that did not meet their target** carry forward automatically as remediates into the next period. No graduation decision required for these.

**The graduation decision screen appears automatically** when the 4x4 Matrix tab opens after a close. It must be completed before the normal view is accessible.

**History shows closed period records only.** Daily checkoff data from an active (open) period does not appear in History until the period closes and the records are tallied.

## SECTION 1G — GRADUATION OPTIONS (UPDATED 08/07/2026)

**Four options appear for each eligible protocol at graduation.**

**PROMOTE** moves the protocol into the permanent DOP daily checklist. Before promotion completes, the client selects AM, PM, or Both — this controls which checklist the protocol appears in. Selecting Cancel at this step returns to the main graduation decision without promoting.

**DROP** removes the protocol. The slot opens for a new protocol next period.

**KEEP IN 4x4** carries the protocol forward with a 25% combined growth requirement — the client must increase frequency, time cost, or a combination of both by at least 25% versus the prior period.

**MODIFY** opens a full inline edit form for the protocol before making a final decision. The client can change any field — name, type, time of day, frequency, time cost, measurable target, or deactivation declaration. All standard validation rules apply. After saving changes, the client returns to the main graduation decision with the updated protocol.

## SECTION 1H — 4x4 MATRIX RULES

**The 4x4 Matrix enforces rules when a client sets up or saves protocols.**

At least one of the four protocols must always be a Deactivation type. Each of the four Foundation Cores must be used exactly once. All four protocols must have a name, type, time of day, frequency, and either a time cost or DNA selected.

**Activation protocols require a measurable target unless a time cost is already entered.** If a time cost is filled in, the measurable target field is optional. Minutes and hours are valid measurable target units.

**Foundation Core selections now save automatically** when a client is building their first set of protocols. Refreshing the page no longer clears a selected Foundation Core.

**The 4x4 Matrix supports up to 4 active protocols per period.**

## SECTION 1I — DAY COMPLETE (DOP)

**DOP Day Complete requires four things: both AM and PM evaluations scored, AM Block Complete clicked, PM Block Complete clicked, and required items checked off.**

**The Day Complete indicator at the bottom of the PM block guides the client through the process in stages.**

When the AM block requirements are met, it shows "✓ AM Complete." When PM items are also done but PM Block Complete has not been clicked, it shows "✓ AM Complete · ✓ PM Items Done — PM Block Complete not yet clicked." When all requirements are met including both block complete buttons, it shows "✓ Day Complete — Well executed."

**Clicking AM Block Complete locks the AM block.** The button label changes to "Unlock AM Block." Clicking PM Block Complete locks the PM block. The button label changes to "Unlock PM Block."

**Unlocking a locked block requires a confirmation step.** Tapping "Unlock AM Block" or "Unlock PM Block" shows an inline warning. The client must tap Confirm to proceed, or Cancel to dismiss.

## SECTION 1J — ARCHIVE DATA BEHAVIOR

**The archive shows the client's past daily entries.** Up to the last 30 saved dates are accessible from the Archive tab.

**Daily 4x4 protocol checkoffs are saved as part of the daily form record** but are not displayed in the archive view — the archive shows AM/PM items only. The checkoff data is used internally at period close to calculate completion rates.

**A critical bug was fixed 08/07/2026:** Previously, the archive date index could be wiped on login if a background process fired before the stored dates were fully loaded. This caused all archived dates except one to disappear. The fix ensures the date index is always read fresh from storage before any update — the wipe can no longer occur.

## SECTION 1K — AUTOMATED TESTS

**DOP has an automated test suite that runs with the command npm test.**

21 passing tests across 3 files. Tests confirm the render pipeline, enforcement rules, and auto-save behavior.

## SECTION 1L — UTC DATE DISPLAY

**DOP displays dates based on UTC time, not local time.**

Starting around 5pm Pacific, the app will show tomorrow's date while it is still today locally. This is intentional — period close logic is UTC-anchored throughout. This is not a bug.

## SECTION 1M — CONFIGURE TAB

**The Configure tab is where a client sets up their AM and PM daily items.**

**If the Configure tab ever shows a blank screen**, clear DOP's browser storage and log back in. This can happen when stored setup data predates a software update.

## SECTION 1N — OPEN PIT BUTTON

**The Open PIT button appears in both the AM and PM blocks.**

Clicking it opens the PIT app directly in a new tab, carrying the user's identity so PIT recognizes who is logging in.

## SECTION 1O — 4x4 MATRIX TAB — LOCKED UNTIL CONFIGURE IS COMPLETE

**The 4x4 Matrix tab is greyed out and non-functional until the client completes the Configure tab setup.**

A label below the greyed button reads "Complete Configure to unlock."

## SECTION 1P — DATA LOAD AND SAVE ERRORS

**If DOP cannot load stored data on login, a red error message appears at the top of the screen.**

**If DOP cannot save data during use, a red error message appears.**

Both messages appear only when an actual storage failure occurs.

---

# PART TWO — PIT (PERSONAL INVESTMENT TIME)

PIT is the client's daily personal performance log — a structured form covering fitness, nutrition, mindset, tasks, and reflection.

## SECTION 2A — LOGGING IN

**PIT uses the same login screen as DOP — gold background, white card, JPG logo, gold Enter button. Login is case-insensitive.**

## SECTION 2B — DAILY TRACKING FIELDS

**The top section of PIT captures the client's daily performance metrics.**

Required fields: Wake Up Time, Weight, Work/Off, Sleep Score, Fitness Yesterday. Additional tracking fields (not required): Location, PIT Time Frame, Energy Level, Mental Alignment / Meditation.

**Wake Up Time is a combobox** — the client can type a time or select from 15-minute increment options.

## SECTION 2C — FITNESS YESTERDAY — MULTI-ENTRY

**Clients can log multiple fitness activities for yesterday — one entry per activity.**

Each manual entry has a Remove button when more than one entry exists. Recurring entries show only a confirm-done checkbox — no editable fields, no Remove button.

**Each manual fitness entry includes an optional Notes field** for workout details. This field does not affect day completion.

**The Activity Type dropdown includes "Rest and Recovery" as the first selectable option.** When selected, the Track By selector does not appear.

**Switching Fitness Yesterday from Yes to No or Rest Day when data has been entered shows a confirmation prompt.** If confirmed, entered fitness data is cleared. If cancelled, the selector reverts and data is preserved.

## SECTION 2D — CONFIGURE RECURRING FITNESS

**The Configure tab lets the client set up recurring fitness activities once.**

Recurring entries auto-populate in Fitness Yesterday on selected days. Removing a recurring activity shows a confirmation prompt before deletion.

## SECTION 2E — TO ACCOMPLISH SYSTEM

**The To Accomplish section has three levels: One Thing, Daily Tasks, and Future Tasks.**

One Thing is the single most important task for the day and is required for day completion. Daily Tasks hold up to two items. Future Tasks holds items not tied to today.

**Unchecked items carry forward automatically to the next day.**

**Tasks can be moved in any direction** — between One Thing, Daily, and Future.

**When a One Thing is checked off manually**, any First Action Step text is folded into the task description in parentheses, and the First Action Step field is cleared.

**Future Tasks holds a maximum of 18 items.**

**The Clear Items button removes all selected tasks at once.** If the client clicks Confirm without selecting anything, a message appears — the dialog stays open.

**All three task levels have a Remove button.** Tapping Remove shows an inline warning before permanent deletion.

## SECTION 2F — DAY COMPLETE (PIT)

**The Mark Day Complete button becomes active once all required fields are filled.**

Once clicked, all required fields lock to read-only. An Unlock button replaces the Mark Day Complete button if the client needs to make changes.

## SECTION 2G — AI SUMMARY

**The AI Summary pulls from every section of PIT across a fixed 7-day window — today plus the 7 prior days.**

The client cannot adjust the date range.

## SECTION 2H — APPOINTMENTS

**Appointments are date-stamped entries that persist until their date passes.**

Up to 5 future-dated appointments can be stored at a time. Past appointments drop off automatically.

**Each appointment has a Lock Appointment button.** Tapping it locks all fields. A gold left border and LOCKED badge appear. Tap Unlock Appointment to edit again. The Remove button is always available regardless of lock state.

## SECTION 2I — IMPORTANT DISCOVERIES

**The Important Discoveries section stores insights and key learnings in a persistent library.**

If required fields are empty when adding an entry, an inline message explains what is missing. If the client begins editing and cancels, a confirmation prompt appears before discarding changes.

## SECTION 2J — BOOK STUDY

**The Book Study section tracks daily reading progress.**

Title, author, and page number carry forward when a book is in progress. Page numbers cannot be negative. When a book is marked complete, a green border and Completed badge appear.

## SECTION 2K — DEVOTIONAL AND QUOTES

**The Scripture Search and Quotes Search fields retain the client's search text after closing a result.**

---

# PART THREE — OBT (ONBOARDING AND TRACKING)

OBT is the client's 14-day onboarding and daily tracking app. It captures five categories of daily data — Nutrition, Alcohol, Fitness, Sleep, and Time & Life — plus two mid-program reflections and a Submit to Coach function.

## SECTION 3A — LOGGING IN

**OBT uses the same JPG login screen as DOP and PIT — gold background, white card, JPG logo, gold Enter button. Login is case-insensitive.**

**Every client starts OBT as Tier 4 APPRENTICE.** The tier patch and client name display in the BrandBar.

**When a client opens OBT from the HUB wheel, they bypass the OBT login screen entirely** — HUB carries their identity automatically. They land directly on the OBT landing page.

## SECTION 3B — COVER PAGE

**A cover page appears once per session when the client first opens OBT.**

Two buttons: Start Today's Entry (takes the client to today's Nutrition section) and Complete/Edit Client Info (takes the client to the Client Info tab). The cover page does not reappear until the browser is refreshed or the session ends.

## SECTION 3C — CLIENT INFO

**The Client Info tab collects 12 required fields before daily tracking begins.**

Fields include full name, start date, phone, email, occupation, primary goal, non-negotiables, hobbies, fitness activity, eating habits, sleep patterns, and injuries. The start date sets automatically on the client's first "Start Today's Entry" click and cannot be changed afterward.

**Non-Negotiables are selected by category** — tapping a category adds it to the list immediately.

## SECTION 3D — DAILY TRACKING — GENERAL

**OBT tracks 14 days of daily data across five sections: Nutrition, Alcohol, Fitness, Sleep, and Time & Life.**

The day selector shows all 14 days. The selected day is shared across all five sections.

**The Mark Day Complete button is always visible.** If required fields are missing, an error panel lists what needs to be filled. Red borders appear on incomplete fields.

**Once a day is marked complete, an Unlock button appears** so the client can make corrections.

## SECTION 3E — NUTRITION SECTION

**The Nutrition section captures three meals, snacks, and supplements.**

AM Meal, Mid Meal, and PM Meal are required. Snacks are optional. Supplements are optional — recent supplements are remembered for quick re-entry.

**An estimated daily calorie field is available** but requires a future AI key connection — it does not currently produce estimates.

## SECTION 3F — ALCOHOL SECTION

**The Alcohol section tracks beer, mixed drinks, and other alcohol.**

If the client did not drink, they check the None checkbox. At least one field or the None checkbox must be filled.

## SECTION 3G — FITNESS SECTION

**The Fitness section captures activity type, duration, intensity, and notes.**

Duration is entered as Hours and Minutes in separate fields.

**If the client selects None or Rest as the activity**, the Duration, Intensity, and Notes fields hide and are not required.

**Intensity is rated using RPE (Rate of Perceived Exertion) buttons.**

## SECTION 3H — SLEEP SECTION

**The Sleep section captures bedtime, time to fall asleep, wake time, number of wake-ups, awake duration, and sleep quality.**

**If the client enters 0 for number of wake-ups**, the Awake Duration field hides and is not required. A false validation error no longer appears in this case.

**The Sleep Score field accepts values from 1 to 100.** If the client clears the field entirely, it saves as blank — it does not default back to 1.

## SECTION 3I — TIME & LIFE SECTION

**The Time & Life section captures screen time, work schedule, non-negotiables completed, PM rating, tomorrow's one thing, relationship time, and PIT time.**

**Work Schedule is a dropdown.** If the client selects Retired, the Work Hours field hides.

**Tomorrow's One Thing is required.**

## SECTION 3J — REFLECTION TAB

**The Reflection tab appears at Day 7 and Day 14 with structured reflection questions.**

A popup appears automatically when the client reaches Day 7 or Day 14. Answers save automatically. Once submitted, answers remain visible but cannot be edited.

## SECTION 3K — SUBMIT TO COACH

**The Submit to Coach strip appears at the bottom of the Time & Life section.**

Week 1 covers Days 1–7. Week 2 covers Days 8–14. Once submitted, the strip updates to show a submitted state. Data is held for future Supabase backend connection — no data is transmitted yet.

## SECTION 3L — ARCHIVE VIEW

**The Archive view shows a list of all completed days and reflection submissions.**

Tapping a completed day row takes the client to that day's Nutrition section in read-only mode.

## SECTION 3M — SUMMARY RESULTS

**The Summary Results tab shows a week-by-week summary of all tracked data across all 9 columns.**

The table scrolls horizontally on narrow screens.

## SECTION 3N — AUTOMATED TESTS

**OBT has an automated test suite that runs with the command npm test.**

9 passing tests. Tests confirm archive navigation behavior.

---

# PART FOUR — HUB (WORKSPACE HUB)

HUB is central command — the single login point for the entire JPG coaching platform. Both coach and clients log in here.

## SECTION 4A — LOGGING IN

**HUB uses the same JPG login screen as the other apps — gold background, white card, JPG logo, gold Enter button. Login is case-insensitive.**

**Coach logs in with username Doug and password JPG2026.**

**Clients log in with their generated username and generated password.** The username is the client's first initial plus last name (e.g. jsmith). The password is generated from the client's last name, last four digits of their phone number, and the month and year their program started (e.g. Smith53090926).

**Session persists across page refreshes.** The client or coach does not need to log in again after refreshing the browser.

## SECTION 4B — COACH WHEEL VIEW

**When the coach logs in, the full 10-spoke wheel appears.** All spokes are clickable.

**Clicking a live spoke opens that app in a new tab.** DOP, PIT, and OBT open without requiring a separate login — HUB carries the identity automatically. Other spokes are under development and show a placeholder message when clicked.

## SECTION 4C — CLIENT WHEEL VIEW

**When a client logs in, the wheel appears with only their unlocked spokes active.** Locked spokes show greyed out and cannot be clicked.

**The coach controls which spokes a client can access** from the Clients section of HUB.

## SECTION 4D — CLIENTS SECTION

**The Clients section shows the coach's full client roster.**

Each row displays the client's name, tier, program start date, number of unlocked spokes, and status.

**Clicking a client row opens a slide panel** on the right side of the screen with full client details.

**The ADD CLIENT button** opens an inline form at the top of the roster. Required fields are first name, last name, phone, and program start date. Email is optional.

**After saving a new client, a credentials panel appears** showing the generated username and generated password. These credentials must be saved and shared with the client — they are only shown once in this view.

## SECTION 4E — CLIENT SLIDE PANEL

**The slide panel shows the selected client's tier, program start date, login credentials, and spoke access.**

**Each spoke has an UNLOCK or REVOKE button.** Tapping UNLOCK grants the client access to that spoke — it becomes clickable on their wheel immediately. Tapping REVOKE removes access.

**The spoke count in the roster row updates automatically** after any toggle.

## SECTION 4F — SPOKE ACCESS MANAGEMENT

**Six spokes have access flags the coach controls:** OBT, DOP, PIT, EDU, COMMS, and AGREEMENTS.

All spokes default to locked when a client is first created. The coach unlocks them in sequence as the client progresses through the program.

---

## VERSION HISTORY

| VERSION | DATE | CHANGES |
|---|---|---|
| v5.7 | 07/26/2026 | OBT tier patch display, SummaryResults clipping fix. |
| v5.8 | 07/28/2026 | OBT section color pass, duration split, rating boxes, button renames. |
| v5.9 | 07/28/2026 | PIT full operability pass. |
| v6.0 | 07/28/2026 | DOP AM/PM Lock box labels. Load/save error banners. Grace banner and GRADUATE badge noted. PIT two-stage Remove documented. |
| v6.1 | 07/29/2026 | OBT operability review complete. OBT sections 3A–3N written. Bug fixes documented. |
| v6.2 | 08/07/2026 | DOP Section 1D — GRADUATE badge fix documented. Section 1E — alteration system updated. Section 1F — period close: manual close gap documented. Section 1I — archive behavior: archiveDates stale closure bug fix noted. Section 1G — 4x4 rules updated. |
| v6.3 | 08/07/2026 | DOP Section 1F — manual close button now built, description updated. DOP Section 1G renamed and expanded — four graduation options documented (Promote with AM/PM selection, Drop, Keep In 4x4, Modify). DOP Section 1H — foundation core auto-save fix documented. OBT Section 3A — HUB passthrough login behavior documented. HUB Part Four written for first time — Sections 4A through 4F covering login, coach wheel, client wheel, client roster, ADD CLIENT, slide panel, and spoke access management. |

---

*JPG-SYS-Apps-TroubleshootingGuide-WRK-v6.3 | Jones Performance Group LLC | CONFIDENTIAL | 08/07/2026*
