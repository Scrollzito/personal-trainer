import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import machineData from '../data/machines.json';
import {
  clearWorkoutSession,
  loadWorkoutSession,
  saveWorkoutSession
} from '../utils/localStorage';
import './WorkoutSessionPage.css';

const machinesById = new Map(machineData.machines.map((machine) => [machine.id, machine]));
const storageErrorMessage = 'Progress could not be saved in this tab. Keep this page open to avoid losing it.';

const secondsUntil = (deadline) => deadline
  ? Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
  : 0;

const deadlineFromNow = (seconds) => Date.now() + (seconds * 1000);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
};

const formatPrescription = (exercise) => {
  const sets = `${exercise.sets} ${exercise.sets === 1 ? 'set' : 'sets'}`;
  const reps = /\b(seconds?|minutes?|hours?)\b/i.test(exercise.reps)
    ? exercise.reps
    : `${exercise.reps} reps`;
  return `${sets} × ${reps}`;
};

function WorkoutSessionPage() {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const [session, setSession] = useState(loadWorkoutSession);
  const [remainingSeconds, setRemainingSeconds] = useState(() => secondsUntil(session?.restEndsAt));
  const [announcement, setAnnouncement] = useState('');
  const [storageError, setStorageError] = useState('');
  const sessionName = session?.plan.name;

  useEffect(() => {
    const deadline = session?.restEndsAt;
    if (!deadline) return undefined;

    const timer = window.setInterval(() => {
      const remaining = secondsUntil(deadline);
      setRemainingSeconds(remaining);
      if (remaining === 0) {
        window.clearInterval(timer);
        setAnnouncement('Rest complete.');
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [session?.restEndsAt]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = sessionName
      ? `${sessionName} | Workout Session`
      : 'Start Workout | Gym Machine Guide';
    headingRef.current?.focus();
    return () => {
      document.title = previousTitle;
    };
  }, [sessionName]);

  if (!session) {
    return (
      <div className="workout-session workout-session--empty">
        <h1 ref={headingRef} tabIndex="-1">No workout ready</h1>
        <p>Add exercises or load a saved plan before starting a session.</p>
        <Link className="workout-session__primary-link" to="/create-workout">Build a workout</Link>
      </div>
    );
  }

  const totalSets = session.completedSets.reduce((total, sets) => total + sets.length, 0);
  const completedSets = session.completedSets.reduce(
    (total, sets) => total + sets.filter(Boolean).length,
    0
  );
  const isComplete = completedSets === totalSets;

  const persist = (nextSession) => {
    if (!saveWorkoutSession(nextSession)) {
      setStorageError(storageErrorMessage);
      return false;
    }
    setSession(nextSession);
    setStorageError('');
    return true;
  };

  const handleSetChange = (exerciseIndex, setIndex, checked) => {
    const nextCompletedSets = session.completedSets.map((sets, index) =>
      index === exerciseIndex
        ? sets.map((completed, currentSetIndex) => currentSetIndex === setIndex ? checked : completed)
        : sets
    );
    const nextCompletedCount = nextCompletedSets.reduce(
      (total, sets) => total + sets.filter(Boolean).length,
      0
    );
    const restSeconds = session.plan.exercises[exerciseIndex].restSeconds;
    const shouldStartRest = checked && restSeconds > 0 && nextCompletedCount < totalSets;
    const restEndsAt = nextCompletedCount === totalSets
      ? null
      : shouldStartRest ? deadlineFromNow(restSeconds) : session.restEndsAt;

    if (!persist({ ...session, completedSets: nextCompletedSets, restEndsAt })) return;

    if (shouldStartRest) {
      setRemainingSeconds(restSeconds);
      setAnnouncement(`Rest timer started for ${restSeconds} seconds.`);
    } else if (nextCompletedCount === totalSets) {
      setRemainingSeconds(0);
    }
  };

  const handleSkipRest = () => {
    if (!persist({ ...session, restEndsAt: null })) return;
    setRemainingSeconds(0);
    setAnnouncement('Rest complete.');
  };

  const leaveSession = (confirmFirst) => {
    if (confirmFirst && !window.confirm('End this workout session? Completed-set progress will be cleared.')) return;
    if (!clearWorkoutSession()) {
      setStorageError('The session could not be cleared. Please try again.');
      return;
    }
    navigate('/create-workout', { replace: true });
  };

  return (
    <div className="workout-session">
      <header className="workout-session__header">
        <div>
          <p className="workout-session__eyebrow">Workout in progress</p>
          <h1 ref={headingRef} tabIndex="-1">{session.plan.name}</h1>
        </div>
        <button type="button" className="workout-session__end" onClick={() => leaveSession(true)}>
          End session
        </button>
      </header>

      <section className="workout-session__progress" aria-labelledby="workout-progress-label">
        <label id="workout-progress-label" htmlFor="workout-progress">
          {completedSets} of {totalSets} sets complete
        </label>
        <progress id="workout-progress" value={completedSets} max={totalSets} />
      </section>

      {storageError && <p className="workout-session__error" role="alert">{storageError}</p>}
      <p className="workout-session__announcement" aria-live="polite">{announcement}</p>

      {session.restEndsAt && (
        <aside className="workout-session__timer" aria-label="Rest timer">
          <div>
            <span className="workout-session__timer-label">{remainingSeconds > 0 ? 'Rest' : 'Rest complete'}</span>
            <strong>{formatTime(remainingSeconds)}</strong>
          </div>
          <button type="button" onClick={handleSkipRest}>
            {remainingSeconds > 0 ? 'Skip rest' : 'Dismiss'}
          </button>
        </aside>
      )}

      <div className="workout-session__exercises">
        {session.plan.exercises.map((exercise, exerciseIndex) => {
          const machine = machinesById.get(exercise.machineId);
          const name = machine?.name || 'Unknown machine';

          return (
            <fieldset className="workout-session__exercise" key={`${exercise.machineId}-${exerciseIndex}`}>
              <legend>
                <span>{exerciseIndex + 1}</span>
                {name}
              </legend>

              <p className="workout-session__prescription">
                {formatPrescription(exercise)}
                <span>{exercise.restSeconds > 0 ? `${exercise.restSeconds}s rest` : 'No timed rest'}</span>
              </p>

              <div className="workout-session__sets">
                {session.completedSets[exerciseIndex].map((completed, setIndex) => (
                  <label key={setIndex} className={completed ? 'workout-session__set workout-session__set--complete' : 'workout-session__set'}>
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={(event) => handleSetChange(exerciseIndex, setIndex, event.target.checked)}
                    />
                    Set {setIndex + 1}
                  </label>
                ))}
              </div>

              {typeof exercise.notes === 'string' && exercise.notes.trim() && (
                <p className="workout-session__notes"><strong>Note:</strong> {exercise.notes.trim()}</p>
              )}

              {machine ? (
                <Link className="workout-session__guide" to={`/machine/${machine.id}`}>Setup &amp; safety</Link>
              ) : (
                <span className="workout-session__guide-unavailable">Setup guide unavailable</span>
              )}
            </fieldset>
          );
        })}
      </div>

      <footer className="workout-session__footer">
        <button
          type="button"
          className="workout-session__finish"
          disabled={!isComplete}
          onClick={() => leaveSession(false)}
        >
          Finish Workout
        </button>
        {!isComplete && <p>Complete every set to finish the workout.</p>}
      </footer>
    </div>
  );
}

export default WorkoutSessionPage;
