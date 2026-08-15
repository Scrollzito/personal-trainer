import assert from 'node:assert/strict';
import {
  clearDraft,
  clearWorkoutSession,
  createWorkoutSession,
  loadDraft,
  loadWorkoutSession,
  saveDraft,
  saveWorkoutSession
} from '../src/utils/localStorage.js';

const entries = new Map();
globalThis.sessionStorage = {
  getItem: (key) => entries.get(key) ?? null,
  setItem: (key, value) => entries.set(key, value),
  removeItem: (key) => entries.delete(key)
};

const draft = {
  id: null,
  name: 'Leg Day',
  dateCreated: '2026-08-15T00:00:00.000Z',
  exercises: [{
    machineId: 'leg-press',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
    notes: 'Keep knees aligned.'
  }]
};

saveDraft(draft);
assert.deepEqual(loadDraft(), draft);

clearDraft();
assert.equal(loadDraft(), null);

const session = createWorkoutSession(draft);
assert.ok(session);
assert.deepEqual(session.completedSets, [[false, false, false]]);

draft.exercises[0].notes = 'Changed after session creation.';
assert.equal(session.plan.exercises[0].notes, 'Keep knees aligned.');

assert.equal(saveWorkoutSession(session), true);
assert.deepEqual(loadWorkoutSession(), session);

const setItem = sessionStorage.setItem;
const logError = console.error;
console.error = () => {};
sessionStorage.setItem = () => { throw new Error('Storage unavailable'); };
assert.equal(saveWorkoutSession(session), false);
sessionStorage.setItem = setItem;
console.error = logError;

const sessionKey = [...entries.keys()].find((key) => key.includes('workout-session'));
entries.set(sessionKey, JSON.stringify({ ...session, completedSets: [[false]] }));
assert.equal(loadWorkoutSession(), null);
assert.equal(entries.has(sessionKey), false);

assert.equal(saveWorkoutSession(session), true);
assert.equal(clearWorkoutSession(), true);
assert.equal(loadWorkoutSession(), null);

console.log('Workout storage valid.');
