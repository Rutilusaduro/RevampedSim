import { TUNING } from '../gameData/tuning.js';

export function computeWindowProbability(window, woman, { spurtActive = false } = {}) {
  const W = woman.lbs;
  const O = window.openLbs;
  const C = window.certainLbs;
  if (W < O) return { base: 0, p: 0, guaranteed: false };
  if (W >= C) return { base: 1, p: 1, guaranteed: true };
  const base = Math.pow((W - O) / (C - O), TUNING.windowRampExponent);
  const fullnessMod = woman.fullness >= TUNING.fullnessModThreshold ? TUNING.fullnessMod : 1.0;
  const spurtMod = spurtActive ? TUNING.spurtMod : 1.0;
  const wearMod = 1 + (window.wear ?? 0);
  const p = Math.min(1, base * fullnessMod * spurtMod * wearMod);
  return { base, p, guaranteed: false };
}

export function updateWindowStates(windows, woman) {
  for (const w of windows) {
    if (w.state === 'fired') continue;
    const W = woman.lbs;
    if (W >= w.certainLbs) w.state = 'imminent';
    else if (W >= w.openLbs) w.state = 'open';
    else if (W >= w.openLbs - TUNING.approachingLbs) w.state = 'approaching';
    else w.state = 'closed';
  }
}

export function windowStateWord(p, state) {
  if (state === 'fired') return 'gone';
  if (state === 'approaching') return 'waiting';
  if (p >= TUNING.imminentThreshold || state === 'imminent') return 'imminent';
  if (p >= 0.25) return 'creaking';
  if (p > 0) return 'restless';
  return 'quiet';
}

export function barFill(p) {
  return Math.round(Math.min(1, Math.max(0, p)) * 100);
}

export function rollWindow(window, woman, rng, opts = {}) {
  if (window.state === 'fired') return { fired: false, nearMiss: false };
  const { p, guaranteed } = computeWindowProbability(window, woman, opts);
  if (!guaranteed && p <= 0) return { fired: false, nearMiss: false, p };
  const roll = rng();
  if (guaranteed || roll < p) return { fired: true, nearMiss: false, p, roll };
  if (roll < p + (1 - p) * 0.5 || p / 2 > roll * 0.5) {
    return { fired: false, nearMiss: true, p, roll };
  }
  return { fired: false, nearMiss: false, p, roll };
}

export function deriveWindowThresholds(ratingLbs) {
  return {
    openLbs: Math.round(ratingLbs * TUNING.windowOpenFactor),
    certainLbs: Math.round(ratingLbs * TUNING.windowCertainFactor),
  };
}

export function getOpenWindows(windows, woman) {
  updateWindowStates(windows, woman);
  return windows
    .filter((w) => w.state !== 'fired' && w.state !== 'closed')
    .map((w) => {
      const { p } = computeWindowProbability(w, woman);
      return { ...w, p, stateWord: windowStateWord(p, w.state) };
    })
    .sort((a, b) => b.p - a.p);
}
