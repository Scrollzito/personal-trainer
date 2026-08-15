const MUSCLE_GROUP_INFO = {
  legs: {
    name: "Legs",
    intro: "Your legs contain some of the largest and strongest muscles in your body. Training them supports everyday activities like walking, climbing stairs, and standing up, while adding large-muscle strength work to your routine.",
    recommendedOrder: [
      "smith-machine-squat", "leg-press", "hack-squat",
      "leg-extension", "leg-curl",
      "hip-abductor", "hip-adductor", "calf-raise"
    ]
  },
  chest: {
    name: "Chest",
    intro: "Your chest muscles (pectorals) are used whenever you push something away from your body. Training your chest supports pushing and lifting tasks. These machines guide the movement so you can focus on controlled technique.",
    recommendedOrder: [
      "chest-press", "incline-chest-press", "decline-chest-press",
      "pec-deck", "cable-crossover"
    ]
  },
  back: {
    name: "Back",
    intro: "Your back is made up of several muscle groups that work together to pull things toward you and keep you standing upright. Training your back can support upright posture and balance chest-focused training.",
    recommendedOrder: [
      "lat-pulldown", "assisted-pull-up", "seated-cable-row",
      "t-bar-row", "back-extension"
    ]
  },
  shoulders: {
    name: "Shoulders",
    intro: "Your shoulder muscles (deltoids) surround your shoulder joint and help you lift your arms in all directions. Training them can support everyday reaching and lifting tasks.",
    recommendedOrder: [
      "shoulder-press", "lateral-raise-machine",
      "reverse-fly-machine", "cable-face-pull"
    ]
  },
  arms: {
    name: "Arms",
    intro: "Your arms include biceps (front) and triceps (back). Biceps help you pull and curl things toward you, while triceps help you push things away. These machines use a guided setup so you can focus on controlled movement.",
    recommendedOrder: [
      "cable-bicep-curl", "preacher-curl",
      "tricep-pushdown", "cable-tricep-extension"
    ]
  },
  core: {
    name: "Core",
    intro: "Your core includes your abs, obliques, and lower back muscles. These muscles help stabilize your body during movement. Training them can support balance and controlled posture during daily activities.",
    recommendedOrder: [
      "ab-crunch-machine", "cable-woodchop",
      "captains-chair", "core-back-extension"
    ]
  },
  cardio: {
    name: "Cardio",
    intro: "Cardiovascular exercise can improve cardiorespiratory fitness and endurance while increasing energy use. These machines let you do cardio indoors at your own pace. Start slowly and increase intensity gradually as your fitness improves.",
    recommendedOrder: [
      "treadmill", "elliptical", "stationary-bike",
      "rowing-machine", "stair-climber"
    ]
  }
};

export default MUSCLE_GROUP_INFO;
