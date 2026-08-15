import { useState } from 'react';
import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import machineData from '../../data/machines.json';
import ExportPDFButton from './ExportPDFButton';
import SavedPlansList from './SavedPlansList';
import './WorkoutDrawer.css';

const clampInteger = (value, min, max, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : Math.min(max, Math.max(min, parsed));
};

export default function WorkoutDrawer() {
  const { currentPlan, removeExercise, savePlan, setCurrentPlan, updateExercise, reorderExercises, clearPlan } = useWorkoutBuilder();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const getMachineName = (machineId) => {
    const machine = machineData.machines.find(m => m.id === machineId);
    return machine?.name || 'Unknown Machine';
  };

  const handleNameChange = (e) => {
    setCurrentPlan({ ...currentPlan, name: e.target.value });
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number.parseInt(e.dataTransfer.getData('text/html'), 10);
    if (dragIndex !== dropIndex && !Number.isNaN(dragIndex)) {
      reorderExercises(dragIndex, dropIndex);
    }
  };

  const handleSavePlan = () => {
    try {
      const savedPlan = savePlan();
      setFeedback({ type: 'success', message: 'Workout plan saved successfully.', plan: savedPlan });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Could not save your workout plan.',
        plan: currentPlan
      });
    }
  };

  return (
    <div className={`workout-drawer ${isExpanded ? 'workout-drawer--expanded' : ''}`}>
      {/* Drawer Header */}
      <button
        type="button"
        className="workout-drawer__header"
        onClick={() => setIsExpanded(expanded => !expanded)}
        aria-expanded={isExpanded}
        aria-controls="workout-drawer-content"
      >
        <span className="workout-drawer__title">
          📋 Current Workout
          <span className="workout-drawer__count">
            ({currentPlan.exercises.length})
          </span>
        </span>
        <span className="workout-drawer__toggle" aria-hidden="true">
          {isExpanded ? '▼' : '▲'}
        </span>
      </button>

      {/* Drawer Content */}
      <div className="workout-drawer__content" id="workout-drawer-content" hidden={!isExpanded}>
          {/* Workout Name Input */}
          <div className="workout-drawer__name">
            <label htmlFor="workout-name">Workout name</label>
            <input
              id="workout-name"
              type="text"
              maxLength={80}
              value={currentPlan.name}
              onChange={handleNameChange}
              className="workout-drawer__name-input"
            />
          </div>

          {/* Exercise List */}
          <div className="workout-drawer__exercises">
            {currentPlan.exercises.length === 0 ? (
              <p className="workout-drawer__empty">Add an exercise or load a saved plan to get started.</p>
            ) : currentPlan.exercises.map((exercise, index) => {
              const machineName = getMachineName(exercise.machineId);
              const inputId = `workout-exercise-${index}`;
              const notes = typeof exercise.notes === 'string' ? exercise.notes : '';

              return (
                <div
                  key={exercise.machineId}
                  className="workout-drawer__exercise"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {/* Drag Handle */}
                  <div
                    className="workout-drawer__drag-handle"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    aria-hidden="true"
                  >
                    ⋮⋮
                  </div>

                  {/* Machine Name */}
                  <span className="workout-drawer__exercise-name">
                    {machineName}
                  </span>

                  {/* Editable Inputs */}
                  <div className="workout-drawer__inputs">
                    <div className="workout-drawer__input-group">
                      <label htmlFor={`${inputId}-sets`}>Sets</label>
                      <input
                        id={`${inputId}-sets`}
                        type="number"
                        min="1"
                        max="10"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, { sets: clampInteger(e.target.value, 1, 10, 1) })}
                      />
                    </div>

                    <div className="workout-drawer__input-group">
                      <label htmlFor={`${inputId}-reps`}>Reps</label>
                      <input
                        id={`${inputId}-reps`}
                        type="text"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, { reps: e.target.value })}
                        onBlur={() => {
                          if (!exercise.reps.trim()) updateExercise(index, { reps: '1' });
                        }}
                        placeholder="10-12"
                      />
                    </div>

                    <div className="workout-drawer__input-group">
                      <label htmlFor={`${inputId}-rest`}>Rest</label>
                      <input
                        id={`${inputId}-rest`}
                        type="number"
                        min="0"
                        max="300"
                        step="15"
                        value={exercise.restSeconds}
                        onChange={(e) => updateExercise(index, { restSeconds: clampInteger(e.target.value, 0, 300, 0) })}
                      />
                      <span className="workout-drawer__unit">s</span>
                    </div>
                  </div>

                  <div className="workout-drawer__order-actions" role="group" aria-label={`Reorder ${machineName}`}>
                    <button
                      type="button"
                      onClick={() => reorderExercises(index, index - 1)}
                      disabled={index === 0}
                      aria-label={`Move ${machineName} up`}
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => reorderExercises(index, index + 1)}
                      disabled={index === currentPlan.exercises.length - 1}
                      aria-label={`Move ${machineName} down`}
                      title="Move down"
                    >
                      ↓
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    className="workout-drawer__exercise-remove"
                    onClick={() => removeExercise(index)}
                    aria-label={`Remove ${machineName}`}
                    title="Remove exercise"
                  >
                    ×
                  </button>

                  <div className="workout-drawer__notes">
                    <label htmlFor={`${inputId}-notes`}>Notes for {machineName} (optional)</label>
                    <textarea
                      id={`${inputId}-notes`}
                      rows="2"
                      maxLength={500}
                      value={notes}
                      onChange={(e) => updateExercise(index, { notes: e.target.value })}
                      placeholder="Add a form cue or reminder"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="workout-drawer__actions">
            <button
              type="button"
              className="workout-drawer__btn workout-drawer__btn--save"
              onClick={handleSavePlan}
              disabled={currentPlan.exercises.length === 0}
            >
              💾 Save Plan
            </button>
            <ExportPDFButton />
            <button
              type="button"
              className="workout-drawer__btn workout-drawer__btn--secondary"
              onClick={() => setShowSavedPlans(visible => !visible)}
              aria-expanded={showSavedPlans}
              aria-controls="saved-workout-plans"
            >
              📋 {showSavedPlans ? 'Hide' : 'View'} Saved Plans
            </button>
            <button
              type="button"
              className="workout-drawer__btn workout-drawer__btn--danger"
              onClick={() => {
                if (window.confirm('Clear current plan?')) clearPlan();
              }}
            >
              🗑️ Clear
            </button>
          </div>

          <p className="workout-drawer__privacy">Saved plans stay on this device.</p>

          {/* Save Status */}
          {feedback?.plan === currentPlan && (
            <div
              className={`workout-drawer__feedback workout-drawer__feedback--${feedback.type}`}
              role={feedback.type === 'error' ? 'alert' : 'status'}
            >
              {feedback.message}
            </div>
          )}

        {/* Saved Plans List */}
        <div className="workout-drawer__saved-plans" id="saved-workout-plans" hidden={!showSavedPlans}>
          <h3>Saved Workout Plans</h3>
          <SavedPlansList />
        </div>
      </div>
    </div>
  );
}
