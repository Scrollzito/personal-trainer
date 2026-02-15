import './DifficultyBadge.css';

const LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

function DifficultyBadge({ difficulty }) {
  return (
    <span className={`difficulty-badge difficulty-badge--${difficulty}`}>
      {LABELS[difficulty] || difficulty}
    </span>
  );
}

export default DifficultyBadge;
