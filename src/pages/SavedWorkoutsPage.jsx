import { Link, useNavigate } from 'react-router-dom';
import SavedPlansList from '../components/WorkoutBuilder/SavedPlansList';
import './SavedWorkoutsPage.css';

function SavedWorkoutsPage() {
  const navigate = useNavigate();

  return (
    <div className="saved-workouts-page">
      <div className="saved-workouts-page__header">
        <div>
          <h1>Saved Workouts</h1>
          <p>Plans saved on this device. Load one to edit it.</p>
        </div>
        <Link to="/create-workout">Create a workout</Link>
      </div>

      <SavedPlansList
        headingLevel={2}
        onLoad={() => navigate('/create-workout')}
      />
    </div>
  );
}

export default SavedWorkoutsPage;
