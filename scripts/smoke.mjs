// GRAVITY mechanism smoke — pins engine behavior
import '../src/textEngine/settingPack.js';
import '../src/scenes/index.js';
import {
  createContext, createFacts, createSessionUsed, render, registerPool,
  stemsOf, getSeason, getEligibleVariants, setRandomSource, seededRandom,
} from '../src/textEngine/engine.js';
import assert from 'node:assert';

const mara = (over = {}) => ({
  id: 'mara', name: 'Mara Voss', pronouns: 'she', frameLbs: 145, lbs: 158,
  stance: 'reluctant', flipped: false, fullness: 0.4,
  psych: { indulgence: 0, display: 0, dependence: 0 },
  wardrobe: { top: { fitLbs: 180, integrity: 1 }, bottom: { fitLbs: 175, integrity: 1 } },
  ...over,
});
const ctxOf = (over = {}, raw = {}) => createContext({
  subject: mara(over), week: 3,
  skillEffects: { seatType: 'enabler' },
  ...raw,
});

registerPool('t.two', [{ when: {}, text: ['alpha', 'beta'] }]);
{
  const seen = new Set();
  for (let i = 0; i < 60; i++) seen.add(render('{t.two}', ctxOf()));
  assert(seen.has('Alpha') && seen.has('Beta'));
}

assert.equal(render('{t.missing}', ctxOf()), '');

registerPool('t.spec', [
  { when: {}, text: ['generic'] },
  { when: { flipped: true, rungMin: 4 }, text: ['specific'] },
]);
{
  let specific = 0;
  for (let i = 0; i < 400; i++) {
    if (render('{t.spec}', ctxOf({ flipped: true, lbs: 280 })) === 'Specific') specific++;
  }
  assert(specific > 300 && specific < 395, `specific ≈90% (got ${specific}/400)`);
}

{
  const low = new Set();
  const high = new Set();
  for (let i = 0; i < 40; i++) {
    low.add(render('{word.size}', ctxOf({ lbs: 150 })));
    high.add(render('{word.size}', ctxOf({ lbs: 320 })));
  }
  assert(low.size > 0 && high.size > 0);
  assert(![...low].join(' ').includes('monumental') || [...high].join(' ').includes('monumental'));
}

{
  for (let i = 0; i < 100; i++) {
    const out = render('{port.morning}', ctxOf());
    assert(out.length > 10, 'morning renders');
  }
}

{
  const runs = [];
  for (let r = 0; r < 2; r++) {
    setRandomSource(seededRandom(42));
    const outs = [];
    for (let i = 0; i < 5; i++) outs.push(render('{meal.beat}', ctxOf()));
    runs.push(outs.join('\n'));
  }
  setRandomSource(null);
  assert.equal(runs[0], runs[1]);
}

console.log('✔ smoke: GRAVITY engine checks passed');
