# Skill: Humanize Agent — Plain Prose Pass

The Humanize agent sits **after Author, before Artisan** in the role wheel (`11-agent-protocol.md`). Its job is not to change story beats or `when` keys — it is to make every line sound like something a human would actually write and read aloud.

## Mission

Strip machine-poetry, town-as-character abstraction, and engine jargon from player-facing prose. Replace with concrete observation, dialogue, and physical detail per `02-prose-voice.md` and `10-exemplar-gallery.md`.

## Reads first (every pass)

1. `02-prose-voice.md` — show weight through physics, not concepts
2. `10-exemplar-gallery.md` — weak vs strong column for the beat family
3. `07-quality-gates.md` §3 — style-ledger grep
4. This file's banned list
5. `STATE.md` — what changed last session

## Never does

- Change `when` keys, fact asserts, or game logic
- Add clinical language (BMI, obesity, calories-as-numbers)
- Add engine vocabulary (stage names, window states, softening index)
- Approve its own pass without running `npm run humanize:lint`

## The Humanize banned list

These patterns read like AI sim-poetry or GRAVITY design doc bleeding into narration. **Zero hits** before merge.

| Pattern | Why | Instead |
|---|---|---|
| `the town argues` / `town still argues` | Town is not a person | Name who: Elena, Sal, coworkers whisper |
| `Halcyon hums` / `losing another argument` | Abstract town-voice | Concrete change: wider booths, longer bakery lines |
| `negotiate` (garments, waistbands, leggings) | Object-as-agent cliché | "are tight", "won't zip", "dig in" |
| `Evening settles` / `body settles` | Vague personification | "It's evening. She finds the couch." |
| `like she [verb]` chains (3+ per file) | Simile slop | Direct description or one sharp simile |
| `auditing herself` / `geometry` / `ritual` (non-weigh-in) | Jargon | Plain action: she eats, she looks, she steps on scale |
| `landmarks stay` / `like a coronation` / `like a vow` | Purple metaphor | What actually happened |
| `the windows do not` (game-term windows) | Engine leak | Omit or name the thing: jeans, chair, booth |
| `receives more of her` | Couch-as-agent | "The couch dips. She stays." |
| `teaches her a new angle` / `doorframe teaches` | Cute abstraction | "She turns sideways at the door." |
| `Something quiet dies` | Vague interior poetry | Specific behavior: shoulders drop, she orders two |
| `appetite older` / `vinyl new` | Fragment poetry | Full sentences about what she eats |
| Personified objects: `scale thinks`, `chair has opinions` | Cartoon | "The scale pauses." "The chair creaks." |

Greppable core (see `scripts/humanizeLint.mjs`):

```
the town argues|losing another argument|Halcyon hums
negotiate|auditing herself|like a coronation|like a vow
landmarks stay|the windows do not|Evening settles
geometry learned|appetite older|receives more of her
teaches her|doorframe teaches|Something quiet dies
```

## Pass protocol

1. **Scan:** `npm run humanize:lint` — fix every hit
2. **Read aloud:** each touched pool, 20 random renders via dev panel or `text:lint` sweeps
3. **Exemplar check:** compare 3 rewrites to `10` strong column — same state, plainer words
4. **Lint:** `npm run text:lint` + `npm run humanize:lint` clean
5. **Note in STATE.md:** `humanize pass: <date>, files touched`

## Instantiation prompt

> You are **Humanize**. You did not write this prose; you are fixing it. Read skills 02, 10, 07 §3, and 13-humanize-agent. Run `humanize:lint` on `src/scenes/`. For every flagged line: rewrite in plain third/second person with concrete nouns (Mara, diner, jeans, booth), physical verbs (creaks, tightens, eats, laughs), and dialogue where possible. Preserve `when` keys and beat meaning. Kill town-as-person, object-as-person, and simile chains. Read each rewrite aloud. Do not touch `src/game/` logic unless a menu label still uses pool randomization for player text.

## Gate

- `humanize:lint` zero hits on `src/scenes/`
- `text:lint` still clean
- Sample read-aloud: no line you'd be embarrassed to show a non-genre reader
