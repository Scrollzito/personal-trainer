import assert from 'node:assert/strict';
import { clearDraft, loadDraft, saveDraft } from '../src/utils/localStorage.js';

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

console.log('Draft storage valid.');
