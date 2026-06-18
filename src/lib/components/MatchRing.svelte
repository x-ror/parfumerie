<script>
  /** Circular match-percentage indicator. */
  export let value = 0; // 0..100
  export let size = 56;
  export let accent = '#d8b25a';

  $: r = (size - 8) / 2;
  $: circ = 2 * Math.PI * r;
  $: offset = circ - (value / 100) * circ;
</script>

<div class="ring" style="--size:{size}px" title="{value}% match">
  <svg width={size} height={size}>
    <circle cx={size / 2} cy={size / 2} {r} fill="none" stroke="#2a2a30" stroke-width="4" />
    <circle
      cx={size / 2}
      cy={size / 2}
      {r}
      fill="none"
      stroke={accent}
      stroke-width="4"
      stroke-linecap="round"
      stroke-dasharray={circ}
      stroke-dashoffset={offset}
      transform="rotate(-90 {size / 2} {size / 2})"
      style="transition: stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)"
    />
  </svg>
  <span class="num">{value}<small>%</small></span>
</div>

<style>
  .ring {
    position: relative;
    width: var(--size);
    height: var(--size);
    display: inline-grid;
    place-items: center;
  }
  .num {
    position: absolute;
    font-weight: 600;
    font-size: 0.85rem;
    color: #f0eee9;
  }
  .num small {
    font-size: 0.55rem;
    opacity: 0.7;
  }
</style>
