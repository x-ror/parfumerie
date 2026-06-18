<script>
  import { FAMILIES } from '$lib/data/families.js';
  export let id;
  export let size = 'sm';
  $: fam = FAMILIES[id];
</script>

{#if fam}
  <span class="tag {size}" style="--c:{fam.accent}">
    <span class="dot" aria-hidden="true">{fam.emoji}</span>{fam.label}
  </span>
{/if}

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
    color: color-mix(in srgb, var(--c) 80%, white 20%);
    background: color-mix(in srgb, var(--c) 12%, transparent);
    border-radius: 999px;
    padding: 0.2rem 0.6rem;
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .dot {
    font-size: 0.8em;
  }
</style>
