<script>
  /** A decorative, CSS-only perfume bottle tinted to the fragrance accent. */
  export let accent = '#d8b25a';
  export let size = 120;
  export let label = '';
</script>

<div class="bottle-wrap" style="--accent:{accent}; --size:{size}px" aria-hidden={!label} title={label}>
  <svg viewBox="0 0 100 140" width={size} height={size * 1.4} role="img" aria-label={label}>
    <defs>
      <linearGradient id="liquid-{accent.replace('#', '')}" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stop-color={accent} stop-opacity="0.95" />
        <stop offset="1" stop-color={accent} stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="glass-{accent.replace('#', '')}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.18" />
        <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.02" />
        <stop offset="1" stop-color="#ffffff" stop-opacity="0.1" />
      </linearGradient>
    </defs>
    <!-- cap -->
    <rect x="38" y="6" width="24" height="16" rx="3" fill={accent} />
    <rect x="42" y="22" width="16" height="8" fill={accent} opacity="0.55" />
    <!-- body -->
    <path
      d="M26 44 Q26 32 38 30 L62 30 Q74 32 74 44 L74 118 Q74 132 60 132 L40 132 Q26 132 26 118 Z"
      fill="url(#liquid-{accent.replace('#', '')})"
      stroke={accent}
      stroke-opacity="0.5"
    />
    <path
      d="M26 44 Q26 32 38 30 L62 30 Q74 32 74 44 L74 118 Q74 132 60 132 L40 132 Q26 132 26 118 Z"
      fill="url(#glass-{accent.replace('#', '')})"
    />
    <!-- highlight -->
    <ellipse cx="40" cy="62" rx="5" ry="20" fill="#ffffff" opacity="0.12" />
  </svg>
</div>

<style>
  .bottle-wrap {
    display: inline-flex;
    filter: drop-shadow(0 10px 24px color-mix(in srgb, var(--accent) 35%, transparent));
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .bottle-wrap:hover {
    transform: translateY(-4px) rotate(-1.5deg);
  }
</style>
