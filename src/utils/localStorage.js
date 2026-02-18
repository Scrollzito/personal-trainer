const STORAGE_KEY = 'gym-app-workout-plans';

export const savePlans = (plans) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save plans to localStorage:', error);
    throw new Error('Storage quota exceeded. Please delete some saved plans.');
  }
};

export const loadPlans = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load plans from localStorage:', error);
    return [];
  }
};

export const generateId = () => {
  // Use crypto.randomUUID if available, fallback to timestamp
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
