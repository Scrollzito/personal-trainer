import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import machineData from '../../data/machines.json';
import './ExerciseEditorCard.css';

function ExerciseEditorCard({ exercise, index }) {
  const { updateExercise, removeExercise } = useWorkoutBuilder();

  const machine = machineData.machines.find(m => m.id === exercise.machineId);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index);
  };

  return (
    <div
      className="exercise-editor-card"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="exercise-editor-card__drag-handle">⋮⋮</div>

      <img
        src={machine?.thumbnail}
        alt={machine?.name}
        className="exercise-editor-card__thumbnail"
      />

      <div className="exercise-editor-card__info">
        <h3 className="exercise-editor-card__name">{machine?.name}</h3>

        <div className="exercise-editor-card__inputs">
          <div className="exercise-editor-card__input-group">
            <label>Sets</label>
            <input
              type="number"
              min="1"
              max="10"
              value={exercise.sets}
              onChange={(e) => updateExercise(index, { sets: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="exercise-editor-card__input-group">
            <label>Reps</label>
            <input
              type="text"
              value={exercise.reps}
              onChange={(e) => updateExercise(index, { reps: e.target.value })}
              placeholder="10-12"
            />
          </div>

          <div className="exercise-editor-card__input-group">
            <label>Rest (sec)</label>
            <input
              type="number"
              min="0"
              max="300"
              step="15"
              value={exercise.restSeconds}
              onChange={(e) => updateExercise(index, { restSeconds: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <button
        className="exercise-editor-card__delete"
        onClick={() => removeExercise(index)}
        aria-label="Remove exercise"
      >
        🗑️
      </button>
    </div>
  );
}

export default ExerciseEditorCard;
