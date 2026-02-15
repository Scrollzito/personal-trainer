import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';
import './WorkoutCard.css';

function WorkoutCard({ workout }) {
  return (
    <Link to={`/workout/${workout.id}`} className="workout-card">
      <div className="workout-card__header">
        <h2 className="workout-card__name">{workout.name}</h2>
        <DifficultyBadge difficulty={workout.difficulty} />
      </div>
      <p className="workout-card__description">{workout.description}</p>
      <div className="workout-card__meta">
        <span className="workout-card__meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {workout.duration}
        </span>
        <span className="workout-card__meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {workout.frequency}
        </span>
        <span className="workout-card__meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          {workout.exercises.length} exercises
        </span>
      </div>
    </Link>
  );
}

export default WorkoutCard;
