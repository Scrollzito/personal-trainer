import workoutData from '../data/workouts.json';
import WorkoutList from '../components/WorkoutList';
import './WorkoutsPage.css';

function WorkoutsPage() {
  return (
    <div className="workouts-page">
      <div className="workouts-page__intro">
        <h2 className="workouts-page__heading">Workout Routines</h2>
        <p className="workouts-page__subtitle">
          Not sure what to do at the gym? Pick a workout below and follow it step by step.
          Each routine tells you exactly which machines to use, how many sets and reps to do, and how long to rest.
        </p>
      </div>
      <WorkoutList workouts={workoutData.workouts} />
    </div>
  );
}

export default WorkoutsPage;
