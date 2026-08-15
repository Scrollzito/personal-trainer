import MachineSelector from '../components/WorkoutBuilder/MachineSelector';
import WorkoutDrawer from '../components/WorkoutBuilder/WorkoutDrawer';
import './CreateWorkoutPage.css';

function CreateWorkoutPage() {
  return (
    <div className="create-workout-page">
      <div className="create-workout-page__header">
        <h1>Create Your Workout</h1>
      </div>

      <div className="create-workout-page__main">
        <MachineSelector />
      </div>

      <WorkoutDrawer />
    </div>
  );
}

export default CreateWorkoutPage;
