import { createInitialGameState } from '../src/game/state.js';
import { startDay, executeAction, runEvening, runNightLedger, advanceDay } from '../src/game/dayLoop.js';

const state = startDay(createInitialGameState());
const log = [];

for (let day = 0; day < 45; day++) {
  const actions = ['scheme-pastry', 'work-shift', 'visit-diner'];
  for (const id of actions) {
    const r = executeAction(state, id);
    log.push({ day: state.town.day, action: id, lbs: state.woman.lbs, fires: r.windowResults?.filter((w) => w.type === 'fire').length ?? 0 });
  }
  runEvening(state);
  runNightLedger(state);
  advanceDay(state);
}

const fires = state.woman.ratchetLog.length;
const finalLbs = state.woman.lbs;
console.log(`headless: 45 days, ${fires} ratchet entries, final ${finalLbs.toFixed(1)} lbs, softening ${state.town.softening}`);
console.log(`arg stage: ${state.arc.argStage}, flipped: ${state.woman.flipped}`);
if (finalLbs < 170) {
  console.error('FAIL: insufficient weight gain');
  process.exit(1);
}
console.log('✔ headless run coherent');
