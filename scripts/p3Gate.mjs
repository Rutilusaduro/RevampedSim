/**
 * P3 gate — three playthrough strategies must reach crown-ready within 70 days.
 * rush: feed aggressively · savor: observe/rest · hostile: minimal engagement
 */
import { createInitialGameState } from '../src/game/state.js';
import { startDay, executeAction, runEvening, runNightLedger, advanceDay } from '../src/game/dayLoop.js';

const STRATEGIES = {
  rush: ['scheme-pastry', 'scheme-pastry', 'visit-diner'],
  savor: ['observe', 'rest', 'walk'],
  hostile: ['rest', 'rest', 'walk'],
};

function playArc(strategyName, actions, maxDays = 70) {
  const state = startDay(createInitialGameState());
  let day = 0;
  const done = (s) => ['crown-ready', 'crown', 'settling'].includes(s.arc.stage);
  while (day < maxDays && !done(state)) {
    for (const id of actions) {
      executeAction(state, id);
    }
    runEvening(state);
    runNightLedger(state);
    advanceDay(state);
    day++;
  }
  return {
    strategy: strategyName,
    days: day,
    stage: state.arc.stage,
    flipped: state.woman.flipped,
    lbs: state.woman.lbs,
    ratchet: state.woman.ratchetLog.length,
  };
}

const results = Object.entries(STRATEGIES).map(([name, acts]) => playArc(name, acts));
let failed = false;

for (const r of results) {
  const ok = ['crown-ready', 'crown', 'settling'].includes(r.stage);
  console.log(`${r.strategy}: ${r.days}d → ${r.stage} (flip=${r.flipped}, lbs=${r.lbs.toFixed(0)}, ratchet=${r.ratchet}) ${ok ? '✔' : '✖'}`);
  if (!ok) failed = true;
}

if (failed) {
  console.error('P3 gate FAILED — not all strategies reached crown-ready');
  process.exit(1);
}
console.log('✔ P3 three-playthrough gate passed');
