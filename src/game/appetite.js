import { TUNING } from '../gameData/tuning.js';

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
