# JPG — APPS TROUBLESHOOTING GUIDE
*Plain-Language Behavior & Troubleshooting Reference — DOP, PIT, OBT, HUB*

**Document ID:** JPG-SYS-Apps-TroubleshootingGuide-WRK-v5.7
**Date:** 07/25/2026 | **Prepared by:** Claude | **State:** WRK
**Classification:** CLASS 1 — CONFIDENTIAL
**Supersedes:** JPG-SYS-Apps-TroubleshootingGuide-WRK-v5.6

## PURPOSE OF THIS DOCUMENT

Written for Doug, not for building code. Describes what a beta client sees and experiences across the four JPG apps, in plain language.

**v5.7 update (07/25/2026):** DOP: Configure tab blank screen fixed — browser localStorage cleared in Firefox resolved stale data issue; migrateSetup code fixed to prevent recurrence. Open PIT button now correctly opens PIT with user identity. 4x4 Instructions panel grammar pass complete. PIT: Open DOP button now correctly opens DOP. HelpPanel Future Tasks and Thankful For copy updated.

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

**A non-dismissible gold banner appears in the PM block during the 5-day close window at the end of each period.**

It counts down from 5 to 0 and reminds the client to complete any outstanding items before the period closes. The banner cannot be dismissed — it stays visible until the window passes.

## SECTION 1D — 4x4 GRADUATE BADGE

**A gold GRADUATE badge appears on any protocol card that has been promoted out of the 4x4 Matrix into permanent DOP.**

The badge confirms the protocol has been mastered and is now a permanent fixture.

## SECTION 1E — ALTERATION PROTOCOL TYPE

**Alteration is a way to adjust an existing running protocol without starting over.**

A client uses the Alter button on any protocol card. The alteration creates a modified version while preserving the original for scoring purposes. Only one alteration is allowed per protocol per period. The clock resets at the alteration date. Full guidance on alteration is in the 4x4 Instructions panel at step 3a.

## SECTION 1F — PERIOD CLOSE AND GRADUATION

**At the end of each period, DOP evaluates every 4x4 protocol for graduation.**

Protocols that met their targets graduate to permanent DOP. Protocols that did not are remediated — carried forward into the next period with adjustable settings. A Period Closed Summary screen appears after graduation decisions are made.

## SECTION 1G — 4x4 MATRIX RULES

**The 4x4 Matrix enforces rules when a client sets up a protocol.**

Rule 2: Minutes and hours are not allowed as measurable-target units. Clients must choose from the approved unit list.

**The 4x4 Matrix supports up to 20 future protocol slots** — 3 active slots plus 17 in the queue.

## SECTION 1H — DAY COMPLETE (DOP)

**DOP Day Complete requires four things: both AM and PM evaluations scored, AM Block Complete clicked, PM Block Complete clicked, and required items checked off.**

**The Day Complete indicator at the bottom of the PM block guides the client through the process in stages.**

When the AM block requirements are met, it shows "✓ AM Complete." When PM items are also done but PM Block Complete has not been clicked, it shows "✓ AM Complete · ✓ PM Items Done — PM Block Complete not yet clicked." When all requirements are met including both block complete buttons, it shows "✓ Day Complete — Well executed."

**Clicking AM Block Complete locks the AM block.** Clicking PM Block Complete locks the PM block. Neither button alone marks the day complete — both are required along with scored evaluations and checked items.

## SECTION 1I — AUTOMATED TESTS

**DOP has an automated test suite that runs with the command npm test.**

21 passing tests across 3 files. Tests confirm the render pipeline, 5 enforcement rules, and auto-save behavior.

## SECTION 1J — UTC DATE DISPLAY

**DOP displays dates based on UTC time, not local time.**

Starting around 5pm Pacific, the app will show tomorrow's date while it is still today locally. This is intentional — period close logic is UTC-anchored throughout. This is not a bug.

## SECTION 1K — CONFIGURE TAB

**The Configure tab is where a client sets up their AM and PM daily items.**

**If the Configure tab ever shows a blank screen**, the fix is to clear DOP's browser storage and log back in. This can happen when stored setup data predates a software update. The code has been corrected to prevent this going forward, but clearing stale data in the browser resolves it immediately.

## SECTION 1L — OPEN PIT BUTTON

**The Open PIT button appears in both the AM and PM blocks.**

Clicking it opens the PIT app directly in a new tab, carrying the user's identity so PIT recognizes who is logging in.

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

**The Activity Type dropdown for manual entries includes "Rest and Recovery" as the first selectable option.** This allows a client who selects "Yes" (fitness occurred) to log a deliberate recovery session alongside other entries. This option does not appear in the Configure Recurring Fitness dropdown — it is for manual day-of logging only.

## SECTION 2D — CONFIGURE RECURRING FITNESS

**The Configure tab lets the client set up recurring fitness activities once.**

Recurring entries auto-populate in Fitness Yesterday on the days selected. The client simply checks them off each day rather than re-entering the details. Recurring entries do not show "Rest and Recovery" as an activity type — that option is for manual entries only.

## SECTION 2E — TO ACCOMPLISH SYSTEM

**The To Accomplish section has three levels: One Thing, Daily Tasks, and Future Tasks.**

One Thing is the single most important task for the day and is required for day completion. Daily Tasks hold up to two items. Future Tasks holds items not directly tied to today.

**Unchecked items carry forward automatically to the next day.** Items retain their identity — original creation date and carry history — across all moves.

**Tasks can be moved in any direction** — from One Thing to Daily or Future, from Daily to One Thing or Future, and from Future to Daily.

**When a One Thing is checked off manually**, any First Action Step text that was entered is folded into the task description in parentheses, and the First Action Step field is cleared. This keeps the record of what was planned alongside the completed item.

## SECTION 2F — DAY COMPLETE (PIT)

**The Mark Day Complete button becomes active once all 10 required fields are filled.**

Once clicked, all required fields lock to read-only. The header pill updates to show the day is complete. An Unlock button replaces the Mark Day Complete button if the client needs to make changes.

## SECTION 2G — AI SUMMARY

**The AI Summary pulls from every section of PIT across a fixed 7-day window — today plus the 7 prior days.**

The client cannot adjust the date range. The summary runs once per 7-day rolling period. The header is labeled "AI Summary."

## SECTION 2H — APPOINTMENTS

**Appointments are date-stamped entries that persist until their date passes.**

Up to 5 future-dated appointments can be stored at a time. Past appointments drop off automatically.

## SECTION 2I — OPEN DOP BUTTON

**The Open DOP button appears at the top and bottom of the PIT form.**

Clicking it opens the DOP app directly in a new tab, carrying the user's identity so DOP recognizes who is logging in.

---

# PART THREE — OBT (ONBOARDING & TRACKING)

OBT is the first JPG technology a client encounters. It is a 14-day structured tracking program covering nutrition, alcohol, fitness, sleep, and time management, with weekly reflections.

## SECTION 3A — LOGGING IN AND COVER PAGE

**OBT uses the same login screen as DOP and PIT.**

After logging in, a gold-background cover page appears once per session. It shows the client's day count and completion status, a daily quote, and two buttons — one to access or complete the Client Info form, and one to start today's entry.

**The cover page appears once per login session.** It does not reappear during that session unless the client logs out and back in.

## SECTION 3B — CLIENT INFO

**The Client Info form captures essential background information before the 14-day program begins.**

Required fields: Full Name (first and last), Date Started, Phone, Email, Occupation, Desired Outcome 1, Current Non-Negotiables, Hobbies, Current Fitness Activity, Current Eating Habits, Sleep, and Injuries/Limitations.

Optional fields: Preferred Name, Desired Outcome 2, Desired Outcome 3, Additional Notes.

**Gold checkmarks appear next to each required field label once the field is filled.** The cover page button changes from "Complete Client Info" to "Edit Client Info" once all required fields are filled.

**The Phone field auto-formats to (XXX) XXX-XXXX as the client types.** Only digits are accepted and the field caps at 10 digits.

**The Date Started field auto-formats to MM/DD/YYYY as the client types.** The field validates the format and shows an error if the date is not complete or valid.

**The Email field uses standard email input** — on mobile, the keyboard automatically shows the @ symbol.

## SECTION 3C — SECTION COLOR SYSTEM

**Each of the five tracking sections has its own permanent color.**

- Nutrition = dark burgundy
- Alcohol = deep purple
- Fitness = burnt orange
- Sleep = dark green
- Time & Life = steel blue

The section color appears on the section header bar, the active day button in the 14-day picker, the day/date label, checkmarks next to completed fields, the Day Complete banner, and interactive elements such as rating buttons and supplement chips. Client Info uses gold.

## SECTION 3D — DAY NAVIGATION ACROSS SECTIONS

**The selected day carries automatically when switching between sections.**

If a client is on Day 4 in Nutrition and clicks the Fitness tab, Fitness opens on Day 4 automatically. The client can override this by clicking a different day button within any section — that selection then carries forward to the next section switch.

## SECTION 3E — NUTRITION TAB

**The Nutrition tab covers AM, Midday, and PM meals, plus snacks and supplements.**

All three meal fields are required for Day Complete. Snacks are optional — each snack entry has its own calorie estimate. The AI calorie estimate does not work yet in the browser (requires a server-side connection not yet built — this is expected).

**The Supplement section shows a "Use Same Supplements as Prior Day" button** when a prior day has supplement entries. Clicking it copies that day's supplement list to today.

**The Add Snack and Add Supplement buttons, supplement chips, and day/date label all use the burgundy color** matching the section.

## SECTION 3F — ALCOHOL TAB

**The Alcohol tab has fields for Beer, Mixed Drinks, and Other, plus a None checkbox.**

Checking None satisfies the Day Complete requirement without filling any other alcohol field. The Other field is a free-text entry for wine, spirits, cocktails, or anything else not covered by Beer or Mixed Drinks.

**Checkmarks next to filled fields and the Day Complete banner display in deep purple** matching the section.

## SECTION 3G — FITNESS TAB

**The Fitness tab captures yesterday's activity, duration, intensity, and notes.**

**Selecting "None" or "Rest" as the activity type hides Duration, Intensity, and Notes entirely** and satisfies the fitness Day Complete requirement without those fields.

**The Intensity rating buttons use burnt orange for the selected state** — all 10 buttons are visible with clear selection feedback.

## SECTION 3H — SLEEP TAB

**The Sleep tab captures bedtime, fall asleep time, wake time, times up in the night, awake duration, sleep quality rating, sleep score, and sleep environment.**

**If the client enters 0 for Times Up, the Awake Duration field disappears** — it is not required and not shown when there were no wake-ups in the night.

**Sleep quality rating buttons use dark green for the selected state.** The AM/PM and min/hrs toggle buttons also display in green.

## SECTION 3I — TIME & LIFE TAB

**The Time & Life tab covers work schedule, screen time, relationship time, PIT time, PM check-in rating, and Tomorrow's One Thing.**

**Non-Negotiables are selected from a category dropdown.** Each chip has an optional inline note. Selecting a category auto-adds the chip without a separate Add button.

**Screen Time has two boxes** — one for Social Media and one for Other. Each box takes hours and minutes separately, or the client can check None.

**The PM Check-In rating buttons display on a steel blue background** — unselected buttons show in white, selected buttons highlight in white.

**The Relationship Time and PIT Time Hours/Minutes inputs align horizontally** — the longer PIT description does not push the inputs out of alignment.

## SECTION 3J — REFLECTION TAB

**Two weekly reflection blocks — Week 1 and Week 2 — each with four required questions plus one optional additional field.**

**The Week 1 submit button only appears once the client has actually completed Day 7.** The Week 2 button only appears once Day 14 is complete.

**Once submitted, a week's answers are not erased.** The four questions stay visible but are locked and shown in grey, with a gold banner confirming the week was submitted.

**A pop-up reminder appears the moment Day 7 or Day 14 is actually marked complete**, letting the client know it's time for their reflection.

## SECTION 3K — SUBMIT TO COACH

**The Submit to Coach strip appears at the bottom of the Time & Life section, below Mark Day Complete.**

The strip has two phases matching the two weekly reflections:

**Before Day 7 reflection is submitted**, the strip shows a countdown: "X days until first submission — complete days 1–7 and Week 1 reflection to submit." Once Day 7 tracking is complete and the Week 1 reflection has been submitted, the strip turns gold and the Submit Week 1 to Coach button activates.

**After Week 1 is submitted**, the strip returns to grey and counts down to the final submission: "X days until final submission — complete days 8–14 and Week 2 reflection to submit." Once Day 14 is complete and the Week 2 reflection submitted, the Submit Week 2 to Coach button activates.

**Once both weeks are submitted**, the strip shows "✓ Week 1 and Week 2 submitted to coach."

**The Submit to Coach feature is UI-only at this stage.** The data is assembled and logged but not transmitted anywhere yet. Backend wiring happens after Supabase migration.

## SECTION 3L — DAY COMPLETE SYSTEM (OBT)

**The Mark Day Complete button appears at the bottom of the Time & Life section and is always clickable.**

When clicked with all required fields filled, the day is marked complete — the header pill count increases by one, and all required fields lock to read-only.

**When clicked with missing required fields, a red error panel appears** listing every section with unfilled required items. The error panel includes a line for each missing item:
- Nutrition — AM, Midday, and PM meals required
- Alcohol — at least one field required (or None checked)
- Fitness — Duration and Intensity required when activity selected (not required for None or Rest)
- Sleep — all time and quality fields required
- Time & Life — Screen Time Social Media required
- Time & Life — Screen Time Other required
- Time & Life — Work Hours required
- Time & Life — PM Check-In rating required
- Time & Life — Tomorrow's One Thing required

**The Unlock button appears in place of Mark Day Complete when a day is marked.**

**Unlocking a day fully releases all fields for editing.** The day is no longer considered complete until Mark Day Complete is clicked again. All inputs, checkboxes, and dropdowns become editable immediately after unlocking.

## SECTION 3M — ARCHIVE

**The Archive tab shows two lists — completed days, and submitted reflections.**

**Clicking a completed day row navigates back to that day** in read-only locked state, opening on the Nutrition section. The client can review all entries for that day. The Unlock button is available if edits are needed.

**Clicking a submitted reflection row navigates to the Reflection tab** for that week's day (Day 7 for Week 1, Day 14 for Week 2).

**Entries that predate the current program start date do nothing when clicked** — this is correct behavior, not a bug. These are stale test entries from a prior session.

## SECTION 3N — SUMMARY RESULTS

**The Summary Results tab shows two stacked sections — Week 1 and Week 2 — each with a 9-column day grid and stat boxes.**

**Screen Time Social and Screen Time Other columns correctly show entered data** — hours and minutes format (e.g. "1h 30m"), "None" when the None checkbox is checked, or "—" when the day has no entry.

## SECTION 3O — KNOWN ISSUES AND GAPS

**Setup Instructions content has several stale or pending items** — full copy pass held for one combined session.

**Streak badge** — placeholder only. Not yet wired.

**Nutrition's AI calorie estimate does not work in the browser today** — it needs a server-side connection that has not been built yet. This is expected for now.

## SECTION 3P — WHAT'S NOT BUILT

- Streak badge logic
- Instructions panel copy pass — held as one combined pass
- Archive edit path for reflection rows (view-only works; edit not scoped)

---

# PART FOUR — HUB (WORKSPACE HUB)

**Honest scope note:** HUB is mostly architectural/planned.

## SECTION 4A — WHAT IS CONFIRMED LIVE

Working login: Test / JPG2026. Dev port: 5176. CLAUDE.md committed 07/06/2026.

## SECTION 4B — WHAT'S NOT BUILT

10-spoke model defined but not built. Legal spoke gating designed but not built. HUB Code Logic doc does not yet exist.

---

# VERSION HISTORY

| VERSION | DATE | CHANGES |
|---|---|---|
| v3.0–3.2 | 07/07/2026 | Initial consolidated guide. DOP and PIT sections added. |
| v3.3 | 07/06/2026 | Migration to Claude Desktop Code tab. |
| v3.4 | 07/07/2026 | Multiple DOP items added. |
| v3.5 | 07/08/2026 | Wake Up, Fitness Yesterday multi-entry, Terrain, Hiking. |
| v3.6 | 07/10/2026 | To Accomplish + Appointments carryover built. |
| v3.7 | 07/10/2026 | Archive carried-unresolved, Configure Recurring Fitness, Additional Tracking. |
| v3.8 | 07/11/2026 | Additional Tracking grid fix, Important Discoveries, Book Study carryover, DOP null guard fix. |
| v3.9 | 07/11/2026 | Configure Recurring Fitness extended — days of week, tab-open sync. |
| v4.0 | 07/12/2026 | AI Summary 7-day rolling limit. HelpPanel copy pass. |
| v4.1 | 07/13/2026 | DOP: FourX4DailyCard fix. Protocol enforcement. PIT: Day Complete. |
| v4.2 | 07/13/2026 | DOP: 4x4 auto-save. PIT: header pill corrected. |
| v4.3 | 07/15/2026 | DOP: Rule 1 removed. Rule 2 refined. Tests. UTC date. |
| v4.4 | 07/15/2026 | DOP: Alteration. PIT: Future Tasks. |
| v4.5 | 07/16/2026 | DOP: Setup Instructions. 4x4 Instructions. PIT: Move to Daily Task. OBT: header. |
| v4.6 | 07/16/2026 | DOP: reloadFourX4 and tier cap corrected. PIT: recurring fitness fixes. OBT: layout locked. |
| v4.7 | 07/17/2026 | OBT: Sections 3A–3D rewritten. Header resolved. Instructions panel rebuilt. |
| v4.8 | 07/17/2026 | PIT: Reverse-move system. Compaction. Test infrastructure. |
| v4.9 | 07/18/2026 | OBT: Today/Archive nav. ArchiveView. Reflect fix. |
| v5.0 | 07/19/2026 | OBT: Storage restructure. Day button strip. Mark Day Complete. Header pill. Gold checkmarks. |
| v5.1 | 07/19/2026 | OBT: Read-only lock. Archive wired. Required field errors. Mark Day Complete always enabled. PIT: Fitness Notes. |
| v5.2 | 07/20/2026 | OBT: Reflect tab fully built. Summary Results rewritten. Cover Page built. Client Info rebuilt. Date picker removed. |
| v5.3 | 07/23/2026 | DOP: Day Complete four-state display, amLocked gate. PIT: One Thing check-off First Action Step append. OBT: Cover page border, Client Info phone/email split and label updates. |
| v5.4 | 07/23/2026 | OBT: Fitness None/Rest behavior. Alcohol section. Time & Life Work Schedule/Hours. None checkboxes. Client Info fields. Supplement prior day button. PIT: Rest and Recovery activity type. |
| v5.5 | 07/25/2026 | OBT: Archive rows now clickable. Submit to Coach UI documented. Screen Time two-box inputs. Sleep Awake Duration skipped when Times Up = 0. Section color system documented. Reflection tab renamed. SummaryResults screen-time regression noted. |
| v5.6 | 07/25/2026 | OBT: Section color pass completed. dayComplete unlock bug fixed. SummaryResults screen-time fixed. Screen time checkmarks fixed. Sleep grid gap fixed. Client Info auto-format. Alignment fixed. Group 9 dead code removed. |
| v5.7 | 07/25/2026 | DOP: Configure tab blank screen fix documented (Section 1K). Open PIT button behavior documented (Section 1L). 4x4 Instructions alteration guidance confirmed at step 3a — stale pending note removed. PIT: Open DOP button documented (Section 2I). HelpPanel Future Tasks and Thankful For copy updates reflected in Section 2E. OBT: Day navigation shared-state behavior documented (Section 3D). Known issues updated — Fitness infoBox color note removed (fixed). |

*JPG-SYS-Apps-TroubleshootingGuide-WRK-v5.7 | Jones Performance Group LLC | CONFIDENTIAL | 07/25/2026*
