import { TUNING } from '../gameData/tuning.js';
import { rungFromLbs } from '../gameData/ladders.js';

export function applyMeal(woman, mealSize) {
  const lbsGained = mealSize * woman.appetite * TUNING.mealGainFactor;
  woman.lbs += lbsGained;
  woman.fullness += (mealSize * TUNING.fullnessPerMeal) / woman.capacity;
  if (woman.fullness >= TUNING.capacityGrowthThreshold) {
    woman.capacity *= (1 + TUNING.capacityGrowthRate);
  }
  if (woman.fullness >= 0.9) {
    woman.appetite += TUNING.appetiteGrowthPerMeal * mealSize;
    if (woman.psych.indulgence < 3) woman.psych.indulgence += mealSize >= 3 ? 1 : 0;
  }
  return lbsGained;
}

export function decayFullness(woman, slots = 1) {
  woman.fullness = Math.max(0, woman.fullness - TUNING.fullnessDecayPerSlot * slots);
}

export function decayAppetite(woman) {
  if (woman.fullness < 0.5) {
    const floor = 1.0 + (woman.psych.indulgence * 0.05);
    woman.appetite = Math.max(floor, woman.appetite - TUNING.appetiteDecayPerDay);
  }
}

export function mealCost(town, woman, mealSize) {
  return Math.round(town.economy.mealCostBase * mealSize * woman.appetite);
}

/** Evening meal scales with rung and day so passive play still climbs the ladder. */
export function eveningMealSize(woman, day = 1) {
  const rung = rungFromLbs(woman.frameLbs, woman.lbs).id;
  const base = woman.flipped ? 3 : 2;
  const rungBoost = Math.floor(rung / 2);
  const dayBoost = Math.floor(day / 12);
  return Math.min(10, base + rungBoost + dayBoost);
}
