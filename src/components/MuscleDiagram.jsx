import { useState, useMemo } from 'react';
import './MuscleDiagram.css';

// Muscle name mapping to SVG path IDs
// Reference: MUSCLE_NAMING_GLOSSARY.md for standardized terminology
const MUSCLE_MAP = {
  // ========== STANDARDIZED NAMES (v1.0) ==========
  // Format: "Common Name (Anatomical Clarification)"

  // Legs - Standardized
  'Quadriceps (Front Thighs)': ['quads'],
  'Hamstrings (Back Thighs)': ['hamstrings'],
  'Glutes (Buttocks)': ['glutes'],
  'Calves (Gastrocnemius & Soleus)': ['calves'],
  'Hip Adductors (Inner Thighs)': ['hip-adductors'],
  'Hip Abductors (Outer Thighs)': ['hip-abductors'],

  // Chest - Standardized
  'Chest (Pectoralis Major)': ['chest'],
  'Upper Chest (Upper Pectorals)': ['chest-upper'],
  'Lower Chest (Lower Pectorals)': ['chest-lower'],

  // Back - Standardized
  'Lats (Latissimus Dorsi)': ['lats'],
  'Middle Back (Rhomboids & Traps)': ['rhomboids', 'traps-middle'],
  'Lower Back (Erector Spinae)': ['lower-back'],
  'Traps (Trapezius)': ['traps-upper', 'traps-middle'],

  // Shoulders - Standardized
  'Front Shoulders (Anterior Deltoids)': ['deltoids-front'],
  'Side Shoulders (Lateral Deltoids)': ['deltoids-side'],
  'Rear Shoulders (Posterior Deltoids)': ['deltoids-rear'],
  'Rotator Cuff (Shoulder Stabilizers)': ['rotator-cuff'],

  // Arms - Standardized
  'Biceps (Front of Upper Arm)': ['biceps'],
  'Triceps (Back of Upper Arm)': ['triceps'],
  'Forearms (Brachioradialis & Wrist Flexors)': ['forearms'],
  'Brachialis (Elbow Flexor)': ['biceps'],

  // Core - Standardized
  'Abs (Rectus Abdominis)': ['abs'],
  'Obliques (Side Abs)': ['obliques'],
  'Deep Core (Transverse Abdominis)': ['abs'],
  'Hip Flexors (Iliopsoas)': ['hip-flexors'],

  // Cardio - Standardized
  'Cardiovascular System (Heart & Lungs)': [],

  // ========== LEGACY NAMES (Backward Compatibility) ==========
  // Keep these for existing machine data during migration
  // Will be removed once all machines are updated

  // Chest - Legacy
  'Chest (Pectorals)': ['chest'],
  'Chest': ['chest'],

  // Back - Legacy
  'Latissimus Dorsi': ['lats'],
  'Middle Back (Rhomboids)': ['rhomboids'],
  'Rhomboids': ['rhomboids'],
  'Erector Spinae (Lower Back)': ['lower-back'],
  'Erector Spinae': ['lower-back'],

  // Shoulders - Legacy
  'Deltoids (Shoulders)': ['deltoids'],
  'Front Deltoids': ['deltoids-front'],
  'Lateral Deltoids (Side Shoulders)': ['deltoids-side'],
  'Rear Deltoids': ['deltoids-rear'],
  'Upper Trapezius': ['traps-upper'],
  'Middle Trapezius': ['traps-middle'],
  'Trapezius': ['traps-upper', 'traps-middle'],

  // Arms - Legacy
  'Biceps': ['biceps'],
  'Brachialis': ['biceps'],
  'Brachioradialis': ['forearms'],
  'Triceps': ['triceps'],
  'Triceps (Long Head)': ['triceps'],
  'Triceps (Medial Head)': ['triceps'],
  'Forearms': ['forearms'],

  // Core - Legacy
  'Rectus Abdominis (Six-Pack Muscles)': ['abs'],
  'Rectus Abdominis': ['abs'],
  'Rectus Abdominis (Lower Abs)': ['abs'],
  'Obliques': ['obliques'],
  'Transverse Abdominis': ['abs'],
  'Core Stabilizers': ['abs', 'obliques'],
  'Core': ['abs', 'obliques'],

  // Legs - Legacy
  'Quadriceps': ['quads'],
  'Hamstrings': ['hamstrings'],
  'Glutes': ['glutes'],
  'Gluteus Medius': ['glutes'],
  'Calves': ['calves'],
  'Calves (Gastrocnemius)': ['calves'],
  'Gracilis': ['hip-adductors'],

  // Generic/Full Body - Legacy (only for cardio machines)
  'Legs': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Arms': ['biceps', 'triceps'],
  'Back': ['lats', 'rhomboids', 'lower-back'],
  'Shoulders': ['deltoids-front', 'deltoids-side', 'deltoids-rear'],
  'Heart & Lungs (Cardio)': []
};

function MuscleDiagram({ musclesWorked = [], showToggle = true }) {
  const [view, setView] = useState('front');

  // Helper to compare activation level priority
  const getPriority = (level) => {
    const priorities = { primary: 3, secondary: 2, tertiary: 1 };
    return priorities[level] || 0;
  };

  // Calculate which SVG paths should be highlighted with activation levels
  const highlightedPaths = useMemo(() => {
    const pathLevels = new Map(); // path -> activation level

    musclesWorked.forEach((muscle, index) => {
      const mappedPaths = MUSCLE_MAP[muscle] || [];

      // Determine activation level based on position in array
      let level;
      if (index === 0) {
        level = 'primary';   // First muscle = primary mover
      } else if (index <= 2) {
        level = 'secondary'; // 2nd-3rd muscles = synergists
      } else {
        level = 'tertiary';  // 4th+ muscles = stabilizers
      }

      mappedPaths.forEach((path) => {
        // If path already exists, keep higher priority level
        const existing = pathLevels.get(path);
        if (!existing || getPriority(level) > getPriority(existing)) {
          pathLevels.set(path, level);
        }
      });
    });

    return pathLevels;
  }, [musclesWorked]);

  // Get activation level for a muscle path
  const getActivationLevel = (pathId) => highlightedPaths.get(pathId) || null;

  // Get styling for a muscle path based on activation level
  // Can accept multiple path IDs to check (for backward compatibility)
  const getMuscleStyle = (...pathIds) => {
    // Check all provided pathIds and use the highest priority level found
    let highestLevel = null;
    let highestPriority = 0;

    pathIds.forEach(pathId => {
      const level = getActivationLevel(pathId);
      if (level) {
        const priority = getPriority(level);
        if (priority > highestPriority) {
          highestLevel = level;
          highestPriority = priority;
        }
      }
    });

    const styles = {
      primary: {
        fill: '#ff4444',        // Bright red
        fillOpacity: 0.7,       // Strong visibility
        stroke: '#cc3333',
        strokeWidth: 3
      },
      secondary: {
        fill: '#ff8855',        // Medium orange
        fillOpacity: 0.5,       // Medium visibility
        stroke: '#dd6644',
        strokeWidth: 2.5
      },
      tertiary: {
        fill: '#ffaa88',        // Pale orange
        fillOpacity: 0.3,       // Subtle visibility
        stroke: '#ee9977',
        strokeWidth: 2
      }
    };

    return highestLevel ? styles[highestLevel] : {
      fill: '#f5f5f5',          // Light gray for inactive muscles
      fillOpacity: 0.1,
      stroke: '#e0e0e0',
      strokeWidth: 1.5
    };
  };

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
                    {...getMuscleStyle('chest')} />
              <path id="chest-right"
                    d="M 170 110 Q 185 130 190 155 L 160 175 L 150 170 L 150 110 Z"
                    {...getMuscleStyle('chest')} />

              {/* ABS (Rectus Abdominis) */}
              <rect id="abs-upper" x="135" y="180" width="30" height="35" rx="3"
                    {...getMuscleStyle('abs')} />
              <rect id="abs-middle" x="135" y="220" width="30" height="35" rx="3"
                    {...getMuscleStyle('abs')} />
              <rect id="abs-lower" x="135" y="260" width="30" height="35" rx="3"
                    {...getMuscleStyle('abs')} />

              {/* OBLIQUES */}
              <path id="obliques-left"
                    d="M 110 180 Q 100 210 95 250 L 110 250 L 120 220 L 115 180 Z"
                    {...getMuscleStyle('obliques')} />
              <path id="obliques-right"
                    d="M 190 180 Q 200 210 205 250 L 190 250 L 180 220 L 185 180 Z"
                    {...getMuscleStyle('obliques')} />

              {/* FRONT DELTOIDS (Shoulders) */}
              <ellipse id="deltoids-front-left" cx="100" cy="120" rx="18" ry="25"
                       {...getMuscleStyle('deltoids-front', 'deltoids')} />
              <ellipse id="deltoids-front-right" cx="200" cy="120" rx="18" ry="25"
                       {...getMuscleStyle('deltoids-front', 'deltoids')} />

              {/* BICEPS */}
              <ellipse id="biceps-left" cx="70" cy="170" rx="12" ry="28"
                       {...getMuscleStyle('biceps')} />
              <ellipse id="biceps-right" cx="230" cy="170" rx="12" ry="28"
                       {...getMuscleStyle('biceps')} />

              {/* FOREARMS */}
              <path id="forearms-left"
                    d="M 65 220 L 60 260 L 68 280 L 72 260 L 70 220 Z"
                    {...getMuscleStyle('forearms')} />
              <path id="forearms-right"
                    d="M 235 220 L 240 260 L 232 280 L 228 260 L 230 220 Z"
                    {...getMuscleStyle('forearms')} />

              {/* QUADRICEPS (Quads) */}
              <path id="quads-left"
                    d="M 120 350 L 115 380 L 125 440 L 135 460 L 138 420 L 130 360 Z"
                    {...getMuscleStyle('quads')} />
              <path id="quads-right"
                    d="M 180 350 L 185 380 L 175 440 L 165 460 L 162 420 L 170 360 Z"
                    {...getMuscleStyle('quads')} />

              {/* HIP ADDUCTORS (Inner Thighs) */}
              <path id="hip-adductors-left"
                    d="M 138 360 L 145 400 L 148 440 L 143 420 L 140 360 Z"
                    {...getMuscleStyle('hip-adductors')} />
              <path id="hip-adductors-right"
                    d="M 162 360 L 155 400 L 152 440 L 157 420 L 160 360 Z"
                    {...getMuscleStyle('hip-adductors')} />
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
                    {...getMuscleStyle('traps-upper')} />

              {/* MIDDLE TRAPEZIUS & RHOMBOIDS */}
              <path id="traps-middle-rhomboids"
                    d="M 115 125 L 105 145 L 110 165 L 150 155 L 190 165 L 195 145 L 185 125 L 150 135 Z"
                    {...getMuscleStyle('traps-middle', 'rhomboids')} />

              {/* LATISSIMUS DORSI (Lats) */}
              <path id="lats-left"
                    d="M 105 170 Q 95 200 92 240 L 108 270 L 125 240 L 118 190 Z"
                    {...getMuscleStyle('lats')} />
              <path id="lats-right"
                    d="M 195 170 Q 205 200 208 240 L 192 270 L 175 240 L 182 190 Z"
                    {...getMuscleStyle('lats')} />

              {/* LOWER BACK (Erector Spinae) */}
              <rect id="lower-back" x="130" y="260" width="40" height="60" rx="5"
                    {...getMuscleStyle('lower-back')} />

              {/* REAR DELTOIDS */}
              <ellipse id="deltoids-rear-left" cx="100" cy="125" rx="18" ry="25"
                       {...getMuscleStyle('deltoids-rear', 'deltoids')} />
              <ellipse id="deltoids-rear-right" cx="200" cy="125" rx="18" ry="25"
                       {...getMuscleStyle('deltoids-rear', 'deltoids')} />

              {/* TRICEPS */}
              <path id="triceps-left"
                    d="M 75 145 Q 68 170 65 195 L 70 210 L 78 195 L 82 165 Z"
                    {...getMuscleStyle('triceps')} />
              <path id="triceps-right"
                    d="M 225 145 Q 232 170 235 195 L 230 210 L 222 195 L 218 165 Z"
                    {...getMuscleStyle('triceps')} />

              {/* GLUTES (Gluteus Maximus) */}
              <ellipse id="glutes-left" cx="125" cy="340" rx="18" ry="28"
                       {...getMuscleStyle('glutes')} />
              <ellipse id="glutes-right" cx="175" cy="340" rx="18" ry="28"
                       {...getMuscleStyle('glutes')} />

              {/* HIP ABDUCTORS (Outer Thighs) */}
              <path id="hip-abductors-left"
                    d="M 110 355 L 105 390 L 110 425 L 118 415 L 120 375 Z"
                    {...getMuscleStyle('hip-abductors')} />
              <path id="hip-abductors-right"
                    d="M 190 355 L 195 390 L 190 425 L 182 415 L 180 375 Z"
                    {...getMuscleStyle('hip-abductors')} />

              {/* HAMSTRINGS */}
              <path id="hamstrings-left"
                    d="M 122 380 L 118 415 L 125 460 L 132 470 L 135 435 L 130 385 Z"
                    {...getMuscleStyle('hamstrings')} />
              <path id="hamstrings-right"
                    d="M 178 380 L 182 415 L 175 460 L 168 470 L 165 435 L 170 385 Z"
                    {...getMuscleStyle('hamstrings')} />

              {/* CALVES */}
              <ellipse id="calves-left" cx="130" cy="520" rx="12" ry="35"
                       {...getMuscleStyle('calves')} />
              <ellipse id="calves-right" cx="170" cy="520" rx="12" ry="35"
                       {...getMuscleStyle('calves')} />
            </svg>
          </div>
        )}
      </div>

      <div className="muscle-diagram__legend">
        <div className="muscle-diagram__legend-item">
          <div className="muscle-diagram__legend-color" style={{ background: '#ff4444', opacity: 0.7, border: '2px solid #cc3333' }}></div>
          <span>Primary</span>
        </div>
        <div className="muscle-diagram__legend-item">
          <div className="muscle-diagram__legend-color" style={{ background: '#ff8855', opacity: 0.5, border: '2px solid #dd6644' }}></div>
          <span>Secondary</span>
        </div>
        <div className="muscle-diagram__legend-item">
          <div className="muscle-diagram__legend-color" style={{ background: '#ffaa88', opacity: 0.3, border: '2px solid #ee9977' }}></div>
          <span>Stabilizer</span>
        </div>
        <div className="muscle-diagram__legend-item">
          <div className="muscle-diagram__legend-color" style={{ background: '#f5f5f5', opacity: 0.1, border: '2px solid #e0e0e0' }}></div>
          <span>Not Targeted</span>
        </div>
      </div>
    </div>
  );
}

export default MuscleDiagram;
