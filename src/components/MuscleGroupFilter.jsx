import './MuscleGroupFilter.css';

export default function MuscleGroupFilter({ muscleGroups, active, onChange }) {
  return (
    <div className="muscle-group-filter" role="group" aria-label="Muscle groups">
      <button
        type="button"
        aria-pressed={!active}
        className={`muscle-group-filter__pill ${!active ? 'muscle-group-filter__pill--active' : ''}`}
        onClick={() => onChange(null)}
      >
        All Muscles
      </button>
      {muscleGroups.map((group) => (
        <button
          type="button"
          aria-pressed={active === group}
          key={group}
          className={`muscle-group-filter__pill ${active === group ? 'muscle-group-filter__pill--active' : ''}`}
          onClick={() => onChange(active === group ? null : group)}
        >
          {group}
        </button>
      ))}
    </div>
  );
}
