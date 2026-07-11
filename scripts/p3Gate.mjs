/**
 * P3 gate — REVAMP_PLAN agency: indulgent crowns; passive does not.
 */
import { createInitialGameState } from '../src/game/state.js';
import { startDay, executeAction, runEvening, runNightLedger, advanceDay } from '../src/game/dayLoop.js';

const STRATEGIES = {
  rush: ['scheme-pastry', 'scheme-pastry', 'visit-diner'],
  savor: ['observe', 'rest', 'walk'],
  hostile: ['rest', 'rest', 'walk'],
};

const DONE = new Set(['crown-ready', 'crown', 'settling']);

function playArc(strategyName, actions, maxDays = 75) {
  const state = startDay(createInitialGameState());
  let day = 0;
  while (day < maxDays && !DONE.has(state.arc.stage)) {
    for (const id of actions) executeAction(state, id);
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
  const crowned = DONE.has(r.stage);
  console.log(
    `${r.strategy}: ${r.days}d → ${r.stage} `
    + `(flip=${r.flipped}, lbs=${r.lbs.toFixed(0)}, ratchet=${r.ratchet})`,
  );
  if (r.strategy === 'rush') {
    const ok = crowned && r.days >= 40 && r.days <= 70 && r.ratchet >= 5;
    console.log(ok ? '  ✔ indulgent crown band' : '  ✖ indulgent crown band');
    if (!ok) failed = true;
  } else {
    const ok = !crowned;
    console.log(ok ? '  ✔ passive did not crown' : '  ✖ passive crowned too early');
    if (!ok) failed = true;
  }
}

if (failed) {
  console.error('P3 gate FAILED');
  process.exit(1);
}
console.log('✔ P3 agency gate passed');
