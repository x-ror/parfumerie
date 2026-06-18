<script>
  import { answers } from '$lib/stores.js';
  import { questions } from '$lib/data/quiz.js';
  import { buildProfile, recommendPerfumes, composeBlueprint, topFamilies } from '$lib/recommend.js';
  import { CHARACTER } from '$lib/data/families.js';
  import PerfumeCard from '$lib/components/PerfumeCard.svelte';
  import NotePyramid from '$lib/components/NotePyramid.svelte';
  import FamilyTag from '$lib/components/FamilyTag.svelte';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
  import Restart from 'carbon-icons-svelte/lib/Restart.svelte';
  import Erlenmeyer from 'carbon-icons-svelte/lib/Chemistry.svelte';

  $: answered = Object.keys($answers).filter((k) => questions.some((q) => q.id === k)).length;
  $: complete = answered >= 4; // enough signal to recommend

  $: profile = buildProfile($answers);
  $: ranked = complete ? recommendPerfumes(profile) : [];
  $: blueprint = complete ? composeBlueprint(profile) : null;
  $: fams = complete ? topFamilies(profile, 4) : [];
  $: topChars = complete
    ? Object.entries(profile.character)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([k]) => CHARACTER[k] || k)
    : [];
  $: intensityLabel = ['', 'a whisper', 'a soft halo', 'comfortably present', 'confidently present', 'a bold statement'][
    Math.round(profile.targetIntensity)
  ] || 'balanced';

  let showAll = false;
  $: visible = showAll ? ranked : ranked.slice(0, 6);
</script>

<svelte:head>
  <title>Your matches — Maison Sillage</title>
</svelte:head>

{#if !complete}
  <section class="shell empty">
    <h1 class="display">Let’s find your scent first</h1>
    <p class="muted">Answer a few quick, mood-led questions and your personalised matches will appear here.</p>
    <Button icon={ArrowRight} href="/quiz/">Take the scent quiz</Button>
  </section>
{:else}
  <!-- PROFILE SUMMARY -->
  <section class="shell summary rise">
    <p class="eyebrow">Your scent profile · today</p>
    <h1 class="display title">You’re drawn to {fams[0]?.label?.toLowerCase()} with {intensityLabel}</h1>
    <p class="muted lede">
      Based on your answers, here’s the world your nose wants to live in right now. Below: ready-made
      fragrances that fit — and the exact notes you could build your own from.
    </p>
    <div class="chips">
      {#each fams as f}<FamilyTag id={f.id} size="lg" />{/each}
      {#each topChars as c}<span class="char-chip">{c}</span>{/each}
    </div>
  </section>

  <!-- BLUEPRINT -->
  <section class="shell block">
    <div class="blueprint surface rise">
      <div class="bp-glow" />
      <div class="bp-head">
        <Erlenmeyer size={24} />
        <div>
          <h2 class="display">Your olfactory blueprint</h2>
          <p class="muted">The components your signature scent could be composed from — tap a note to learn it.</p>
        </div>
      </div>
      <NotePyramid top={blueprint.top} heart={blueprint.heart} base={blueprint.base} interactive />
      <div class="bp-cta">
        <Button kind="tertiary" icon={ArrowRight} href="/atelier/">Refine it in the Atelier</Button>
      </div>
    </div>
  </section>

  <!-- MATCHES -->
  <section class="shell block">
    <div class="block-head">
      <p class="eyebrow">Curated for you</p>
      <h2 class="display section-title">Your top {ranked.length} matches</h2>
    </div>
    <div class="grid">
      {#each visible as p, i}
        <PerfumeCard perfume={p} match={p.match} reasons={p.reasons} rank={i + 1} />
      {/each}
    </div>
    {#if !showAll && ranked.length > 6}
      <div class="more-row">
        <Button kind="ghost" on:click={() => (showAll = true)}>Show all {ranked.length} matches</Button>
      </div>
    {/if}
  </section>

  <section class="shell">
    <div class="redo">
      <Button kind="ghost" icon={Restart} href="/quiz/">Retake the quiz</Button>
    </div>
  </section>
{/if}

<style>
  .empty {
    text-align: center;
    padding: 5rem 1.5rem;
    display: grid;
    gap: 1rem;
    justify-items: center;
  }
  .empty h1 {
    font-size: 2.4rem;
  }
  .empty p {
    max-width: 44ch;
  }

  .summary {
    padding-top: 2.6rem;
  }
  .title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    margin: 0.5rem 0 0.7rem;
    max-width: 18ch;
  }
  .lede {
    max-width: 60ch;
    line-height: 1.6;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.3rem;
  }
  .char-chip {
    border: 1px solid var(--line);
    background: var(--ink-3);
    border-radius: 999px;
    padding: 0.25rem 0.7rem;
    font-size: 0.78rem;
    color: #cfccc4;
  }

  .block {
    padding: 2.4rem 0 0.5rem;
  }
  .block-head {
    margin-bottom: 1.4rem;
  }
  .section-title {
    font-size: clamp(1.6rem, 4vw, 2.3rem);
    margin: 0.3rem 0 0;
  }

  .blueprint {
    position: relative;
    overflow: hidden;
    padding: 1.8rem;
  }
  .bp-glow {
    position: absolute;
    inset: -50% 20% auto auto;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(216, 178, 90, 0.18), transparent 70%);
    pointer-events: none;
  }
  .bp-head {
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
    margin-bottom: 1.4rem;
    color: var(--gold-soft);
  }
  .bp-head h2 {
    font-size: 1.7rem;
    margin: 0;
    color: #f1efe9;
  }
  .bp-head p {
    margin: 0.2rem 0 0;
    font-size: 0.86rem;
  }
  .bp-cta {
    margin-top: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1.1rem;
  }
  .more-row,
  .redo {
    display: flex;
    justify-content: center;
    margin-top: 1.6rem;
  }
</style>
