import { useParams, useNavigate } from 'react-router-dom';
import machineData from '../data/machines.json';
import MUSCLE_GROUP_INFO from '../data/muscleGroups';
import MachineList from '../components/MachineList';
import './MuscleGroupPage.css';

function MuscleGroupPage() {
  const { group } = useParams();
  const navigate = useNavigate();
  const info = MUSCLE_GROUP_INFO[group];

  if (!info) {
    return (
      <div className="muscle-group__not-found">
        <h2>Muscle group not found</h2>
        <p>We couldn't find that muscle group.</p>
        <button className="muscle-group__back-btn" onClick={() => navigate('/')}>
          Go back to all machines
        </button>
      </div>
    );
  }

  // Get machines by category, plus any from other categories tagged with this group
  const machines = machineData.machines.filter(
    (m) => m.category === group || m.tags.includes(group)
  );

  // Sort by recommended order if available
  const ordered = [...machines].sort((a, b) => {
    const aIndex = info.recommendedOrder.indexOf(a.id);
    const bIndex = info.recommendedOrder.indexOf(b.id);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="muscle-group">
      <h1 className="muscle-group__title">{info.name}</h1>
      <p className="muscle-group__intro">{info.intro}</p>
      <p className="muscle-group__count">
        {ordered.length} {ordered.length === 1 ? 'machine' : 'machines'} available
      </p>
      <MachineList machines={ordered} />
    </div>
  );
}

export default MuscleGroupPage;
