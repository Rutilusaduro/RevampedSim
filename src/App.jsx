import { useCallback, useMemo, useState } from 'react';
import { createInitialGameState } from './game/state.js';
import {
  startDay, executeAction, runEvening, runNightLedger, advanceDay, triggerCrown,
  getOpenWindows,
} from './game/dayLoop.js';
import { saveToSlot, loadFromSlot, serializeGameState, deserializeGameState } from './game/save.js';
import { rungFromLbs, rungDescriptor } from './gameData/ladders.js';
import { currentArgStage } from './game/argument.js';
import { barFill } from './game/windows.js';
import './styles.css';

function WindowsPanel({ state }) {
  const open = getOpenWindows(state.windows, state.woman);
  const approaching = state.windows.filter((w) => w.state === 'approaching');
  const crown = state.windows.find((w) => w.crown && w.state !== 'fired');

  return (
    <aside className="panel windows-panel">
      <h2>Windows</h2>
      <p className="panel-sub">What might give next</p>
      <ul className="window-list">
        {open.map((w) => (
          <li key={w.id} className={`window-row state-${w.stateWord} ${state.ui.lastNearMiss === w.id ? 'pulse' : ''}`}>
            <span className="window-label">{w.label}</span>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${barFill(w.p)}%` }} /></div>
            <span className="window-state">{w.stateWord}</span>
          </li>
        ))}
        {approaching.map((w) => (
          <li key={w.id} className="window-row ghost">
              <span className="window-label">{w.label}</span>
            <span className="window-state">approaching</span>
          </li>
        ))}
      </ul>
      {crown && crown.state !== 'fired' && (
        <div className={`crown-window ${crown.state !== 'closed' ? 'visible' : ''}`}>
          <span className="crown-tag">something is coming</span>
          <span>{crown.label}</span>
        </div>
      )}
    </aside>
  );
}

function HerCard({ woman, town }) {
  const rung = rungFromLbs(woman.frameLbs, woman.lbs);
  const fullnessPct = Math.min(100, Math.round((woman.fullness / 1.3) * 100));
  return (
    <aside className="panel her-card">
      <h2>{woman.name}</h2>
      <p className="rung-line">{rungDescriptor(rung.id)}</p>
      <p className="mood-line">{woman.flipped ? 'Serene, unstoppable' : `${woman.stance}, porous`}</p>
      <div className="gauge">
        <span>Fullness</span>
        <div className="bar-track warm"><div className="bar-fill" style={{ width: `${fullnessPct}%` }} /></div>
      </div>
      <p className="garment-line">
        {woman.wardrobe.bottom?.integrity > 0 ? 'The gray jeans are negotiating' : 'The gray jeans have surrendered'}
      </p>
      <p className="meta-line">Day weight: {woman.lbs.toFixed(1)} lbs (ritual only)</p>
      <p className="meta-line">Cash: ${town.economy.cash}</p>
    </aside>
  );
}

function OrbitStrip({ npcs, arc }) {
  return (
    <div className="orbit-strip">
      <span className="arg-stage">Argument: {currentArgStage(arc)}</span>
      {npcs.slice(0, 3).map((n) => (
        <span key={n.id} className="npc-chip">
          {n.name.split(' ')[0]} — {n.driftLbs > 0 ? 'drifting' : 'steady'}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [state, setState] = useState(() => {
    const loaded = loadFromSlot();
    const s = loaded ?? createInitialGameState();
    return startDay(s);
  });
  const [showDev, setShowDev] = useState(false);

  const actions = useMemo(() => state.ui.actionMenu ?? [], [state.ui.actionMenu]);

  const handleAction = useCallback((actionId) => {
    setState((prev) => {
      const next = deserializeGameState(serializeGameState(prev));
      executeAction(next, actionId);
      saveToSlot(next);
      return next;
    });
  }, []);

  const handleEvening = useCallback(() => {
    setState((prev) => {
      const next = deserializeGameState(serializeGameState(prev));
      runEvening(next);
      next.ui.phase = 'ledger';
      runNightLedger(next);
      saveToSlot(next);
      return next;
    });
  }, []);

  const handleNextDay = useCallback(() => {
    setState((prev) => {
      const next = deserializeGameState(serializeGameState(prev));
      advanceDay(next);
      saveToSlot(next);
      return next;
    });
  }, []);

  const handleCrown = useCallback(() => {
    setState((prev) => {
      const next = deserializeGameState(serializeGameState(prev));
      triggerCrown(next);
      saveToSlot(next);
      return next;
    });
  }, []);

  const handleNewGame = useCallback(() => {
    const s = startDay(createInitialGameState());
    saveToSlot(s);
    setState(s);
  }, []);

  return (
    <div className="app">
      <header className="top-strip">
        <span>Day {state.town.day}</span>
        <span>{state.arc.title}</span>
        <span className="softening">Halcyon · softening {state.town.softening}</span>
        <button type="button" className="link-btn" onClick={() => setShowDev((v) => !v)}>Dev</button>
      </header>
      <OrbitStrip npcs={state.npcs} arc={state.arc} />
      <main className="day-screen">
        <WindowsPanel state={state} />
        <section className="scene-column">
          <div className="scene-text">
            {state.ui.sceneText.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {state.ui.phase === 'morning' || state.ui.phase === 'evening-ready' ? (
            <nav className="action-menu">
              {state.ui.slotsUsed < 3 && actions.map((a) => (
                <button key={a.id} type="button" onClick={() => handleAction(a.id)}>{a.label}</button>
              ))}
              {state.ui.slotsUsed >= 3 && state.ui.phase !== 'ledger' && (
                <button type="button" className="primary" onClick={handleEvening}>Evening</button>
              )}
            </nav>
          ) : null}
          {state.ui.phase === 'ledger' && (
            <div className="ledger">
              <pre>{state.ui.ledgerText}</pre>
              {state.arc.stage === 'crown-ready' && (
                <button type="button" className="primary crown-btn" onClick={handleCrown}>Crown Event — The Booth</button>
              )}
              <button type="button" className="primary" onClick={handleNextDay}>Next day</button>
            </div>
          )}
          {state.arc.stage === 'settling' && (
            <div className="settling">
              <h3>Arc complete</h3>
              <p>Mara stays. Kayla and Priya are already heavier in her orbit. Who&apos;s next?</p>
              <button type="button" onClick={handleNewGame}>New game</button>
            </div>
          )}
        </section>
        <HerCard woman={state.woman} town={state.town} />
      </main>
      {showDev && (
        <footer className="dev-panel">
          <p>lbs: {state.woman.lbs.toFixed(2)} · flipped: {String(state.woman.flipped)} · stage: {state.arc.stage}</p>
          <p>resolve: {state.woman.resolve} · arg: {currentArgStage(state.arc)} ({state.arc.argPressure})</p>
          <button type="button" onClick={handleNewGame}>Reset save</button>
        </footer>
      )}
    </div>
  );
}
