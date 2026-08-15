import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import muscleGroups from '../src/data/muscleGroups.js';
import { DRAWN_MUSCLE_REGIONS, MUSCLE_MAP } from '../src/data/muscleMap.js';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const readJson = (path) => JSON.parse(readFileSync(join(rootDir, path), 'utf8'));
const { machines } = readJson('src/data/machines.json');
const { workouts } = readJson('src/data/workouts.json');
const errors = [];
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
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
const machineImageDir = join(rootDir, 'public', 'images', 'machines');
const machineImageFiles = readdirSync(machineImageDir, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .sort();
const referencedMachineImages = new Set();

machines.forEach((machine) => {
  const thumbnail = typeof machine.thumbnail === 'string'
    ? machine.thumbnail.replace(/^\/+/, '')
    : '';
  const thumbnailPath = join(rootDir, 'public', thumbnail);
  check(
    thumbnail && existsSync(thumbnailPath),
    `Machine ${machine.id} has a missing thumbnail: ${machine.thumbnail}`
  );
  check(
    extname(thumbnail).toLowerCase() === '.png',
    `Machine ${machine.id} thumbnail must use a .png extension: ${machine.thumbnail}`
  );
  if (thumbnail.startsWith('images/machines/')) {
    referencedMachineImages.add(basename(thumbnail));
  }
  if (thumbnail && existsSync(thumbnailPath)) {
    check(
      readFileSync(thumbnailPath).subarray(0, pngSignature.length).equals(pngSignature),
      `Machine ${machine.id} thumbnail is not a PNG payload: ${machine.thumbnail}`
    );
  }

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

const imageHashes = new Map();
machineImageFiles.forEach((fileName) => {
  const image = readFileSync(join(machineImageDir, fileName));
  check(
    extname(fileName).toLowerCase() === '.png',
    `Machine image must use a .png extension: ${fileName}`
  );
  check(
    image.subarray(0, pngSignature.length).equals(pngSignature),
    `Machine image does not contain a PNG payload: ${fileName}`
  );
  check(
    referencedMachineImages.has(fileName),
    `Machine image is not referenced by machines.json: ${fileName}`
  );

  const hash = createHash('sha256').update(image).digest('hex');
  imageHashes.set(hash, [...(imageHashes.get(hash) || []), fileName]);
});

const duplicateImageGroups = [...imageHashes.values()].filter((files) => files.length > 1);

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

console.log(`Duplicate machine image payloads: ${duplicateImageGroups.length} group(s).`);
duplicateImageGroups.forEach((files) => console.log(`- ${files.join(', ')}`));

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
