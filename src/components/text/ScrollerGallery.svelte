<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Photo from "../multimedia/Photo.svelte";
  import Tweet from "../ui/Tweet.svelte";
  import { fade } from "svelte/transition";

  export let head;
  export let text;

  let index,
    count = 1;
</script>

<section class="full">
  <Scroller top={0} bottom={1} threshold={0.2} bind:index bind:count>
    <div slot="background">
      {#each text as p, i}
        <div class="video-wrapper" style="opacity:{index === i ? 1 : 0}">
          <Photo src="./img/{p.illo}" layout="cover" alt={p.p} />
        </div>
      {/each}
    </div>

    <div slot="foreground">
      {#if head}
        <section class="step">
          <h2 class="narrow">{@html head}</h2>
        </section>
      {/if}
      {#each text as p}
        <section class="step">
          <h3 class="narrow">
            <span class="bg-text">{@html p.p}</span>
            <Tweet
              text={p.p}
              hashtags="#BeatPlasticPollution"
              via="@UNEP"
              url=""
              pic="http://pic.twitter.com/{p.tt}"
            />
          </h3>
        </section>
      {/each}
    </div>
  </Scroller>
</section>

<style>
  .step {
    height: 80vh;
    padding-top: 60vh;
    color: #000;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .video-wrapper {
    width: 100%;
    height: calc(100vh - 3rem);
    transition: opacity 0.3s;
    position: absolute;
    top: 3rem;
    left: 0;
  }
  .bg-text {
    background-color: #f3f3f3dd;
    padding: 0.08rem 0;
  }
  @media screen and (min-width: 48rem) {
    .step {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
