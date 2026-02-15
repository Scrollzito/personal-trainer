# Master Muscle Naming Glossary

**Purpose:** This document defines the standardized muscle terminology for all 50 machines in the Personal Trainer app. Use this as the single source of truth when revising machine data.

**Format Standard:** `"Common Name (Anatomical Clarification)"`

**Last Updated:** 2024

---

## Standardized Muscle Names by Body Region

### LEGS

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Quadriceps (Front Thighs)** | All quad-focused exercises | Primary knee extensors |
| **Hamstrings (Back Thighs)** | All hamstring exercises | Knee flexors, hip extensors |
| **Glutes (Buttocks)** | All glute exercises | Primary hip extensors |
| **Calves (Gastrocnemius & Soleus)** | All calf exercises | Ankle plantar flexors |
| **Hip Adductors (Inner Thighs)** | Inner thigh machines | Adductor group |
| **Hip Abductors (Outer Thighs)** | Outer thigh machines | Gluteus medius primarily |

**Example Usage:**
```json
"musclesWorked": ["Quadriceps (Front Thighs)", "Glutes (Buttocks)", "Hamstrings (Back Thighs)"]
```

---

### CHEST

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Chest (Pectoralis Major)** | General chest exercises | Both upper and middle portions |
| **Upper Chest (Upper Pectorals)** | Incline press, incline fly | Clavicular head emphasis |
| **Lower Chest (Lower Pectorals)** | Decline press, dips | Sternal head lower portion |

**Example Usage:**
```json
"musclesWorked": ["Chest (Pectoralis Major)", "Front Shoulders (Anterior Deltoids)", "Triceps (Back of Upper Arm)"]
```

---

### BACK

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Lats (Latissimus Dorsi)** | Pull-ups, pulldowns, rows | Large back muscles |
| **Middle Back (Rhomboids & Traps)** | Rows, reverse fly | Scapular retractors |
| **Lower Back (Erector Spinae)** | Back extension, deadlifts | Spinal extensors |
| **Traps (Trapezius)** | Shrugs, upright rows | Upper, middle, lower portions |

**Example Usage:**
```json
"musclesWorked": ["Lats (Latissimus Dorsi)", "Middle Back (Rhomboids & Traps)", "Biceps (Front of Upper Arm)"]
```

**Notes:**
- For rowing exercises: List "Lats" first, then "Middle Back"
- For pulldowns: Focus on "Lats" as primary
- Don't use generic "Back" - always specify which back muscles

---

### SHOULDERS

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Front Shoulders (Anterior Deltoids)** | Pressing movements, front raises | Shoulder flexion |
| **Side Shoulders (Lateral Deltoids)** | Lateral raises, overhead press | Shoulder abduction |
| **Rear Shoulders (Posterior Deltoids)** | Reverse fly, face pulls, rows | Shoulder horizontal abduction |
| **Rotator Cuff (Shoulder Stabilizers)** | External rotation exercises | SITS muscles |

**Example Usage:**
```json
"musclesWorked": ["Side Shoulders (Lateral Deltoids)", "Front Shoulders (Anterior Deltoids)", "Traps (Trapezius)"]
```

**Notes:**
- Most pressing: Front + Side shoulders
- Lateral raises: Side shoulders primary
- Face pulls: Rear shoulders + rotator cuff

---

### ARMS

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Biceps (Front of Upper Arm)** | Curls, pulling exercises | Elbow flexors |
| **Triceps (Back of Upper Arm)** | Extensions, pressing | Elbow extensors |
| **Forearms (Brachioradialis & Wrist Flexors)** | Grip exercises, hammer curls | Wrist/grip muscles |
| **Brachialis (Elbow Flexor)** | Hammer curls, reverse curls | Deep to biceps |

**Example Usage:**
```json
"musclesWorked": ["Biceps (Front of Upper Arm)", "Brachialis (Elbow Flexor)", "Forearms (Brachioradialis & Wrist Flexors)"]
```

**Notes:**
- Hammer curls: List Brachialis first, then Biceps
- Standard curls: List Biceps first
- Include Forearms when grip is significant

---

### CORE

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Abs (Rectus Abdominis)** | Crunches, sit-ups, leg raises | "Six-pack" muscle |
| **Obliques (Side Abs)** | Side bends, rotations, woodchops | Internal and external |
| **Deep Core (Transverse Abdominis)** | Planks, anti-rotation exercises | Deep stabilizer |
| **Hip Flexors (Iliopsoas)** | Leg raises, sit-ups | Hip flexion muscles |
| **Lower Back (Erector Spinae)** | Back extension, planks | Also listed in BACK section |

**Example Usage:**
```json
"musclesWorked": ["Abs (Rectus Abdominis)", "Obliques (Side Abs)", "Hip Flexors (Iliopsoas)"]
```

**Notes:**
- Sit-ups: Include Hip Flexors as secondary
- Pure crunches: Focus on Abs, minimal hip flexor
- Rotations: Obliques primary
- Lower Back appears in both BACK and CORE categories

---

### CARDIO

| Standard Name | Use For | Notes |
|--------------|---------|-------|
| **Cardiovascular System (Heart & Lungs)** | All cardio machines | Always last in list |

**Special Case - Full Body Cardio:**
For machines like rowing, treadmill, elliptical that work multiple muscle groups:
```json
"musclesWorked": [
  "Lats (Latissimus Dorsi)",
  "Quadriceps (Front Thighs)",
  "Glutes (Buttocks)",
  "Hamstrings (Back Thighs)",
  "Cardiovascular System (Heart & Lungs)"
]
```

**Notes:**
- List specific muscles worked (up to 4), then add Cardiovascular System
- Don't use generic "Legs", "Arms", "Back" - be specific
- Cardiovascular System always appears last

---

## Naming Principles

### 1. Prioritization
**Always list muscles in order of activation:**
- Primary movers (most active) first
- Secondary muscles (synergists) after
- Stabilizers last (if relevant)

### 2. Limit to 5 Muscles
**Maximum 5 muscles per machine** to avoid overwhelming beginners:
- ✅ GOOD: `["Chest (Pectoralis Major)", "Front Shoulders (Anterior Deltoids)", "Triceps (Back of Upper Arm)"]`
- ❌ TOO MANY: `["Chest", "Upper Chest", "Lower Chest", "Front Shoulders", "Side Shoulders", "Triceps", "Forearms"]`

### 3. Consistency
**Use the exact names from this glossary:**
- ✅ CORRECT: `"Lats (Latissimus Dorsi)"`
- ❌ WRONG: `"Latissimus Dorsi"` (missing common name)
- ❌ WRONG: `"Lats"` (missing anatomical clarification)
- ❌ WRONG: `"Back"` (too generic)

### 4. Parenthetical Format
**Always include common name + anatomical clarification:**
- Common name first (what beginners know)
- Anatomical term in parentheses (educational)
- Exception: When common name = anatomical name (e.g., "Biceps")

---

## Common Mistakes to Avoid

### ❌ DON'T Use Generic Terms
- "Back" → Use specific: "Lats", "Middle Back", or "Lower Back"
- "Legs" → Use specific: "Quadriceps", "Hamstrings", "Glutes", "Calves"
- "Arms" → Use specific: "Biceps", "Triceps", "Forearms"
- "Shoulders" → Use specific: "Front Shoulders", "Side Shoulders", "Rear Shoulders"
- "Core" → Use specific: "Abs", "Obliques", "Deep Core"

**Exception:** Only use generic terms for full-body cardio where ALL parts are involved

### ❌ DON'T Mix Naming Formats
- ✅ CONSISTENT: All entries use "Common Name (Anatomical)"
- ❌ INCONSISTENT: Mix of "Chest (Pectorals)", "Latissimus Dorsi", "Quads", "Back"

### ❌ DON'T Oversimplify
- ✅ CORRECT: "Quadriceps (Front Thighs)" - gives context
- ❌ TOO SIMPLE: "Quads" - no clarification
- ❌ TOO TECHNICAL: "Quadriceps Femoris" - intimidating to beginners

### ❌ DON'T Over-Specify
- ✅ CORRECT: "Triceps (Back of Upper Arm)"
- ❌ TOO DETAILED: "Triceps Long Head (Back of Upper Arm)"
- ❌ TOO DETAILED: "Rectus Femoris (Quadriceps)" - subdivision unnecessary for beginners

---

## Quick Reference Table

**Alphabetical lookup for all standardized names:**

| Standard Name | Category | SVG Path Mapping |
|--------------|----------|------------------|
| Abs (Rectus Abdominis) | Core | abs |
| Biceps (Front of Upper Arm) | Arms | biceps |
| Brachialis (Elbow Flexor) | Arms | biceps |
| Calves (Gastrocnemius & Soleus) | Legs | calves |
| Cardiovascular System (Heart & Lungs) | Cardio | (none) |
| Chest (Pectoralis Major) | Chest | chest |
| Deep Core (Transverse Abdominis) | Core | abs |
| Forearms (Brachioradialis & Wrist Flexors) | Arms | forearms |
| Front Shoulders (Anterior Deltoids) | Shoulders | deltoids-front |
| Glutes (Buttocks) | Legs | glutes |
| Hamstrings (Back Thighs) | Legs | hamstrings |
| Hip Abductors (Outer Thighs) | Legs | hip-abductors |
| Hip Adductors (Inner Thighs) | Legs | hip-adductors |
| Hip Flexors (Iliopsoas) | Core | (hip-flexors) |
| Lats (Latissimus Dorsi) | Back | lats |
| Lower Back (Erector Spinae) | Back/Core | lower-back |
| Lower Chest (Lower Pectorals) | Chest | chest-lower |
| Middle Back (Rhomboids & Traps) | Back | rhomboids, traps-middle |
| Obliques (Side Abs) | Core | obliques |
| Quadriceps (Front Thighs) | Legs | quads |
| Rear Shoulders (Posterior Deltoids) | Shoulders | deltoids-rear |
| Rotator Cuff (Shoulder Stabilizers) | Shoulders | rotator-cuff |
| Side Shoulders (Lateral Deltoids) | Shoulders | deltoids-side |
| Traps (Trapezius) | Back | traps-upper, traps-middle |
| Triceps (Back of Upper Arm) | Arms | triceps |
| Upper Chest (Upper Pectorals) | Chest | chest-upper |

---

## Usage in machines.json

### Template
```json
{
  "id": "machine-name",
  "name": "Machine Name",
  "musclesWorked": [
    "Primary Muscle (Anatomical)",
    "Secondary Muscle (Anatomical)",
    "Tertiary Muscle (Anatomical)"
  ]
}
```

### Real Examples

**Leg Press:**
```json
"musclesWorked": [
  "Quadriceps (Front Thighs)",
  "Glutes (Buttocks)",
  "Hamstrings (Back Thighs)"
]
```

**Lat Pulldown:**
```json
"musclesWorked": [
  "Lats (Latissimus Dorsi)",
  "Biceps (Front of Upper Arm)",
  "Middle Back (Rhomboids & Traps)"
]
```

**Bench Press:**
```json
"musclesWorked": [
  "Chest (Pectoralis Major)",
  "Front Shoulders (Anterior Deltoids)",
  "Triceps (Back of Upper Arm)"
]
```

**Cable Hammer Curl:**
```json
"musclesWorked": [
  "Brachialis (Elbow Flexor)",
  "Biceps (Front of Upper Arm)",
  "Forearms (Brachioradialis & Wrist Flexors)"
]
```

**Rowing Machine (Cardio):**
```json
"musclesWorked": [
  "Lats (Latissimus Dorsi)",
  "Quadriceps (Front Thighs)",
  "Glutes (Buttocks)",
  "Hamstrings (Back Thighs)",
  "Cardiovascular System (Heart & Lungs)"
]
```

---

## Revision Checklist

When updating a machine's `musclesWorked` array:

- [ ] Verify muscle names match this glossary exactly (copy/paste recommended)
- [ ] List muscles in activation order (primary → secondary)
- [ ] Limit to maximum 5 muscles
- [ ] No generic terms unless full-body cardio
- [ ] All entries use "Common Name (Anatomical)" format
- [ ] Cross-reference with ExRx.net for accuracy
- [ ] Check MuscleDiagram.jsx MUSCLE_MAP for SVG compatibility

---

## Trusted Source References

**For muscle activation verification:**
- **ExRx.net** - Exercise Directory by muscle group
  - https://exrx.net/Lists/Directory
  - Most authoritative source for muscle activation

**For beginner-friendly terminology:**
- **ACE Fitness** - Exercise Library
  - Uses accessible language
  - Good for common name references

**For biomechanics and specificity:**
- **NASM/NSCA Resources**
  - Professional trainer standards
  - Detailed muscle function descriptions

---

## Version History

- **v1.0 (2024)** - Initial glossary creation
  - 26 standardized muscle names across 6 categories
  - Format: "Common Name (Anatomical Clarification)"
  - Designed for beginner accessibility while maintaining accuracy
