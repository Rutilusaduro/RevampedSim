import {
  pastTense, presentParticiple, thirdPerson, pluralize,
  transformFirstWord, transformLastWord,
} from './morphology.js';

const DEV = (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
  || (typeof globalThis.process !== 'undefined' && globalThis.process?.env?.NODE_ENV !== 'production');
const warn = (...a) => { if (DEV) console.warn('[textEngine]', ...a); };

export const SESSION_REPEAT_WEIGHT = 0.12;
export const WEEK_REPEAT_WEIGHT = 0.4;
export const STEM_RENDER_REPEAT = 0.02;
export const STEM_SCENE_REPEAT = 0.3;

export function createSessionUsed() { return new Set(); }
export function createFacts() { return new Map(); }

export const STEM_STOPWORDS = new Set([
  'the', 'and', 'her', 'hers', 'she', 'his', 'him', 'with', 'that', 'this',
  'from', 'into', 'onto', 'over', 'under', 'then', 'than', 'when', 'what',
  'have', 'has', 'had', 'been', 'being', 'they', 'them', 'their', 'there',
  'here', 'where', 'which', 'while', 'about', 'again', 'against', 'between',
  'through', 'because', 'before', 'after', 'above', 'below', 'down', 'just',
  'more', 'most', 'much', 'some', 'such', 'very', 'your', 'yours', 'like',
  'does', 'doesn', 'still', 'every', 'each', 'both', 'around', 'without',
  'toward', 'towards', 'himself', 'herself', 'itself',
  'says', 'said', 'saying', 'look', 'take', 'know', 'make', 'want', 'really',
  'doesnt', 'dont', 'isnt', 'wasnt', 'cant', 'wont', 'didnt', 'youre',
  'shes', 'hes', 'thats', 'theres', 'weve', 'youve', 'hasnt', 'havent',
  'youll', 'someth', 'anyth', 'everyth', 'noth',
]);

export const STEM_FOLDS = {
  broke: 'break', broken: 'break', gave: 'give', given: 'give',
  took: 'take', taken: 'take', wore: 'wear', worn: 'wear',
  sank: 'sink', sunk: 'sink', fell: 'fall', fallen: 'fall',
  went: 'gone', grew: 'grow', grown: 'grow', held: 'hold',
  strode: 'stride', swept: 'sweep', crept: 'creep',
};

export function stemsOf(text) {
  if (typeof text !== 'string' || !text) return [];
  const stems = [];
  const cleaned = text.replace(/\{[^}]*\}/g, ' ').toLowerCase();
  for (const raw of cleaned.split(/[^a-z']+/)) {
    const w = raw.replace(/'/g, '');
    if (w.length < 4 || STEM_STOPWORDS.has(w)) continue;
    let s = w;
    for (const suf of ['ing', 'ed', 'es', 's']) {
      if (s.endsWith(suf) && s.length - suf.length >= 4) { s = s.slice(0, -suf.length); break; }
    }
    if (STEM_STOPWORDS.has(s)) continue;
    stems.push(STEM_FOLDS[s] ?? s);
  }
  return stems;
}

const STEM_TRACKED_PREFIXES = ['word.'];
export function trackStemsFor(prefix) {
  if (!STEM_TRACKED_PREFIXES.includes(prefix)) STEM_TRACKED_PREFIXES.push(prefix);
}
function isStemTracked(key) {
  return STEM_TRACKED_PREFIXES.some((p) => key.startsWith(p))
    || MODULE_OPTS.get(key)?.dedupe === 'stem';
}

function stemMultiplier(stems, ctx) {
  let m = 1;
  for (const s of stems) {
    if (ctx.renderStems?.has(s)) return STEM_RENDER_REPEAT;
    if (ctx.sceneStems?.has(s)) m = STEM_SCENE_REPEAT;
  }
  return m;
}
function recordStems(stems, ctx) {
  for (const s of stems) { ctx.renderStems?.add(s); ctx.sceneStems?.add(s); }
}

export function variantUsageKey(moduleKey, variantIndex, textIndex) {
  return `${moduleKey}#${variantIndex}:${textIndex}`;
}
function repeatMultiplier(usageKey, ctx) {
  if (!usageKey) return 1;
  let m = 1;
  if (ctx.sessionUsed?.has(usageKey)) m *= SESSION_REPEAT_WEIGHT;
  if (ctx.weekUsed?.has(usageKey)) m *= WEEK_REPEAT_WEIGHT;
  return m;
}
function recordVariantUsage(usageKey, ctx) {
  if (!usageKey) return;
  ctx.sessionUsed?.add(usageKey);
  ctx.weekUsed?.add(usageKey);
}

let RANDOM = Math.random;
export function setRandomSource(fn) {
  RANDOM = typeof fn === 'function' ? fn : Math.random;
}
export function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick(arr) { return arr[Math.floor(RANDOM() * arr.length)]; }
export function weightedPick(entries) {
  let total = 0;
  for (const e of entries) total += e.w;
  if (total <= 0) return entries.length ? entries[0].item : undefined;
  let roll = RANDOM() * total;
  for (const e of entries) { roll -= e.w; if (roll <= 0) return e.item; }
  return entries[entries.length - 1].item;
}

const DIMENSION_DERIVERS = new Map();
export function registerDimension(key, deriveFn) {
  if (DIMENSION_DERIVERS.has(key)) warn(`dimension "${key}" re-registered`);
  DIMENSION_DERIVERS.set(key, deriveFn);
}

let SUBJECT_DERIVER = null;
export function registerSubjectDeriver(fn) {
  if (SUBJECT_DERIVER) warn('subject deriver re-registered');
  SUBJECT_DERIVER = fn;
}
function deriveFor(subject, ref, skillEffects) {
  if (!subject) return {};
  if (!SUBJECT_DERIVER) {
    warn('no subject deriver registered — ctx.d is minimal');
    return { subjectId: subject.id ?? null };
  }
  return SUBJECT_DERIVER(subject, ref, skillEffects) || {};
}

const SEASONS = ['fall', 'winter', 'spring', 'summer'];
export function getSeason(week) {
  return SEASONS[Math.floor((Math.max(1, week || 1) - 1) / 4) % 4];
}

export function createContext(raw = {}) {
  const { subject = null, ref = null, group = null, week = 1,
          skillEffects = {}, globals = {} } = raw;
  const ctx = {
    subject, ref, group, week,
    season: raw.season || getSeason(week),
    skillEffects, globals,
    facts: raw.facts instanceof Map ? raw.facts : createFacts(),
    sessionUsed: raw.sessionUsed instanceof Set ? raw.sessionUsed : createSessionUsed(),
    weekUsed: raw.weekUsed instanceof Set ? raw.weekUsed : new Set(),
    renderStems: new Set(),
    sceneStems: raw.sceneStems instanceof Set ? raw.sceneStems : new Set(),
    d: deriveFor(subject, ref, skillEffects),
  };
  if (ctx.d.week == null) ctx.d.week = week;
  for (const [key, fn] of DIMENSION_DERIVERS) {
    try { ctx.d[key] = fn(ctx); } catch (e) { warn(`dimension "${key}" failed`, e); }
  }
  return ctx;
}

function retarget(ctx, who) {
  if (who === 'ref' && ctx.ref) {
    const d = deriveFor(ctx.ref, ctx.subject, ctx.skillEffects);
    if (d.week == null) d.week = ctx.week;
    return { ...ctx, subject: ctx.ref, ref: ctx.subject, d };
  }
  if (who === 'group' && ctx.group?.length) {
    const d = deriveFor(ctx.group[0], ctx.ref, ctx.skillEffects);
    if (d.week == null) d.week = ctx.week;
    return { ...ctx, subject: ctx.group[0], d };
  }
  return ctx;
}

const REGISTRY = new Map();
const MODULE_OPTS = new Map();

export function registerModule(key, variants, opts = {}) {
  if (key === 'join') { warn('"join" is reserved'); return; }
  if (REGISTRY.has(key)) warn(`module "${key}" re-registered`);
  REGISTRY.set(key, Array.isArray(variants) ? variants : [variants]);
  MODULE_OPTS.set(key, opts);
}
export function registerPool(key, variants, opts = {}) {
  registerModule(key, variants, { select: 'pool', ...opts });
}
export function registerModuleVariants(key, variants) {
  const extra = Array.isArray(variants) ? variants : [variants];
  REGISTRY.set(key, [...extra, ...(REGISTRY.get(key) || [])]);
}
export function hasModule(key) { return REGISTRY.has(key); }
export function _registryEntries() { return [...REGISTRY.entries()]; }
export function _moduleOpts(key) { return MODULE_OPTS.get(key) || {}; }

function evalWhen(when, ctx) {
  if (!when || Object.keys(when).length === 0) return { match: true, score: 0 };
  const d = ctx.d || {};
  let score = 0;
  const rangeSeen = new Set();
  for (const [k, v] of Object.entries(when)) {
    let ok;
    if (k === 'season') {
      ok = Array.isArray(v) ? v.includes(ctx.season) : ctx.season === v;
    } else if (k === 'skill') {
      ok = !!(ctx.skillEffects && ctx.skillEffects[v]);
    } else if (k.endsWith('Min') || k.endsWith('Max')) {
      const base = k.slice(0, -3);
      const actual = d[base] ?? ctx.globals?.[base];
      ok = actual != null && (k.endsWith('Min') ? actual >= v : actual <= v);
      if (!ok) return { match: false, score: 0 };
      if (!rangeSeen.has(base)) { rangeSeen.add(base); score += 1; }
      continue;
    } else {
      const actual = d[k] ?? ctx.globals?.[k];
      ok = Array.isArray(v) ? v.includes(actual)
        : typeof v === 'boolean' ? !!actual === v
        : actual === v;
    }
    if (!ok) return { match: false, score: 0 };
    score += 1;
  }
  return { match: true, score };
}

function factsEligible(ctx, variant) {
  const facts = ctx.facts;
  if (!facts) return true;
  const { requires, forbids, asserts } = variant;
  if (requires) {
    for (const [t, v] of Object.entries(requires)) {
      const cur = facts.get(t);
      if (!(Array.isArray(v) ? v.includes(cur) : cur === v)) return false;
    }
  }
  if (forbids) {
    if (Array.isArray(forbids)) {
      if (forbids.some((t) => facts.has(t))) return false;
    } else {
      for (const [t, v] of Object.entries(forbids)) {
        if (!facts.has(t)) continue;
        const cur = facts.get(t);
        if (Array.isArray(v) ? v.includes(cur) : cur === v) return false;
      }
    }
  }
  if (asserts) {
    for (const [t, v] of Object.entries(asserts)) {
      if (facts.has(t) && facts.get(t) !== v) return false;
    }
  }
  return true;
}
function applyAsserts(ctx, variant) {
  if (!ctx.facts || !variant.asserts) return;
  for (const [t, v] of Object.entries(variant.asserts)) ctx.facts.set(t, v);
}

function buildPickEntries(moduleKey, matches, poolBase, ctx, applyPenalty) {
  const entries = [];
  const stemTracked = isStemTracked(moduleKey);
  for (const m of matches) {
    const { variant, score, variantIndex } = m;
    const baseW = (variant.weight ?? 1) * Math.pow(poolBase, score);
    const push = (text, textIndex) => {
      const usageKey = variantUsageKey(moduleKey, variantIndex, textIndex);
      const stems = stemTracked ? (variant.tags ?? stemsOf(text)) : [];
      let w = baseW;
      if (applyPenalty) w *= repeatMultiplier(usageKey, ctx) * stemMultiplier(stems, ctx);
      if (w > 0) entries.push({ item: { variant, text, usageKey, stems }, w });
    };
    const t = variant.text;
    if (Array.isArray(t)) t.forEach(push); else push(t, 0);
  }
  return entries;
}
function pickFromEntries(entries, moduleKey, matches, poolBase, ctx) {
  if (!entries.length && matches.length) {
    entries = buildPickEntries(moduleKey, matches, poolBase, ctx, false);
  }
  if (!entries.length) return null;
  return weightedPick(entries);
}

function selectVariantRecord(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) { warn(`unknown module "${key}"`); return null; }
  const opts = MODULE_OPTS.get(key) || {};
  const base = opts.poolBase ?? 3;

  if (opts.select === 'pool') {
    const matches = [];
    let maxPriority = -Infinity;
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      const { match, score } = evalWhen(v.when, ctx);
      if (!match || !factsEligible(ctx, v)) continue;
      const priority = v.priority || 0;
      if (priority > maxPriority) maxPriority = priority;
      matches.push({ variant: v, score, priority, variantIndex: i });
    }
    const eligible = matches.filter((m) => m.priority === maxPriority);
    if (!eligible.length) return null;
    return pickFromEntries(buildPickEntries(key, eligible, base, ctx, true), key, eligible, base, ctx);
  }

  let best = [], bestScore = -1, bestPriority = -Infinity;
  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    const { match, score } = evalWhen(v.when, ctx);
    if (!match || !factsEligible(ctx, v)) continue;
    const priority = v.priority || 0;
    if (score > bestScore || (score === bestScore && priority > bestPriority)) {
      best = [{ variant: v, score, priority, variantIndex: i }];
      bestScore = score; bestPriority = priority;
    } else if (score === bestScore && priority === bestPriority) {
      best.push({ variant: v, score, priority, variantIndex: i });
    }
  }
  if (!best.length) return null;
  return pickFromEntries(buildPickEntries(key, best, base, ctx, true), key, best, base, ctx);
}

function selectVariant(key, ctx) {
  const picked = selectVariantRecord(key, ctx);
  if (!picked) return '';
  if (picked.usageKey) recordVariantUsage(picked.usageKey, ctx);
  applyAsserts(ctx, picked.variant);
  const t = picked.text;
  const out = typeof t === 'function' ? (t(ctx) ?? '') : (t ?? '');
  if (picked.stems?.length) recordStems(picked.stems, ctx);
  else if (typeof t === 'function' && isStemTracked(key)) recordStems(stemsOf(out), ctx);
  return out;
}

export function getEligibleVariants(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) return [];
  const poolBase = MODULE_OPTS.get(key)?.poolBase ?? 3;
  const results = [];
  for (const v of variants) {
    const { match, score } = evalWhen(v.when ?? {}, ctx);
    if (!match) continue;
    const weight = (v.weight ?? 1) * Math.pow(poolBase, score);
    const texts = Array.isArray(v.text) ? v.text
      : typeof v.text === 'function' ? ['[dynamic]']
      : [v.text];
    results.push({ when: v.when ?? {}, score, weight, texts });
  }
  const total = results.reduce((s, r) => s + r.weight, 0);
  return results
    .sort((a, b) => b.weight - a.weight)
    .map((r) => ({ ...r, probability: total > 0 ? Math.round((r.weight / total) * 100) : 0 }));
}

function applyFilters(text, filters) {
  let out = text;
  for (const f of filters) {
    if (f === 'cap') out = out ? out.charAt(0).toUpperCase() + out.slice(1) : out;
    else if (f === 'lower') out = out.toLowerCase();
    else if (f === 'a') out = out ? (/^[aeiou]/i.test(out) ? 'an ' : 'a ') + out : out;
    else if (f.startsWith('prefix:')) out = out ? f.slice(7) + out : out;
    else if (f.startsWith('suffix:')) out = out ? out + f.slice(7) : out;
    else if (f === 'past') out = out ? transformFirstWord(out, pastTense) : out;
    else if (f === 'ing') out = out ? transformFirstWord(out, presentParticiple) : out;
    else if (f === 's3') out = out ? transformFirstWord(out, thirdPerson) : out;
    else if (f === 'plural') out = out ? transformLastWord(out, pluralize) : out;
    else warn(`unknown filter "${f}"`);
  }
  return out;
}

const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?((?:\|[^}]*)?)\}/g;
const ESCAPE_TOKEN = '\uE000';
const MAX_DEPTH = 5;

function resolveSlot(name, slotCtx, depth, trace) {
  const raw = String(selectVariant(name, slotCtx));
  let leaf = true;
  SLOT_RE.lastIndex = 0;
  let m;
  while ((m = SLOT_RE.exec(raw))) {
    if (!m[1].startsWith('subject.')) { leaf = false; break; }
  }
  const out = resolveText(raw, slotCtx, depth + 1, trace);
  if (trace && out.trim()) trace.push({ key: name, text: out.trim(), leaf, depth });
  return out;
}

function resolveText(text, ctx, depth, trace) {
  if (depth >= MAX_DEPTH) {
    SLOT_RE.lastIndex = 0;
    if (SLOT_RE.test(text)) {
      warn('max depth; stripping slots');
      SLOT_RE.lastIndex = 0;
      text = text.replace(SLOT_RE, '');
    }
    return text;
  }
  SLOT_RE.lastIndex = 0;
  return text.replace(SLOT_RE, (_, name, arg, filterStr) => {
    const filters = filterStr ? filterStr.split('|').filter(Boolean) : [];
    if (name === 'join') {
      const parts = (arg || '').split(',').map((k) => k.trim()).filter(Boolean)
        .map((k) => resolveSlot(k, ctx, depth, trace).trim()).filter(Boolean);
      const out = parts.length <= 1 ? (parts[0] || '')
        : parts.length === 2 ? `${parts[0]} and ${parts[1]}`
        : `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;
      return applyFilters(out, filters);
    }
    let slotCtx = ctx;
    if (arg === 'ref' || arg === 'group') slotCtx = retarget(ctx, arg);
    else if (arg) slotCtx = { ...ctx, arg };
    return applyFilters(resolveSlot(name, slotCtx, depth, trace), filters);
  });
}

function smooth(text) {
  return text
    .replace(/ {2,}/g, ' ')
    .replace(/ ([.,!?;:])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/(^|[.!?] )([a-z])/g, (_, lead, ch) => lead + ch.toUpperCase())
    .trim();
}

export function render(template, ctx, opts = {}) {
  if (ctx) ctx.renderStems = new Set();
  let text = String(template).replace(/\{\{/g, ESCAPE_TOKEN);
  text = resolveText(text, ctx, 0, opts.trace || null);
  text = text.replace(new RegExp(ESCAPE_TOKEN, 'g'), '{');
  return opts.noSmooth ? text : smooth(text);
}
