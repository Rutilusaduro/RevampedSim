export function serializeGameState(state) {
  return JSON.parse(JSON.stringify({
    ...state,
    woman: {
      ...state.woman,
      weekUsed: [...(state.woman.weekUsed ?? [])],
    },
    ui: { ...state.ui, pendingChoice: null },
  }));
}

export function deserializeGameState(raw) {
  const state = { ...raw };
  state.woman.weekUsed = new Set(state.woman.weekUsed ?? []);
  state.anthology = state.anthology ?? [];
  return state;
}

export function saveToSlot(state, slot = 'autosave') {
  const payload = serializeGameState(state);
  localStorage.setItem(`gravity-save-${slot}`, JSON.stringify(payload));
}

export function loadFromSlot(slot = 'autosave') {
  const raw = localStorage.getItem(`gravity-save-${slot}`);
  if (!raw) return null;
  return deserializeGameState(JSON.parse(raw));
}
