import { useParams, useNavigate } from 'react-router-dom';
import machineData from '../data/machines.json';
import DifficultyBadge from '../components/DifficultyBadge';
import YouTubeEmbed from '../components/YouTubeEmbed';
import StepList from '../components/StepList';
import MuscleDiagram from '../components/MuscleDiagram';
import './MachineDetailPage.css';

function MachineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const machine = machineData.machines.find((m) => m.id === id);

  if (!machine) {
    return (
      <div className="detail-page__not-found">
        <h2>Machine not found</h2>
        <p>We couldn't find that machine. It might have been removed or the link is wrong.</p>
        <button className="detail-page__back-btn" onClick={() => navigate('/')}>
          Go back to all machines
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-page__header">
        <h1 className="detail-page__title">{machine.name}</h1>
        <DifficultyBadge difficulty={machine.difficulty} />
      </div>

      <p className="detail-page__description">{machine.shortDescription}</p>

      <div className="detail-page__muscles">
        {machine.musclesWorked.map((muscle) => (
          <span key={muscle} className="detail-page__muscle-tag">
            {muscle}
          </span>
        ))}
      </div>

      {machine.musclesWorked && machine.musclesWorked.length > 0 && (
        <MuscleDiagram musclesWorked={machine.musclesWorked} showToggle={true} />
      )}

      <section className="detail-page__section">
        <h2 className="detail-page__section-title">Watch How It's Done</h2>
        <YouTubeEmbed videoId={machine.youtubeVideoId} />
      </section>

      <section className="detail-page__section">
        <h2 className="detail-page__section-title">Step-by-Step Instructions</h2>
        <StepList steps={machine.steps} />
      </section>

      {machine.safetyWarnings.length > 0 && (
        <section className="detail-page__section">
          <div className="detail-page__warnings">
            <h2 className="detail-page__warnings-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Safety Tips
            </h2>
            <ul className="detail-page__warnings-list">
              {machine.safetyWarnings.map((warning, i) => (
                <li key={i}>{warning}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="detail-page__section">
        <div className="detail-page__sets">
          <h2 className="detail-page__section-title">How Much Should I Do?</h2>
          <p className="detail-page__sets-text">{machine.suggestedSets}</p>
          <p className="detail-page__sets-note">
            Start with a weight that feels manageable. If you can do all reps easily, increase the weight a little next time.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MachineDetailPage;
