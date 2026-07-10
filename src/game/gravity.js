import { TUNING } from '../gameData/tuning.js';

export function tickGravity(woman, npcs, { sharedMeal = false } = {}) {
  const rung = woman.lbs - woman.frameLbs;
  if (rung < 110) return [];
  const beats = [];
  for (const npc of npcs) {
    let rate = npc.driftRate ?? 0.05;
    if (sharedMeal) rate *= 2;
    const gained = rate;
    npc.driftLbs = (npc.driftLbs ?? 0) + gained;
    const [t1, t2, t3] = npc.driftThresholds ?? [8, 20, 35];
    let tier = 0;
    if (npc.driftLbs >= t3) tier = 3;
    else if (npc.driftLbs >= t2) tier = 2;
    else if (npc.driftLbs >= t1) tier = 1;
    if (tier > (npc._lastDriftTier ?? 0)) {
      npc._lastDriftTier = tier;
      beats.push({ npcId: npc.id, tier, driftLbs: npc.driftLbs });
      if (tier === 2) { /* softening bump handled in day loop */ }
    }
  }
  return beats;
}

export function applySofteningFromDrift(town, tier) {
  if (tier === 2) town.softening = Math.min(100, town.softening + TUNING.softeningPerDriftT2);
  if (tier === 3) town.softening = Math.min(100, town.softening + TUNING.softeningPerDriftT3);
}
