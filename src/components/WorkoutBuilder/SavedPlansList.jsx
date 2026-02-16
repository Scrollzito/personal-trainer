import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import './SavedPlansList.css';

function SavedPlansList() {
  const { savedPlans, loadPlan, deletePlan } = useWorkoutBuilder();

  if (savedPlans.length === 0) {
    return (
      <div className="saved-plans-list__empty">
        No saved plans yet
      </div>
    );
  }

  return (
    <div className="saved-plans-list">
      {savedPlans.map(plan => (
        <div key={plan.id} className="saved-plans-list__item">
          <div className="saved-plans-list__info">
            <h4>{plan.name}</h4>
            <p>{plan.exercises.length} exercises</p>
            <p className="saved-plans-list__date">
              {new Date(plan.dateCreated).toLocaleDateString()}
            </p>
          </div>

          <div className="saved-plans-list__actions">
            <button onClick={() => loadPlan(plan.id)}>Load</button>
            <button onClick={() => {
              if (window.confirm('Delete this plan?')) deletePlan(plan.id);
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedPlansList;
