/**
 * paceGate — REVAMP_PLAN Phase 0 pacing instrument.
 * Runs indulgent / mixed / passive strategies × seeds; reports per-day table.
 */
import { createInitialGameState } from '../src/game/state.js';
import {
  startDay, executeAction, runEvening, runNightLedger, advanceDay,
} from '../src/game/dayLoop.js';
import { currentArgStage } from '../src/game/argument.js';

const STRATEGIES = {
  indulgent: ['scheme-pastry', 'scheme-pastry', 'visit-diner'],
  mixed: ['scheme-pastry', 'work-shift', 'observe'],
  passive: ['observe', 'rest', 'walk'],
};

const SEEDS = [1, 2, 3];
const MAX_DAYS = 75;
const DONE = new Set(['crown-ready', 'crown', 'settling']);

function play(strategyName, actions, seed) {
  const state = startDay(createInitialGameState());
  state.rngSeed = (seed * 0x9e3779b9) >>> 0;
  const log = [];
  let day = 0;

  while (day < MAX_DAYS && !DONE.has(state.arc.stage)) {
    const startLbs = state.woman.lbs;
    const startFull = state.woman.fullness;
    let fires = 0;
    let nearMisses = 0;

    for (const id of actions) {
      const r = executeAction(state, id);
      fires += r.windowResults?.filter((w) => w.type === 'fire').length ?? 0;
      nearMisses += r.windowResults?.filter((w) => w.type === 'nearMiss').length ?? 0;
    }
    runEvening(state);
    runNightLedger(state);

    const gain = state.woman.lbs - startLbs;
    log.push({
      day: state.town.day,
      lbs: +state.woman.lbs.toFixed(1),
      gain: +gain.toFixed(2),
      appetite: +state.woman.appetite.toFixed(2),
      fullness: +state.woman.fullness.toFixed(2),
      fires,
      nearMisses,
      arg: currentArgStage(state.arc),
      flipped: state.woman.flipped,
      stage: state.arc.stage,
    });

    advanceDay(state);
    day++;
  }

  return {
    strategy: strategyName,
    seed,
    days: day,
    finalLbs: state.woman.lbs,
    stage: state.arc.stage,
    ratchet: state.woman.ratchetLog.length,
    flipped: state.woman.flipped,
    log,
  };
}

const results = [];
for (const [name, actions] of Object.entries(STRATEGIES)) {
  for (const seed of SEEDS) {
    results.push(play(name, actions, seed));
  }
}

console.log('\n=== paceGate summary ===');
for (const r of results) {
  const ok = DONE.has(r.stage);
  console.log(
    `${r.strategy}/s${r.seed}: ${r.days}d → ${r.stage} `
    + `(lbs=${r.finalLbs.toFixed(0)}, fires=${r.ratchet}, flip=${r.flipped}) ${ok ? '✔' : '·'}`,
  );
}

// Print indulgent seed-1 table as tuning instrument
const sample = results.find((r) => r.strategy === 'indulgent' && r.seed === 1);
if (sample) {
  console.log('\n--- indulgent / seed 1 (first 20 days) ---');
  console.log('day | lbs  | +lbs | appet | full | fires | arg');
  for (const row of sample.log.slice(0, 20)) {
    console.log(
      `${String(row.day).padStart(3)} | ${String(row.lbs).padStart(5)} | `
      + `${String(row.gain).padStart(4)} | ${String(row.appetite).padStart(5)} | `
      + `${String(row.fullness).padStart(4)} | ${row.fires}     | ${row.arg}`,
    );
  }
}

// Phase 1 assertions (report failures; strict mode via PACE_GATE_STRICT=1)
const indulgent = results.filter((r) => r.strategy === 'indulgent');
const passive = results.filter((r) => r.strategy === 'passive');
let failed = false;

for (const r of indulgent) {
  if (DONE.has(r.stage)) {
    if (r.days < 40 || r.days > 70) {
      console.warn(`WARN indulgent/s${r.seed}: crown day ${r.days} outside 40–70`);
      if (process.env.PACE_GATE_STRICT) failed = true;
    }
    if (r.finalLbs < 230 || r.finalLbs > 290) {
      console.warn(`WARN indulgent/s${r.seed}: final lbs ${r.finalLbs.toFixed(0)} outside 230–290`);
      if (process.env.PACE_GATE_STRICT) failed = true;
    }
    if (r.ratchet < 7) {
      console.warn(`WARN indulgent/s${r.seed}: only ${r.ratchet} fires (want ≥7)`);
      if (process.env.PACE_GATE_STRICT) failed = true;
    }
  }
}

for (const r of passive) {
  if (DONE.has(r.stage) && r.days < 70) {
    console.warn(`WARN passive/s${r.seed}: crowned too early (${r.days}d)`);
    if (process.env.PACE_GATE_STRICT) failed = true;
  }
}

if (failed) {
  console.error('paceGate FAILED (strict mode)');
  process.exit(1);
}
console.log('\n✔ paceGate complete');
