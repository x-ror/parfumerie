<script>
  import 'carbon-components-svelte/css/g100.css';
  import '../app.css';
  import { page } from '$app/stores';
  import { favourites } from '$lib/stores.js';

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/quiz/', label: 'Scent Quiz' },
    { href: '/atelier/', label: 'Atelier' },
    { href: '/catalog/', label: 'Collection' }
  ];

  $: path = $page.url.pathname;
  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href));
</script>

<div class="app">
  <header class="site-header">
    <div class="shell bar">
      <a class="brand" href="/">
        <span class="brand-mark">M</span>
        <span class="brand-text">
          <strong class="display">Maison Sillage</strong>
          <em class="muted">scent atelier</em>
        </span>
      </a>

      <nav class="nav">
        {#each nav as item}
          <a class="nav-link" class:active={isActive(item.href)} href={item.href}>
            {item.label}
            {#if item.href === '/catalog/' && $favourites.length}
              <span class="badge">{$favourites.length}</span>
            {/if}
          </a>
        {/each}
      </nav>
    </div>
    <hr class="gold-rule" />
  </header>

  <main>
    <slot />
  </main>

  <footer class="site-footer">
    <hr class="gold-rule" />
    <div class="shell foot">
      <div>
        <strong class="display">Maison Sillage</strong>
        <p class="muted">A demonstration scent-finder. Fragrances are fictional and crafted for this experience.</p>
      </div>
      <div class="foot-links">
        <a href="/quiz/">Take the quiz</a>
        <a href="/atelier/">Build your scent</a>
        <a href="/catalog/">Browse collection</a>
      </div>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    flex: 1 1 auto;
  }
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
    background: color-mix(in srgb, var(--ink) 78%, transparent);
  }
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 68px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    text-decoration: none;
    color: inherit;
  }
  .brand-mark {
    font-family: var(--display);
    font-size: 1.4rem;
    color: var(--ink);
    background: linear-gradient(145deg, var(--gold-soft), var(--gold-dim));
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 8px;
    display: grid;
    place-items: center;
    box-shadow: 0 6px 18px rgba(216, 178, 90, 0.25);
  }
  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.05;
  }
  .brand-text strong {
    font-size: 1.15rem;
    letter-spacing: 0.02em;
  }
  .brand-text em {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-style: normal;
  }
  .nav {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
  .nav-link {
    position: relative;
    text-decoration: none;
    color: #c9c6bf;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    padding: 0.5rem 0.7rem;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .nav-link:hover {
    color: var(--gold-soft);
  }
  .nav-link.active {
    color: var(--ink);
    background: linear-gradient(145deg, var(--gold-soft), var(--gold-dim));
  }
  .badge {
    display: inline-grid;
    place-items: center;
    min-width: 1.05rem;
    height: 1.05rem;
    padding: 0 0.25rem;
    margin-left: 0.3rem;
    font-size: 0.62rem;
    border-radius: 999px;
    background: var(--ink);
    color: var(--gold-soft);
    border: 1px solid var(--gold-dim);
  }
  .site-footer {
    margin-top: 4rem;
  }
  .foot {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding-top: 2rem;
    padding-bottom: 2.5rem;
  }
  .foot strong {
    font-size: 1.2rem;
  }
  .foot p {
    max-width: 360px;
    font-size: 0.82rem;
    margin: 0.3rem 0 0;
  }
  .foot-links {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
  }

  @media (max-width: 640px) {
    .bar {
      height: auto;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      gap: 0.6rem;
    }
    .brand-text em {
      display: none;
    }
  }
</style>
