<script>
  import { perfumes } from '$lib/data/perfumes.js';
  import { familyList } from '$lib/data/families.js';
  import ScentBottle from '$lib/components/ScentBottle.svelte';
  import PerfumeCard from '$lib/components/PerfumeCard.svelte';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
  import Time from 'carbon-icons-svelte/lib/Time.svelte';

  const featured = ['velours-noir', 'sel-et-soleil', 'caramel-fume'].map((id) =>
    perfumes.find((p) => p.id === id)
  );

  const steps = [
    { n: '01', t: 'Tell us your mood', d: 'A short, feeling-led quiz — where you find calm, where you find passion, what you crave today.' },
    { n: '02', t: 'We read between the notes', d: 'Your answers become an olfactory profile across 14 scent families and intensity.' },
    { n: '03', t: 'Discover & compose', d: 'Get matched fragrances and a personal pyramid of the very notes your perfume could be built from.' }
  ];
</script>

<svelte:head>
  <title>Maison Sillage — Find the perfume you'll love</title>
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="shell hero-grid">
    <div class="hero-copy rise">
      <p class="eyebrow">The guided scent atelier</p>
      <h1 class="display hero-title">
        Find the perfume<br />that feels like <span class="gold">you</span>, today.
      </h1>
      <p class="lede muted">
        Forget endless sniffing strips. Answer a few mood-led questions and we’ll reveal the
        fragrances — and the individual notes — that match how you want to feel right now.
      </p>
      <div class="cta-row">
        <Button icon={ArrowRight} href="/quiz/">Start the scent quiz</Button>
        <Button kind="tertiary" href="/atelier/">Compose your own</Button>
      </div>
      <p class="time muted"><Time size={16} /> Takes about 60 seconds · {perfumes.length} fragrances</p>
    </div>

    <div class="hero-bottles" aria-hidden="true">
      <div class="b b1"><ScentBottle accent="#7a3a52" size={150} /></div>
      <div class="b b2"><ScentBottle accent="#e8c97a" size={120} /></div>
      <div class="b b3"><ScentBottle accent="#6aa8c8" size={104} /></div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="shell block">
  <div class="block-head">
    <p class="eyebrow">How it works</p>
    <h2 class="display section-title">Three steps to your signature</h2>
  </div>
  <div class="steps">
    {#each steps as s, i}
      <div class="step surface rise" style="animation-delay:{i * 90}ms">
        <span class="step-n display">{s.n}</span>
        <h3 class="display step-t">{s.t}</h3>
        <p class="muted">{s.d}</p>
      </div>
    {/each}
  </div>
</section>

<!-- FEATURED -->
<section class="shell block">
  <div class="block-head row">
    <div>
      <p class="eyebrow">From the collection</p>
      <h2 class="display section-title">A few to fall for</h2>
    </div>
    <a class="more" href="/catalog/">See all {perfumes.length} <ArrowRight size={16} /></a>
  </div>
  <div class="featured-grid">
    {#each featured as p}
      <PerfumeCard perfume={p} />
    {/each}
  </div>
</section>

<!-- FAMILIES -->
<section class="shell block">
  <div class="block-head">
    <p class="eyebrow">The language of scent</p>
    <h2 class="display section-title">Fourteen families, one that’s yours</h2>
  </div>
  <div class="fam-grid">
    {#each familyList as f}
      <div class="fam surface" style="--c:{f.accent}">
        <span class="fam-emoji">{f.emoji}</span>
        <strong>{f.label}</strong>
        <p class="muted">{f.blurb}</p>
      </div>
    {/each}
  </div>
</section>

<!-- CLOSING CTA -->
<section class="shell">
  <div class="closer surface rise">
    <div class="closer-glow" />
    <h2 class="display">Ready to meet your scent?</h2>
    <p class="muted">Let your mood lead. Your perfect fragrance is a few questions away.</p>
    <Button icon={ArrowRight} href="/quiz/">Begin the quiz</Button>
  </div>
</section>

<style>
  .hero {
    padding: 3.5rem 0 1rem;
    overflow: hidden;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2rem;
    align-items: center;
  }
  .hero-title {
    font-size: clamp(2.6rem, 6vw, 4.6rem);
    margin: 0.8rem 0 1rem;
  }
  .lede {
    font-size: 1.05rem;
    line-height: 1.6;
    max-width: 46ch;
  }
  .cta-row {
    display: flex;
    gap: 0.75rem;
    margin: 1.6rem 0 1rem;
    flex-wrap: wrap;
  }
  .time {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
  }
  .hero-bottles {
    position: relative;
    height: 360px;
  }
  .b {
    position: absolute;
    animation: float 6s ease-in-out infinite;
  }
  .b1 {
    left: 32%;
    top: 6%;
  }
  .b2 {
    left: 4%;
    top: 42%;
    animation-delay: -2s;
  }
  .b3 {
    right: 6%;
    top: 52%;
    animation-delay: -4s;
  }
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-14px);
    }
  }

  .block {
    padding: 3rem 0 1rem;
  }
  .block-head {
    margin-bottom: 1.6rem;
  }
  .block-head.row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .section-title {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    margin: 0.3rem 0 0;
  }
  .more {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    text-decoration: none;
    font-size: 0.88rem;
    white-space: nowrap;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .step {
    padding: 1.6rem;
  }
  .step-n {
    color: var(--gold);
    font-size: 1.6rem;
  }
  .step-t {
    font-size: 1.4rem;
    margin: 0.5rem 0 0.5rem;
    color: #f1efe9;
  }
  .step p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    gap: 1.1rem;
  }

  .fam-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.8rem;
  }
  .fam {
    padding: 1.1rem;
    border-left: 3px solid var(--c);
    transition: transform 0.3s, background 0.3s;
  }
  .fam:hover {
    transform: translateY(-3px);
  }
  .fam-emoji {
    font-size: 1.4rem;
  }
  .fam strong {
    display: block;
    margin: 0.3rem 0 0.25rem;
    color: #f1efe9;
  }
  .fam p {
    font-size: 0.78rem;
    line-height: 1.45;
    margin: 0;
  }

  .closer {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 3rem 1.5rem;
    margin: 1rem 0;
  }
  .closer-glow {
    position: absolute;
    inset: -60% 30% auto;
    height: 300px;
    background: radial-gradient(circle, rgba(216, 178, 90, 0.22), transparent 70%);
    pointer-events: none;
  }
  .closer h2 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    margin: 0 0 0.5rem;
  }
  .closer p {
    margin: 0 0 1.4rem;
  }

  @media (max-width: 860px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .hero-bottles {
      height: 240px;
      order: -1;
    }
    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
