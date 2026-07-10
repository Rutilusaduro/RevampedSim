import { createContext, createFacts, createSessionUsed, render } from './engine.js';

export function runEvent(beats, { subject, ref = null, week, globals = {}, weekUsed }) {
  const scopes = {
    facts: createFacts(),
    sessionUsed: createSessionUsed(),
    sceneStems: new Set(),
    weekUsed,
  };
  const ctxFor = () => createContext({ subject, ref, week, globals, ...scopes });
  const out = [];
  for (const beat of beats) {
    if (beat.choice) {
      const labels = beat.choice.map((opt) => ({
        ...opt,
        label: render(opt.labelTpl, createContext({ subject, ref, week, globals })),
      }));
      out.push({ choice: labels });
      continue;
    }
    out.push({ text: render(beat.tpl, ctxFor()) });
  }
  return out;
}
