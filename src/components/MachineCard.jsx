import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';
import './MachineCard.css';

function MachineCard({ machine }) {
  return (
    <Link to={`/machine/${machine.id}`} className="machine-card">
      <div className="machine-card__visual">
        <img
          src={machine.thumbnail}
          alt={machine.name}
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="machine-card__overlay" />
        <div className="machine-card__footer">
          <div className="machine-card__meta">
            <span className="machine-card__category">{machine.category}</span>
            <DifficultyBadge difficulty={machine.difficulty} />
          </div>
          <h2 className="machine-card__name">{machine.name}</h2>
          <div className="machine-card__muscles">
            {machine.musclesWorked.slice(0, 2).map((muscle) => (
              <span key={muscle} className="machine-card__muscle-tag">
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MachineCard;
