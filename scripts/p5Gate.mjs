/**
 * P5 per-arc gates — Priya and Sofie must reach crown-ready within 70 days.
 */
import { createInitialGameState } from '../src/game/state.js';
import { loadArcIntoState } from '../src/game/arcs.js';
import {
  startDay, executeAction, runEvening, runNightLedger, advanceDay,
} from '../src/game/dayLoop.js';

const DONE = new Set(['crown-ready', 'crown', 'settling']);

function playArc(arcId, actions, maxDays = 70, prep = null) {
  const state = startDay(createInitialGameState({ firstPersonArcs: true }));
  if (prep) prep(state);
  loadArcIntoState(state, arcId, { carryDriftFrom: prep?.carry });
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

const priyaRush = ['refeed-together', 'gym-date', 'teach-class'];
const priyaSavor = ['observe', 'walk', 'rest'];
const sofieRush = ['bakery-run', 'stacks-shift', 'breakfast-hearty'];
const sofieSavor = ['mirror-check', 'cardigan-ritual', 'walk'];

const results = [
  playArc('priya', priyaRush),
  playArc('priya', priyaSavor),
  playArc('sofie', sofieRush),
  playArc('sofie', sofieSavor),
];

let failed = false;
for (const r of results) {
  const ok = DONE.has(r.stage);
  console.log(`${r.arcId}/${r.days}d → ${r.stage} (flip=${r.flipped}, lbs=${r.lbs.toFixed(0)}) ${ok ? '✔' : '✖'}`);
  if (!ok) failed = true;
}

if (failed) {
  console.error('P5 arc gate FAILED');
  process.exit(1);
}
console.log('✔ P5 per-arc gates passed');
