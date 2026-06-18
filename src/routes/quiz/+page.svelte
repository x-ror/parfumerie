<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { questions } from '$lib/data/quiz.js';
  import { answers, resetAnswers } from '$lib/stores.js';
  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
  import ArrowLeft from 'carbon-icons-svelte/lib/ArrowLeft.svelte';
  import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';

  let step = 0;
  $: q = questions[step];
  $: total = questions.length;
  $: progress = Math.round((Object.keys($answers).filter((k) => questions.some((qq) => qq.id === k)).length / total) * 100);
  $: current = $answers[q.id];

  function choose(optId) {
    answers.update((a) => ({ ...a, [q.id]: optId }));
    // brief delay so the selection animation is visible before advancing
    setTimeout(() => {
      if (step < total - 1) step += 1;
      else finish();
    }, 280);
  }

  function finish() {
    goto(`${base}/results/`);
  }
  function back() {
    if (step > 0) step -= 1;
  }
  function restart() {
    resetAnswers();
    step = 0;
  }
</script>

<svelte:head>
  <title>Scent Quiz — Maison Sillage</title>
</svelte:head>

<section class="shell quiz">
  <div class="quiz-head">
    <div class="progress-row">
      <span class="eyebrow">Question {step + 1} of {total}</span>
      <button class="restart" on:click={restart}>Start over</button>
    </div>
    <div class="track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <div class="fill" style="width:{((step + 1) / total) * 100}%" />
    </div>
    <div class="dots">
      {#each questions as qq, i}
        <span class="dot" class:done={$answers[qq.id]} class:at={i === step} />
      {/each}
    </div>
  </div>

  {#key q.id}
    <div class="q rise">
      <h1 class="display q-title">{q.title}</h1>
      <p class="q-sub muted">{q.subtitle}</p>

      <div class="options">
        {#each q.options as opt}
          <button
            class="opt"
            class:selected={current === opt.id}
            style="--c:{opt.accent}"
            on:click={() => choose(opt.id)}
          >
            <span class="opt-emoji">{opt.emoji}</span>
            <span class="opt-body">
              <span class="opt-label">{opt.label}</span>
              {#if opt.hint}<span class="opt-hint">{opt.hint}</span>{/if}
            </span>
            <span class="check" aria-hidden="true">
              {#if current === opt.id}<Checkmark />{/if}
            </span>
          </button>
        {/each}
      </div>
    </div>
  {/key}

  <div class="nav-row">
    <Button kind="ghost" icon={ArrowLeft} disabled={step === 0} on:click={back}>Back</Button>
    {#if step === total - 1}
      <Button icon={ArrowRight} disabled={!current} on:click={finish}>See my matches</Button>
    {:else}
      <Button kind="tertiary" icon={ArrowRight} disabled={!current} on:click={() => (step += 1)}>
        {current ? 'Next' : 'Pick one to continue'}
      </Button>
    {/if}
  </div>
</section>

<style>
  .quiz {
    max-width: 760px;
    padding-top: 2.5rem;
    padding-bottom: 2rem;
  }
  .quiz-head {
    margin-bottom: 2rem;
  }
  .progress-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
  }
  .restart {
    background: none;
    border: 0;
    color: #9b988f;
    font-size: 0.78rem;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .restart:hover {
    color: var(--gold-soft);
  }
  .track {
    height: 4px;
    background: var(--ink-3);
    border-radius: 999px;
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold-dim), var(--gold-soft));
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dots {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.7rem;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ink-3);
    border: 1px solid var(--line);
    transition: all 0.3s;
  }
  .dot.done {
    background: var(--gold-dim);
    border-color: var(--gold-dim);
  }
  .dot.at {
    transform: scale(1.4);
    border-color: var(--gold-soft);
  }

  .q-title {
    font-size: clamp(1.9rem, 5vw, 2.8rem);
    margin: 0;
  }
  .q-sub {
    margin: 0.5rem 0 1.6rem;
    font-size: 1rem;
  }

  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
  }
  .opt {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    text-align: left;
    padding: 1.1rem;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: linear-gradient(160deg, var(--ink-3), var(--ink-2));
    color: #ece9e2;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, background 0.25s;
    position: relative;
    overflow: hidden;
  }
  .opt::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(120px 120px at 10% 0%, color-mix(in srgb, var(--c) 22%, transparent), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .opt:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--c) 55%, transparent);
  }
  .opt:hover::before {
    opacity: 1;
  }
  .opt.selected {
    border-color: var(--c);
    background: linear-gradient(160deg, color-mix(in srgb, var(--c) 16%, var(--ink-3)), var(--ink-2));
  }
  .opt.selected::before {
    opacity: 1;
  }
  .opt-emoji {
    font-size: 1.7rem;
    line-height: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  }
  .opt-body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex: 1;
  }
  .opt-label {
    font-size: 1rem;
    font-weight: 500;
  }
  .opt-hint {
    font-size: 0.76rem;
    color: #9b988f;
  }
  .check {
    color: var(--c);
    display: grid;
    place-items: center;
    width: 1.3rem;
  }

  .nav-row {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  @media (max-width: 560px) {
    .options {
      grid-template-columns: 1fr;
    }
  }
</style>
