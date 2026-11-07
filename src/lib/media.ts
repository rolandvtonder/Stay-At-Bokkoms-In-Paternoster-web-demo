import manifest from '../media-manifest.json';

export type MediaName = keyof typeof manifest;

/** A file in public/media, respecting Vite's base URL. */
export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

/** A page of this site, respecting Vite's base URL. */
export const to = (p: string) => `${import.meta.env.BASE_URL}${p}`;

/**
 * Real pixel size of a photo, written by scripts/optimize-images.mjs, or
 * undefined if the photo is missing (e.g. deleted on the editing page).
 */
export const dims = (n: MediaName): {w: number; h: number} | undefined => (manifest as Record<string, {w: number; h: number}>)[n];
