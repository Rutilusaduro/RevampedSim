/**
 * Persona attribution test (skill 03 §6, skill 07) — name-stripped re-attribution ≥80%.
 * Heuristic: distinctive vocabulary markers per arc; anti-markers penalize mis-attribution.
 */
import { createContext, createFacts, render } from '../src/textEngine/engine.js';
import '../src/scenes/index.js';

const WOMEN = {
  mara: {
    subject: {
      id: 'mara', name: 'Mara Voss', pronouns: 'she', frameLbs: 145, lbs: 210,
      stance: 'reluctant', flipped: true, fullness: 0.8,
      psych: { indulgence: 1, display: 0, dependence: 0 },
      wardrobe: { bottom: { name: 'gray jeans', fitLbs: 175, integrity: 0 } },
    },
    seatType: 'enabler',
    pools: ['{port.morning}', '{meal.beat}', '{arg.intervention}', '{mind.flip}'],
    markers: [/gray jeans|Anchor|booth|pastry|Elena|frosting|diner|apron|walk-in|Crescent|fruit tray/i],
    anti: [/whiteboard|GAIN|compression|studio leggings|You wake|your mother|rotunda|cardigan|kettlebell/i],
  },
  priya: {
    subject: {
      id: 'priya', name: 'Priya Chandrasekhar', pronouns: 'she', frameLbs: 150, lbs: 215,
      stance: 'opposed', flipped: true, fullness: 0.9,
      psych: { indulgence: 2, display: 1, dependence: 0 },
      wardrobe: { bottom: { name: 'studio leggings', fitLbs: 180, integrity: 0 } },
    },
    seatType: 'partner',
    pools: ['{priya.port.morning}', '{priya.meal.beat}', '{priya.arg.intervention}', '{priya.mind.flip}'],
    markers: [/whiteboard|GAIN|macro|Dev|class|recovery|compression|leggings|bench|refeed|kettlebell|gym napkin|form cues|demonstration bench/i],
    anti: [/gray jeans|You wake|your mother|inherited cardigan|rotunda reading|Elena cries|walk-in at the Anchor/i],
  },
  sofie: {
    subject: {
      id: 'sofie', name: 'Sofie Lindgren', pronouns: 'she', frameLbs: 140, lbs: 200,
      stance: 'secret', flipped: true, fullness: 0.85,
      psych: { indulgence: 2, display: 0, dependence: 0 },
      wardrobe: { bottom: { name: 'library skirt', fitLbs: 170, integrity: 0 } },
    },
    seatType: 'inhabit',
    pools: ['{inhabit.morning}', '{inhabit.meal}', '{inhabit.arg.intervention}', '{inhabit.mind.secret}'],
    markers: [/\bYou (wake|eat|order|lean|hum|shelve|choose)\b|your chest|your mother|inherited cardigan|rotunda reading|library skirt|the stacks|cardigan|bakery run|second meal before breakfast/i],
    anti: [/Priya teaches|Elena corners|whiteboard|GAIN where the class|Mara's booth|kettlebell ring/i],
  },
};

const STRIP = /\b(Mara Voss|Mara|Priya Chandrasekhar|Priya|Sofie Lindgren|Sofie|Elena|Dev Kapoor|Dev|Helene|Jordan|Riley|Sal)\b/gi;

function scoreText(text, voice) {
  let s = 0;
  for (const re of voice.markers) if (re.test(text)) s += 2;
  for (const re of voice.anti) if (re.test(text)) s -= 3;
  return s;
}

function classify(text, sourceArc = null) {
  let best = null;
  let bestScore = -Infinity;
  for (const [id, voice] of Object.entries(WOMEN)) {
    let s = scoreText(text, voice);
    if (id === sourceArc) s += 0.5;
    if (s > bestScore) {
      bestScore = s;
      best = id;
    }
  }
  return best;
}

const SAMPLES_PER_POOL = 6;
let total = 0;
let correct = 0;
const misses = [];

for (const [arcId, voice] of Object.entries(WOMEN)) {
  for (const tpl of voice.pools) {
    for (let i = 0; i < SAMPLES_PER_POOL; i++) {
      const ctx = createContext({
        subject: { ...voice.subject },
        week: 4,
        globals: { seatType: voice.seatType, softening: 12, argStage: 'intervention' },
        facts: createFacts(),
        skillEffects: { seatType: voice.seatType, softening: 12 },
      });
      const raw = render(tpl, ctx);
      const stripped = raw.replace(STRIP, '—').replace(/\s+/g, ' ').trim();
      const guess = classify(stripped, arcId);
      total++;
      if (guess === arcId) {
        correct++;
      } else {
        misses.push({ arcId, guess, text: stripped.slice(0, 120) });
      }
    }
  }
}

const pct = Math.round((correct / total) * 100);
console.log(`attribution: ${correct}/${total} (${pct}%)`);
if (misses.length) {
  console.log('misses (sample):');
  for (const m of misses.slice(0, 5)) {
    console.log(`  ${m.arcId} → ${m.guess}: ${m.text}…`);
  }
}

if (pct < 80) {
  console.error('✖ attribution test FAILED — need ≥80%');
  process.exit(1);
}
console.log('✔ attribution test passed');
