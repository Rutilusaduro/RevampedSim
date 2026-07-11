import { TUNING } from '../gameData/tuning.js';
import { rungFromLbs } from '../gameData/ladders.js';

export function appetiteCap(woman) {
  return woman.flipped ? TUNING.appetiteCapFlipped : TUNING.appetiteCapPreFlip;
}

export function capAppetite(woman) {
  const floor = appetiteFloor(woman);
  woman.appetite = Math.min(appetiteCap(woman), Math.max(floor, woman.appetite));
}

export function appetiteFloor(woman) {
  const rung = rungFromLbs(woman.frameLbs, woman.lbs).id;
  return 1.0 + rung * TUNING.appetiteFloorPerRung;
}

export function applyMeal(woman, mealSize, { passive = false } = {}) {
  const gainMod = passive ? 0.85 : 1;
  const lbsGained = mealSize * woman.appetite * TUNING.mealGainFactor * gainMod;
  woman.lbs += lbsGained;
  woman.fullness += (mealSize * TUNING.fullnessPerMeal) / woman.capacity;
  woman.fullness = Math.min(1.4, woman.fullness);
  if (woman.fullness >= TUNING.capacityGrowthThreshold && !woman._capacityGrewToday) {
    woman.capacity *= (1 + TUNING.capacityGrowthRate);
    woman._capacityGrewToday = true;
  }
  if (woman.psych.indulgence < 3 && mealSize >= 3 && woman.fullness >= 0.9) {
    woman.psych.indulgence += 1;
  }
  capAppetite(woman);
  return lbsGained;
}

/** Appetite growth at end of day when fullness ≥ 0.9 (REVAMP_PLAN §Phase 1). */
export function applyEndOfDayAppetite(woman, eveningMealServed) {
  if (woman.fullness >= 0.9 && eveningMealServed) {
    woman.appetite += TUNING.appetiteGrowthPerMeal * 2;
  }
  capAppetite(woman);
}

export function decayFullness(woman, slots = 1) {
  woman.fullness = Math.max(0, woman.fullness - TUNING.fullnessDecayPerSlot * slots);
}

export function decayAppetite(woman) {
  if (woman.fullness < 0.5) {
    woman.appetite = Math.max(appetiteFloor(woman), woman.appetite - TUNING.appetiteDecayPerDay);
  }
  capAppetite(woman);
}

export function mealCost(town, woman, mealSize) {
  return Math.round(town.economy.mealCostBase * mealSize * woman.appetite);
}

/** Evening meal: 1 pre-flip, 2–3 post-flip; skipped when the player didn't feed her pre-flip. */
export function eveningMealSize(woman, { hadPlayerMeal = false } = {}) {
  if (!woman.flipped && !hadPlayerMeal) return 0;
  if (!woman.flipped) return 1;
  const rung = rungFromLbs(woman.frameLbs, woman.lbs).id;
  return rung >= 6 ? 3 : 2;
}
