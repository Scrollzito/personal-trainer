import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import workoutData from '../data/workouts.json';
import machineData from '../data/machines.json';
import DifficultyBadge from '../components/DifficultyBadge';
import MuscleDiagram from '../components/MuscleDiagram';
import './WorkoutDetailPage.css';

function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workoutData.workouts.find((w) => w.id === id);

  // Calculate all unique muscles worked in the workout
  const allMusclesWorked = useMemo(() => {
    if (!workout) return [];
    const muscles = new Set();
    workout.exercises.forEach((exercise) => {
      const machine = machineData.machines.find((m) => m.id === exercise.machineId);
      if (machine && machine.musclesWorked) {
        machine.musclesWorked.forEach((muscle) => muscles.add(muscle));
      }
    });
    return Array.from(muscles);
  }, [workout]);

  if (!workout) {
    return (
      <div className="workout-detail__not-found">
        <h2>Workout not found</h2>
        <p>We couldn't find that workout routine.</p>
        <button className="workout-detail__back-btn" onClick={() => navigate('/workouts')}>
          Go back to all workouts
        </button>
      </div>
    );
  }

  return (
    <div className="workout-detail">
      <div className="workout-detail__header">
        <h1 className="workout-detail__title">{workout.name}</h1>
        <DifficultyBadge difficulty={workout.difficulty} />
      </div>

      <p className="workout-detail__description">{workout.description}</p>

      <div className="workout-detail__meta">
        <div className="workout-detail__meta-item">
          <span className="workout-detail__meta-label">Duration</span>
          <span className="workout-detail__meta-value">{workout.duration}</span>
        </div>
        <div className="workout-detail__meta-item">
          <span className="workout-detail__meta-label">Frequency</span>
          <span className="workout-detail__meta-value">{workout.frequency}</span>
        </div>
        <div className="workout-detail__meta-item">
          <span className="workout-detail__meta-label">Exercises</span>
          <span className="workout-detail__meta-value">{workout.exercises.length}</span>
        </div>
      </div>

      <section className="workout-detail__section">
        <h2 className="workout-detail__section-title">Exercises</h2>
        <ol className="workout-detail__exercises">
          {workout.exercises.map((exercise, index) => {
            const machine = machineData.machines.find((m) => m.id === exercise.machineId);
            return (
              <li key={index} className="workout-detail__exercise">
                <div className="workout-detail__exercise-number">{index + 1}</div>
                <div className="workout-detail__exercise-content">
                  <div className="workout-detail__exercise-top">
                    {machine && (
                      <img
                        className="workout-detail__exercise-thumb"
                        src={machine.thumbnail}
                        alt={machine?.name || exercise.machineId}
                        loading="lazy"
                      />
                    )}
                    <div className="workout-detail__exercise-info">
                      {machine ? (
                        <Link to={`/machine/${machine.id}`} className="workout-detail__exercise-name">
                          {machine.name}
                        </Link>
                      ) : (
                        <span className="workout-detail__exercise-name">{exercise.machineId}</span>
                      )}
                      <div className="workout-detail__exercise-sets">
                        {exercise.sets} {exercise.sets === 1 ? 'set' : 'sets'} x {exercise.reps}
                        {exercise.restSeconds > 0 && (
                          <span className="workout-detail__exercise-rest">
                            | Rest: {exercise.restSeconds}s
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {machine && machine.musclesWorked && machine.musclesWorked.length > 0 && (
                    <div className="workout-detail__exercise-muscles">
                      {machine.musclesWorked.map((muscle) => (
                        <span key={muscle} className="workout-detail__exercise-muscle-tag">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  )}
                  {exercise.notes && (
                    <p className="workout-detail__exercise-notes">{exercise.notes}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {allMusclesWorked.length > 0 && (
        <section className="workout-detail__section">
          <MuscleDiagram musclesWorked={allMusclesWorked} showToggle={true} />
        </section>
      )}

      {workout.tips && workout.tips.length > 0 && (
        <section className="workout-detail__section">
          <div className="workout-detail__tips">
            <h2 className="workout-detail__tips-title">Tips for This Workout</h2>
            <ul className="workout-detail__tips-list">
              {workout.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default WorkoutDetailPage;
