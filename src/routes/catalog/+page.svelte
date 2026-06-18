<script>
  import { perfumes } from '$lib/data/perfumes.js';
  import { familyList } from '$lib/data/families.js';
  import { favourites } from '$lib/stores.js';
  import PerfumeCard from '$lib/components/PerfumeCard.svelte';
  import Search from 'carbon-components-svelte/src/Search/Search.svelte';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';

  let query = '';
  let activeFamily = 'all';
  let activeGender = 'all';
  let onlySaved = false;

  const genders = [
    { id: 'all', label: 'Everyone' },
    { id: 'feminine', label: 'Feminine' },
    { id: 'masculine', label: 'Masculine' },
    { id: 'unisex', label: 'Unisex' }
  ];

  $: filtered = perfumes.filter((p) => {
    if (activeFamily !== 'all' && !p.families.includes(activeFamily)) return false;
    if (activeGender !== 'all' && p.gender !== activeGender) return false;
    if (onlySaved && !$favourites.includes(p.id)) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const hay = [
        p.name,
        p.house,
        p.blurb,
        ...p.families,
        ...Object.values(p.notes).flat()
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  function reset() {
    query = '';
    activeFamily = 'all';
    activeGender = 'all';
    onlySaved = false;
  }
</script>

<svelte:head>
  <title>The Collection — Maison Sillage</title>
</svelte:head>

<section class="shell intro">
  <p class="eyebrow">The Collection</p>
  <h1 class="display title">Browse all {perfumes.length} fragrances</h1>
  <p class="muted lede">Filter by family, style or note — or search for what you love.</p>
</section>

<section class="shell filters">
  <div class="search-wrap">
    <Search placeholder="Search name, house or note (e.g. vanilla, vetiver)…" bind:value={query} />
  </div>

  <div class="filter-row">
    <div class="pills">
      <button class="pill" class:on={activeFamily === 'all'} on:click={() => (activeFamily = 'all')}>
        All families
      </button>
      {#each familyList as f}
        <button
          class="pill"
          class:on={activeFamily === f.id}
          style="--c:{f.accent}"
          on:click={() => (activeFamily = activeFamily === f.id ? 'all' : f.id)}
        >
          {f.emoji} {f.label}
        </button>
      {/each}
    </div>
  </div>

  <div class="filter-row split">
    <div class="pills">
      {#each genders as g}
        <button class="pill ghost" class:on={activeGender === g.id} on:click={() => (activeGender = g.id)}>
          {g.label}
        </button>
      {/each}
      <button class="pill ghost" class:on={onlySaved} on:click={() => (onlySaved = !onlySaved)}>
        ♥ Saved {#if $favourites.length}({$favourites.length}){/if}
      </button>
    </div>
    <span class="count muted">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
  </div>
</section>

<section class="shell">
  {#if filtered.length}
    <div class="grid">
      {#each filtered as p (p.id)}
        <PerfumeCard perfume={p} />
      {/each}
    </div>
  {:else}
    <div class="empty surface">
      <p class="display">Nothing matches that — yet.</p>
      <p class="muted">Try loosening a filter or searching a different note.</p>
      <Button kind="tertiary" on:click={reset}>Clear filters</Button>
    </div>
  {/if}
</section>

<style>
  .intro {
    padding-top: 2.6rem;
  }
  .title {
    font-size: clamp(2rem, 5vw, 3rem);
    margin: 0.4rem 0 0.5rem;
  }
  .lede {
    max-width: 50ch;
  }
  .filters {
    margin: 1.6rem auto;
    display: grid;
    gap: 0.9rem;
  }
  .search-wrap :global(.bx--search-input) {
    background: var(--ink-2);
    border-bottom-color: var(--line);
  }
  .filter-row.split {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }
  .pill {
    border: 1px solid var(--line);
    background: var(--ink-2);
    color: #d2cfc7;
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .pill:hover {
    border-color: color-mix(in srgb, var(--c, var(--gold)) 55%, transparent);
  }
  .pill.on {
    background: color-mix(in srgb, var(--c, var(--gold)) 22%, var(--ink-2));
    border-color: var(--c, var(--gold));
    color: #fff;
  }
  .pill.ghost.on {
    background: var(--gold-dim);
    border-color: var(--gold-dim);
    color: #0b0b0d;
  }
  .count {
    font-size: 0.82rem;
    white-space: nowrap;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.1rem;
  }
  .empty {
    text-align: center;
    padding: 3.5rem 1.5rem;
    display: grid;
    gap: 0.6rem;
    justify-items: center;
  }
  .empty .display {
    font-size: 1.6rem;
  }
</style>
