import MachineCard from './MachineCard';
import './MachineList.css';

function MachineList({ machines }) {
  if (machines.length === 0) {
    return (
      <div className="machine-list__empty">
        <p className="machine-list__empty-title">No machines found</p>
        <p className="machine-list__empty-text">
          Try a different search term or clear the filters.
        </p>
      </div>
    );
  }

  return (
    <div className="machine-list">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}

export default MachineList;
