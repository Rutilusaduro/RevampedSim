import '../textEngine/settingPack.js';
import { registerPool } from '../textEngine/engine.js';

// Seat menu labels (shell integration §3)
registerPool('seat.observe', [
  { when: {}, text: ['Watch her for a minute', 'Just look at her', 'Take her in'] },
]);
registerPool('seat.breakfastPastry', [
  { when: { seatType: 'enabler' }, weight: 4, text: ['Bring pastries — the good box', 'Show up with the pink box again'] },
  { when: {}, text: ['Breakfast together', 'Share something sweet'] },
]);
registerPool('seat.breakfastHearty', [
  { when: {}, text: ['Cook something real', 'A breakfast that counts'] },
]);
registerPool('seat.workShift', [
  { when: {}, text: ['Her shift at the Anchor', 'Work the lunch rush with her'] },
]);
registerPool('seat.errandMarket', [
  { when: {}, text: ['Groceries at Pine & 4th', 'Stock the kitchen together'] },
]);
registerPool('seat.visitDiner', [
  { when: {}, text: ['Meet her at the Anchor', 'The diner, her territory'] },
]);
registerPool('seat.walk', [
  { when: {}, text: ['Walk the Marina', 'Air and appetite'] },
]);
registerPool('seat.rest', [
  { when: {}, text: ['A quiet hour', 'Let the day settle'] },
]);
registerPool('seat.visit', [
  { when: {}, text: [(ctx) => `Visit ${ctx.globals?.locationName ?? 'town'}`] },
]);

import './arcs/mara/index.js';
import './arcs/priya/index.js';
import './arcs/sofie/index.js';
