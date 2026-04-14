import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';
import './WorkoutCard.css';

const TYPE_LABELS = {
  'full-body': 'Full Body',
  'legs': 'Legs',
  'upper-body': 'Upper Body',
  'push': 'Push',
  'pull': 'Pull',
  'core': 'Core',
  'cardio': 'Cardio',
  'strength': 'Strength',
};

function WorkoutCard({ workout }) {
  const typeLabel = TYPE_LABELS[workout.type] || workout.type || 'Workout';

  return (
    <Link to={`/workout/${workout.id}`} className={`workout-card workout-card--${workout.difficulty}`}>
      <div className="workout-card__top">
        <span className="workout-card__type">{typeLabel}</span>
        <DifficultyBadge difficulty={workout.difficulty} />
      </div>
      <h2 className="workout-card__name">{workout.name}</h2>
      <p className="workout-card__description">{workout.description}</p>
      <div className="workout-card__footer">
        <div className="workout-card__meta">
          <span className="workout-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {workout.duration}
          </span>
          <span className="workout-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {workout.frequency}
          </span>
        </div>
        <span className="workout-card__count">
          {workout.exercises.length}<small>ex</small>
        </span>
      </div>
    </Link>
  );
}

export default WorkoutCard;
