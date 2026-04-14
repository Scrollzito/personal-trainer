import { useState } from 'react';
import workoutData from '../data/workouts.json';
import WorkoutList from '../components/WorkoutList';
import './WorkoutsPage.css';

const DIFFICULTIES = [
  { id: null, label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

function WorkoutsPage() {
  const [activeDifficulty, setActiveDifficulty] = useState(null);

  const filtered = activeDifficulty
    ? workoutData.workouts.filter((w) => w.difficulty === activeDifficulty)
    : workoutData.workouts;

  const counts = {
    beginner: workoutData.workouts.filter((w) => w.difficulty === 'beginner').length,
    intermediate: workoutData.workouts.filter((w) => w.difficulty === 'intermediate').length,
    advanced: workoutData.workouts.filter((w) => w.difficulty === 'advanced').length,
  };

  return (
    <div className="workouts-page">

      {/* Hero */}
      <section className="workouts-page__hero">
        <h1 className="workouts-page__hero-title">
          Pick Your<br /><span>Routine.</span>
        </h1>
        <p className="workouts-page__hero-subtitle">
          Pre-built plans that tell you exactly which machines to use, how many sets, and how long to rest.
        </p>
        <div className="workouts-page__stats">
          <div className="workouts-page__stat">
            <span className="workouts-page__stat-number">{workoutData.workouts.length}</span>
            <span className="workouts-page__stat-label">Routines</span>
          </div>
          <div className="workouts-page__stat-divider" />
          <div className="workouts-page__stat workouts-page__stat--beginner">
            <span className="workouts-page__stat-number">{counts.beginner}</span>
            <span className="workouts-page__stat-label">Beginner</span>
          </div>
          <div className="workouts-page__stat-divider" />
          <div className="workouts-page__stat workouts-page__stat--intermediate">
            <span className="workouts-page__stat-number">{counts.intermediate}</span>
            <span className="workouts-page__stat-label">Intermediate</span>
          </div>
          <div className="workouts-page__stat-divider" />
          <div className="workouts-page__stat workouts-page__stat--advanced">
            <span className="workouts-page__stat-number">{counts.advanced}</span>
            <span className="workouts-page__stat-label">Advanced</span>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="workouts-page__filters">
        {DIFFICULTIES.map((d) => (
          <button
            key={String(d.id)}
            className={`workouts-page__filter-pill ${activeDifficulty === d.id ? `workouts-page__filter-pill--active workouts-page__filter-pill--${d.id ?? 'all'}` : ''}`}
            onClick={() => setActiveDifficulty(d.id)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <WorkoutList workouts={filtered} />
    </div>
  );
}

export default WorkoutsPage;
