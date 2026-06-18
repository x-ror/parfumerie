import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'parfumerie:answers';

function loadAnswers() {
  if (!browser) return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

/** questionId -> optionId for the guided quiz, persisted to localStorage. */
export const answers = writable(loadAnswers());

if (browser) {
  answers.subscribe((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* ignore quota / private mode errors */
    }
  });
}

export function resetAnswers() {
  answers.set({});
}

/** A small set of saved/favourited perfume ids. */
const FAV_KEY = 'parfumerie:favourites';
function loadFavs() {
  if (!browser) return [];
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
}
export const favourites = writable(loadFavs());
if (browser) {
  favourites.subscribe((v) => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  });
}

export function toggleFavourite(id) {
  favourites.update((list) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
  );
}
