import { perfumes } from './data/perfumes.js';
import { ingredients } from './data/ingredients.js';
import { questions } from './data/quiz.js';
import { FAMILIES } from './data/families.js';

/**
 * Build an aggregated taste profile from the user's quiz answers.
 * @param {Record<string,string>} answers  questionId -> optionId
 */
export function buildProfile(answers) {
  const profile = {
    families: {},
    character: {},
    seasons: {},
    occasions: {},
    gender: {},
    intensitySum: 0,
    intensityCount: 0
  };

  for (const q of questions) {
    const choice = answers[q.id];
    if (!choice) continue;
    const opt = q.options.find((o) => o.id === choice);
    if (!opt) continue;
    const w = opt.weights || {};
    accumulate(profile.families, w.families);
    accumulate(profile.character, w.character);
    accumulate(profile.seasons, w.seasons);
    accumulate(profile.occasions, w.occasions);
    accumulate(profile.gender, w.gender);
    if (typeof w.intensity === 'number') {
      profile.intensitySum += w.intensity;
      profile.intensityCount += 1;
    }
  }

  profile.targetIntensity = profile.intensityCount
    ? profile.intensitySum / profile.intensityCount
    : 3;

  return profile;
}

function accumulate(target, source) {
  if (!source) return;
  for (const [k, v] of Object.entries(source)) {
    target[k] = (target[k] || 0) + v;
  }
}

function dot(profileMap, tags) {
  let sum = 0;
  for (const t of tags) sum += profileMap[t] || 0;
  return sum;
}

/** Top scent families from the profile, most-wanted first. */
export function topFamilies(profile, limit = 4) {
  return Object.entries(profile.families)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, weight]) => ({ id, weight, ...FAMILIES[id] }));
}

/**
 * Score every perfume against the profile and return them ranked, each with
 * a friendly match percentage and the reasons it was picked.
 */
export function recommendPerfumes(profile) {
  const scored = perfumes.map((p) => {
    const familyScore = dot(profile.families, p.families) * 1.0;
    const characterScore = dot(profile.character, p.character) * 0.8;
    const seasonScore = dot(profile.seasons, p.seasons) * 0.6;
    const occasionScore = dot(profile.occasions, p.occasions) * 0.7;
    const intensityScore = (1 - Math.abs(p.intensity - profile.targetIntensity) / 4) * 3;
    const genderScore = (profile.gender[p.gender] || 0) + (p.gender === 'unisex' ? 0.3 : 0);

    const raw =
      familyScore + characterScore + seasonScore + occasionScore + intensityScore + genderScore;

    return { perfume: p, raw, parts: { familyScore, characterScore, seasonScore, occasionScore, intensityScore } };
  });

  const max = Math.max(...scored.map((s) => s.raw), 1);
  const min = Math.min(...scored.map((s) => s.raw));
  const span = Math.max(max - min, 0.0001);

  return scored
    .map((s) => ({
      ...s.perfume,
      raw: s.raw,
      // Map best -> 99, worst -> 55 so matches feel encouraging but honest.
      match: Math.round(55 + ((s.raw - min) / span) * 44),
      reasons: buildReasons(s.perfume, profile)
    }))
    .sort((a, b) => b.raw - a.raw);
}

function buildReasons(p, profile) {
  const reasons = [];
  const fam = topFamilies(profile, 3).map((f) => f.id);
  const shared = p.families.filter((f) => fam.includes(f));
  if (shared.length) {
    reasons.push(
      `Built on ${shared.map((f) => FAMILIES[f].label.toLowerCase()).join(' & ')} notes you leaned toward`
    );
  }
  const charMatch = p.character.filter((c) => (profile.character[c] || 0) > 0);
  if (charMatch.length) {
    reasons.push(`Feels ${charMatch.slice(0, 2).join(' & ')}`);
  }
  if (Math.abs(p.intensity - profile.targetIntensity) <= 1) {
    reasons.push('Projection matches the volume you wanted');
  }
  const season = Object.keys(profile.seasons).sort(
    (a, b) => profile.seasons[b] - profile.seasons[a]
  )[0];
  if (season && p.seasons.includes(season)) {
    reasons.push(`Great for your ${season} mood`);
  }
  return reasons;
}

/**
 * Compose a personalised fragrance pyramid (the components someone could
 * actually build *their* perfume from) out of the families they favoured.
 */
export function composeBlueprint(profile) {
  const famWeight = profile.families;
  const wantedIntensity = profile.targetIntensity;

  const pick = (role, count) => {
    return ingredients
      .filter((i) => i.role === role)
      .map((i) => {
        const familyPull = famWeight[i.family] || 0;
        // Favour notes whose own weight suits the desired loudness.
        const intensityFit = 1 - Math.abs(i.intensity - wantedIntensity) / 5;
        return { ...i, score: familyPull * 1.2 + intensityFit };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  };

  return {
    top: pick('top', 3),
    heart: pick('heart', 3),
    base: pick('base', 2)
  };
}
