const MUSCLE_GROUP_CONFIG = {
  legs: [
    { id: 'quadriceps', label: 'Quadriceps', keywords: ['quadriceps', 'front thighs'] },
    { id: 'hamstrings', label: 'Hamstrings', keywords: ['hamstrings', 'back thighs'] },
    { id: 'glutes', label: 'Glutes', keywords: ['glutes', 'gluteus', 'buttocks'] },
    { id: 'calves', label: 'Calves', keywords: ['calves', 'gastrocnemius', 'soleus'] },
    { id: 'hip-abductors', label: 'Hip Abductors', keywords: ['abductors', 'outer thighs'] },
    { id: 'hip-adductors', label: 'Hip Adductors', keywords: ['adductors', 'inner thighs'] }
  ],
  chest: [
    { id: 'upper-chest', label: 'Upper Chest', keywords: ['upper chest', 'upper pectorals'] },
    { id: 'lower-chest', label: 'Lower Chest', keywords: ['lower chest', 'lower pectorals'] },
    { id: 'full-chest', label: 'Full Chest', keywords: ['chest', 'pectoralis', 'pectorals'] }
  ],
  back: [
    { id: 'lats', label: 'Lats', keywords: ['lats', 'latissimus'] },
    { id: 'middle-back', label: 'Middle Back', keywords: ['rhomboids', 'traps', 'trapezius'] },
    { id: 'lower-back', label: 'Lower Back', keywords: ['lower back', 'erector spinae'] }
  ],
  shoulders: [
    { id: 'front-delts', label: 'Front Delts', keywords: ['front deltoid', 'anterior deltoid'] },
    { id: 'side-delts', label: 'Side Delts', keywords: ['lateral deltoid', 'side deltoid'] },
    { id: 'rear-delts', label: 'Rear Delts', keywords: ['rear deltoid', 'posterior deltoid'] }
  ],
  arms: [
    { id: 'biceps', label: 'Biceps', keywords: ['biceps', 'brachialis'] },
    { id: 'triceps', label: 'Triceps', keywords: ['triceps'] },
    { id: 'forearms', label: 'Forearms', keywords: ['forearms', 'wrist'] }
  ],
  core: [
    { id: 'abs', label: 'Abs', keywords: ['rectus abdominis', 'abs'] },
    { id: 'obliques', label: 'Obliques', keywords: ['obliques', 'side abs'] },
    { id: 'lower-back', label: 'Lower Back', keywords: ['erector spinae', 'lower back'] }
  ],
  cardio: [] // No muscle groups for cardio
};

/**
 * Get available muscle group labels for a specific category
 * @param {string} category - The category (legs, chest, back, etc.)
 * @returns {string[]} Array of muscle group labels
 */
export function getMuscleGroupsForCategory(category) {
  const groups = MUSCLE_GROUP_CONFIG[category] || [];
  return groups.map(g => g.label);
}

/**
 * Check if a machine targets a specific muscle group
 * @param {Object} machine - Machine object with musclesWorked array
 * @param {string} muscleGroupLabel - The muscle group label to match
 * @param {string} category - The category (legs, chest, back, etc.)
 * @returns {boolean} True if machine matches the muscle group
 */
export function machineMatchesMuscleGroup(machine, muscleGroupLabel, category) {
  const config = MUSCLE_GROUP_CONFIG[category];
  if (!config) return false;

  const group = config.find(g => g.label === muscleGroupLabel);
  if (!group) return false;

  // Check if any of the machine's muscles match the group's keywords
  return machine.musclesWorked.some(muscle => {
    const lowerMuscle = muscle.toLowerCase();
    return group.keywords.some(keyword => lowerMuscle.includes(keyword));
  });
}
