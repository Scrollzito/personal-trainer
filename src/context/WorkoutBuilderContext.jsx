import { createContext, useContext, useState } from 'react';
import { loadPlans, savePlans, generateId } from '../utils/localStorage';

const WorkoutBuilderContext = createContext();

export function WorkoutBuilderProvider({ children }) {
  const [currentPlan, setCurrentPlan] = useState({
    id: null,
    name: 'Untitled Workout',
    dateCreated: new Date().toISOString(),
    exercises: []
  });
  const [savedPlans, setSavedPlans] = useState(loadPlans);

  const addExercise = (machineId) => {
    setCurrentPlan(prev => ({
      ...prev,
      exercises: [...prev.exercises, {
        machineId,
        sets: 3,
        reps: '10-12',
        restSeconds: 60
      }]
    }));
  };

  const removeExercise = (index) => {
    setCurrentPlan(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const updateExercise = (index, updates) => {
    setCurrentPlan(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, ...updates } : ex
      )
    }));
  };

  const reorderExercises = (oldIndex, newIndex) => {
    setCurrentPlan(prev => {
      const newExercises = [...prev.exercises];
      const [moved] = newExercises.splice(oldIndex, 1);
      newExercises.splice(newIndex, 0, moved);
      return { ...prev, exercises: newExercises };
    });
  };

  const savePlan = () => {
    const planToSave = {
      ...currentPlan,
      name: (currentPlan.name.trim() || 'Untitled Workout').slice(0, 80),
      id: currentPlan.id || generateId(),
      dateCreated: currentPlan.id ? currentPlan.dateCreated : new Date().toISOString()
    };

    const updatedPlans = savedPlans.filter(p => p.id !== planToSave.id);
    updatedPlans.push(planToSave);

    savePlans(updatedPlans);
    setSavedPlans(updatedPlans);
    setCurrentPlan(planToSave);
    return planToSave;
  };

  const loadPlan = (id) => {
    const plan = savedPlans.find(p => p.id === id);
    if (plan) setCurrentPlan(plan);
  };

  const deletePlan = (id) => {
    const updatedPlans = savedPlans.filter(p => p.id !== id);
    savePlans(updatedPlans);
    setSavedPlans(updatedPlans);
  };

  const clearPlan = () => {
    setCurrentPlan({
      id: null,
      name: 'Untitled Workout',
      dateCreated: new Date().toISOString(),
      exercises: []
    });
  };

  return (
    <WorkoutBuilderContext.Provider value={{
      currentPlan,
      savedPlans,
      addExercise,
      removeExercise,
      updateExercise,
      reorderExercises,
      savePlan,
      loadPlan,
      deletePlan,
      clearPlan,
      setCurrentPlan
    }}>
      {children}
    </WorkoutBuilderContext.Provider>
  );
}

export const useWorkoutBuilder = () => useContext(WorkoutBuilderContext);
