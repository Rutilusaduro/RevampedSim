/**
 * Humanize gate — grep player prose for machine-poetry patterns (skill 13).
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '../src/scenes');

const BANNED = [
  { pattern: /the town argues|town still argues|town updates its appetite/i, msg: 'town-as-person' },
  { pattern: /losing another argument|Halcyon hums/i, msg: 'abstract town-voice' },
  { pattern: /\bnegotiate/i, msg: 'object negotiate' },
  { pattern: /auditing herself|auditing/i, msg: 'auditing jargon' },
  { pattern: /like a coronation|like a vow|landmarks stay/i, msg: 'purple metaphor' },
  { pattern: /the windows do not/i, msg: 'engine window leak' },
  { pattern: /Evening settles/i, msg: 'evening settles' },
  { pattern: /geometry learned|new geometry/i, msg: 'geometry abstraction' },
  { pattern: /appetite older/i, msg: 'fragment poetry' },
  { pattern: /receives more of/i, msg: 'furniture receives' },
  { pattern: /losing another/i, msg: 'abstract town-voice' },
  { pattern: /the town pretends|the town does not/i, msg: 'town-as-person' },
  { pattern: /teaches her|doorframe teaches/i, msg: 'architecture teaches' },
  { pattern: /Something quiet dies/i, msg: 'vague interior poetry' },
  { pattern: /like a confessional/i, msg: 'confessional simile' },
  { pattern: /has opinions/i, msg: 'object opinions' },
  { pattern: /is not gentle/i, msg: 'display personification' },
  { pattern: /left herself/i, msg: 'left herself' },
  { pattern: /belongs to her appetite/i, msg: 'appetite ownership abstract' },
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith('.js')) files.push(p);
  }
  return files;
}

const errors = [];
for (const file of walk(ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.trim().startsWith('//')) return;
    for (const { pattern, msg } of BANNED) {
      if (pattern.test(line)) {
        errors.push(`${file.replace(import.meta.dirname + '/../', '')}:${i + 1} [${msg}] ${line.trim().slice(0, 80)}`);
      }
    }
  });
}

if (errors.length) {
  console.error(`humanize:lint — ${errors.length} hit(s):\n`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log('✔ humanize:lint clean');
