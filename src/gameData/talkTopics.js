/** Dialogue picks for "Talk to her" — each costs one day slot. */

export const TALK_TOPICS = {
  mara: [
    { id: 'how-are-you', label: (n) => `Ask ${n} how she's doing` },
    { id: 'work', label: (n) => `Talk to ${n} about the diner` },
    { id: 'sister', label: () => 'Ask about her sister Elena' },
  ],
  priya: [
    { id: 'how-are-you', label: (n) => `Ask ${n} how she's doing` },
    { id: 'gym', label: (n) => `Talk to ${n} about the gym` },
    { id: 'dev', label: () => 'Ask about Dev and the business' },
  ],
  sofie: [
    { id: 'mother', label: () => 'Call your mom' },
    { id: 'coworker', label: () => 'Chat with someone at the library' },
    { id: 'feelings', label: () => 'Think about how you have been feeling' },
  ],
};

export function getTalkTopics(state) {
  const arc = state.arc.id;
  const first = state.woman.name.split(' ')[0];
  const topics = TALK_TOPICS[arc] ?? TALK_TOPICS.mara;
  return topics.map((t) => ({
    id: t.id,
    label: typeof t.label === 'function' ? t.label(first) : t.label,
  }));
}
