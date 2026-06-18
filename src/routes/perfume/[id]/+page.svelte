<script>
  import { perfumes } from '$lib/data/perfumes.js';
  import { FAMILIES, SEASONS, OCCASIONS, CHARACTER } from '$lib/data/families.js';
  import { favourites, toggleFavourite } from '$lib/stores.js';
  import ScentBottle from '$lib/components/ScentBottle.svelte';
  import NotePyramid from '$lib/components/NotePyramid.svelte';
  import FamilyTag from '$lib/components/FamilyTag.svelte';
  import PerfumeCard from '$lib/components/PerfumeCard.svelte';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import ArrowLeft from 'carbon-icons-svelte/lib/ArrowLeft.svelte';
  import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
  import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';

  export let data;
  $: p = data.perfume;
  $: isFav = $favourites.includes(p.id);

  // "You may also like" — other perfumes sharing the most families.
  $: related = perfumes
    .filter((o) => o.id !== p.id)
    .map((o) => ({ o, shared: o.families.filter((f) => p.families.includes(f)).length }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((x) => x.o);

  const intensityWords = ['', 'Whisper-soft', 'Subtle', 'Moderate', 'Strong', 'Statement'];
</script>

<svelte:head>
  <title>{p.name} — {p.house}</title>
  <meta name="description" content={p.blurb} />
</svelte:head>

<section class="shell back-row">
  <a class="back" href="/catalog/"><ArrowLeft size={16} /> Back to collection</a>
</section>

<section class="shell hero" style="--accent:{p.accent}">
  <div class="hero-glow" />
  <div class="bottle-col">
    <ScentBottle accent={p.accent} size={200} label={p.name} />
  </div>
  <div class="info-col rise">
    <p class="eyebrow">{p.house}</p>
    <h1 class="display name">{p.name}</h1>
    <p class="blurb">{p.blurb}</p>

    <div class="tags">
      {#each p.families as f}<FamilyTag id={f} size="lg" />{/each}
    </div>

    <div class="actions">
      <Button
        icon={isFav ? FavoriteFilled : Favorite}
        kind={isFav ? 'secondary' : 'primary'}
        on:click={() => toggleFavourite(p.id)}
      >
        {isFav ? 'Saved' : 'Save fragrance'}
      </Button>
      <Button kind="tertiary" href="/quiz/">Find my match</Button>
    </div>
  </div>
</section>

<section class="shell detail">
  <div class="pyramid-card surface">
    <h2 class="display card-title">The composition</h2>
    <p class="muted card-sub">How {p.name} unfolds over time on your skin.</p>
    <NotePyramid top={p.notes.top} heart={p.notes.heart} base={p.notes.base} />
  </div>

  <div class="facts-card surface">
    <h2 class="display card-title">At a glance</h2>
    <dl class="facts">
      <div>
        <dt>Character</dt>
        <dd>{p.character.map((c) => CHARACTER[c] || c).join(' · ')}</dd>
      </div>
      <div>
        <dt>Intensity</dt>
        <dd>
          <span class="bars">
            {#each Array(5) as _, i}
              <span class="bar" class:on={i < p.intensity} />
            {/each}
          </span>
          {intensityWords[p.intensity]}
        </dd>
      </div>
      <div>
        <dt>Best seasons</dt>
        <dd>{p.seasons.map((s) => SEASONS[s]).join(', ')}</dd>
      </div>
      <div>
        <dt>Wear it for</dt>
        <dd>{p.occasions.map((o) => OCCASIONS[o]).join(', ')}</dd>
      </div>
      <div>
        <dt>Style</dt>
        <dd class="cap">{p.gender}</dd>
      </div>
      <div>
        <dt>Tier</dt>
        <dd>{'$'.repeat(p.priceTier)}<span class="muted">{'$'.repeat(3 - p.priceTier)}</span></dd>
      </div>
    </dl>
  </div>
</section>

<section class="shell block">
  <div class="block-head">
    <p class="eyebrow">In the same spirit</p>
    <h2 class="display section-title">You may also like</h2>
  </div>
  <div class="grid">
    {#each related as r}
      <PerfumeCard perfume={r} />
    {/each}
  </div>
</section>

<style>
  .back-row {
    padding-top: 1.6rem;
  }
  .back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    font-size: 0.85rem;
    color: #b8b5ac;
  }
  .back:hover {
    color: var(--gold-soft);
  }

  .hero {
    position: relative;
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 2rem;
    align-items: center;
    padding: 1.5rem 1.5rem 2.5rem;
    overflow: hidden;
  }
  .hero-glow {
    position: absolute;
    inset: -30% auto auto -10%;
    width: 460px;
    height: 460px;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent), transparent 65%);
    pointer-events: none;
  }
  .bottle-col {
    display: grid;
    place-items: center;
  }
  .name {
    font-size: clamp(2.4rem, 6vw, 4rem);
    margin: 0.2rem 0 0.6rem;
  }
  .blurb {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #c9c6bf;
    max-width: 52ch;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin: 1.1rem 0 1.4rem;
  }
  .actions {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
  }

  .detail {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 1.2rem;
    margin-top: 1rem;
  }
  .pyramid-card,
  .facts-card {
    padding: 1.6rem;
  }
  .card-title {
    font-size: 1.6rem;
    margin: 0;
    color: #f1efe9;
  }
  .card-sub {
    margin: 0.2rem 0 1.3rem;
    font-size: 0.86rem;
  }
  .facts {
    display: grid;
    gap: 1rem;
    margin: 1.2rem 0 0;
  }
  .facts dt {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.2rem;
  }
  .facts dd {
    margin: 0;
    color: #ddd9d1;
    font-size: 0.92rem;
  }
  .cap {
    text-transform: capitalize;
  }
  .bars {
    display: inline-flex;
    gap: 3px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  .bar {
    width: 16px;
    height: 6px;
    border-radius: 999px;
    background: var(--ink-3);
    border: 1px solid var(--line);
  }
  .bar.on {
    background: var(--gold);
    border-color: var(--gold);
  }

  .block {
    padding: 2.6rem 0 0.5rem;
  }
  .block-head {
    margin-bottom: 1.3rem;
  }
  .section-title {
    font-size: clamp(1.6rem, 4vw, 2.3rem);
    margin: 0.3rem 0 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    gap: 1.1rem;
  }

  @media (max-width: 760px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
      justify-items: center;
    }
    .detail {
      grid-template-columns: 1fr;
    }
    .actions,
    .tags {
      justify-content: center;
    }
  }
</style>
