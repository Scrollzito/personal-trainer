import './CategoryFilter.css';

const CATEGORIES = [
  { id: 'legs', label: 'Legs' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'arms', label: 'Arms' },
  { id: 'core', label: 'Core' },
  { id: 'cardio', label: 'Cardio' },
];

function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter">
      <button
        className={`category-filter__pill ${!active ? 'category-filter__pill--active' : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`category-filter__pill ${active === cat.id ? 'category-filter__pill--active' : ''}`}
          onClick={() => onChange(active === cat.id ? null : cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
