const MUSCLE_GROUP_INFO = {
  legs: {
    name: "Legs",
    intro: "Your legs contain the largest and strongest muscles in your body. Training them helps with everyday activities like walking, climbing stairs, and standing up. Strong legs also boost your metabolism because these big muscles burn more calories.",
    recommendedOrder: [
      "smith-machine-squat", "leg-press", "hack-squat",
      "leg-extension", "leg-curl",
      "hip-abductor", "hip-adductor", "calf-raise"
    ]
  },
  chest: {
    name: "Chest",
    intro: "Your chest muscles (pectorals) are used whenever you push something away from your body. Training your chest helps with pushing doors, lifting objects, and improving your upper body posture. These machines guide the movement so you can focus on building strength safely.",
    recommendedOrder: [
      "chest-press", "incline-chest-press", "decline-chest-press",
      "pec-deck", "cable-crossover"
    ]
  },
  back: {
    name: "Back",
    intro: "Your back is made up of several muscle groups that work together to pull things toward you and keep you standing upright. A strong back improves your posture, reduces back pain, and balances out chest training. These are some of the most important muscles to train.",
    recommendedOrder: [
      "lat-pulldown", "assisted-pull-up", "seated-cable-row",
      "t-bar-row", "back-extension"
    ]
  },
  shoulders: {
    name: "Shoulders",
    intro: "Your shoulder muscles (deltoids) surround your shoulder joint and help you lift your arms in all directions. Strong shoulders make everyday reaching and lifting easier, and they help protect your shoulder joints from injury.",
    recommendedOrder: [
      "shoulder-press", "lateral-raise-machine",
      "reverse-fly-machine", "cable-face-pull"
    ]
  },
  arms: {
    name: "Arms",
    intro: "Your arms include biceps (front) and triceps (back). Biceps help you pull and curl things toward you, while triceps help you push things away. Most people want to train arms, and these machines make it easy to isolate each muscle safely.",
    recommendedOrder: [
      "cable-bicep-curl", "preacher-curl",
      "tricep-pushdown", "cable-tricep-extension"
    ]
  },
  core: {
    name: "Core",
    intro: "Your core includes your abs, obliques, and lower back muscles. These muscles stabilize your entire body during every movement you make. A strong core helps prevent injuries, improves balance, and supports good posture throughout the day.",
    recommendedOrder: [
      "ab-crunch-machine", "cable-woodchop",
      "captains-chair", "core-back-extension"
    ]
  },
  cardio: {
    name: "Cardio",
    intro: "Cardiovascular exercise strengthens your heart and lungs, burns calories, and improves your endurance. These machines let you do cardio indoors at your own pace. Start slow and gradually increase intensity as your fitness improves.",
    recommendedOrder: [
      "treadmill", "elliptical", "stationary-bike",
      "rowing-machine", "stair-climber"
    ]
  }
};

export default MUSCLE_GROUP_INFO;
