import { useState } from 'react';
import { dayPrompt } from '../gameData/actionLabels.js';
import { getTalkTopics } from '../gameData/talkTopics.js';

export function ActionMenu({ state, onAction, onTalk, onLook, onWeigh, onEvening }) {
  const [view, setView] = useState('main');
  const actions = state.ui.actionMenu ?? [];
  const food = actions.filter((a) => a.category === 'food');
  const hangout = actions.filter((a) => a.category === 'hangout');
  const interact = actions.filter((a) => a.category === 'interact');
  const talkTopics = getTalkTopics(state);
  const first = state.woman.name.split(' ')[0];
  const inhabit = state.player.seatType === 'inhabit';
  const slotsLeft = 3 - state.ui.slotsUsed;
  const canAct = slotsLeft > 0;

  if (state.ui.slotsUsed >= 3) {
    return (
      <nav className="action-menu">
        <button type="button" className="primary" onClick={onEvening}>Call it a night</button>
      </nav>
    );
  }

  if (view === 'talk') {
    return (
      <nav className="action-menu submenu">
        <p className="menu-prompt">What do you want to talk about?</p>
        {talkTopics.map((t) => (
          <button key={t.id} type="button" onClick={() => { onTalk(t.id); setView('main'); }}>
            {t.label}
          </button>
        ))}
        <button type="button" className="back-btn" onClick={() => setView('main')}>← Back</button>
      </nav>
    );
  }

  if (view === 'food') {
    return (
      <nav className="action-menu submenu">
        <p className="menu-prompt">{inhabit ? 'What do you want to eat?' : `What do you want to get for ${first}?`}</p>
        {food.map((a) => (
          <button key={a.id} type="button" onClick={() => { onAction(a.id); setView('main'); }}>
            {a.label}
          </button>
        ))}
        <button type="button" className="back-btn" onClick={() => setView('main')}>← Back</button>
      </nav>
    );
  }

  if (view === 'interact') {
    return (
      <nav className="action-menu submenu">
        <p className="menu-prompt">{inhabit ? 'What do you want to do?' : `Something more with ${first}?`}</p>
        {interact.map((a) => (
          <button key={a.id} type="button" onClick={() => { onAction(a.id); setView('main'); }}>
            {a.label}
          </button>
        ))}
        <button type="button" className="back-btn" onClick={() => setView('main')}>← Back</button>
      </nav>
    );
  }

  if (view === 'hangout') {
    return (
      <nav className="action-menu submenu">
        <p className="menu-prompt">{inhabit ? 'Where do you want to go?' : `What do you want to do with ${first}?`}</p>
        {hangout.map((a) => (
          <button key={a.id} type="button" onClick={() => { onAction(a.id); setView('main'); }}>
            {a.label}
          </button>
        ))}
        <button type="button" className="back-btn" onClick={() => setView('main')}>← Back</button>
      </nav>
    );
  }

  return (
    <nav className="action-menu">
      <p className="menu-prompt">{dayPrompt(state)}</p>
      <div className="menu-group">
        <button type="button" className="menu-primary" disabled={!canAct} onClick={() => setView('talk')}>
          {inhabit ? 'Talk to someone' : `Talk to ${first}`}
        </button>
        <button type="button" className="menu-free" onClick={onLook}>
          {inhabit ? 'Look at yourself' : `Look at ${first}`}
          <span className="free-tag">free</span>
        </button>
        <button type="button" className="menu-free" onClick={onWeigh}>
          {inhabit ? 'Weigh yourself' : `Weigh ${first}`}
          <span className="free-tag">free</span>
        </button>
      </div>
      <div className="menu-group">
        <button type="button" disabled={!canAct || food.length === 0} onClick={() => setView('food')}>
          {inhabit ? 'Get something to eat' : `Feed ${first}`}
        </button>
        {interact.length > 0 && (
          <button type="button" disabled={!canAct} onClick={() => setView('interact')}>
            {inhabit ? 'Do something indulgent' : `Get close with ${first}`}
          </button>
        )}
        <button type="button" disabled={!canAct || hangout.length === 0} onClick={() => setView('hangout')}>
          {inhabit ? 'Go out' : `Hang out with ${first}`}
        </button>
      </div>
      <p className="slots-hint">{slotsLeft} {slotsLeft === 1 ? 'action' : 'actions'} left today</p>
    </nav>
  );
}
