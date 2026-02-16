import { useWorkoutBuilder } from '../context/WorkoutBuilderContext';
import MachineSelector from '../components/WorkoutBuilder/MachineSelector';
import WorkoutDrawer from '../components/WorkoutBuilder/WorkoutDrawer';
import './CreateWorkoutPage.css';

function CreateWorkoutPage() {
  const { currentPlan } = useWorkoutBuilder();

  return (
    <div className="create-workout-page">
      <div className="create-workout-page__header">
        <h1>Create Your Workout</h1>
      </div>

      <div className="create-workout-page__main">
        <MachineSelector />
      </div>

      {currentPlan.exercises.length > 0 && (
        <WorkoutDrawer />
      )}
    </div>
  );
}

export default CreateWorkoutPage;
