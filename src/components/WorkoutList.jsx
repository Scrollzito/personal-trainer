import WorkoutCard from './WorkoutCard';
import './WorkoutList.css';

function WorkoutList({ workouts }) {
  if (workouts.length === 0) {
    return (
      <div className="workout-list__empty">
        <p className="workout-list__empty-title">No workouts found</p>
      </div>
    );
  }

  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}

export default WorkoutList;
