import { getOpenWindows, seededRandom, setRandomSource } from '../game/dayLoop.js';
import { createContext, render } from '../textEngine/engine.js';

export function DevPanel({ state, onReset, onSeedRoll }) {
  const open = getOpenWindows(state.windows, state.woman);

  const rollMorning = () => {
    const seed = (Date.now() & 0xffffffff) >>> 0;
    setRandomSource(seededRandom(seed));
    const text = render('{port.morning}', createContext({
      subject: state.woman,
      week: Math.ceil(state.town.day / 7),
      skillEffects: { seatType: state.player.seatType },
    }));
    setRandomSource(null);
    onSeedRoll(seed, text);
  };

  return (
    <footer className="dev-panel">
      <p>lbs: {state.woman.lbs.toFixed(2)} · flipped: {String(state.woman.flipped)} · stage: {state.arc.stage}</p>
      <p>resolve: {state.woman.resolve} · arg: {state.arc.argStage} ({state.arc.argPressure})</p>
      <p>Windows: {open.map((w) => `${w.label} ${w.stateWord}`).join(' · ')}</p>
      <div className="dev-actions">
        <button type="button" onClick={rollMorning}>Roll morning (seeded)</button>
        <button type="button" onClick={onReset}>Reset save</button>
      </div>
    </footer>
  );
}
