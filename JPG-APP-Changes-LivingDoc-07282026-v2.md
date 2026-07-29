# JPG — LIVING CHANGE DOCUMENT
*Plain-language record of all app changes by date*

**Document ID:** JPG-APP-Changes-LivingDoc-07282026
**Date:** 07/28/2026 | **Prepared by:** Claude | **State:** WRK

---

## 07/28/2026 — Session 2

- PIT — GREEN_COMPLETE constant (#2ecc71) added to constants.js. Hardcoded #2ecc71 replaced in WeekTracker.jsx (5 hits) and BookSection.jsx (3 hits).
- PIT — HelpPanel Lock Appointment paragraph corrected: "at the bottom of the card" → "in the appointment header." LOCKED badge mention added.
- PIT — CLAUDE.md test credential corrected: test123 → JPG2026.
- PIT — One Thing Remove button added to card header row. Two-stage inline confirmation: first click shows "Task will not be recorded" warning; Confirm clears both oneThing and oneThingSetup fields and sets oneThingDone false; Cancel dismisses.
- PIT — Daily Tasks Remove button: two-stage inline confirmation added. First click shows "Task will not be recorded" warning. Confirm deletes. Cancel dismisses.
- PIT — Future Tasks Remove button: two-stage inline confirmation added. Same pattern as Daily Tasks.
- PIT — removeOneThing() function added to PITApp.jsx. Passed as prop to ToAccomplishSection.
- DOP — Dead imports cleaned: DOPApp.jsx two constants imports consolidated into one, dead FormInstructionsModal import removed. AMBlock.jsx two constants imports consolidated. PMBlock.jsx unused GOLD_LIGHT import removed. Shared.jsx SectionDivider component removed (dead export, unused in all files).
- DOP — All hardcoded color values replaced with named constants across 7 files (AMBlock, PMBlock, FourX4View, Header, Shared, FormInstructionsModal, styles.js). 8 new constants added to constants.js: GREEN_SAVE, GREY, GOLD_TEXT, QUOTE_BG, DIVIDER_BG, NAV_TEXT, NAV_TEXT_DIM, WHITE.
- DOP — FormInstructionsModal: duplicate "Configure does not auto-save" note removed from NOTES footer. Already present in section body; footer copy was redundant.
- DOP — FourX4View measurable target hint corrected: "30 minutes" example replaced with "4 sets" — minutes fail validation, example was misleading.
- DOP — FourX4View "Past Month Stat" (singular) corrected to "Past Period Stats."
- DOP — Header: disabled 4x4 button now shows "Complete Configure to unlock" label below it (fontSize 9, NAV_TEXT color).
- DOP — AMBlock: lock button label corrected — "AM Block Complete" (before locking) → "Mark AM Block Complete." "Finished" (when locked) → "Unlock AM Block." Button padding always 8px 20px — no longer collapses when locked.
- DOP — AMBlock: unlock confirmation added. Tapping "Unlock AM Block" shows inline warning: "Unlock AM block? Locked entries may be edited." Confirm fires unlock. Cancel dismisses.
- DOP — PMBlock: same label, padding, and unlock confirmation fixes as AMBlock. Warning text: "Unlock PM block? Locked entries may be edited."
- DOP — FourX4View timeDNA bug fixed: `!original.time_cost_minutes` → `original.time_cost_minutes === null`. Prevents time_cost_minutes of 0 from incorrectly setting timeDNA to true.
- DOP — FourX4View Retry label guarded: when linked_to exists but attempt_number is undefined or 1, renders "Retry" instead of "Retry #?".
- DOP — DOPApp saveForm: setSaved(true) moved inside try block — no longer fires on storage failure. Now only shows "Saved." when save actually succeeded.
- DOP — DOPApp loadError state added. On storage failure during login load, banner renders below Header: "Unable to load your data. Please refresh the page." loadError resets to false at start of each load attempt.
- DOP — DOPApp saveError state added. On storage failure during save, banner renders below loadError: "Unable to save your data. Please refresh the page." saveError resets to false at start of each save attempt.

---

## 07/28/2026 — Session 1

- OBT — SnackBlock SNACK N header label color changed from undefined GOLD reference to BURGUNDY. Latent undefined variable bug fixed as side effect.
- OBT — Fitness duration field split into Hours + Minutes two-box layout. durationHrs and durationMins stored separately; duration (total minutes) computed and stored in sync on every keystroke. isDayComplete gate and TimeLifeSection fitnessMissing gate updated to read new keys. SummaryResults unchanged — still reads duration.
- OBT — Fitness estimated calorie burn value color changed to ORANGE (inline override). Shared S.calValue not modified.
- OBT — Nutrition estimated daily calories value color changed to BURGUNDY (inline override). Shared S.calValue not modified.
- OBT — Sleep Quality RatingButtons wrapped in GREEN box. steel prop added for white outlined buttons. White eyebrow label "SLEEP QUALITY — RATE YOUR SLEEP" and sub-label added. Checkmark moved into eyebrow. S.sleepQualityBlock added to styles.js.
- OBT — Fitness Intensity (RPE) RatingButtons wrapped in ORANGE box. steel prop added. White eyebrow label "INTENSITY (RPE) — RATE YOUR EFFORT" and sub-label added. Checkmark moved into eyebrow. S.fitnessRpeBlock added to styles.js.
- OBT — Fitness Notes input realigned to bottom of Duration block to align with Minutes box.
- OBT — "+ Add Snack" renamed to "+ Add Another Snack" (NutritionSection).
- OBT — "＋ Add Supplement" renamed to "＋ Add Another Supplement" in SuppAdder closed state.
- PIT — HelpPanel: "memorialize" replaced with "archives them back to the day they were created" in Clear Items description.
- PIT — HelpPanel: AI Summary frequency updated from "once per week" to "once per 7-day rolling window from your last use."
- PIT — HelpPanel: Lock Appointment paragraph added to Appointments section.
- PIT — "+ Add Fitness Activity" renamed to "+ Add Another Activity" (DailyTrackingSection).
- PIT — "+ Add Discovery" renamed to "+ Add Another Discovery" (ImportantDiscoveriesSection).
- PIT — "+ Add Future Task" renamed to "+ Add Another Future Task" (ToAccomplishSection).
- PIT — "+ Add Appointment" renamed to "+ Add Another Appointment" (AppointmentsSection).
- PIT — Configure Recurring Fitness Activity Name placeholder "AMDWR" jargon removed. Now reads "e.g. Morning Run."
- PIT — Future Tasks cap message added: appears below Add button when 18-slot limit is reached.
- PIT — Devotional toggle labels: colon removed. "Switch to: X" → "Switch to X."
- PIT — Never Twice sub-text font size increased from 8px to 11px.
- PIT — Set-Up and Instructions button corrected from GOLD to GOLD_LIGHT (two-tier gold system fix).
- PIT — Move modal now displays the moving task's text below the title, truncated at 40 characters.
- PIT — Important Discoveries: empty state message added when no entries exist.
- PIT — Clear Items: inline red message appears and modal stays open when Confirm clicked with nothing selected.
- PIT — Important Discoveries add: inline red validation messages when required fields are empty on Add click.
- PIT — Scripture close (DevotionalSection): × now clears result only, preserves search query text.
- PIT — Quotes close (QuotesSection): × now clears result only, preserves search query text.
- PIT — Appointments: Lock/Unlock button moved from SMS row to appointment header row.
- PIT — Appointments: LOCKED badge added to header row when appointment is locked.
- PIT — Appointments: date and time inputs changed from readOnly to disabled when locked, preventing native picker from opening.
- PIT — Track By selector hidden when "Rest and Recovery" is selected as activity type.
- PIT — Fitness Yesterday: switching from Yes to No/Rest Day when data is entered shows confirmation dialog. Cancel reverts selector and preserves data.
- PIT — Configure Recurring Fitness: Remove button now shows confirmation dialog before deleting activity.
- PIT — One Thing checkbox accentColor changed from RED to GOLD_LIGHT.
- PIT — Book Study page number input: min={0} added. Negative page numbers no longer accepted.

---

## 07/26/2026

- OBT — BrandBar tier patch display built. Right column of title block now shows the client's LIMITLESS tier patch image, tier number, tier name, and abbreviated name label. Reads tier and client name from localStorage.
- OBT — SummaryResults Relationship column clipping fixed. All 9 columns now fully visible. Table scrolls horizontally when screen is narrow.
- OBT — 30-day cycle architecture decision logged in Code Logic.
- OBT — Governing docs (Code Logic v2.0, Troubleshooting Guide v5.7) added to repo root.
- DOP — 30-day cycle architecture decision logged in Code Logic.
- DOP — Governing docs added to repo root.
- PIT — 30-day cycle architecture decision logged in Code Logic.
- PIT — Governing docs added to repo root. Old Code Logic versions removed from repo.
- ALL APPS — 30-day cycle architecture locked: all client cycles are exactly 30 days anchored to client's chosen start date. No calendar month alignment.
- ALL APPS — JPG time parameter terminology confirmed from PB-19 Section 5: Day, Segment, Run, Cycle, Block.

---

## 07/25/2026 — Session 3

- OBT — FitnessSection no-startDate infoBox corrected from S.infoBox (gold) to S.infoBoxOrange (burnt orange).
- OBT — Dead imports removed from Shared.jsx, TimeLifeSection.jsx, MealBlock.jsx.
- OBT — Two new dead imports identified: STEEL in Shared.jsx, GOLD_DARK in TimeLifeSection.jsx. Cleanup pass still needed.
- OBT — isDayComplete dead prop removed from TimeLifeSection prop destructure.
- OBT — selectedDay global shared-state confirmed — single useState in OBApp, passed to all five sections.
- PIT — Open DOP button port corrected from 5174 to 5173.
- PIT — HelpPanel Future Tasks copy updated: cap reference removed, move directions added.
- PIT — HelpPanel Thankful For copy updated: repeats note added.
- DOP — migrateSetup fixed: injects amCommonSelected when missing, preventing Configure tab blank screen.
- DOP — 4x4 Instructions panel grammar pass completed: "habit" replaced with "protocol" in Section 5.

---

## 07/25/2026 — Session 2

- OBT — Section color pass completed for all five sections.
- OBT — styles.js: multiple day tag, chip, and copy button color variants added.
- OBT — Shared.jsx: InputWithToggle now accepts unitColor prop. RatingButtons steel branch updated.
- OBT — Multiple section color wiring updates across Sleep, Fitness, Time & Life.
- OBT — dayComplete unlock bug fixed.
- OBT — SummaryResults screen-time regression fixed.
- OBT — Screen Time Social Media checkmark added.
- OBT — Screen Time Other checkmark fixed.
- OBT — Sleep 3-column grid fixed.
- OBT — Client Info phone/email/date auto-format added.
- OBT — Time & Life Relationship Time/PIT alignment fixed.
- OBT — Group 9 cleanup: dead Header props and dead code removed.
- OBT — CLAUDE.md updated.

---

## 07/25/2026 — Session 1

- OBT — Archive row navigation built.
- OBT — dayForIso() helper added.
- OBT — Vitest test infrastructure added. 9 passing tests.
- OBT — Screen Time Social Media and Other inputs changed to two-box Hours/Minutes pattern.
- OBT — Sleep timesUpIsZero exception built.
- OBT — Submit to Coach strip built.
- OBT — Reflection tab label updated from "Reflect" to "Reflection."
- OBT — Section color system locked.

---

## 07/23/2026 — Session 2

- OBT — Fitness: None/Rest behavior built. Alcohol: restructured. Time & Life: Work Schedule/Hours split, four None checkboxes added.
- OBT — Client Info: Full Name and Preferred Name updated. Supplements prior day button added.
- PIT — Fitness Yesterday: Rest and Recovery added as first manual activity option.

---

## 07/23/2026 — Session 1

- OBT — Cover page: 6px solid black border frame added.
- OBT — Client Info: phone and email split, Goal labels renamed to Desired Outcome.
- DOP — isDayComplete() updated: amLocked added as required condition.
- DOP — PMBlock.jsx: four-state Day Complete display built.
- PIT — One Thing manual check-off: First Action Step text appended in parentheses and cleared on check-off.
- HUB — Four LIMITLESS tier patch PNG assets committed to public\.

---

## 07/20/2026

- OBT — GROUP 4 Reflect tab built. Summary Results rewritten. CoverPage built. Client Info rebuilt. BrandBar date picker removed.

---

## 07/19/2026

- OBT — GROUP 2/3 completed: Read-only lock, Header pill, Archive wired, required field errors, Mark Day Complete always enabled.
- PIT — Fitness entry Notes textbox built.

---

## Prior sessions (07/17/2026 – 07/18/2026)

- OBT — Initial app build. GROUP 1 storage restructure. ArchiveView. Section components. ReflectSection.
- PIT — Reverse-move system built. compactTasks() compaction system built.

---

*JPG-APP-Changes-LivingDoc-07282026 | Jones Performance Group LLC | 07/28/2026*
