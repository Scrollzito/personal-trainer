const STORAGE_KEY = 'gym-app-workout-plans';
const DRAFT_STORAGE_KEY = 'gym-app-current-workout-draft';

const isIntegerInRange = (value, min, max) =>
  Number.isInteger(value) && value >= min && value <= max;

const isValidExercise = (exercise) =>
  exercise !== null &&
  typeof exercise === 'object' &&
  typeof exercise.machineId === 'string' &&
  isIntegerInRange(exercise.sets, 1, 10) &&
  typeof exercise.reps === 'string' && exercise.reps.trim().length > 0 &&
  isIntegerInRange(exercise.restSeconds, 0, 300) &&
  (exercise.notes === undefined || typeof exercise.notes === 'string');

const isValidPlan = (plan, allowUnsaved = false) =>
  plan !== null &&
  typeof plan === 'object' &&
  (typeof plan.id === 'string' || (allowUnsaved && plan.id === null)) &&
  typeof plan.name === 'string' &&
  typeof plan.dateCreated === 'string' &&
  !Number.isNaN(Date.parse(plan.dateCreated)) &&
  Array.isArray(plan.exercises) &&
  plan.exercises.every(isValidExercise);

export const savePlans = (plans) => {
  if (!Array.isArray(plans) || !plans.every(isValidPlan)) {
    throw new Error('Workout plan contains invalid exercise values.');
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save plans to localStorage:', error);
    throw new Error('Could not update saved plans. Browser storage may be full or unavailable.');
  }
};

export const loadPlans = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const plans = JSON.parse(stored);
    if (!Array.isArray(plans)) {
      throw new Error('Saved workout data has an invalid format.');
    }

    const validPlans = plans.filter(isValidPlan);
    if (validPlans.length !== plans.length) {
      console.warn(`Ignored ${plans.length - validPlans.length} invalid saved workout plan(s).`);
    }
    return validPlans;
  } catch (error) {
    console.error('Failed to load plans from localStorage:', error);
    return [];
  }
};

export const saveDraft = (plan) => {
  if (!isValidPlan(plan, true)) return;

  try {
    if (plan.id === null && plan.name === 'Untitled Workout' && plan.exercises.length === 0) {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } else {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(plan));
    }
  } catch (error) {
    console.error('Failed to save workout draft to sessionStorage:', error);
  }
};

export const loadDraft = () => {
  try {
    const stored = sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!stored) return null;

    const draft = JSON.parse(stored);
    if (!isValidPlan(draft, true)) {
      console.warn('Ignored invalid current workout draft.');
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      return null;
    }
    return draft;
  } catch (error) {
    console.error('Failed to load workout draft from sessionStorage:', error);
    return null;
  }
};

export const clearDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear workout draft from sessionStorage:', error);
  }
};

export const generateId = () => {
  // Use crypto.randomUUID if available, fallback to timestamp
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
