import '../src/textEngine/settingPack.js';
import '../src/scenes/index.js';
import {
  _registryEntries, _moduleOpts, hasModule, createContext, createFacts,
  render, registerPool, stemsOf,
} from '../src/textEngine/engine.js';
import { pastTense, presentParticiple, thirdPerson, pluralize } from '../src/textEngine/morphology.js';
import {
  LINT_CHARACTERS, LINT_GRID, RENDERS_PER_CELL, SWEEPS,
  LADDER_COVERAGE, OPTIONAL_EMPTY_POOLS, PSYCH_KEYS,
  PSYCH_REGISTER_EXEMPT_PREFIXES, BANNED_PATTERNS, CONTINUITY_SWEEPS,
  MORPH_CASES, VERB_CORPUS,
} from './lintPack.js';

const errors = [], warnings = [];
const err = (m) => errors.push(m);
const warning = (m) => warnings.push(m);
const entries = _registryEntries();
const registeredKeys = new Set(entries.map(([k]) => k));
const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?(?:\|[^}]*)?\}/g;

function* stringTexts(variants) {
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const text of arr) if (typeof text === 'string') yield { variant: v, text };
  }
}

for (const [key, variants] of entries) {
  const isPool = _moduleOpts(key).select === 'pool';
  const label = `${isPool ? 'pool' : 'module'} "${key}"`;
  const wildcards = variants.filter((v) => !v.when || Object.keys(v.when).length === 0);
  if (!wildcards.length) (isPool ? err : warning)(`${label}: no { when: {} } fallback`);
  for (const { text } of stringTexts(variants)) {
    if (isPool && text.length > 200) err(`${label}: monolith ${text.length} chars`);
    SLOT_RE.lastIndex = 0;
    let m;
    while ((m = SLOT_RE.exec(text))) {
      const [, name, arg] = m;
      const refs = name === 'join' ? (arg || '').split(',').map((k) => k.trim()).filter(Boolean) : [name];
      for (const ref of refs) {
        if (!ref.startsWith('subject.') && !ref.startsWith('ref.') && !registeredKeys.has(ref)) {
          err(`${label}: unregistered "{${ref}}"`);
        }
      }
    }
  }
}

function coversRung(variant, dim, rung) {
  const w = variant.when || {};
  if (w[dim] != null) return Array.isArray(w[dim]) ? w[dim].includes(rung) : w[dim] === rung;
  const min = w[`${dim}Min`], max = w[`${dim}Max`];
  if (min == null && max == null) return false;
  return rung >= (min ?? -Infinity) && rung <= (max ?? Infinity);
}
for (const { prefixes, dimension, rungs } of LADDER_COVERAGE) {
  for (const [key, variants] of entries) {
    if (!prefixes.some((p) => key.startsWith(p))) continue;
    for (const rung of rungs) {
      if (!variants.some((v) => coversRung(v, dimension, rung))) {
        err(`coverage: ${key} missing ${dimension}=${rung}`);
      }
    }
  }
}

let cells = 0, rendersDone = 0;
for (const sweep of SWEEPS) {
  if (!hasModule(sweep.root)) { warning(`sweep ${sweep.name}: missing`); continue; }
  for (const base of LINT_CHARACTERS) {
    for (const rung of LINT_GRID.rung) {
      for (const flipped of LINT_GRID.flipped) {
        for (const globals of LINT_GRID.globals) {
          const subject = { ...base, flipped, lbs: base.frameLbs + [0, 55, 135][rung] ?? 55 };
          const ctx = createContext({ subject, week: 3, globals, skillEffects: { seatType: globals.seatType } });
          for (let i = 0; i < RENDERS_PER_CELL; i++) {
            ctx.facts = createFacts();
            const out = render(sweep.tpl, ctx);
            rendersDone++;
            if (!out?.trim()) err(`${sweep.name}: empty render`);
          }
          cells++;
        }
      }
    }
  }
}

registerPool('lint.factCheck.first', [
  { when: {}, asserts: { 'lint.posture': 'seated' }, text: ['She sits.', 'She settles.'] },
]);
registerPool('lint.factCheck.second', [
  { when: {}, asserts: { 'lint.posture': 'standing' }, text: ['LINT-CONTRADICTION'] },
  { when: {}, requires: { 'lint.posture': 'seated' }, text: ['Still seated.'] },
]);
for (let i = 0; i < 100; i++) {
  const out = render('{lint.factCheck.first} {lint.factCheck.second}', createContext({ subject: LINT_CHARACTERS[0], week: 2 }));
  if (out.includes('LINT-CONTRADICTION')) { err('contradiction guard failed'); break; }
}

const MORPH_FNS = { past: pastTense, ing: presentParticiple, s3: thirdPerson, plural: pluralize };
for (const [filter, input, want] of MORPH_CASES) {
  if (MORPH_FNS[filter](input) !== want) err(`morph ${filter}("${input}")`);
}

console.log(`textLint: ${entries.length} modules, ${cells} cells, ${rendersDone} renders`);
if (warnings.length) warnings.forEach((w) => console.log('⚠', w));
if (errors.length) {
  errors.forEach((e) => console.log('✖', e));
  process.exit(1);
}
console.log('✔ clean');
