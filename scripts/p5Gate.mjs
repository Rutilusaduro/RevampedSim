/**
 * P5 per-arc gates — rush strategies reach crown-ready (Priya/Sofie inherit Mara pacing).
 */
import { createInitialGameState } from '../src/game/state.js';
import { loadArcIntoState } from '../src/game/arcs.js';
import {
  startDay, executeAction, runEvening, runNightLedger, advanceDay,
} from '../src/game/dayLoop.js';

const DONE = new Set(['crown-ready', 'crown', 'settling']);

function playArc(arcId, actions, maxDays = 90) {
  const state = startDay(createInitialGameState({ firstPersonArcs: true }));
  loadArcIntoState(state, arcId);
  startDay(state);
  let day = 0;
  while (day < maxDays && !DONE.has(state.arc.stage)) {
    for (const id of actions) executeAction(state, id);
    runEvening(state);
    runNightLedger(state);
    advanceDay(state);
    day++;
  }
  return {
    arcId,
    days: day,
    stage: state.arc.stage,
    flipped: state.woman.flipped,
    lbs: state.woman.lbs,
    ratchet: state.woman.ratchetLog.length,
  };
}

const results = [
  playArc('priya', ['refeed-together', 'gym-date', 'teach-class']),
  playArc('sofie', ['bakery-run', 'stacks-shift', 'breakfast-hearty']),
];

let failed = false;
for (const r of results) {
  const ok = DONE.has(r.stage);
  console.log(
    `${r.arcId}/rush ${r.days}d → ${r.stage} `
    + `(flip=${r.flipped}, lbs=${r.lbs.toFixed(0)}, ratchet=${r.ratchet}) ${ok ? '✔' : '✖'}`,
  );
  if (!ok) failed = true;
}

if (failed) {
  console.error('P5 arc gate FAILED');
  process.exit(1);
}
console.log('✔ P5 per-arc rush gates passed');
