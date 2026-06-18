# Maison Sillage — a guided perfume finder

A clean, dark-luxe web app that helps people discover the fragrance that fits
how they want to feel **today** — and reveals the individual notes their own
perfume could be composed from.

Built with **SvelteKit** + **Carbon Design System** (`carbon-components-svelte`).

## What it does

- **🧭 Mood-led scent quiz** — seven short, feeling-first questions ("where do
  you find calm? where passion?") rather than dry technical jargon. Each answer
  carries hidden weights that build an olfactory profile.
- **✨ Personalised matches** — a scoring engine ranks ~40 curated fragrances
  against your profile (scent families, character, season, occasion, intensity)
  and explains *why* each was chosen.
- **🧪 Your olfactory blueprint** — beyond finished perfumes, the app composes a
  personal **top / heart / base** pyramid of the actual notes your signature
  scent could be built from.
- **⚗️ The Atelier** — an interactive build-your-own studio: pick notes, watch a
  live bottle + pyramid take shape, read its character, and find the ready-made
  fragrances closest to your creation.
- **📚 The Collection** — browse and filter all fragrances by family, style and
  note, with a search and a saved-favourites list (persisted locally).

## Tech

| | |
|---|---|
| Framework | SvelteKit (Svelte 5) |
| UI | Carbon Design System — `g100` dark theme |
| Rendering | Fully prerendered static site (`@sveltejs/adapter-static`) |
| State | Svelte stores + `localStorage` (quiz answers, favourites) |

## Project structure

```
src/
  lib/
    data/
      families.js      # 14 scent families + character/season/occasion taxonomies
      perfumes.js      # ~40 curated fragrances (original, fictional)
      ingredients.js   # individual notes for blueprint + Atelier
      quiz.js          # mood-led questions with scoring weights
    recommend.js       # profile builder, perfume scorer, blueprint composer
    stores.js          # persisted answers + favourites
    components/        # ScentBottle, NotePyramid, MatchRing, PerfumeCard, FamilyTag
  routes/
    +page.svelte           # landing
    quiz/                  # the guided quiz
    results/               # matches + olfactory blueprint
    atelier/               # build-your-own studio
    catalog/               # filterable collection
    perfume/[id]/          # fragrance detail (prerendered per perfume)
```

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs static site to ./build
npm run preview  # preview the production build
```

## Note

All fragrances, houses and notes are **original and fictional**, written for
this demo. Nothing here is affiliated with any real perfume brand.
