# GRAVITY

Text-first life sim set in **Halcyon** — a town that keeps losing the same argument, beautifully.

## Play

```bash
npm install
npm run dev
```

Open the local URL Vite prints. Each day: three action slots, an evening beat, a night ledger. The **windows panel** (left) shows what physical consequences are approaching. Play Mara Voss's arc as her enabler — pastry boxes, interventions, and the corner booth crown event.

## Verify

```bash
npm run smoke      # engine mechanism checks
npm run text:lint  # prose pool harness
npm run headless   # 45-day scripted sim
npm run build
npm run lint
```

## Architecture

| Layer | Path |
|---|---|
| Text engine | `src/textEngine/` (Manifesto Part IV) |
| GRAVITY setting pack | `src/textEngine/settingPack.js` |
| Game state & sim | `src/game/`, `src/gameData/` |
| Prose pools | `src/scenes/gravityContent.js` |
| React shell | `src/App.jsx` |

Design authority: `Docs/GRAVITY_MASTER.md`. Build phases tracked in `STATE.md`.

## Status (v0.1 vertical slice)

- [x] P0 — engine, setting pack, lint pack, smoke
- [x] P1 — headless day loop, windows, ratchet, saves
- [x] P2 — React shell (day screen, windows panel, her card, dev panel)
- [ ] P3 — Mara arc content depth + playtest to crown (in progress)
- [ ] P4–P7 — full six-arc anthology
