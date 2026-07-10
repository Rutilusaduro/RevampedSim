# GRAVITY — Master Document

**Version target: 1.0. Status: authoritative design + implementation
roadmap.** This document explains the entire game to someone who has
never heard of it, and then tells them how to build it. The only assumed
background is the toolchain: the **Text Engine Manifesto**
(`docs/TEXT_ENGINE_MANIFESTO.md`) for the prose engine, and the **game
skills pack** (`docs/game-skills/`) for craft method — referenced by
file below wherever they carry the HOW. Everything about WHAT to build
is in this document. Where this doc and the interview-derived concept
(`docs/GRAVITY_CONCEPT.md`) disagree, this doc wins.

**Hard rules, binding on every line of the game:** every character is
unambiguously an adult; everything is consensual fiction; no
health-decline or medical framing (fantasy-durable bodies, no pain
beyond the mild and incidental); narration never endorses shame; heat
stays charged-sensual (no explicit band in 1.0); minimal clinical
language. See `docs/game-skills/00-README.md` — these override
everything, including this document.

---

## 1. The game in one page

GRAVITY is a text-first life sim told in deep, sequential arcs. One
contemporary town — working name **Halcyon** (owner may rename). Every
arc, one woman of the town falls into gravity: an appetite that stops
apologizing. The player is someone in her orbit — a different someone
each arc — and across a season of day-by-day play she outgrows her
wardrobe, her furniture, her routines, the town's increasingly desperate
arguments, and finally one signature piece of the world that could not
hold her: her **crown event**. Then the arc ends and she *stays* —
a permanent, still-growing landmark the whole town keeps adjusting to —
and the next arc's woman emerges from her orbit.

The player's verbs are small and daily: share meals, run errands, talk,
choose what to serve, choose what to say when her friends corner you.
The engine underneath is anticipation: every physical consequence in her
life — a button, a chair, a booth, a doorway — is a **probability
window** that opens at one weight and becomes certain at another,
rolling on every relevant action, visible on screen the whole time. The
player always knows the next three things that are about to become
possible, and can never be sure today isn't the day.

What makes it GRAVITY: consequences are **permanent** (the ratchet — a
broken booth stays broken, on the map, forever), big scenes carry **live
gain** (she leaves crises heavier than she entered them), her appetite is
**contagious** (named friends drift heavier in her orbit; the town
itself softens arc over arc), and the world **argues back and loses**
(interventions, concern, bargaining — written as love losing to joy,
never as narration siding with shame).

Fantasy contract with the player, kept every session: you will always
see the next threshold coming; nothing you gain will ever be taken back;
the world will always react; and every woman's story ends at a crown
event that could only be hers.

---

## 2. What playing it feels like (the experiential spec)

A session is 15–40 minutes: two to six in-game days. A day:

1. **Morning card.** Her state renders: portrait line, mood, fullness,
   any window that moved overnight. One paragraph, engine-rendered,
   never the same twice.
2. **Three day slots.** Player picks from slot actions (varies by seat
   and arc stage): breakfast together, work shift, errand in town,
   a walk, a visit, a scheme (seat-specific), rest. Each action renders
   a beat, mutates state, and rolls relevant windows.
3. **Evening beat.** Automatic scene — dinner, couch, phone call,
   sometimes an argument event or a gravity beat. The day's gain lands
   here as prose (the scale itself is ritual-only).
4. **Night ledger.** Compact summary: weight delta, windows that
   opened/advanced/fired, money, town noise. One screen, skimmable,
   then next day.

Interruptions punctuate the rhythm: window fires (the chair, mid-beat),
argument events (her sister is at the door), gravity beats (the friend
pinching at her own waistband), and — three or four times per arc —
**setpiece days** where the day structure suspends into a long composed
scene (the fitting, the road trip, the crown event).

The screen (see §7): scene text center, her live status card right,
the windows panel left — always visible, always whispering what's next.

---

## 3. Structure: arcs, the chain, the town

### 3.1 Arc anatomy

Each arc is one woman, played start to crown, 40–70 in-game days.
Internal spine (beats detailed in §9):

1. **Orbit** — you meet her where the last arc left her: a named face in
   the previous woman's world, already leaning.
2. **Slide** — appetite finds its rhythm; first windows open; the town
   starts noticing. Her stance (varies per woman: opposed / reluctant /
   secret / eager) shapes every beat's register.
3. **The argument** — opposition organizes: comments, then a staged
   intervention, then bargaining. She (and you, depending on seat)
   navigate it. The argument always loses, but HOW it loses is her
   characterization.
4. **The flip** — the psychological turn: resistance quietly dies.
   Placement varies per woman (early/mid/late — late-flip women play
   their whole argument phase in denial's voice). After the flip the
   register becomes the calibration register: serene, unstoppable,
   indulging through the noise.
5. **Convergence** — windows crowd together; the crown event's own
   window opens and the UI shows it; the town runs out of arguments.
6. **Crown** — her signature setpiece (§5.8). Live gain mid-scene.
   The object of the crown enters the permanent record.
7. **Settling** — epilogue woven from her ratchet log; her fixture
   state established (where she lives, who attends her, what was
   rebuilt); overdrive toggle offered; next arc's candidates surface.

### 3.2 The chain

The next woman is never a stranger. Two channels, alternating naturally:
the **influenced friend** (highest gravity-drift NPC of the closing arc)
and the **loudest arguer** (gravity claims the opposition hardest —
the intervention leader who couldn't stop watching). Arc N's supporting
cast is arc N+1's casting pool; the player should end every crown event
scanning the guest list.

### 3.3 The persistent town

One map, ~14 locations (§8). Everything scars: fired windows mark their
location permanently ("the Anchor's corner booth, retired spring of
year one"); finished women appear at their fixture locations with
ambient render pools that keep updating (especially under overdrive);
the **softening index** (0–100, town-wide) rises with every crown,
every drift threshold, every replaced piece of furniture — and gates
ambient content: menus grow, chairs widen, fashion shifts, the gym
reschedules, the arguments get quieter and later each arc.

---

## 4. State model (the data spec)

Types below are the implementation contract. Names are canonical —
pools and dimensions key on them (setting pack, §10.2).

**Woman** (the arc subject; finished women keep the same record):
`id, name, age (18+), role, pronouns('she'), bodyType
(pear|apple|hourglass|top|bottom|even), frameLbs (her baseline),
lbs, appetite (1.0+, multiplier), capacity (grows), fullness (0–1.3),
stance (opposed|reluctant|secret|eager), resolve (hidden, 100→0, flip
fires at 0), flipped (bool), psych { indulgence 0–3, display 0–3,
dependence 0–3 } , wardrobe { top, bottom, waist, dress? } (garments per
skill 06 §2: fitLbs, integrity), signature { crownEventId, registerNotes,
lexiconBriefIds }, ratchetLog [], weekUsed (engine no-repeat set),
fixture? { location, overdrive: bool, odLbsPerDay }`

**NPC (orbit member):** `id, name, age (18+), relation, stanceToward
(admiring|worried|arguing|enabling|awed), driftLbs, driftRate,
driftThresholds [t1 noticed, t2 undeniable, t3 candidate], argueWeight
(how loud in interventions)`

**Window (probability event instance):** `id, eventClass, target
(garment|object|task|location), openLbs, certainLbs, state
(closed|open|imminent|fired), wear (0–1, accumulates on near-misses),
firedOn (day, sceneRef)` — see §5.3 for the roll.

**Object registry:** every sittable/passable/wearable thing in scenes:
`id, location, kind, ratingLbs (what it comfortably holds/passes),
status (fine|creaking|reinforced|failed|replaced), history []`

**Town:** `day, arcIndex, softening (0–100), scars [], fixtures [],
economy { cash, incomePerShift, mealCostBase }`

**Player:** `seatType (partner|enabler|influenced|inhabit), name?,
driftLbs (only for influenced seat), knowledge flags`

Save = all of the above + engine `weekUsed` arrays; never save engine
facts/session scopes (Manifesto §3.8). Version the save shape from day
one (skill 06 §9).

---

## 5. Mechanics (exact specs)

Constants below are tuned starting values — keep them named and central
(`src/gameData/tuning.js`), expect the flag-batch loop to move them.

### 5.1 Time and actions

Day = 3 slots + evening. Arc target: 40–70 days. Actions are data:
`{ id, label (pool-rendered), slotCost, seatTypes [], stageGate,
effects (meal? outing? scheme? work?), windowTags [] }`. ~18 actions at
launch; menus show 4–6, state-filtered, per skill 01 §4 (always one
observe-only option).

### 5.2 Appetite and gain

- Meal gain: `lbsGained = mealSize × appetite × 0.4` (mealSize 1–4).
  Typical early day: +0.5–1.5 lbs; post-flip: 2–4; spurt days more.
- Appetite grows on indulgence: `+0.02 × mealSize` when fullness ends
  ≥0.9; decays 0.01/day below 0.5 (it never drops below her floor,
  which rises at each rung — the ratchet applies to appetite too).
- Fullness: meals add `mealSize × 0.25 / capacity`; decays 0.15/slot.
  Capacity +2% whenever fullness ≥1.1 (approached limits stretch).
- The scale is ritual-only: exact numbers render at weigh moments and
  the night ledger; all other prose uses the descriptor ladder (§6).

### 5.3 Probability windows (the core mechanic)

For window with `openLbs O`, `certainLbs C`, at weight `W`:

```
base = 0                          if W < O
base = ((W − O) / (C − O))^1.5    if O ≤ W < C      // slow early ramp
fire  = guaranteed on next relevant action  if W ≥ C
p = base × fullnessMod × spurtMod × wearMod
    fullnessMod = 1.5 if fullness ≥ 0.8 else 1.0
    spurtMod    = 2.0 during spurt scenes else 1.0
    wearMod     = 1 + wear                        // creaks compound
```

- Rolls happen only on actions tagged relevant to the window
  (`windowTags` ∩ event class: sitting rolls chairs, doorways roll on
  transit, garments roll on dressing and big meals).
- **Near-miss rule:** a roll that fails but exceeded `p/2` adds
  `wear += 0.05` AND renders a warning beat (the creak, the strained
  seam, the shoulder-turn squeeze). Anticipation prose is thus driven
  by the actual dice — the player learns to read the world's nerves.
- On fire: scene interrupt (composed beat, witnessed variant if NPCs
  present), ratchet log entry, object status → failed, map scar,
  garment integrity → 0 where applicable, replacement flow (§5.4).
- Windows panel (§7.2) lists open windows sorted by `p`, shows
  `imminent` styling at p ≥ 0.5, and shows approaching (still-closed)
  windows within 15 lbs of opening. **Numbers are shown as sensual
  language + a bar, never percentages** — "the office chair has
  opinions" reads; "chair: 62%" kills it.
- Event classes at launch (each needs O/C offsets per object rating and
  a witnessed + unwitnessed beat family): buttonPop, seamSplit,
  zipperRetreat, chairCreakFail, boothPinch, doorframeBrush→doorStuck,
  carSeatBelt, stairsWinded→stairsRoute, bathtubRefit, bedSlat,
  turnstile, boothRemoval (institutional), scaleCap (her scale's limit),
  dressFitFail, taskReassign (work task quietly moved to someone else).
  O/C derive from object `ratingLbs`: `O = rating × 0.92`,
  `C = rating × 1.18`, garments from `fitLbs` per fit-state thresholds
  (skill 04 §5).

### 5.4 The ratchet

Fired windows are forever: log entry (day, scene, witnesses), map scar,
NPC callback pools keyed on the scar for the rest of the game.
Replacements arrive with character (the reinforced chair "with the good
bones", the widened booth the diner is weirdly proud of) — each
replacement bumps softening +1 and opens a NEW window at the higher
rating. Nothing is ever quietly restored; the old rating never returns.

### 5.5 Spurt-in-scene

Setpiece scenes (argument events, crown, 2–3 owner-authored spurts per
arc) run live gain: the scene script adds lbs between beats
(`+3 to +12` across a setpiece), re-evaluating windows mid-scene, so a
window can open — and fire — inside the scene that caused it. The
calibration image: pushed at the doorframe while the bucket empties and
`W` climbs past `C` in real time. Engine-wise: the scene runner mutates
`lbs` between renders (Manifesto §3.10 rule 4 — mutate, then render).

### 5.6 Gravity (contagion)

Every woman past rung 4 (§6) radiates. Each orbit NPC has `driftRate`
(lbs/day, 0.02–0.15 by proximity and susceptibility). Shared meals
double drift that day. Drift thresholds fire beats: t1 (+8 lbs) she
notices; t2 (+20) the town notices; t3 (+35) she's a candidate — her
name appears in the settling scene's guest list. Finished women keep
radiating (fixtures have radius = their location). Softening index:
+3 per crown, +1 per replacement, +1 per NPC t2, +2 per NPC t3;
softening gates ambient pools (`when: { softeningMin: n }`) — menus,
furniture stock, fashion, the gym's tone, how early the argument gives
up in later arcs.

### 5.7 The argument (opposition)

Per arc: an opposition cast (2–4 NPCs with `argueWeight`) and a pressure
track that rises with public windows fired and rungs crossed. At
pressure thresholds, escalating events: **Notice** (a comment, deflected
per her stance) → **Concern** (a one-on-one) → **Intervention** (the
staged group scene — a setpiece with spurt potential; the calibration
scene lives here or at crown) → **Bargaining** (they negotiate terms
they'll lose) → **Awe** (the argument's surrender — often adjacent to
the flip, sometimes the trigger, sometimes the aftermath). Register law:
opposition is love that's wrong, written warmly, losing on-screen;
narration NEVER sides with it (hard rule). Softening reduces the track's
gain arc-over-arc — by arc 6 the town barely musters a Concern, and that
change is itself content. Seat interacts hard here (§5.9): the enabler
seat sits INSIDE the intervention, sweating.

### 5.8 Crown events

Each woman's arc aims at one signature setpiece, hers alone, defined on
her sheet (§12): the event class is unique within any three consecutive
arcs (lint rule), staged as the biggest scene of the arc, always
witnessed, always spurting, always ratcheting something iconic. The
crown's window appears in the panel from mid-arc ("something is coming"
styling), converting the whole endgame into visible approach.

### 5.9 Seats (player role per arc)

| Seat | You are | Verbs skew | Unique tension |
|---|---|---|---|
| Partner | Her spouse/girlfriend/boyfriend | meals, gifts, intimacy beats | The town lobbies YOU to rein her in |
| Enabler | Inside the concerned circle, secretly feeding | schemes, cover stories, double-life | Interventions where you're a mole |
| Influenced | Her close friend, drifting yourself | shared meals, your own mirror beats, your own windows (small set) | Your own buttons join the panel |
| Inhabit | Her, first person | self-negotiation, mirror, defiance | The argument happens TO you; interiority is the main channel |

Seat is fixed per arc, declared on the woman's sheet, chosen for maximum
voltage with her stance (a late-flip opposed woman + enabler seat; an
eager woman + partner seat; the finale + the seat that hurts best).

### 5.10 Economy (kept light)

Cash from work-shift actions; meals and replacements cost; her appetite
scales meal cost (`mealCostBase × mealSize × appetite`). Purpose: make
indulgence a *choice* early and a cheerful money pit later. No
starvation states — shortfall just narrows tomorrow's menu.

### 5.11 Overdrive

Per finished woman, opt-in at settling: `+odLbsPerDay` (0.5–2) forever,
background. Fixture pools re-render as she grows; her location keeps
scarring/upgrading on a slow clock; overdrive fixtures dominate the
town's ambient render budget by late anthology. Off by default; the
settling scene sells it once, without pressure.

### 5.12 Content toggles (consent surface, launch requirement)

Start-of-game menu (skill 05 §5): stuck/wedged content, witnessed
failure, first-person (inhabit) arcs, influenced-seat player gain,
overdrive — each on/off. Toggles gate selection (arcs re-seat, event
classes swap), never censor mid-scene.

---

## 6. The ladder (grounded band)

Twelve rungs. Engine keys `g0–g11` never appear in prose (hard rule —
gate on them, describe the lived threshold). Names below are design
vocabulary. `frameLbs` ≈ 140–170; rungs are offsets from frame so every
woman's ladder fits her body; the lbs column shows a 150-frame example.

| id | key | Design name | ~Lbs | Per-rung promise (what changes) |
|---|---|---|---|---|
| 0 | g0 | baseline | 150 | Her ordinary; the "before" every echo cites |
| 1 | g1 | softening | 175 | Waistbands negotiate; private noticing; first drift beat |
| 2 | g2 | settled | 200 | First garment windows open; the mirror gets interesting |
| 3 | g3 | filled | 230 | First furniture creaks; Notice fires; walk becomes sway |
| 4 | g4 | plush | 260 | Gravity radiation starts; first public fire likely; Concern |
| 5 | g5 | heavy | 295 | Booths pinch; stairs become a decision; Intervention window |
| 6 | g6 | laden | 330 | Chairs need choosing; car is a technique; flip country begins |
| 7 | g7 | spilling | 370 | Doorways brush; task reassignments; town accommodations start |
| 8 | g8 | sweeping | 415 | Standard furniture done; reinforced era; she plans rooms |
| 9 | g9 | monumental | 460 | Doorway stuck is live; the town builds FOR her |
| 10 | g10 | sovereign | 505 | Crown country — the arc's endgame band |
| 11 | g11 | overdrive | 550+ | Post-arc only: OD1 550–700, OD2 700–900, OD3 900+ |

Coverage law (skill 04 §2): every weight-relevant pool covers every rung
it can fire at. The 180–500 band gets the densest authoring this project
has done — every rung changes what fails, per the promises column.

---

## 7. UI specification

Text-first React shell (the existing stack). Implementation follows the
`interface-kit` skill for craft; render sites and state rules follow
skill `08-shell-integration.md` (stable-render rule: render on state
change, store strings, never roll in the view layer). Screens:

### 7.1 Day screen (home)

Three columns. **Center:** scene text (engine renders, beat by beat) +
action menu (4–6 state-filtered choices, labels pool-rendered with
throwaway scopes — Manifesto §3.10). **Right:** her card — name, rung
descriptor (words, never the key), weight (only on ritual days,
otherwise "heavier than yesterday" language), fullness as a warm gauge,
mood line (micro-render), garment strain line. **Left:** the windows
panel (7.2). Top strip: day count, arc title, cash, softening glyph.

### 7.2 The windows panel (the signature UI)

The anticipation engine made visible. Ordered list of open windows:
each shows the target ("the corner booth", "the gray jeans"), a slow
bar (no numbers), and a state word — quiet / restless / creaking /
**imminent** (p ≥ 0.5, styled hot) — plus "approaching" ghosts for
windows within 15 lbs of opening. Near-misses pulse the row. The crown
window, once visible, sits pinned at the bottom with its own styling
("something is coming"). Clicking a row shows its history (near-misses,
wear) as prose. This panel is why the player takes one more day.

### 7.3 Town map

Stylized map, 14 locations. Scars render as markers with their log
line; fixtures (finished women) glow with an ambient one-liner that
re-renders on visit (overdrive women's lines keep escalating).
Softening index as the map's palette warming (subtle). Click location →
visit action if a slot remains.

### 7.4 Her record (the ratchet gallery)

Per woman: the ratchet log as an illustrated-by-text timeline (every
fired window with its scene reference, replayable), rungs crossed with
date, the crown event's full scene preserved, drift roster (who she
pulled, how far). This is the collection surface (compulsion stack) —
completion-brained players will fill it; it's also the epilogue's
source material.

### 7.5 Orbit panel

Named NPCs with stance icons and drift bars (again: words + bars —
"Kayla's jeans are learning about gravity" beats a number), argument
pressure track rendered as a temperature strip.

### 7.6 Settings & dev

Content toggles (§5.12), text speed, autosave slots. Dev panel (debug
builds only, skill 08 §8): beat roller with state lock + visible seed,
per-slot trace flags, window-odds inspector (`getEligibleVariants` +
real percentages — the dev panel is the ONLY place percentages exist).

---

## 8. The town (setting bible, launch set)

Halcyon, population small-city, walkable core. Fourteen locations, each
with an object registry and a lexicon brief (skill 09 §2) at build time:

1. **The Anchor** — the landmark diner. Corner booth is town history.
2. **Mercer & Vale** — office where several arcs work. Chairs, elevator,
   break room.
3. **The Crescent** — apartment block; arcs 1/3 home. Stairs vs. the
   slow elevator.
4. **Halcyon Fitness** — Priya's gym. Equipment ratings, mirror wall.
5. **Verdi's** — Carmen's restaurant, later expanded. Banquettes.
6. **Meridian Library** — rotunda, antique reading chair, mezzanine
   stairs.
7. **The Twelve Oaks** — event hall (weddings, council galas). Stage.
8. **Sorelle Bridal** — fitting rooms, the pedestal.
9. **Pine & 4th Market** — groceries; aisle widths are content.
10. **Town Hall** — council chamber, the podium, public seating.
11. **The Marina Walk** — benches, the boardwalk turnstile.
12. **Motorline** — bus line + her hatchback; seatbelts, bucket seats.
13. **Dr. Osei's** — NO medical framing: it's the tailor's, actually —
    measurements as ritual theater, numbers allowed here.
14. **Home interiors** — per-arc apartments/houses; bathtub, bed,
    kitchen chairs; the most personal object registry.

(Location 13 note kept deliberately: any "measurement" venue is a
tailor, a fitting, a scale ceremony — never a clinic.)

---

## 9. Story spine and beats (1.0 narrative)

### 9.0 Opening

Cold open, arc 1 day 1: no lore dump. The town renders normal. Mara
orders dessert like it's a confession. The windows panel starts with
one row — "the gray jeans, quiet" — and teaches itself.

### 9.1 Between-arc interstitials

After each settling: a one-scene vignette, town POV, no player choices —
the softening made visible (the diner's new chairs arriving; the
boutique's rack drifting sizes; two townswomen splitting a second
dessert without comment). These are the anthology's connective tissue
and the softening index's narrative face.

### 9.2 The six arcs of 1.0 (the women)

Full sheets to be authored per §12's template; canonical summaries:

---

**Arc 1 — Mara Voss.** 29, waitress at the Anchor. Hourglass, frame
145. **Stance: reluctant. Flip: late. Seat: ENABLER** (you're her best
friend since school — publicly worried, privately the one who keeps
showing up with pastry boxes). Her reluctance is warm and funny and
utterly porous. Opposition: her sister Elena (leader), diner boss Sal
(soft), gym friend Priya (loud). **Crown: boothRemoval** — the Anchor's
corner booth, her lifelong seat, retired in a scene the whole diner
attends; she takes the first sit in its widened replacement like a
coronation. Gravity targets: coworker Kayla (t3 by arc end — decoy
candidate), and Priya, whose arguing keeps bringing her back within
radius. Beats: (1) the pastry-box ritual established · (2) first public
creak at the staff party · (3) Elena's intervention — you inside it,
lying beautifully · (4) the bargaining diet, three days long, ended by
a plated dessert shot like a proposal · (5) the flip, quiet, in the
diner's walk-in: "bring two next time" · (6) crown.

**Arc 2 — Priya Chandrasekhar.** 31, owns Halcyon Fitness. Athletic
apple, frame 150. **Stance: OPPOSED — arc 1's loudest arguer. Flip:
mid, seismic. Seat: PARTNER** (you've dated a year; her discipline was
the first thing you loved; you never asked her to change — the town
can't decide if you're the problem). Her opposition to Mara curdles
into fascination she trains against, loses to, then leads with. Once
flipped, she gains like she trained: with programs, metrics she invents,
delighted rigor — the tailor's ceremonies become her meets. Opposition:
her own client base, her business partner Dev, her old competition
circle. **Crown: chairCreakFail, public, at her own gym** — the
demonstration bench, mid-class, and she finishes the class seated on
the floor like a queen holding court. Gravity: front-desk girl Sofie
(bookish, always watching); two clients. Beats: (1) teaching class
while Mara's booth ceremony is the town's only topic · (2) the secret
first indulgence, framed as "refeed" · (3) caught mid-binge by you —
the scene where the relationship chooses · (4) the flip: she writes
GAIN on the whiteboard where the class programs go · (5) the client
exodus and the strange new sign-ups · (6) crown.

**Arc 3 — Sofie Lindgren.** 24 (grad student), library assistant.
Pear, frame 140. **Stance: SECRET — always wanted this, hid it under
cardigans and discipline. Flip: EARLY. Seat: INHABIT — you are Sofie,
first person.** The arc where interiority is the whole channel: her
(your) private rituals, the mirror, the joy of finally. The argument
plays differently from inside — deflections you type, hunger you feel
rendered in second person. Opposition: her mother by phone, the
department's whisper network. **Crown: the rotunda reading chair** —
the library's hundred-year antique, and the scene where it gives is
written as a wedding. Gravity: her study group (two named), and a
long-distance echo: the mother's calls get… softer. Beats: (1) the
inherited cardigan that won't close, kept anyway · (2) first bakery
run as self-permission · (3) the mother call intervention, survived
with your own typed words · (4) being SEEN by a stranger and liking it
· (5) the stacks reorganized around your new geometry — the library
adapts before the town does · (6) crown.

**Arc 4 — Carmen Ortiz.** 38, chef-owner of Verdi's. Even-rotund,
frame 165. **Stance: EAGER from scene one** (variety demands it — no
resistance arc; the tension is scale and spectacle). **Flip: none
needed — her arc's turn is the town's flip about HER.** **Seat:
PARTNER-IN-CRIME, open:** you co-run the restaurant; the expansion is
the plot. Her appetite is professional philosophy: she tastes
everything, doubles the menu, becomes her own restaurant's proof of
concept. Opposition: investors, a food critic, the fire marshal
(booth capacities — played warm). **Crown: the record tasting menu** —
opening night of the expansion, forty courses, live-gaining through
her own banquet while the town watches her outgrow the head table's
bench mid-service. Gravity: her whole kitchen brigade drifts (an
institution-level t3: the restaurant itself becomes a soft place);
Noor, the wedding planner, catering-adjacent, keeps attending
tastings. Beats: (1) the expansion pitch, appetite as business plan ·
(2) menu R&D montage days (spurt mechanics as work) · (3) the critic's
visit — won by the third course · (4) the investor bargaining, solved
with a tasting · (5) the fire marshal's booth-rating ceremony, played
as flirtation with codes · (6) crown.

**Arc 5 — Noor Haddad.** 27, wedding planner, engaged. Top-heavy
hourglass, frame 150. **Stance: opposed-professional** ("the dress is
the deadline"). **Flip: at the FITTING — mid-late.** **Seat:
INFLUENCED** — you are her best friend and maid of honor, and you've
been drifting since arc 1 fed you and arc 4 catered you; your own
windows sit small and real at the panel's edge. Her arc runs the
wedding countdown against her appetite; the fitting-room pedestal at
Sorelle is the recurring ritual. The flip: at the third fitting she
orders the next dress two sizes UP, "to grow into," and the room
exhales. Opposition: her mother-in-law-to-be, the planner-brain
itself; her fiancé is quietly, helplessly on appetite's side
(dominance-as-care register, skill 10 §8). **Crown: the aisle** — the
wedding itself, the dress at its second refit, the head table styled
around her, and one bridesmaid (you) whose own zipper window fires
during the toast — crowd delight, her delighted most of all. Beats:
(1) the checklist that starts eating itself · (2) fitting one, played
opposed · (3) tasting menus "for the reception" (Carmen's, of course)
· (4) fitting three: the flip · (5) the bachelorette as spurt setpiece
· (6) crown, double-ratchet (hers and yours).

**Arc 6 — Beatrice Kowalczyk.** 45, town councilwoman — the anthology's
institutional arguer, funder of "wellness initiatives," the one who has
spoken at every crown from the back of the room. Statuesque
bottom-heavy, frame 160. **Stance: OPPOSED, career-grade. Flip: LATE
and total. Seat: ENABLER, full circle** — you're her aide, arc-1-style
double agent at civic scale. Her arc is the town's argument having its
own arc: policy proposals, the softening index made political, and
Bea's private ledger of every window she's watched fire, kept in a
drawer, annotated too carefully. Opposition: herself, mostly — plus a
regional wellness consultant (the outside arguer the town no longer
needs). **Crown: the podium** — Town Hall, the wellness initiative's
final reading, where she abandons the speech, and the council chamber's
historic bench — rated for other centuries — ends the argument for
her mid-sentence, to applause. Softening hits cap; the town formally
stops arguing. Beats: (1) the initiative launch, her drawer ledger
revealed to the player only · (2) field research: she attends Verdi's
"professionally" · (3) the consultant's audit vs. the town's quiet
sabotage · (4) private flip long before public: the aide-and-ledger
scene · (5) the last bargaining — with herself, out loud, in chambers
· (6) crown + the 1.0 finale interstitial: Halcyon at softening 100,
every fixture rendered once, the next candidate list rendering over
the credits — endless mode begins.

---

### 9.3 Endless mode (post-1.0 shape, design now, build later)

After arc 6: candidates generate from the drift roster + the woman
format (§12), owner-authored or agent-authored per the format. 1.0
ships with the hooks (candidate surfacing, sheet loader) and one
sample generated arc outline to prove the format.

---

## 10. Content architecture (how the prose gets made)

### 10.1 Beat families (with launch volume targets)

Per skill 04, engine per the Manifesto. Families, keyed on the §4
dimensions:

| Family | Namespace | Renders/arc | Priority |
|---|---|---|---|
| Portrait/observation | `port.` | daily | 1 — deepest coverage |
| Meals & appetite | `meal.` | daily | 1 |
| Windows: near-miss/creak | `win.near.` | constant | 1 — the anticipation voice |
| Windows: fires (per event class × witnessed) | `win.fire.` | ~12/arc | 1 — the payoff voice |
| The argument (5 escalation stages) | `arg.` | ~8/arc | 2 — exemplar-gate FIRST (tone risk) |
| Interior/flip | `mind.` | stance-keyed | 2 |
| Gravity beats | `grav.` | ~10/arc | 2 |
| Town ambient/softening | `town.` | daily | 3 |
| Ritual measurement (tailor) | `rit.` | ~5/arc | 2 |
| Crown setpieces | `crown.<id>.` | 1/arc | 1 — mostly hand-composed skeletons |
| Settling/epilogue/interstitial | `end.` | 1/arc | 3 |
| Seat-specific (schemes, self, drift-self) | `seat.` | varies | 2 |

Volume floors per the Manifesto §6.2/§6.6 and skill 04 §4; persona
lines per woman at every psych tier in `arg.`, `mind.`, `meal.`
(voice contracts from her sheet).

### 10.2 Setting pack (engine wiring)

Per Manifesto Part V: subject deriver maps Woman → `ctx.d` (rung from
lbs/frame, stance, flipped, psych tiers, fullness bands, seatType,
fit states per garment via skill 04 §5); dimensions: `softening`,
`argPressure`, `driftTier` (for NPC-subject renders), `witnesses`
(count bucket), `spurtActive`, `crownNear`; `relSize` vs. the player in
influenced seat. Stem-track all prose namespaces. Identity modules
port unchanged.

### 10.3 Production method

Everything runs the skills pack: lexicon briefs before pools (09),
exemplar calibration before writing (10 — plus TWO new exemplars to
author first: the near-miss register and the argument register),
agent protocol roles and waves (11), gates every wave (07 + the text
lint per Manifesto Part VII, with GRAVITY's lint pack: grid over
rung × stance × flipped × fullness × seat; continuity sweeps for
ratchet facts; climax-class distribution check; softening-gate
coverage).

---

## 11. Implementation roadmap to 1.0

Phases per skill 11 §2; each ends verified or it didn't happen. One
wave = one session where feasible. STATE.md from day one.

**P0 — Foundation (engine + data).**
Port/reuse the engine per Manifesto Part IV verbatim (it exists in this
repo); write GRAVITY's setting pack (§10.2), tuning.js constants (§5),
state model (§4) as engine-free `gameData/`; lint pack v1 (grid, first
sweeps, morphology). *Done when:* smoke passes; probe renders differ
across rungs/stances; planted-defect check catches.

**P1 — Core sim, headless.**
Day loop, actions, appetite/gain/fullness, windows engine with wear +
near-miss events, ratchet log, object registry, saves. Self-checks:
window math table-tested (O/C/p at fixed points), determinism under
seeded RNG, ratchet permanence round-trips saves. *Done when:* a
scripted 60-day headless run prints a coherent event ledger and every
mechanic's numbers match hand-computed expectations.

**P2 — Shell.**
React screens §7 (interface-kit skill for implementation craft):
day screen, windows panel, ledger; stable-render rule enforced; dev
panel with seed + trace. Map/record/orbit panels stubbed. *Done when:*
P1's scripted run is playable by hand and the windows panel breathes
(near-miss pulses land).

**P3 — Vertical slice: Arc 1 (Mara), complete.**
Her sheet, all beat families at slice depth for rungs g1–g8, enabler
seat verbs, argument chain, 8 window event classes, her crown, two
gravity NPCs, settling + interstitial. Exemplars authored first
(near-miss + argument registers). Full gates: lint clean, 20-render
reviews per family, corner renders, three-playthrough test (rush /
savor / hostile-refuse). *Done when:* a player who owns this fantasy
reaches Mara's crown and immediately asks who's next — test with the
owner; iterate the flag-batch loop until his batch comes back boring.

**P4 — Systems completion.**
Gravity drift full (rosters, thresholds, candidate surfacing),
softening index + gated ambient pools, town map with scars, her
record/gallery, orbit panel, content toggles, overdrive, interstitial
system, economy pass. *Done when:* arc 1 replayed shows the town
measurably softer after, and toggles verifiably gate content.

**P5 — Arcs 2–3 (Priya, Sofie).**
Two new seats (partner, inhabit) with their verb sets; inhabit seat's
first-person render pass (pronoun plumbing exists in the engine);
opposed and secret stance content at full depth; chain mechanics live
(Priya emerges from arc 1's arguer channel, Sofie from arc 2's drift).
*Done when:* per-arc gates + the attribution test across all three
women's dialogue (skill 03 §6: 80% name-stripped re-attribution).

**P6 — Arcs 4–6 (Carmen, Noor, Bea) + endless hooks.**
Influenced seat (player windows!), eager-stance arc, wedding countdown
structure, civic layer, softening cap + finale, candidate
generator + sheet loader + one generated sample arc outline. *Done
when:* full six-arc playthrough (can be assisted/skip-enabled) holds
the compulsion stack — playtest metric: sessions end mid-arc less
than 25% of the time (people stop at settlings, not from boredom).

**P7 — 1.0 gates.**
Full release checklist (skill 07 §5) + content-safety gate + save
migration test + performance pass (render budget: day turn under
100ms) + the owner's final flag-batch loop until boring. Ship.

**Sizing note (honest):** P3 is the mountain — it's Professor Sim's
whole text discipline pointed at a denser band. Everything after P3
scales by content waves, and the agent protocol (skill 11) is the
production line. Nothing in P0–P2 is research; the engine exists and
is verified.

---

## 12. The Woman Format (making more, forever)

A new woman is one file (`gameData/women/<name>.js`) + one content
directory (`scenes/arcs/<name>/`) + this sheet, completed IN ORDER —
each field constrains the next. Sheets live in
`docs/women/<NAME>_SHEET.md`.

```
WOMAN SHEET — [name], [age 18+], [role in town]
1  Origin hook:      which prior arc's orbit she emerges from, and
                     which channel (influenced friend | loudest arguer)
2  Body:             bodyType, frameLbs, gain geography notes
                     (where it shows first/most — drives port. pools)
3  Stance + flip:    starting stance; flip placement (early/mid/late/
                     none-eager); what SPECIFICALLY breaks her resolve
                     (an image, a person, a permission — not "time")
4  Seat:             player role + why it's the max-voltage pairing
                     with her stance (one sentence, testable)
5  Appetite signature: what/how she eats, as characterization —
                     her meal.* pools' register in five words
6  Voice contract:   per skill 03 §6 — 5 owned words/phrases, 3 never-
                     says, rhythm, taboo topic, body-distance register
                     at each psych tier
7  Crown event:      class (UNIQUE in any 3 consecutive arcs — check
                     the distribution log), venue, witnesses, what
                     iconic object ratchets, one-line image of the
                     moment time stops
8  Windows plan:     8–12 event instances with venue + O/C from object
                     ratings; which THREE are her arc's signature
                     near-miss threads (these get the deepest win.near
                     pools)
9  Opposition cast:  2–4 named arguers with argueWeight and their
                     surrender flavors (how each one's love loses)
10 Gravity targets:  2–3 named NPCs with driftRate + which becomes a
                     candidate; what the town inherits from her arc
                     (menu, furniture, norm — one permanent softening
                     artifact)
11 Arc skeleton:     six beats (orbit/slide/argument/flip/convergence/
                     crown) — one line each, each naming its rung band
12 Lexicon briefs:   3–5 pool briefs (skill 09 §2) for what's UNIQUE
                     to her (her venue's materials, her profession's
                     vocabulary, her crown's physics)
13 Coverage check:   rungs g1–g10 × her stance ladder — mark filled/
                     N-A; N-A needs a reason
14 Hard-rule check:  adult, consensual register, no decline framing,
                     crown class distribution — sign or stop
```

Authoring order for a new arc, using the sheet: sheet → exemplar pass
for any NEW register she introduces → lexicon briefs → beat family
waves per skill 11 (Author→Artisan→Editor) → windows data → crown
setpiece last (it needs everything else's vocabulary) → gates → the
owner plays to crown → flag batch → boring → ship arc.

---

## 13. 1.0 definition of done

```
[ ] Six arcs playable start to crown to settling, chained
[ ] Windows panel: every event class represented, near-miss prose live
[ ] Ratchet: nothing ever restores; scars render across arcs
[ ] Gravity: drift visible on ≥2 NPCs/arc; candidates surface at settling
[ ] Softening: index gates ambient content; interstitials render it
[ ] All four seats shipped and toggle-gated
[ ] Overdrive functional on all six women
[ ] Attribution test ≥80% across the six voices
[ ] Full gates: text lint clean, style ledger grep zero, coverage
    matrix no unintended gaps, three-playthrough test, continuity
    audit, content-safety gate, save round-trip at three states
[ ] The owner's flag batch on every family: boring
[ ] Endless hooks: candidate generator + sheet loader + 1 sample
```

The game is done when the town has finished losing its argument six
beautiful times, and the player's only complaint is that there is no
seventh — which is what the Woman Format is for.
