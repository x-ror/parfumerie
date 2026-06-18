<script>
  import { ingredientsByRole, ingredientById } from '$lib/data/ingredients.js';
  import { FAMILIES } from '$lib/data/families.js';
  import { recommendPerfumes } from '$lib/recommend.js';
  import ScentBottle from '$lib/components/ScentBottle.svelte';
  import NotePyramid from '$lib/components/NotePyramid.svelte';
  import PerfumeCard from '$lib/components/PerfumeCard.svelte';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import TextInput from 'carbon-components-svelte/src/TextInput/TextInput.svelte';
  import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
  import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

  let name = '';
  let selected = { top: [], heart: [], base: [] };

  const limits = { top: 3, heart: 3, base: 2 };
  const roleMeta = {
    top: { label: 'Top notes', note: 'The opening — bright and fleeting', sub: 'Pick up to 3' },
    heart: { label: 'Heart notes', note: 'The character — the soul of the scent', sub: 'Pick up to 3' },
    base: { label: 'Base notes', note: 'The trail — deep and long-lasting', sub: 'Pick up to 2' }
  };

  function toggle(role, id) {
    const list = selected[role];
    if (list.includes(id)) {
      selected[role] = list.filter((x) => x !== id);
    } else if (list.length < limits[role]) {
      selected[role] = [...list, id];
    }
    selected = selected;
  }

  function clearAll() {
    selected = { top: [], heart: [], base: [] };
    name = '';
  }

  $: chosen = [...selected.top, ...selected.heart, ...selected.base].map((id) => ingredientById[id]);
  $: count = chosen.length;

  // Blend the accent colours of chosen notes into a single bottle tint.
  function mix(colors) {
    if (!colors.length) return '#6a6a72';
    const rgb = colors.map((c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]);
    const avg = [0, 1, 2].map((i) => Math.round(rgb.reduce((s, c) => s + c[i], 0) / rgb.length));
    return `#${avg.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  }
  $: bottleColor = mix(chosen.map((n) => n.accent));

  // Dominant families & a plain-language character read.
  $: famCount = chosen.reduce((acc, n) => ((acc[n.family] = (acc[n.family] || 0) + 1), acc), {});
  $: dominantFams = Object.entries(famCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => FAMILIES[id]);

  // Find existing fragrances closest to what you're building.
  $: pseudoProfile = {
    families: Object.fromEntries(Object.entries(famCount).map(([k, v]) => [k, v * 2])),
    character: {},
    seasons: {},
    occasions: {},
    gender: {},
    targetIntensity: chosen.length ? chosen.reduce((s, n) => s + n.intensity, 0) / chosen.length : 3
  };
  $: similar = count >= 2 ? recommendPerfumes(pseudoProfile).slice(0, 3) : [];
</script>

<svelte:head>
  <title>The Atelier — compose your scent</title>
</svelte:head>

<section class="shell intro">
  <p class="eyebrow">The Atelier</p>
  <h1 class="display title">Compose your own perfume</h1>
  <p class="muted lede">
    A perfume is built in three movements — top, heart and base. Choose the notes that speak to you
    and watch your composition come to life, then discover the ready-made fragrances closest to it.
  </p>
</section>

<section class="shell layout">
  <!-- PALETTE -->
  <div class="palette">
    {#each ['top', 'heart', 'base'] as role}
      <div class="role-block surface">
        <div class="role-head">
          <div>
            <h2 class="display">{roleMeta[role].label}</h2>
            <p class="muted">{roleMeta[role].note}</p>
          </div>
          <span class="counter" class:full={selected[role].length === limits[role]}>
            {selected[role].length}/{limits[role]}
          </span>
        </div>
        <div class="note-grid">
          {#each ingredientsByRole[role] as note}
            {@const isSel = selected[role].includes(note.id)}
            {@const locked = !isSel && selected[role].length >= limits[role]}
            <button
              class="note"
              class:sel={isSel}
              class:locked
              style="--c:{note.accent}"
              disabled={locked}
              on:click={() => toggle(role, note.id)}
              title={note.desc}
            >
              <span class="swatch" />
              <span class="note-name">{note.name}</span>
              <span class="note-fam muted">{FAMILIES[note.family].label}</span>
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- LIVE COMPOSITION (sticky) -->
  <aside class="composer">
    <div class="composer-inner surface">
      <div class="comp-glow" style="--c:{bottleColor}" />
      <div class="bottle-stage">
        <ScentBottle accent={bottleColor} size={130} label={name || 'Your composition'} />
      </div>

      <TextInput
        light={false}
        size="sm"
        labelText="Name your creation"
        placeholder="e.g. Minuit Doré"
        bind:value={name}
      />

      {#if count === 0}
        <p class="hint muted">Start choosing notes on the left and your perfume will take shape here.</p>
      {:else}
        <div class="read">
          <p class="eyebrow">Character</p>
          <p class="read-text">
            {#if dominantFams.length}
              A <strong>{dominantFams.map((f) => f.label.toLowerCase()).join(', ')}</strong> composition
              {#if pseudoProfile.targetIntensity >= 4}with bold projection.{:else if pseudoProfile.targetIntensity <= 2}kept soft and intimate.{:else}with balanced presence.{/if}
            {/if}
          </p>
          <div class="fam-dots">
            {#each dominantFams as f}
              <span class="fam-dot" style="--c:{f.accent}">{f.emoji} {f.label}</span>
            {/each}
          </div>
        </div>

        <div class="mini-pyramid">
          <NotePyramid
            top={selected.top.map((id) => ingredientById[id])}
            heart={selected.heart.map((id) => ingredientById[id])}
            base={selected.base.map((id) => ingredientById[id])}
          />
        </div>

        <Button kind="ghost" size="small" icon={TrashCan} on:click={clearAll}>Clear all</Button>
      {/if}
    </div>
  </aside>
</section>

{#if similar.length}
  <section class="shell block">
    <div class="block-head">
      <p class="eyebrow">From our collection</p>
      <h2 class="display section-title">Closest to what you’re composing</h2>
    </div>
    <div class="grid">
      {#each similar as p}
        <PerfumeCard perfume={p} match={p.match} />
      {/each}
    </div>
  </section>
{/if}

<style>
  .intro {
    padding-top: 2.6rem;
  }
  .title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    margin: 0.4rem 0 0.6rem;
  }
  .lede {
    max-width: 62ch;
    line-height: 1.6;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 1.4rem;
    align-items: start;
    margin-top: 1.6rem;
  }
  .palette {
    display: grid;
    gap: 1rem;
  }
  .role-block {
    padding: 1.3rem;
  }
  .role-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  .role-head h2 {
    font-size: 1.4rem;
    margin: 0;
    color: #f1efe9;
  }
  .role-head p {
    margin: 0.1rem 0 0;
    font-size: 0.8rem;
  }
  .counter {
    font-size: 0.75rem;
    color: #9b988f;
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.15rem 0.55rem;
    white-space: nowrap;
  }
  .counter.full {
    color: var(--gold-soft);
    border-color: var(--gold-dim);
  }
  .note-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.55rem;
  }
  .note {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    padding: 0.6rem 0.7rem;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--ink-2);
    color: #e6e3dc;
    cursor: pointer;
    text-align: left;
    transition: transform 0.2s, border-color 0.2s, background 0.2s;
  }
  .note:hover:not(.locked) {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--c) 55%, transparent);
  }
  .note.sel {
    border-color: var(--c);
    background: color-mix(in srgb, var(--c) 16%, var(--ink-2));
  }
  .note.locked {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .swatch {
    width: 100%;
    height: 5px;
    border-radius: 999px;
    background: var(--c);
    margin-bottom: 0.3rem;
  }
  .note-name {
    font-size: 0.85rem;
    font-weight: 500;
  }
  .note-fam {
    font-size: 0.68rem;
  }

  .composer {
    position: sticky;
    top: 90px;
  }
  .composer-inner {
    position: relative;
    overflow: hidden;
    padding: 1.4rem;
    display: grid;
    gap: 1rem;
  }
  .comp-glow {
    position: absolute;
    inset: -40% -20% auto;
    height: 260px;
    background: radial-gradient(circle, color-mix(in srgb, var(--c) 30%, transparent), transparent 70%);
    pointer-events: none;
    transition: background 0.6s;
  }
  .bottle-stage {
    display: grid;
    place-items: center;
    min-height: 150px;
  }
  .hint {
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.5;
  }
  .read-text {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #d8d5cd;
    margin: 0.2rem 0 0.6rem;
  }
  .read-text strong {
    color: var(--gold-soft);
    font-weight: 500;
  }
  .fam-dots {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .fam-dot {
    font-size: 0.72rem;
    border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
    color: color-mix(in srgb, var(--c) 80%, white 20%);
    border-radius: 999px;
    padding: 0.15rem 0.5rem;
  }
  .mini-pyramid {
    border-top: 1px solid var(--line);
    padding-top: 1rem;
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

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .composer {
      position: static;
      order: -1;
    }
  }
</style>
