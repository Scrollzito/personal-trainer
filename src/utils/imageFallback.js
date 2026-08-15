const MACHINE_PLACEHOLDER = '/images/machine-placeholder.svg';

export function handleImageError({ currentTarget }) {
  if (currentTarget.src.endsWith(MACHINE_PLACEHOLDER)) return;
  currentTarget.src = MACHINE_PLACEHOLDER;
}
