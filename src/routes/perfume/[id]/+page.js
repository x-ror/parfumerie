import { error } from '@sveltejs/kit';
import { perfumes, perfumeById } from '$lib/data/perfumes.js';

export const prerender = true;

// Generate a static page for every fragrance.
export function entries() {
  return perfumes.map((p) => ({ id: p.id }));
}

export function load({ params }) {
  const perfume = perfumeById[params.id];
  if (!perfume) throw error(404, 'Fragrance not found');
  return { perfume };
}
