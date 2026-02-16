import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import ExerciseEditorCard from './ExerciseEditorCard';
import './WorkoutPlanBuilder.css';

function WorkoutPlanBuilder() {
  const { currentPlan, reorderExercises } = useWorkoutBuilder();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    if (dragIndex !== dropIndex) {
      reorderExercises(dragIndex, dropIndex);
    }
  };

  if (currentPlan.exercises.length === 0) {
    return (
      <div className="workout-plan-builder workout-plan-builder--empty">
        <div className="workout-plan-builder__empty-state">
          <span className="workout-plan-builder__empty-icon">💪</span>
          <h3>No exercises yet</h3>
          <p>Add exercises from the left panel to build your workout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-plan-builder">
      <div className="workout-plan-builder__header">
        <h2>{currentPlan.name}</h2>
        <span className="workout-plan-builder__count">
          {currentPlan.exercises.length} exercise{currentPlan.exercises.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="workout-plan-builder__list">
        {currentPlan.exercises.map((exercise, index) => (
          <div
            key={`${exercise.machineId}-${index}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <ExerciseEditorCard exercise={exercise} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutPlanBuilder;
