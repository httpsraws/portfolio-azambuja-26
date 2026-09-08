import { PROJECTS } from '../data/projects';

/**
 * Returns formatted 2-digit project slug in sequential order (01, 02, ..., 12)
 */
export const getProjectSlug = (index: number): string => {
  return String(index + 1).padStart(2, '0');
};

/**
 * Parses a pathname or hash string and returns the corresponding project index, or null if home/invalid.
 */
export const parseProjectIndexFromLocation = (): number | null => {
  if (typeof window === 'undefined') return null;

  // 1. Check pathname first: e.g. "/01", "/02", "/bacio-zero"
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const candidate = pathSegments[pathSegments.length - 1];
    const index = resolveCandidateToIndex(candidate);
    if (index !== null) return index;
  }

  // 2. Fallback to hash: e.g. "#/01", "#01", "#/bacio-zero"
  const hash = window.location.hash.replace(/^#\/?/, '');
  const hashSegments = hash.split('/').filter(Boolean);
  if (hashSegments.length > 0) {
    const candidate = hashSegments[hashSegments.length - 1];
    const index = resolveCandidateToIndex(candidate);
    if (index !== null) return index;
  }

  return null;
};

/**
 * Resolves a slug candidate string (e.g. "01", "1", "bacio-zero") to a 0-based project index.
 */
const resolveCandidateToIndex = (candidate: string): number | null => {
  const clean = candidate.trim().toLowerCase();
  
  // Numerical slug (01, 02, ..., 12)
  const num = parseInt(clean, 10);
  if (!isNaN(num) && num >= 1 && num <= PROJECTS.length) {
    return num - 1;
  }

  // Fallback by project ID
  const foundIndex = PROJECTS.findIndex((p) => p.id.toLowerCase() === clean);
  if (foundIndex !== -1) {
    return foundIndex;
  }

  return null;
};

/**
 * Gets absolute shareable URL for a given project index
 */
export const getProjectShareUrl = (index: number): string => {
  if (typeof window === 'undefined') return `/${getProjectSlug(index)}`;
  const origin = window.location.origin;
  return `${origin}/${getProjectSlug(index)}`;
};
