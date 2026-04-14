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
      <div className="detail-not-found">
        <h2>Machine not found</h2>
        <p>We couldn't find that machine.</p>
        <button onClick={() => navigate('/')}>Go back to all machines</button>
      </div>
    );
  }

  return (
    <div className="detail-page">

      {/* ── Hero ── */}
      <div className="detail-page__hero">
        <div className="detail-page__hero-img-wrap">
          <img
            src={machine.thumbnail}
            alt={machine.name}
            className="detail-page__hero-img"
          />
          <div className="detail-page__hero-overlay" />
        </div>
        <div className="detail-page__hero-info">
          <span className="detail-page__hero-category">{machine.category}</span>
          <h1 className="detail-page__hero-title">{machine.name}</h1>
          <div className="detail-page__hero-meta">
            <DifficultyBadge difficulty={machine.difficulty} />
            <span className="detail-page__hero-sets">{machine.suggestedSets}</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="detail-page__body">

        {/* Description + muscle tags */}
        <p className="detail-page__description">{machine.shortDescription}</p>
        <div className="detail-page__muscles">
          {machine.musclesWorked.map((muscle) => (
            <span key={muscle} className="detail-page__muscle-tag">{muscle}</span>
          ))}
        </div>

        {/* Muscle diagram */}
        {machine.musclesWorked.length > 0 && (
          <section className="detail-page__section">
            <MuscleDiagram musclesWorked={machine.musclesWorked} showToggle={true} />
          </section>
        )}

        {/* Video */}
        {machine.youtubeVideoId && (
          <section className="detail-page__section">
            <h2 className="detail-page__section-title">Watch How It's Done</h2>
            <YouTubeEmbed videoId={machine.youtubeVideoId} />
          </section>
        )}

        {/* Steps */}
        <section className="detail-page__section">
          <h2 className="detail-page__section-title">Step-by-Step Instructions</h2>
          <StepList steps={machine.steps} />
        </section>

        {/* Safety */}
        {machine.safetyWarnings.length > 0 && (
          <section className="detail-page__section">
            <div className="detail-page__warnings">
              <h2 className="detail-page__warnings-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Safety Tips
              </h2>
              <ul className="detail-page__warnings-list">
                {machine.safetyWarnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Sets recommendation */}
        <section className="detail-page__section">
          <div className="detail-page__sets-card">
            <div className="detail-page__sets-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div>
              <p className="detail-page__sets-label">Suggested Volume</p>
              <p className="detail-page__sets-value">{machine.suggestedSets}</p>
              <p className="detail-page__sets-note">
                Start manageable. Once all reps feel easy, increase the weight next session.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default MachineDetailPage;
