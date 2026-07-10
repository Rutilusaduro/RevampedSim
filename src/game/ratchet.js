export function recordRatchet(woman, town, entry) {
  woman.ratchetLog.push(entry);
  town.scars.push({
    id: entry.windowId,
    day: entry.day,
    location: entry.location,
    line: entry.summary,
    objectId: entry.objectId,
  });
}

export function failObject(town, objectId, day, summary) {
  const obj = town.objects.find((o) => o.id === objectId);
  if (!obj) return null;
  obj.status = 'failed';
  obj.history.push({ day, summary });
  return obj;
}

export function replaceObject(town, objectId, newRatingLbs, summary) {
  const obj = town.objects.find((o) => o.id === objectId);
  if (!obj) return null;
  obj.status = 'replaced';
  obj.ratingLbs = newRatingLbs;
  obj.history.push({ day: town.day, summary });
  town.softening = Math.min(100, town.softening + 1);
  return obj;
}
