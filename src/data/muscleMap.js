const aliases = [
  [['quads'], [
    'Quadriceps (Front Thighs)', 'Quadriceps'
  ]],
  [['hamstrings'], [
    'Hamstrings (Back Thighs)', 'Hamstrings'
  ]],
  [['glutes'], [
    'Glutes (Buttocks)', 'Glutes', 'Gluteus Medius'
  ]],
  [['calves'], [
    'Calves (Gastrocnemius & Soleus)', 'Calves', 'Calves (Gastrocnemius)',
    'Gastrocnemius (Calf)', 'Soleus', 'Soleus (Deep Calf)'
  ]],
  [['hip-adductors'], [
    'Hip Adductors (Inner Thighs)', 'Gracilis'
  ]],
  [['hip-abductors'], [
    'Hip Abductors (Outer Thighs)'
  ]],
  [['hip-flexors'], [
    'Hip Flexors (Iliopsoas)', 'Hip Flexors'
  ]],
  [['chest'], [
    'Chest (Pectoralis Major)', 'Chest (Pectorals)', 'Chest',
    'Pectoralis Major (Chest)'
  ]],
  [['chest-upper'], [
    'Upper Chest (Upper Pectorals)', 'Upper Chest (Pectorals)', 'Upper Chest'
  ]],
  [['chest-lower'], [
    'Lower Chest (Lower Pectorals)', 'Lower Chest (Pectorals)',
    'Pectoralis Major (Lower Chest)'
  ]],
  [['lats'], [
    'Lats (Latissimus Dorsi)', 'Latissimus Dorsi', 'Latissimus Dorsi (Lats)',
    'Latissimus Dorsi Upper (Lats)'
  ]],
  [['teres-major'], ['Teres Major']],
  [['rhomboids'], [
    'Middle Back (Rhomboids)', 'Rhomboids', 'Rhomboids (Mid Back)',
    'Rhomboids (Upper Back)'
  ]],
  [['lower-back'], [
    'Lower Back (Erector Spinae)', 'Erector Spinae (Lower Back)',
    'Erector Spinae', 'Lower Back'
  ]],
  [['traps-upper'], [
    'Upper Trapezius', 'Trapezius (Upper Back)'
  ]],
  [['traps-middle'], ['Middle Trapezius']],
  [['traps-upper', 'traps-middle'], [
    'Traps (Trapezius)', 'Trapezius'
  ]],
  [['rhomboids', 'traps-middle'], [
    'Middle Back (Rhomboids & Traps)', 'Middle Back'
  ]],
  [['deltoids-front'], [
    'Front Shoulders (Anterior Deltoids)', 'Front Deltoids',
    'Anterior Deltoid (Front Shoulder)'
  ]],
  [['deltoids-side'], [
    'Side Shoulders (Lateral Deltoids)', 'Lateral Deltoids (Side Shoulders)'
  ]],
  [['deltoids-rear'], [
    'Rear Shoulders (Posterior Deltoids)', 'Rear Deltoids',
    'Rear Deltoids (Back of Shoulder)'
  ]],
  [['rotator-cuff'], [
    'Rotator Cuff (Shoulder Stabilizers)', 'Rotator Cuff'
  ]],
  [['deltoids-front', 'deltoids-side', 'deltoids-rear'], [
    'Deltoids (Shoulders)', 'Shoulders'
  ]],
  [['biceps'], [
    'Biceps (Front of Upper Arm)', 'Biceps', 'Biceps Brachii',
    'Brachialis (Elbow Flexor)', 'Brachialis'
  ]],
  [['forearms'], [
    'Forearms (Brachioradialis & Wrist Flexors)', 'Forearms', 'Brachioradialis'
  ]],
  [['triceps'], [
    'Triceps (Back of Upper Arm)', 'Triceps', 'Triceps (Long Head)',
    'Triceps (Medial Head)'
  ]],
  [['abs'], [
    'Abs (Rectus Abdominis)', 'Deep Core (Transverse Abdominis)',
    'Rectus Abdominis (Six-Pack Muscles)', 'Rectus Abdominis',
    'Rectus Abdominis (Lower Abs)', 'Transverse Abdominis'
  ]],
  [['obliques'], ['Obliques (Side Abs)', 'Obliques']],
  [['abs', 'obliques'], ['Core Stabilizers', 'Core']],
  [['cardio'], [
    'Cardiovascular System (Heart & Lungs)', 'Heart & Lungs (Cardio)'
  ]],
  [['quads', 'hamstrings', 'glutes', 'calves'], ['Legs']],
  [['biceps', 'triceps'], ['Arms']],
  [['lats', 'rhomboids', 'lower-back'], ['Back']]
];

export const MUSCLE_MAP = Object.fromEntries(
  aliases.flatMap(([regions, names]) => names.map((name) => [name, regions]))
);

export const DRAWN_MUSCLE_REGIONS = new Set([
  'abs', 'biceps', 'calves', 'cardio', 'chest', 'chest-lower', 'chest-upper',
  'deltoids-front', 'deltoids-rear', 'deltoids-side', 'forearms', 'glutes',
  'hamstrings', 'hip-abductors', 'hip-adductors', 'hip-flexors', 'lats',
  'lower-back', 'obliques', 'quads', 'rhomboids', 'rotator-cuff', 'teres-major',
  'traps-middle', 'traps-upper', 'triceps'
]);
