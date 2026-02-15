import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';
import './MachineCard.css';

function MachineCard({ machine }) {
  return (
    <Link to={`/machine/${machine.id}`} className="machine-card">
      <div className="machine-card__image">
        <img
          src={machine.thumbnail}
          alt={machine.name}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="machine-card__body">
        <div className="machine-card__header">
          <h2 className="machine-card__name">{machine.name}</h2>
          <DifficultyBadge difficulty={machine.difficulty} />
        </div>
        <p className="machine-card__category">{machine.category}</p>
        <p className="machine-card__description">{machine.shortDescription}</p>
        <div className="machine-card__muscles">
          {machine.musclesWorked.map((muscle) => (
            <span key={muscle} className="machine-card__muscle-tag">
              {muscle}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default MachineCard;
