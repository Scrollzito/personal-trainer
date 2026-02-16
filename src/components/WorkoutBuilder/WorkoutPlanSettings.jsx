import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import ExportPDFButton from './ExportPDFButton';
import SavedPlansList from './SavedPlansList';
import './WorkoutPlanSettings.css';

function WorkoutPlanSettings() {
  const { currentPlan, setCurrentPlan, savePlan, clearPlan } = useWorkoutBuilder();

  return (
    <div className="workout-plan-settings">
      <div className="workout-plan-settings__section">
        <h3>Workout Details</h3>

        <div className="workout-plan-settings__input-group">
          <label>Plan Name</label>
          <input
            type="text"
            value={currentPlan.name}
            onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
            placeholder="My Workout"
          />
        </div>

        <div className="workout-plan-settings__actions">
          <button
            className="workout-plan-settings__btn workout-plan-settings__btn--primary"
            onClick={savePlan}
            disabled={currentPlan.exercises.length === 0}
          >
            💾 Save Plan
          </button>

          <ExportPDFButton />

          <button
            className="workout-plan-settings__btn workout-plan-settings__btn--secondary"
            onClick={() => {
              if (window.confirm('Clear current plan?')) clearPlan();
            }}
          >
            🗑️ Clear Plan
          </button>
        </div>
      </div>

      <div className="workout-plan-settings__section">
        <h3>Saved Plans</h3>
        <SavedPlansList />
      </div>
    </div>
  );
}

export default WorkoutPlanSettings;
