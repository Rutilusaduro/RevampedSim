import { useCallback, useState } from 'react';
import { createInitialGameState } from './game/state.js';
import {
  startDay, executeAction, executeVisit, runEvening, runNightLedger, advanceDay, triggerCrown,
  transitionToArc, executeLook, executeTalk,
} from './game/dayLoop.js';
import { saveToSlot, loadFromSlot, serializeGameState, deserializeGameState } from './game/save.js';
import { rungFromLbs, rungDescriptor } from './gameData/ladders.js';
import {
  moodLine, moodLineInhabit, garmentLinePlain, garmentLinePlainInhabit,
} from './gameData/actionLabels.js';
import { TownMap } from './components/TownMap.jsx';
import { RecordGallery } from './components/RecordGallery.jsx';
import { OrbitPanel } from './components/OrbitPanel.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { DevPanel } from './components/DevPanel.jsx';
import { ActionMenu } from './components/ActionMenu.jsx';
import './styles.css';

const TABS = ['day', 'map', 'record', 'orbit'];

function HerCard({ woman, town, inhabit }) {
  const rung = rungFromLbs(woman.frameLbs, woman.lbs);
  const fullnessPct = Math.min(100, Math.round((woman.fullness / 1.3) * 100));
  const mood = inhabit ? moodLineInhabit(woman) : moodLine(woman);
  const garment = inhabit ? garmentLinePlainInhabit(woman) : garmentLinePlain(woman);

  return (
    <aside className="panel her-card">
      <h2>{inhabit ? 'You' : woman.name}</h2>
      <p className="rung-line">{inhabit ? `You look ${rungDescriptor(rung.id)}` : `She looks ${rungDescriptor(rung.id)}`}</p>
      <p className="mood-line">{mood}</p>
      <div className="gauge">
        <span>{inhabit ? 'How full you feel' : 'How full she is'}</span>
        <div className="bar-track warm"><div className="bar-fill" style={{ width: `${fullnessPct}%` }} /></div>
      </div>
      <p className="garment-line">{garment}</p>
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

  const handleTalk = useCallback((topicId) => {
    mutate((next) => executeTalk(next, topicId));
  }, [mutate]);

  const handleLook = useCallback(() => {
    mutate((next) => executeLook(next));
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

  const inhabit = state.player.seatType === 'inhabit';

  return (
    <div className="app">
      <header className="top-strip">
        <span>Day {state.town.day}</span>
        <span>{state.arc.title}</span>
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
          <section className="scene-column">
            <div className="scene-text">
              {state.ui.sceneText.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {(state.ui.phase === 'morning' || state.ui.phase === 'evening-ready') && state.arc.stage !== 'settling' && (
              <ActionMenu
                state={state}
                onAction={handleAction}
                onTalk={handleTalk}
                onLook={handleLook}
                onEvening={handleEvening}
              />
            )}
            {state.ui.phase === 'ledger' && state.arc.stage !== 'settling' && (
              <div className="ledger">
                <pre>{state.ui.ledgerText}</pre>
                {state.arc.stage === 'crown-ready' && (
                  <button type="button" className="primary crown-btn" onClick={handleCrown}>
                    Go to the big event
                  </button>
                )}
                <button type="button" className="primary" onClick={handleNextDay}>Start the next day</button>
              </div>
            )}
            {state.arc.stage === 'settling' && (
              <div className="settling">
                <h3>Arc complete — {state.woman.name}</h3>
                {state.ui.candidateLine && <p className="candidate-line">{state.ui.candidateLine}</p>}
                {state.ui.nextArcId && (
                  <button type="button" className="primary" onClick={() => handleNextArc(state.ui.nextArcId)}>
                    Begin {state.ui.nextArcId === 'priya' ? 'Priya' : state.ui.nextArcId === 'sofie' ? 'Sofie' : state.ui.nextArcId}&apos;s story
                  </button>
                )}
                {!state.ui.nextArcId && state.arc.id !== 'sofie' && (
                  <p className="toggle-hint">First-person arcs are off — the story pauses here.</p>
                )}
                {!state.ui.nextArcId && <p>End of the anthology for now.</p>}
                <button type="button" onClick={handleNewGame}>New game</button>
              </div>
            )}
          </section>
          <HerCard woman={state.woman} town={state.town} inhabit={inhabit} />
        </main>
      )}

      {tab === 'map' && (
        <main className="aux-screen">
          <TownMap
            town={state.town}
            slotsUsed={state.ui.slotsUsed}
            onVisit={handleVisit}
          />
          <p className="map-hint">Visits use up one of your three actions for the day. {3 - state.ui.slotsUsed} left.</p>
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
