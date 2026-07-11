# GRAVITY — Implementation Audit & Revamp Plan

Audit date: 2026-07-11, branch `claude/game-implementation-audit-6fvu6w`.
Method: full source read (`src/game`, `src/gameData`, `src/scenes`,
`src/textEngine`, React shell) + instrumented playthroughs of the Mara
arc against the specs in `GRAVITY_CONCEPT.md` and `GRAVITY_MASTER.md`.

Verdict up front: **the engine, data model, and content architecture are
sound — the game is bad because the pacing is ~6x too fast, the
signature anticipation UI was removed, player choices don't matter, and
the setpiece moments (flip, interventions, crown) render as single
automatic paragraphs.** The compulsion stack in CONCEPT §"why you can't
stop playing" has seven interlocking hooks; today zero of the seven are
operational. All of this is fixable without rearchitecting.

---

## Part I — Audit findings

### F1. The arc is over in 9 days (spec: 40–70) — CRITICAL

Instrumented playthrough (standard indulgent play: scheme + diner +
hearty breakfast each day):

```
day 1: 158 → 162  (+4.0/day from day one; spec says +0.5–1.5 early)
day 5: jeans AND blouse fire on the same action (ratchet 0 → 2)
day 8: appetite 2.0, intervention beat, INSTANT flip
day 9: 208.6 lbs, crown-ready. Arc effectively done.
       6 of 8 windows never fired. Gravity drift never started.
```

The 45-day headless run ends at **506 lbs with only 5 ratchet entries**
— the entire grounded band (the "densest authoring target the project
has") flashes past with almost nothing in it firing.

Causes, all in tuning/day-loop math:
- Every action in reach is a meal; the evening beat force-feeds
  `applyMeal(2–3)` unconditionally (`dayLoop.js:238`) — +0.8–1.2 lbs/day
  of gain the player never chose, before any action.
- Appetite compounds ~+0.2/day unchecked (hits 2.2 by day 9), because
  fullness sits ≥0.9 nearly permanently (see F6) and there is no cap.
- Result: daily gain grows 4 → 9 lbs/day. The slow-burn fantasy — the
  whole product — is compressed into a montage.

### F2. The signature anticipation UI does not exist — CRITICAL

MASTER §7.2 calls the windows panel "the anticipation engine made
visible… **this panel is why the player takes one more day**." Commit
`a350937` removed it. Nothing replaced it. The player cannot see any
window, any bar, any "approaching" ghost, or the crown's "something is
coming" styling. The core mechanic — two-threshold probability windows,
"anticipation as UI" (CONCEPT, owner's own mechanic) — is now invisible
except as random creak-noise text (see F3). `windows.js` still computes
everything the panel needs (`getOpenWindows`, `windowStateWord`,
`barFill`); it's simply unrendered.

### F3. Near-miss rolls are noise, not signal — HIGH

`windows.js:47`:
```js
if (roll < p + (1 - p) * 0.5 || p / 2 > roll * 0.5) return nearMiss;
```
- Second clause simplifies to `p > roll`, which is the fire condition —
  dead code.
- First clause grants a near-miss on **50% of all failed rolls
  regardless of how close the window is**. A window at p = 0.01 creaks
  half the time. Spec (§5.3) wants near-misses driven by the actual
  dice so "the player learns to read the world's nerves"; today the
  world's nerves are a coin flip. Confirmed in playtest: button-strain
  beats on day 2 at 163 lbs, 3 lbs before the first window even opens
  and 44 lbs before it's likely.

### F4. No choice matters (agency ≈ zero) — CRITICAL

- All meal actions are the same button with different flavor text: same
  slot cost, similar meal size, no tradeoffs. `walk`/`rest` are strictly
  worse and nothing ever motivates them.
- Cash never binds: meals floor at `Math.max(0, cash - cost)`
  (`dayLoop.js:207`) with zero consequence at zero. MASTER §5.10
  ("shortfall narrows tomorrow's menu", "indulgence a *choice* early")
  is unimplemented.
- Talk burns a slot for `argPressure += 1` and one paragraph — a
  strictly worse feed. The enabler's double-life (schemes, cover
  stories, "interventions where you're a mole", §5.9) has no risk
  system behind it: `scheme` renders a paragraph and is otherwise a
  plain meal.
- The evening auto-meal (F1) outweighs the per-action differences
  anyway. Net: play is "click any three buttons, repeat."

### F5. Flip, interventions, and crown are single auto-paragraphs — CRITICAL

- **The flip** — ranked #1 peak heat in the owner interview — is
  `tryFlip(state.woman, 100)` at the first intervention evening beat
  (`dayLoop.js:247`): resolve 100 → 0 in one call, guaranteed, day 8,
  zero buildup, zero player involvement. Mara's sheet says *reluctant,
  late flip*.
- **The argument** (§5.7's five escalating *events*, "a setpiece with
  spurt potential") is five one-shot evening paragraphs gated on a
  pressure number. It never loses *on-screen*; it just changes tense.
- **The crown** is a ledger button → flat `lbs += 8` → one rendered
  template (`triggerCrown`, `dayLoop.js:355`). No staging, no
  witnesses, no converging windows, no mid-scene escalation.
- **Spurt-in-scene** (§5.5, the calibration image itself: gain landing
  live *while the crisis worsens*) is not implemented at all —
  `spurtActive: true` is passed only as a render flag for prose
  selection; no scene ever mutates lbs between beats or re-rolls
  windows mid-scene. There is no scene runner to do it with.

### F6. Fullness/capacity math is inert — HIGH

Capacity starts at 4 (`women/*.js`), and fullness gain is
`mealSize × 0.25 / capacity` — so a size-3 meal adds 0.19 fullness and
one slot decays 0.15. The gauge barely moves, `fullnessMod` (the
"fullness-weighted rolls" from the concept's core loop) almost never
triggers, and capacity growth (needs fullness ≥ 1.1) is unreachable.
Meanwhile the appetite-growth branch (needs ≥ 0.9) *does* trigger
constantly late-day because the evening meal is applied with no decay
after it — the one place fullness spikes is the one place the player
isn't playing. The pacing (F1) and the anticipation modifier (F2/F3)
are both casualties.

### F7. Gravity (contagion) can never start in-arc — HIGH

`gravity.js:5` gates all drift on `lbs - frameLbs >= 110` (rung g4).
Mara's crown window spans 202–260 lbs = offset 57–115: **the arc ends
at or before the exact moment contagion is allowed to begin.** Even if
the gate passed, driftRates (0.02–0.12/day, ×2 on shared meals) reach
the t1 threshold (+8 lbs) in 60–200 days — never inside one arc. The
1.0 definition of done requires "drift visible on ≥2 NPCs/arc;
candidates surface at settling"; today the Priya candidate line at
settling is hardcoded and unearned, and softening only ever moves +3
(crown). Playtest confirms: 45 days, softening 3, zero drift beats.

### F8. Multiple windows fire in one action with no framing — MEDIUM

`processWindowRolls` rolls every relevant window independently and
stacks all fire texts in one turn (day 5 playtest: jeans seam AND
blouse button in the same pastry beat, two disconnected paragraphs).
Spec: fire = "scene interrupt (composed beat, witnessed variant if
NPCs present)". Fires should be rare, singular, staged events.

### F9. The day's transcript is inconsistent and mostly discarded — MEDIUM

`executeAction` sets `ui.sceneText` to only the newest action's text;
`executeTalk` shows the whole accumulated day; `executeLook` appends to
a base. In the shell the player's day-thread visibly resets on most
clicks. Morning beat is one line. The ledger is bare numbers
(`She gained +4.0 lbs today`) — the only prose-forward surface at the
day's most ritual moment is the least prose-forward screen in the game.

### F10. Ratchet has no replacement flow — MEDIUM

§5.4: every replacement bumps softening +1 and **opens a NEW window at
a higher rating** ("nothing is ever quietly restored"). Implemented:
fired windows just leave the list, so the window supply strictly
depletes — the anticipation economy runs out of fuel exactly when the
arc should be escalating. NPC callback pools keyed on scars: absent.

### F11. Content volume cannot survive correct pacing — HIGH

Pools average 2–4 lines per bucket (e.g. `meal.beat` reluctant bucket:
3 lines). Playtest showed the same line twice in three days *at 9-day
pacing*; at the correct 50–60 day pacing every priority-1 family
repeats dozens of times. Aggravator: `state._eventScopes` is reset to
null **per action** (`dayLoop.js:181` etc.), so `sessionUsed` dedup
protects only a single beat render — same-day repeats are structurally
allowed. `rit.` (tailor/measurement, ~5 renders/arc) doesn't exist.
Witnessed variants of window fires (§5.3, §10.1) don't exist.

### F12. Assorted smaller defects

- `actions.js` observe is `menuHidden` — spec §5.1 requires "always one
  observe-only option" (Look partially covers this but is free and
  outside the slot economy — decide and make it deliberate).
- `rungFromLbs` cross beats: `checkRungCross` bumps pressure but renders
  nothing — rungs (the ladder!) pass silently.
- `headlessRun.mjs` asserts only `finalLbs >= 170` — it happily passes
  the 506-lb blowout. The harness cannot catch any of F1.
- `_eventScopes` contains Sets that silently become `{}` through the
  per-action save/clone cycle in `App.jsx mutate()` (currently masked
  because scopes are nulled per action; will bite when F11's fix widens
  scope lifetime — move scopes out of the serialized state or
  round-trip them properly).
- Window `wear` is uncapped (compounds with F3's constant near-misses).
- `triggerCrown` hardcodes `+8` lbs; spurt sizes belong in tuning.

---

## Part II — The plan

Nine phases, ordered so each one makes the next honestly testable.
Phases 1–3 are systems surgery (small diffs, big feel change), 4–5 add
the one missing engine piece (scene runner) and spend it on the
moments that matter, 6–7 are the content build-out, 8–9 finish the
anthology and lock quality in gates. Every phase ends with its gate
green or it didn't happen (STATE.md discipline continues).

### Phase 0 — Truth in the harness (half a day)

Make the test harness able to see the problems before fixing them.

- Rewrite `scripts/headlessRun.mjs` into `scripts/paceGate.mjs`: run 3
  strategies (indulgent / mixed / passive) × 3 seeds; report and assert
  per-phase targets (see each phase below). Keep `npm run headless` as
  the alias.
- Log per-day: lbs, gain, appetite, fullness min/max, windows
  open/fired, near-misses, argStage, cash. Emit a one-screen pacing
  table — this becomes the tuning instrument for Phase 1.
- Gate (Phase 0): script runs, table renders, current failures are
  *reported* (allowed to fail until Phase 1 lands).

### Phase 1 — Fix the clock (the pacing rebuild)

Goal: an indulgent-play Mara run reaches crown on **day 45–65 at
~245–265 lbs**, with 7+ of her windows firing en route, each in its own
week-scale era. All changes in `tuning.js`, `appetite.js`,
`dayLoop.js`, `windows.js` — no architecture.

1. **Gain budget.** Daily gain = meals × appetite × `mealGainFactor`.
   Targets (spec §5.2): pre-flip typical +0.5–1.5, post-flip +2–4.
   Concretely: evening meal becomes appetite-driven, not forced —
   size 1 pre-flip, 2–3 post-flip, and *skipped* if the day was light
   and she isn't flipped (she's still arguing with herself; that's
   content, not just math). Meal sizes stay 1–4 but costs and menus
   differentiate them (Phase 3).
2. **Appetite curve.** Cap appetite at 1.6 pre-flip / 3.0 post-flip.
   Growth only when fullness ends the day ≥ 0.9 (move the check to
   `runEvening`, per spec "when fullness ends ≥0.9"). Floor rises per
   rung crossed (spec: "the ratchet applies to appetite too") —
   replaces the current indulgence-only floor.
3. **Fullness that lives.** Rebase capacity to 1.0 = "a normal day of
   food" (women start 0.9–1.1; growth +2% at fullness ≥ 1.1 now
   reachable). A size-3 meal ≈ +0.7 fullness. The gauge moves, the
   stuffed band renders, `fullnessMod` matters, and *when* you feed
   her big becomes a real decision (roll windows while she's full).
4. **Near-miss = almost.** `rollWindow`: near-miss iff
   `!fired && roll < p * 1.6` (tunable `nearMissBand`). Delete the dead
   clause. Cap wear at +0.5. Now creaks genuinely mean "close", and
   silence means "not yet" — the world's nerves become readable.
5. **Fire cadence.** Max one window fire per action: resolve the
   highest-p fire, defer others (they stay hot; they'll fire on the
   next relevant action — which reads as fate, not spam). Optional
   per-window cooldown of 1 day after a fire elsewhere on the same
   object class, to space eras.
6. **Rung beats.** `checkRungCross` renders a `port.rung` beat (new
   small pool) — the ladder becomes visible punctuation.
- Gate (pace): indulgent run crowns day 45–65 @ 245–265 lbs; passive
  run does NOT crown by day 70 (agency exists); ≥7 window fires
  pre-crown; no day exceeds +4 lbs outside spurt scenes; appetite ≤
  caps; fullness hits ≥0.8 on at least 25% of indulgent days.

### Phase 2 — Restore anticipation (the windows panel + day surface)

Goal: the player can *see* the reason to take one more day.

1. **Windows panel** (new `components/WindowsPanel.jsx`, left column of
   the day screen per §7.1–7.2), keeping the plain-language register
   the last UX pass wanted: target name, slow bar, state word
   (quiet / restless / creaking / **imminent** hot-styled), approaching
   ghosts within 15 lbs, near-miss row pulse (drive from
   `ui.lastNearMiss`, already tracked), crown pinned at bottom with
   "something is coming" styling once visible. Click a row → its prose
   history (near-misses, wear, the day it started creaking). No
   percentages anywhere (dev panel only).
2. **Day transcript.** One rule: the day is a scroll. `ui.sceneHistory`
   is the single source; every beat appends; morning starts it; the
   shell renders history with the newest beat highlighted. Delete the
   three inconsistent `sceneText` code paths.
3. **Night ledger as ritual.** Prose-first (`{town.ledger}` leads),
   then the scale line — the ONE place numbers are sanctioned (§5.2) —
   then ratchet/argument echoes. This is the "one more day" screen;
   it should read like a nightcap, not a receipt.
4. Her card: weight only on ritual days ("heavier than yesterday"
   language otherwise), garment strain from `garmentFitState` (already
   computed, barely surfaced).
- Gate: screenshot/DOM checks in a Playwright smoke: panel lists
  expected windows at three seeded states; imminent styling at p≥0.5;
  crown pin appears mid-arc; transcript accumulates across a full day.

### Phase 3 — Make choices matter (agency + economy)

Goal: three slots feel like spending, not clicking.

1. **Differentiate the menu.** Meals get real identities: size, cost,
   fullness profile, window tags, and *timing interactions* (a big
   meal on a full stomach → capacity stretch + hot rolls; a market
   errand enables tomorrow's home feast at half cost; a walk resets
   fullness but grows next-meal appetite — she comes back hungry).
   ~12–14 Mara-arc actions (launch target ~18, §5.1), menus stay 4–6
   state-filtered, observe-class option always present.
2. **Cash binds gently** (§5.10): shortfall narrows tomorrow's menu to
   cheap options (never starvation, never punishment prose). Work
   shift = the boring-but-necessary slot that costs a day-third —
   that's the tradeoff loop. Income/costs tuned so indulgent weeks
   need ~2 shifts.
3. **Enabler tension: suspicion.** New per-arc meter fed by schemes
   witnessed, drained by cover stories (Talk gains a purpose: alibi
   topics, deflections, steering Elena). High suspicion accelerates
   argument pressure and changes intervention scenes (you're nearly
   caught — §5.9 "interventions where you're a mole, sweating").
   Small system (one meter + pool keys), huge seat identity.
4. **Talk topics matter:** each topic moves something visible (resolve,
   suspicion, argPressure, or unlocks a scheme) and says so in-fiction.
- Gate: paceGate's three strategies now produce measurably different
  runs (final lbs spread ≥ 40; different windows fired; passive run
  stalls); a scripted "broke week" narrows the menu; suspicion round-
  trips saves.

### Phase 4 — The scene runner + the argument as setpieces

Goal: the game's big moments become *scenes* — sequences with beats,
choices, and live consequences. This is the one genuinely new engine
piece, and it unlocks F5 wholesale.

1. **Scene runner** (`src/game/scenes.js`): a scene = ordered beats
   `{ template, gain?, choice?, rollTags?, globals? }`. Runner mutates
   lbs between beats (Manifesto rule: mutate, then render), re-runs
   `updateWindowStates` + rolls `rollTags` with `spurtActive: true`
   mid-scene — **a window can open and fire inside the scene that
   caused it** (§5.5, the calibration image, finally real). UI: beats
   step on Continue; choices render as the action menu. State:
   `ui.phase = 'scene'`, script + cursor serialized so saves mid-scene
   work.
2. **Argument events become scenes** (§5.7): Notice = 1-beat; Concern =
   3-beat one-on-one with a player choice (deflect / defend /
   redirect — feeds suspicion/resolve); **Intervention = the flagship
   setpiece**: staged group scene, 5–7 beats, spurt potential (she
   stress-eats through it — the concept's calibration register),
   enabler choice under pressure. Bargaining and Awe scenes close it.
   Pressure thresholds retuned so the five events space across the
   40–70 day arc (roughly days ~8 / ~18 / ~30 / ~42 / post-flip).
3. **The flip is earned** (F5): remove `tryFlip(…, 100)`. Resolve is
   worn down by interventions survived, indulgence-through-opposition,
   thresholds crossed publicly — per-woman weights from her sheet.
   Mara (reluctant, late flip): flip lands after the *second*
   intervention or a public fire during Bargaining, whichever her
   resolve reaches first — inside a scene, with `mind.` interiority
   beats before and after. The register shift (§ arc anatomy: serene,
   unstoppable) keys every pool thereafter.
- Gate: scripted scene-runner test: mid-scene gain opens + fires a
  window inside one scene; intervention scene reachable ~day 30±6;
  flip never before day 30 on default tuning; save/load mid-scene.

### Phase 5 — The crown is a climax

Goal: the arc's promised payoff plays like one.

1. Crown = hand-composed scene script per woman (booth removal for
   Mara), 8–12 beats, always witnessed (`witnesses: 'many'`), spurting
   +6–12 across beats from tuning, other open windows eligible to fire
   mid-scene (convergence — the whole panel comes due at once).
2. Arrival is staged, not a ledger button: when crown-ready, the next
   day renders a "the day of" morning and the day becomes the event
   (no normal slots). Requirements: crown window open+, flipped,
   argument ≥ bargaining — so the systems all *must* converge, which
   is the design's whole thesis.
3. Epilogue weaves the actual ratchet log (reference 3+ real scars by
   name) + drift roster; settling scene sells overdrive once, softly;
   candidate line is *earned* from real drift data (Phase 6).
- Gate: three-playthrough test reaches crown via the staged day; crown
  scene fires ≥1 additional window mid-scene in at least one seed;
  epilogue renders real log entries (continuity check).

### Phase 6 — Ratchet depth, replacements, and live contagion

Goal: the world escalates instead of depleting, and gravity spreads.

1. **Replacement flow** (§5.4): each fired object spawns its
   replacement after 2–4 days — with character, +1 softening, and a
   **new window at rating × ~1.25** — the panel refuels as she grows.
   Garments: shopping beat → new fit, new window. NPC callback pools
   keyed on scars (`when: { scarId }`) — the town remembers on-screen.
2. **Window coverage per band** (CONCEPT risk: "grounded-band
   coverage"): Mara 8 → ~16 windows across event classes
   (zipperRetreat, bathtubRefit, bedSlat, scaleCap, taskReassign,
   dressFitFail + replacements) so every 25–35 lbs has ≥2 live windows.
   Author O/C from object ratings via the existing
   `deriveWindowThresholds`.
3. **Gravity that fires in-arc** (F7): gate at rung g3 (+80) per the
   ladder's own promise line ("Gravity radiation starts" at g4 = +110
   stays for *full* radiation; light drift from g3), rates 0.08–0.3,
   thresholds [4, 10, 18] — t1 mid-arc, t2 late-arc, t3 ≈ settling for
   the highest-rate NPC. Kayla (0.12→0.3) becomes the visible proof.
   Orbit panel bars move week over week; candidate emergence at
   settling reads from actual `driftLbs` ranking (delete hardcoded
   lines in `finalizeSettling`).
- Gate: paceGate asserts ≥2 NPCs show t1+ by crown day, exactly one
  reaches t3 by settling; window census: every 25-lb band from 160–280
  has ≥2 rollable windows at some point; nothing ever un-fails
  (continuity sweep).

### Phase 7 — Content to survive 60 days (the writing build-out)

Goal: no visible repetition across a full arc; every era sounds like
itself. Do this AFTER systems settle so keys are stable.

1. **Scope fix first:** `_eventScopes` lives for the whole day (reset
   only in `advanceDay`), so `sessionUsed` dedupes across a day;
   move scopes out of serialized state (rebuild on load) to dodge the
   Set/JSON trap (F12). Repetition becomes an engineering guarantee,
   then content makes it a quality one.
2. **Volume floors** (priority-1 families, §10.1), Mara first:
   - `port.morning` / `port.evening`: 12+ variants each, keyed by rung
     band × flipped × argStage.
   - `meal.beat`: 30+ across stance/flipped/fullness/rung keys.
   - `win.near.*`: 6+ per event class, wear-keyed escalation (first
     creak ≠ fifth creak), witnessed variants.
   - `win.fire.*`: 6+ per class × witnessed/unwitnessed — fires are
     the payoff voice; they can never repeat within an arc.
   - `arg.*` scene beats: hand-composed skeletons + pooled joints
     (exemplar-gate the register FIRST per §10.3 — love losing to joy,
     never mean).
   - New `rit.` family (tailor / scale ritual, ~5/arc) — the sanctioned
     numbers moments.
   - `port.rung` (Phase 1.6) and scar-callback pools (Phase 6.1).
3. **Lint pack extensions:** volume floors per family; repetition sweep
   (simulate 10 days ×3 seeds, assert zero exact-line repeats within
   any 3-day window for priority-1 families); climax-class
   distribution; softening-gate coverage.
- Gate: text lint green with new floors; repetition sweep green;
  attribution ≥80% holds; owner flag-batch pass on `arg.` + `win.near.`
  (the two tone-risk families — this matches the batch already awaited
  in STATE.md).

### Phase 8 — Priya and Sofie to the same bar, chain polish

Re-run phases 1–7's checklists against arcs 2–3 (they inherit the
systems for free; they need tuning tables, window sets ~16 each, scene
scripts, and content floors in their own voices — Priya's opposed
stance means her resolve tuning and intervention scripts differ;
Sofie's inhabit seat runs interiority-heavy pools, her "argument
happens TO you"). Interstitials render softening deltas (§3.2). The
chain must demonstrate the meta-loop: arc 2's town starts measurably
softer (argument pressure gain reduced by softening — already coded in
`reduceArgGain`, now actually observable).
- Gate: `p5:chain` extended — full 3-arc chained run, each in the
  40–70 day band, softening strictly rising, arc-2 argument
  measurably slower, candidate for arc N+1 earned from drift each time.

### Phase 9 — Quality lock (the "is it actually good now" gate)

- **Fun gate** (`scripts/funGate.mjs`, the F12 harness fix made
  strict): all pace/agency/contagion/repetition assertions from
  phases 1–8 in one command, run in CI alongside smoke/lint/build.
- Full playtest protocol from MASTER §13's checklist items that exist
  at v0.x scope: three-playthrough test per arc, save round-trip at
  three states (incl. mid-scene), continuity audit, content-safety
  gate (house rules: adults, consensual framing, no health-decline
  prose, heat ceiling).
- The final measure stays the concept's own: *a player who owns the
  fantasy reaches Mara's crown event and immediately wants to know
  which friend is next.* Everything above exists to make that sentence
  true.

---

## Sequencing summary

| Phase | Size | What the player feels |
|---|---|---|
| 0. Harness truth | XS | (nothing yet — instruments) |
| 1. Fix the clock | S | The arc breathes; eras exist |
| 2. Windows panel + transcript | S | "One more day" has a face |
| 3. Agency + economy | M | My choices steer her story |
| 4. Scene runner + argument + flip | M/L | The big moments are BIG |
| 5. Crown climax | M | The payoff pays off |
| 6. Replacements + contagion | M | The world escalates and spreads |
| 7. Content build-out | L | Sixty days, never the same line |
| 8. Arcs 2–3 + chain | L | The anthology chains itself |
| 9. Quality lock | S | It stays good |

Phases 1–2 alone (a few days of work) transform the feel and should be
shipped and playtested before anything else — every later phase tunes
against real 50-day runs instead of 9-day blowouts.

## Finding → phase map

F1→P1 · F2→P2 · F3→P1 · F4→P3 · F5→P4/P5 · F6→P1 · F7→P6 · F8→P1 ·
F9→P2 · F10→P6 · F11→P7 · F12→P0/P1/P2/P7
