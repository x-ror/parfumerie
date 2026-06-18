<script>
  import ScentBottle from './ScentBottle.svelte';
  import MatchRing from './MatchRing.svelte';
  import FamilyTag from './FamilyTag.svelte';
  import { favourites, toggleFavourite } from '$lib/stores.js';
  import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
  import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';

  export let perfume;
  export let match = null; // optional number
  export let reasons = [];
  export let rank = null;

  $: isFav = $favourites.includes(perfume.id);
</script>

<article class="card surface rise" style="--accent:{perfume.accent}">
  <div class="glow" />
  {#if rank}
    <span class="rank">{rank}</span>
  {/if}

  <button
    class="fav"
    on:click|preventDefault={() => toggleFavourite(perfume.id)}
    aria-label={isFav ? 'Remove from saved' : 'Save fragrance'}
  >
    {#if isFav}<FavoriteFilled />{:else}<Favorite />{/if}
  </button>

  <a class="link" href="/perfume/{perfume.id}">
    <div class="bottle">
      <ScentBottle accent={perfume.accent} size={92} label={perfume.name} />
    </div>

    <div class="body">
      <div class="top-row">
        <div>
          <p class="house">{perfume.house}</p>
          <h3 class="name display">{perfume.name}</h3>
        </div>
        {#if match !== null}
          <MatchRing value={match} accent={perfume.accent} />
        {/if}
      </div>

      <p class="blurb">{perfume.blurb}</p>

      <div class="families">
        {#each perfume.families.slice(0, 3) as f}
          <FamilyTag id={f} />
        {/each}
      </div>

      {#if reasons.length}
        <ul class="reasons">
          {#each reasons.slice(0, 2) as r}
            <li>{r}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </a>
</article>

<style>
  .card {
    position: relative;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
  }
  .card:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
  }
  .glow {
    position: absolute;
    inset: -40% -40% auto auto;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%);
    pointer-events: none;
  }
  .link {
    display: flex;
    gap: 0.5rem;
    padding: 1.15rem;
    text-decoration: none;
    color: inherit;
  }
  .bottle {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
  }
  .body {
    flex: 1 1 auto;
    min-width: 0;
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .house {
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0;
  }
  .name {
    font-size: 1.5rem;
    margin: 0.1rem 0 0;
    color: #f3f1ec;
  }
  .blurb {
    color: #b8b5ac;
    font-size: 0.86rem;
    line-height: 1.45;
    margin: 0.5rem 0 0.7rem;
  }
  .families {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .reasons {
    list-style: none;
    margin: 0.7rem 0 0;
    padding: 0;
    display: grid;
    gap: 0.25rem;
  }
  .reasons li {
    font-size: 0.76rem;
    color: #9b988f;
    padding-left: 1rem;
    position: relative;
  }
  .reasons li::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: var(--gold);
    font-size: 0.7rem;
  }
  .rank {
    position: absolute;
    top: 0.9rem;
    left: 1.1rem;
    font-family: var(--display);
    font-size: 1.1rem;
    color: var(--gold-soft);
    background: color-mix(in srgb, var(--accent) 18%, #0b0b0d);
    border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    z-index: 3;
  }
  .fav {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    z-index: 3;
    background: rgba(11, 11, 13, 0.55);
    border: 1px solid var(--line);
    color: var(--gold-soft);
    border-radius: 50%;
    width: 2.1rem;
    height: 2.1rem;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .fav:hover {
    background: rgba(216, 178, 90, 0.18);
    transform: scale(1.08);
  }
</style>
