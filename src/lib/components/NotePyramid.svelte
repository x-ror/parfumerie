<script>
  /**
   * Visualises a fragrance pyramid. Accepts either a perfume's `notes`
   * ({top, heart, base} of strings) or a composed blueprint of ingredient
   * objects. Strings and {name} objects are both handled.
   */
  export let top = [];
  export let heart = [];
  export let base = [];
  export let interactive = false;

  const name = (n) => (typeof n === 'string' ? n : n.name);
  const accentOf = (n) => (typeof n === 'string' ? null : n.accent);

  const tiers = [
    { key: 'top', label: 'Top', note: 'First impression — the opening minutes' },
    { key: 'heart', label: 'Heart', note: 'The character — unfolds for hours' },
    { key: 'base', label: 'Base', note: 'The memory — what lingers on skin' }
  ];
  $: data = { top, heart, base };
</script>

<div class="pyramid">
  {#each tiers as tier, i}
    <div class="tier" style="--i:{i}">
      <div class="tier-head">
        <span class="tier-label">{tier.label}</span>
        <span class="tier-note">{tier.note}</span>
      </div>
      <div class="chips">
        {#each data[tier.key] as n}
          <span
            class="chip"
            class:interactive
            style={accentOf(n) ? `--c:${accentOf(n)}` : '--c:#d8b25a'}
          >
            {name(n)}
            {#if typeof n !== 'string' && n.desc}
              <span class="tip">{n.desc}</span>
            {/if}
          </span>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .pyramid {
    display: grid;
    gap: 0.75rem;
  }
  .tier {
    border-left: 2px solid color-mix(in srgb, var(--gold) 40%, transparent);
    padding: 0.25rem 0 0.25rem 0.9rem;
    animation: rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: calc(var(--i) * 80ms);
  }
  .tier-head {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin-bottom: 0.45rem;
    flex-wrap: wrap;
  }
  .tier-label {
    font-family: var(--display);
    font-size: 1.15rem;
    color: var(--gold-soft);
  }
  .tier-note {
    font-size: 0.72rem;
    color: #9b988f;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .chip {
    position: relative;
    border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
    background: color-mix(in srgb, var(--c) 12%, transparent);
    color: #ece9e2;
    border-radius: 8px;
    padding: 0.3rem 0.6rem;
    font-size: 0.82rem;
  }
  .chip.interactive {
    cursor: default;
  }
  .tip {
    position: absolute;
    left: 0;
    bottom: 130%;
    width: max-content;
    max-width: 220px;
    background: #0b0b0d;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 0.45rem 0.6rem;
    font-size: 0.72rem;
    color: #c9c6bf;
    opacity: 0;
    pointer-events: none;
    transform: translateY(4px);
    transition: opacity 0.18s, transform 0.18s;
    z-index: 5;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  }
  .chip:hover .tip {
    opacity: 1;
    transform: translateY(0);
  }
</style>
