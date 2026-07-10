import { useCallback, useState } from 'react';
import { createInitialGameState } from './game/state.js';
import {
  startDay, executeAction, executeVisit, runEvening, runNightLedger, advanceDay, triggerCrown,
  getOpenWindows, transitionToArc,
} from './game/dayLoop.js';
import { saveToSlot, loadFromSlot, serializeGameState, deserializeGameState } from './game/save.js';
import { rungFromLbs, rungDescriptor } from './gameData/ladders.js';
import { barFill } from './game/windows.js';
import { TownMap } from './components/TownMap.jsx';
import { RecordGallery } from './components/RecordGallery.jsx';
import { OrbitPanel } from './components/OrbitPanel.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { DevPanel } from './components/DevPanel.jsx';
import './styles.css';

const TABS = ['day', 'map', 'record', 'orbit'];

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

function garmentLine(woman) {
  const piece = woman.wardrobe.bottom ?? woman.wardrobe.top;
  const name = piece?.name ?? 'clothes';
  const intact = (piece?.integrity ?? 1) > 0;
  const verb = name.endsWith('s') ? 'are' : 'is';
  return intact ? `The ${name} ${verb} negotiating` : `The ${name} ${verb === 'are' ? 'have' : 'has'} surrendered`;
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
      <p className="garment-line">{garmentLine(woman)}</p>
      <p className="meta-line">Day weight: {woman.lbs.toFixed(1)} lbs (ritual only)</p>
      <p className="meta-line">Cash: ${town.economy.cash}</p>
    </aside>
  );
}

export default function App() {
  const [started, setStarted] = useState(() => !!loadFromSlot());
  const [pendingToggles, setPendingToggles] = useState({
    stuckContent: true,
    witnessedFailure: true,
    firstPersonArcs: true,
    influencedSeatGain: true,
    overdrive: false,
  });
  const [tab, setTab] = useState('day');
  const [state, setState] = useState(() => {
    const loaded = loadFromSlot();
    if (loaded) return startDay(loaded);
    return null;
  });
  const [showDev, setShowDev] = useState(false);
  const [devRoll, setDevRoll] = useState(null);

  const mutate = useCallback((fn) => {
    setState((prev) => {
      const next = deserializeGameState(serializeGameState(prev));
      fn(next);
      saveToSlot(next);
      return next;
    });
  }, []);

  const handleStart = useCallback(() => {
    const s = startDay(createInitialGameState(pendingToggles));
    saveToSlot(s);
    setState(s);
    setStarted(true);
    setTab('day');
  }, [pendingToggles]);

  const handleAction = useCallback((actionId) => {
    mutate((next) => {
      executeAction(next, actionId);
      setTab('day');
    });
  }, [mutate]);

  const handleVisit = useCallback((locationId) => {
    mutate((next) => {
      executeVisit(next, locationId);
      setTab('day');
    });
  }, [mutate]);

  const handleEvening = useCallback(() => {
    mutate((next) => {
      runEvening(next);
      next.ui.phase = 'ledger';
      runNightLedger(next);
    });
  }, [mutate]);

  const handleNextDay = useCallback(() => {
    mutate((next) => advanceDay(next));
  }, [mutate]);

  const handleCrown = useCallback(() => {
    mutate((next) => triggerCrown(next));
  }, [mutate]);

  const handleNextArc = useCallback((arcId) => {
    mutate((next) => transitionToArc(next, arcId));
    setTab('day');
  }, [mutate]);

  const handleNewGame = useCallback(() => {
    localStorage.removeItem('gravity-save-autosave');
    setState(null);
    setStarted(false);
    setDevRoll(null);
  }, []);

  if (!started || !state) {
    return (
      <StartScreen
        toggles={pendingToggles}
        onToggle={(k, v) => setPendingToggles((t) => ({ ...t, [k]: v }))}
        onStart={handleStart}
      />
    );
  }

  const actions = state.ui.actionMenu ?? [];

  return (
    <div className="app">
      <header className="top-strip">
        <span>Day {state.town.day}</span>
        <span>{state.arc.title}</span>
        <span className="softening">Halcyon · softening {state.town.softening}</span>
        <nav className="tab-nav">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={tab === t ? 'tab active' : 'tab'}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
        <button type="button" className="link-btn" onClick={() => setShowDev((v) => !v)}>Dev</button>
      </header>

      {tab === 'day' && (
        <main className="day-screen">
          <WindowsPanel state={state} />
          <section className="scene-column">
            <div className="scene-text">
              {state.ui.sceneText.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {(state.ui.phase === 'morning' || state.ui.phase === 'evening-ready') && state.arc.stage !== 'settling' && (
              <nav className="action-menu">
                {state.ui.slotsUsed < 3 && actions.map((a) => (
                  <button key={a.id} type="button" onClick={() => handleAction(a.id)}>{a.label}</button>
                ))}
                {state.ui.slotsUsed >= 3 && (
                  <button type="button" className="primary" onClick={handleEvening}>Evening</button>
                )}
              </nav>
            )}
            {state.ui.phase === 'ledger' && state.arc.stage !== 'settling' && (
              <div className="ledger">
                <pre>{state.ui.ledgerText}</pre>
                {state.arc.stage === 'crown-ready' && (
                  <button type="button" className="primary crown-btn" onClick={handleCrown}>
                    Crown Event
                  </button>
                )}
                <button type="button" className="primary" onClick={handleNextDay}>Next day</button>
              </div>
            )}
            {state.arc.stage === 'settling' && (
              <div className="settling">
                <h3>Arc complete — {state.woman.name}</h3>
                {state.ui.candidateLine && <p className="candidate-line">{state.ui.candidateLine}</p>}
                {state.ui.nextArcId && (
                  <button type="button" className="primary" onClick={() => handleNextArc(state.ui.nextArcId)}>
                    Begin {state.ui.nextArcId === 'priya' ? 'Priya' : state.ui.nextArcId === 'sofie' ? 'Sofie' : state.ui.nextArcId}&apos;s arc
                  </button>
                )}
                {!state.ui.nextArcId && state.arc.id !== 'sofie' && (
                  <p className="toggle-hint">First-person arcs are off — the anthology pauses after this arc.</p>
                )}
                {!state.ui.nextArcId && <p>The anthology rests at three arcs for this build.</p>}
                <button type="button" onClick={handleNewGame}>New game</button>
              </div>
            )}
          </section>
          <HerCard woman={state.woman} town={state.town} />
        </main>
      )}

      {tab === 'map' && (
        <main className="aux-screen">
          <TownMap
            town={state.town}
            slotsUsed={state.ui.slotsUsed}
            onVisit={handleVisit}
          />
          <p className="map-hint">Visits cost one day slot. {3 - state.ui.slotsUsed} remaining today.</p>
        </main>
      )}

      {tab === 'record' && (
        <main className="aux-screen">
          <RecordGallery woman={state.woman} town={state.town} anthology={state.anthology} />
        </main>
      )}

      {tab === 'orbit' && (
        <main className="aux-screen">
          <OrbitPanel npcs={state.npcs} arc={state.arc} argPressure={state.arc.argPressure} />
        </main>
      )}

      {showDev && (
        <DevPanel
          state={state}
          onReset={handleNewGame}
          onSeedRoll={(seed, text) => setDevRoll({ seed, text })}
        />
      )}
      {devRoll && (
        <div className="dev-roll panel">
          <p>Seed {devRoll.seed}</p>
          <p>{devRoll.text}</p>
        </div>
      )}
    </div>
  );
}
