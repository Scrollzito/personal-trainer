import { useState, useMemo } from 'react';
import './MuscleDiagram.css';

// Muscle name mapping to SVG path IDs
const MUSCLE_MAP = {
  // Chest
  'Chest (Pectorals)': ['chest'],
  'Upper Chest (Pectorals)': ['chest-upper'],
  'Lower Chest (Pectorals)': ['chest-lower'],
  'Chest': ['chest'],

  // Back
  'Latissimus Dorsi': ['lats'],
  'Middle Back (Rhomboids)': ['rhomboids'],
  'Rhomboids': ['rhomboids'],
  'Lower Back (Erector Spinae)': ['lower-back'],
  'Erector Spinae (Lower Back)': ['lower-back'],
  'Erector Spinae': ['lower-back'],

  // Shoulders
  'Deltoids (Shoulders)': ['deltoids'],
  'Front Deltoids': ['deltoids-front'],
  'Lateral Deltoids (Side Shoulders)': ['deltoids-side'],
  'Rear Deltoids': ['deltoids-rear'],
  'Upper Trapezius': ['traps-upper'],
  'Middle Trapezius': ['traps-middle'],
  'Rotator Cuff': ['rotator-cuff'],

  // Arms
  'Biceps': ['biceps'],
  'Brachialis': ['biceps'],
  'Triceps': ['triceps'],
  'Triceps (Long Head)': ['triceps'],
  'Triceps (Medial Head)': ['triceps'],
  'Forearms': ['forearms'],

  // Core
  'Rectus Abdominis (Six-Pack Muscles)': ['abs'],
  'Obliques': ['obliques'],
  'Transverse Abdominis': ['abs'],
  'Core Stabilizers': ['abs', 'obliques'],

  // Legs
  'Quadriceps': ['quads'],
  'Hamstrings': ['hamstrings'],
  'Glutes': ['glutes'],
  'Gluteus Medius': ['glutes'],
  'Calves': ['calves'],
  'Hip Abductors (Outer Thighs)': ['hip-abductors'],
  'Hip Adductors (Inner Thighs)': ['hip-adductors'],
  'Gracilis': ['hip-adductors'],

  // Generic/Full Body
  'Legs': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Arms': ['biceps', 'triceps'],
  'Heart & Lungs (Cardio)': []
};

function MuscleDiagram({ musclesWorked = [], showToggle = true }) {
  const [view, setView] = useState('front');

  // Calculate which SVG paths should be highlighted
  const highlightedPaths = useMemo(() => {
    const paths = new Set();
    musclesWorked.forEach((muscle) => {
      const mappedPaths = MUSCLE_MAP[muscle] || [];
      mappedPaths.forEach((path) => paths.add(path));
    });
    return paths;
  }, [musclesWorked]);

  const isHighlighted = (pathId) => highlightedPaths.has(pathId);

  return (
    <div className="muscle-diagram">
      <div className="muscle-diagram__header">
        <h3 className="muscle-diagram__title">Muscles Worked</h3>
        {showToggle && (
          <div className="muscle-diagram__toggle">
            <button
              className={`muscle-diagram__toggle-btn ${view === 'front' ? 'muscle-diagram__toggle-btn--active' : ''}`}
              onClick={() => setView('front')}
            >
              Front
            </button>
            <button
              className={`muscle-diagram__toggle-btn ${view === 'back' ? 'muscle-diagram__toggle-btn--active' : ''}`}
              onClick={() => setView('back')}
            >
              Back
            </button>
          </div>
        )}
      </div>

      <div className="muscle-diagram__body">
        {view === 'front' ? (
          <div className="muscle-diagram__view">
            <svg viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <ellipse cx="150" cy="40" rx="30" ry="35" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Neck */}
              <path d="M 130 75 L 130 95 L 170 95 L 170 75" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Torso outline */}
              <path d="M 130 95 L 100 120 L 90 250 L 110 350 L 140 420 L 150 420 L 160 420 L 190 350 L 210 250 L 200 120 L 170 95"
                    fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Arms outline */}
              <path d="M 100 120 L 70 130 L 60 220 L 65 280 L 70 290" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 200 120 L 230 130 L 240 220 L 235 280 L 230 290" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Legs outline */}
              <path d="M 140 420 L 135 480 L 130 560 L 125 590" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 160 420 L 165 480 L 170 560 L 175 590" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* CHEST (Pectorals) */}
              <path id="chest"
                    d="M 130 110 Q 115 130 110 155 L 140 175 L 150 170 L 150 110 Z"
                    fill={isHighlighted('chest') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('chest') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="chest-right"
                    d="M 170 110 Q 185 130 190 155 L 160 175 L 150 170 L 150 110 Z"
                    fill={isHighlighted('chest') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('chest') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* ABS (Rectus Abdominis) */}
              <rect id="abs-upper" x="135" y="180" width="30" height="35" rx="3"
                    fill={isHighlighted('abs') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('abs') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <rect id="abs-middle" x="135" y="220" width="30" height="35" rx="3"
                    fill={isHighlighted('abs') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('abs') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <rect id="abs-lower" x="135" y="260" width="30" height="35" rx="3"
                    fill={isHighlighted('abs') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('abs') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* OBLIQUES */}
              <path id="obliques-left"
                    d="M 110 180 Q 100 210 95 250 L 110 250 L 120 220 L 115 180 Z"
                    fill={isHighlighted('obliques') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('obliques') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="obliques-right"
                    d="M 190 180 Q 200 210 205 250 L 190 250 L 180 220 L 185 180 Z"
                    fill={isHighlighted('obliques') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('obliques') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* FRONT DELTOIDS (Shoulders) */}
              <ellipse id="deltoids-front-left" cx="100" cy="120" rx="18" ry="25"
                       fill={isHighlighted('deltoids-front') || isHighlighted('deltoids') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('deltoids-front') || isHighlighted('deltoids') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />
              <ellipse id="deltoids-front-right" cx="200" cy="120" rx="18" ry="25"
                       fill={isHighlighted('deltoids-front') || isHighlighted('deltoids') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('deltoids-front') || isHighlighted('deltoids') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />

              {/* BICEPS */}
              <ellipse id="biceps-left" cx="70" cy="170" rx="12" ry="28"
                       fill={isHighlighted('biceps') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('biceps') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />
              <ellipse id="biceps-right" cx="230" cy="170" rx="12" ry="28"
                       fill={isHighlighted('biceps') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('biceps') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />

              {/* FOREARMS */}
              <path id="forearms-left"
                    d="M 65 220 L 60 260 L 68 280 L 72 260 L 70 220 Z"
                    fill={isHighlighted('forearms') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('forearms') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="forearms-right"
                    d="M 235 220 L 240 260 L 232 280 L 228 260 L 230 220 Z"
                    fill={isHighlighted('forearms') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('forearms') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* QUADRICEPS (Quads) */}
              <path id="quads-left"
                    d="M 120 350 L 115 380 L 125 440 L 135 460 L 138 420 L 130 360 Z"
                    fill={isHighlighted('quads') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('quads') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="quads-right"
                    d="M 180 350 L 185 380 L 175 440 L 165 460 L 162 420 L 170 360 Z"
                    fill={isHighlighted('quads') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('quads') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* HIP ADDUCTORS (Inner Thighs) */}
              <path id="hip-adductors-left"
                    d="M 138 360 L 145 400 L 148 440 L 143 420 L 140 360 Z"
                    fill={isHighlighted('hip-adductors') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('hip-adductors') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="hip-adductors-right"
                    d="M 162 360 L 155 400 L 152 440 L 157 420 L 160 360 Z"
                    fill={isHighlighted('hip-adductors') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('hip-adductors') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
            </svg>
          </div>
        ) : (
          <div className="muscle-diagram__view">
            <svg viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <ellipse cx="150" cy="40" rx="30" ry="35" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Neck */}
              <path d="M 130 75 L 130 95 L 170 95 L 170 75" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Torso outline */}
              <path d="M 130 95 L 100 120 L 90 250 L 110 350 L 140 420 L 150 420 L 160 420 L 190 350 L 210 250 L 200 120 L 170 95"
                    fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Arms outline */}
              <path d="M 100 120 L 70 130 L 60 220 L 65 280 L 70 290" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 200 120 L 230 130 L 240 220 L 235 280 L 230 290" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Legs outline */}
              <path d="M 140 420 L 135 480 L 130 560 L 125 590" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 160 420 L 165 480 L 170 560 L 175 590" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* UPPER TRAPEZIUS */}
              <path id="traps-upper"
                    d="M 130 95 Q 140 100 150 100 Q 160 100 170 95 L 165 115 L 150 120 L 135 115 Z"
                    fill={isHighlighted('traps-upper') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('traps-upper') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* MIDDLE TRAPEZIUS & RHOMBOIDS */}
              <path id="traps-middle-rhomboids"
                    d="M 115 125 L 105 145 L 110 165 L 150 155 L 190 165 L 195 145 L 185 125 L 150 135 Z"
                    fill={isHighlighted('traps-middle') || isHighlighted('rhomboids') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('traps-middle') || isHighlighted('rhomboids') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* LATISSIMUS DORSI (Lats) */}
              <path id="lats-left"
                    d="M 105 170 Q 95 200 92 240 L 108 270 L 125 240 L 118 190 Z"
                    fill={isHighlighted('lats') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('lats') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="lats-right"
                    d="M 195 170 Q 205 200 208 240 L 192 270 L 175 240 L 182 190 Z"
                    fill={isHighlighted('lats') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('lats') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* LOWER BACK (Erector Spinae) */}
              <rect id="lower-back" x="130" y="260" width="40" height="60" rx="5"
                    fill={isHighlighted('lower-back') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('lower-back') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* REAR DELTOIDS */}
              <ellipse id="deltoids-rear-left" cx="100" cy="125" rx="18" ry="25"
                       fill={isHighlighted('deltoids-rear') || isHighlighted('deltoids') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('deltoids-rear') || isHighlighted('deltoids') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />
              <ellipse id="deltoids-rear-right" cx="200" cy="125" rx="18" ry="25"
                       fill={isHighlighted('deltoids-rear') || isHighlighted('deltoids') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('deltoids-rear') || isHighlighted('deltoids') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />

              {/* TRICEPS */}
              <path id="triceps-left"
                    d="M 75 145 Q 68 170 65 195 L 70 210 L 78 195 L 82 165 Z"
                    fill={isHighlighted('triceps') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('triceps') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="triceps-right"
                    d="M 225 145 Q 232 170 235 195 L 230 210 L 222 195 L 218 165 Z"
                    fill={isHighlighted('triceps') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('triceps') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* GLUTES (Gluteus Maximus) */}
              <ellipse id="glutes-left" cx="125" cy="340" rx="18" ry="28"
                       fill={isHighlighted('glutes') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('glutes') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />
              <ellipse id="glutes-right" cx="175" cy="340" rx="18" ry="28"
                       fill={isHighlighted('glutes') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('glutes') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />

              {/* HIP ABDUCTORS (Outer Thighs) */}
              <path id="hip-abductors-left"
                    d="M 110 355 L 105 390 L 110 425 L 118 415 L 120 375 Z"
                    fill={isHighlighted('hip-abductors') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('hip-abductors') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="hip-abductors-right"
                    d="M 190 355 L 195 390 L 190 425 L 182 415 L 180 375 Z"
                    fill={isHighlighted('hip-abductors') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('hip-abductors') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* HAMSTRINGS */}
              <path id="hamstrings-left"
                    d="M 122 380 L 118 415 L 125 460 L 132 470 L 135 435 L 130 385 Z"
                    fill={isHighlighted('hamstrings') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('hamstrings') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />
              <path id="hamstrings-right"
                    d="M 178 380 L 182 415 L 175 460 L 168 470 L 165 435 L 170 385 Z"
                    fill={isHighlighted('hamstrings') ? '#2563eb' : 'transparent'}
                    fillOpacity="0.3"
                    stroke={isHighlighted('hamstrings') ? '#2563eb' : '#e2e8f0'}
                    strokeWidth="2" />

              {/* CALVES */}
              <ellipse id="calves-left" cx="130" cy="520" rx="12" ry="35"
                       fill={isHighlighted('calves') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('calves') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />
              <ellipse id="calves-right" cx="170" cy="520" rx="12" ry="35"
                       fill={isHighlighted('calves') ? '#2563eb' : 'transparent'}
                       fillOpacity="0.3"
                       stroke={isHighlighted('calves') ? '#2563eb' : '#e2e8f0'}
                       strokeWidth="2" />
            </svg>
          </div>
        )}
      </div>

      <div className="muscle-diagram__legend">
        <div className="muscle-diagram__legend-item">
          <div className="muscle-diagram__legend-color" style={{ background: '#2563eb', opacity: 0.3 }}></div>
          <span>Targeted</span>
        </div>
        <div className="muscle-diagram__legend-item">
          <div className="muscle-diagram__legend-color" style={{ background: '#e2e8f0' }}></div>
          <span>Not Targeted</span>
        </div>
      </div>
    </div>
  );
}

export default MuscleDiagram;
