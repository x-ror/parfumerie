<script>
  import { page } from '$app/stores';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import ScentBottle from '$lib/components/ScentBottle.svelte';
</script>

<section class="shell err">
  <ScentBottle accent="#7a3a52" size={120} />
  <p class="eyebrow">{$page.status}</p>
  <h1 class="display">{$page.error?.message || 'Something evaporated'}</h1>
  <p class="muted">The page you were looking for has drifted away. Let’s get you back on scent.</p>
  <div class="row">
    <Button href="/">Back home</Button>
    <Button kind="tertiary" href="/quiz/">Take the quiz</Button>
  </div>
</section>

<style>
  .err {
    text-align: center;
    padding: 5rem 1.5rem;
    display: grid;
    gap: 0.8rem;
    justify-items: center;
  }
  .err h1 {
    font-size: 2.4rem;
    margin: 0;
  }
  .row {
    display: flex;
    gap: 0.7rem;
    margin-top: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
