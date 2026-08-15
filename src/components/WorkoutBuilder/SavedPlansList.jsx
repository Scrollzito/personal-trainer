import { useState } from 'react';
import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import './SavedPlansList.css';

function SavedPlansList() {
  const { savedPlans, loadPlan, deletePlan } = useWorkoutBuilder();
  const [feedback, setFeedback] = useState(null);

  const handleLoad = (plan) => {
    loadPlan(plan.id);
    setFeedback({ type: 'success', message: `${plan.name} loaded.` });
  };

  const handleDelete = (plan) => {
    if (!window.confirm(`Delete ${plan.name}?`)) return;

    try {
      deletePlan(plan.id);
      setFeedback({ type: 'success', message: `${plan.name} deleted.` });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Could not delete the workout plan.'
      });
    }
  };

  return (
    <>
      {feedback && (
        <div className={`saved-plans-list__feedback saved-plans-list__feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
          {feedback.message}
        </div>
      )}
      {savedPlans.length === 0 ? (
        <div className="saved-plans-list__empty">No saved plans yet</div>
      ) : (
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
                <button type="button" onClick={() => handleLoad(plan)} aria-label={`Load ${plan.name}`}>Load</button>
                <button type="button" onClick={() => handleDelete(plan)} aria-label={`Delete ${plan.name}`}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SavedPlansList;
