import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import muscleGroups from '../src/data/muscleGroups.js';
import { DRAWN_MUSCLE_REGIONS, MUSCLE_MAP } from '../src/data/muscleMap.js';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const readJson = (path) => JSON.parse(readFileSync(join(rootDir, path), 'utf8'));
const { machines } = readJson('src/data/machines.json');
const { workouts } = readJson('src/data/workouts.json');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

function checkUniqueIds(items, label) {
  const seen = new Set();
  items.forEach(({ id }, index) => {
    check(typeof id === 'string' && id.length > 0, `${label} at index ${index} has no ID`);
    check(!seen.has(id), `${label} ID is duplicated: ${id}`);
    seen.add(id);
  });
}

checkUniqueIds(machines, 'Machine');
checkUniqueIds(workouts, 'Workout');

const machineIds = new Set(machines.map(({ id }) => id));

machines.forEach((machine) => {
  const thumbnail = typeof machine.thumbnail === 'string'
    ? machine.thumbnail.replace(/^\/+/, '')
    : '';
  check(
    thumbnail && existsSync(join(rootDir, 'public', thumbnail)),
    `Machine ${machine.id} has a missing thumbnail: ${machine.thumbnail}`
  );

  check(Array.isArray(machine.steps), `Machine ${machine.id} has no steps array`);
  if (Array.isArray(machine.steps)) {
    machine.steps.forEach((step, index) => {
      check(
        step.number === index + 1,
        `Machine ${machine.id} step ${index + 1} is numbered ${step.number}`
      );
    });
  }
});

workouts.forEach((workout) => {
  workout.exercises.forEach(({ machineId }, index) => {
    check(
      machineIds.has(machineId),
      `Workout ${workout.id} exercise ${index + 1} references unknown machine ${machineId}`
    );
  });
});

Object.entries(muscleGroups).forEach(([group, { recommendedOrder }]) => {
  recommendedOrder.forEach((machineId) => {
    check(
      machineIds.has(machineId),
      `Recommended order for ${group} references unknown machine ${machineId}`
    );
  });
});

const muscleLabels = new Set(machines.flatMap(({ musclesWorked = [] }) => musclesWorked));
muscleLabels.forEach((muscle) => {
  const regions = MUSCLE_MAP[muscle];
  check(Array.isArray(regions) && regions.length > 0, `Muscle label has no diagram mapping: ${muscle}`);
  regions?.forEach((region) => {
    check(
      DRAWN_MUSCLE_REGIONS.has(region),
      `Muscle label ${muscle} maps to undrawn region ${region}`
    );
  });
});

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Data valid: ${machines.length} machines, ${workouts.length} workouts, ` +
    `${muscleLabels.size} muscle labels.`
  );
}
