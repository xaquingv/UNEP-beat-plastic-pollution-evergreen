<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Mapbox from "../maps/Mapbox.svelte";

  export let type;
  export let text;

  let index = 0,
    scrollyMap;

  const steps = [
    { center: [20, 0], zoom: 1.8, speed: 2 },
    { center: [-90.5, 29.5], zoom: 6, speed: 0.5 },
    { center: [106.3, 10.1], zoom: 5, speed: 0.5 },
    { center: [105.6, 15.8], zoom: 5, speed: 0.5 },
    { center: [20, 0], zoom: 1.8, speed: 2 },
  ];

  $: if (index === steps.length - 1) {
    scrollyMap.style.pointerEvents = "none";
  }
  $: if (scrollyMap && index < steps.length - 1) {
    scrollyMap.style.pointerEvents = "all";
  }
</script>

<section bind:this={scrollyMap} class="full {type}">
  <Scroller top={0} bottom={1} bind:index>
    <div slot="background">
      <div class="video-wrapper">
        <Mapbox
          options={{
            style: "mapbox://styles/xocasgv/ckysglyl0dvbc14qpxw3spbmz",
            scrollZoom: false,
            accessToken:
              "pk.eyJ1IjoieG9jYXNndiIsImEiOiI0eDhKVHlZIn0.YdtRFZW4yC0tSdoXoTgGUA",
            layout: "full",
            projection: "equalEarth",
            version: "v2.7.0",
            steps: steps,
            index: index,
          }}
        />
      </div>
    </div>

    <div slot="foreground">
      {#each text as p}
        <section class="step">
          <h3 class="narrow"><span class="bg-text">{@html p.p}</span></h3>
        </section>
      {/each}
    </div>
  </Scroller>
</section>

<style>
  .slide {
    position: absolute;
    width: 100vw;
    height: 100%;
    transition: opacity 1s;
  }
  .step {
    height: 80vh;
    padding-top: 20vh;
    color: #222;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .video-wrapper {
    width: 100%;
    height: 100vh;
    pointer-events: all;
  }
  .header {
    padding: 4rem 0;
  }
  .bg-text {
    background-color: #f3f3f3dd;
    padding: 0.08rem 0;
  }
  :global(.mapboxgl-ctrl-top-right) {
    top: 4rem !important;
  }
  @media screen and (min-width: 48rem) {
    .step {
      margin-left: 0;
      margin-right: 0;
    }
    :global(.mapboxgl-ctrl-top-right) {
      top: 5rem !important;
    }
  }
</style>
