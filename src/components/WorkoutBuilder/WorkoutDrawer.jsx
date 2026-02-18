import { useState } from 'react';
import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import machineData from '../../data/machines.json';
import ExportPDFButton from './ExportPDFButton';
import SavedPlansList from './SavedPlansList';
import './WorkoutDrawer.css';

export default function WorkoutDrawer() {
  const { currentPlan, removeExercise, savePlan, setCurrentPlan, updateExercise, reorderExercises, clearPlan } = useWorkoutBuilder();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSavedPlans, setShowSavedPlans] = useState(false);

  const getMachineName = (machineId) => {
    const machine = machineData.machines.find(m => m.id === machineId);
    return machine?.name || 'Unknown Machine';
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

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
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    if (dragIndex !== dropIndex && !isNaN(dragIndex)) {
      reorderExercises(dragIndex, dropIndex);
    }
  };

  const handleSavePlan = () => {
    savePlan();
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className={`workout-drawer ${isExpanded ? 'workout-drawer--expanded' : ''}`}>
      {/* Drawer Header */}
      <div className="workout-drawer__header" onClick={toggleExpand}>
        <div className="workout-drawer__title">
          📋 Current Workout
          <span className="workout-drawer__count">
            ({currentPlan.exercises.length})
          </span>
        </div>
        <button className="workout-drawer__toggle" onClick={(e) => { e.stopPropagation(); toggleExpand(); }}>
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>

      {/* Drawer Content (visible when expanded) */}
      {isExpanded && (
        <div className="workout-drawer__content">
          {/* Workout Name Input */}
          <div className="workout-drawer__name">
            {isEditingName ? (
              <input
                type="text"
                value={currentPlan.name}
                onChange={handleNameChange}
                onBlur={() => setIsEditingName(false)}
                autoFocus
                className="workout-drawer__name-input"
              />
            ) : (
              <h3 onClick={() => setIsEditingName(true)}>
                {currentPlan.name} ✏️
              </h3>
            )}
          </div>

          {/* Exercise List */}
          <div className="workout-drawer__exercises">
            {currentPlan.exercises.map((exercise, index) => (
              <div
                key={`${exercise.machineId}-${index}`}
                className="workout-drawer__exercise"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {/* Drag Handle */}
                <div className="workout-drawer__drag-handle">⋮⋮</div>

                {/* Machine Name */}
                <span className="workout-drawer__exercise-name">
                  {getMachineName(exercise.machineId)}
                </span>

                {/* Editable Inputs */}
                <div className="workout-drawer__inputs">
                  <div className="workout-drawer__input-group">
                    <label>Sets</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={exercise.sets}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateExercise(index, { sets: parseInt(e.target.value) || 1 });
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="workout-drawer__input-group">
                    <label>Reps</label>
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateExercise(index, { reps: e.target.value });
                      }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="10-12"
                    />
                  </div>

                  <div className="workout-drawer__input-group">
                    <label>Rest</label>
                    <input
                      type="number"
                      min="0"
                      max="300"
                      step="15"
                      value={exercise.restSeconds}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateExercise(index, { restSeconds: parseInt(e.target.value) || 0 });
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="workout-drawer__unit">s</span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="workout-drawer__exercise-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExercise(index);
                  }}
                  title="Remove exercise"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="workout-drawer__actions">
            <button
              className="workout-drawer__btn workout-drawer__btn--save"
              onClick={handleSavePlan}
              disabled={currentPlan.exercises.length === 0}
            >
              💾 Save Plan
            </button>
            <ExportPDFButton />
            <button
              className="workout-drawer__btn workout-drawer__btn--secondary"
              onClick={() => setShowSavedPlans(!showSavedPlans)}
            >
              📋 {showSavedPlans ? 'Hide' : 'View'} Saved Plans
            </button>
            <button
              className="workout-drawer__btn workout-drawer__btn--danger"
              onClick={() => {
                if (window.confirm('Clear current plan?')) clearPlan();
              }}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Save Success Message */}
          {showSaveSuccess && (
            <div className="workout-drawer__success-message">
              ✅ Workout plan saved successfully!
            </div>
          )}

          {/* Saved Plans List */}
          {showSavedPlans && (
            <div className="workout-drawer__saved-plans">
              <h3>Saved Workout Plans</h3>
              <SavedPlansList />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
