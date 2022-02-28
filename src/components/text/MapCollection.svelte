<script>
  import { scaleThreshold } from "d3-scale";
  import chroma from "chroma-js";
  import world from "../../data/world-un.json";
  import waterbodies from "../../data/waterbodies.json";
  import borders from "../../data/world-boundaries-un.json";
  import share from "../../data/mismanaged-plastic-total.json";
  import shareTotal from "../../data/mismanaged-plastic-share.json";
  import shareProjection from "../../data/mismanaged-plastic-2025.json";
  import { geoEqualEarth } from "d3-geo";
  import Map from "../maps/Map.svelte";

  export let maps;
  export let note;
  export let source;
  export let format;
  export let legend;

  let currentMap = 0;
  $: map = maps[currentMap];

  const datasets = [share, shareTotal];
  $: data = datasets[currentMap];

  const projection = geoEqualEarth().rotate([-10, 0]);

  const color = (n) =>
    chroma.scale(["#ADE8FF", "#022944"]).mode("lab").colors(n);

  const domains = [
    [0.1, 1, 5, 10, 50, 100],
    [0.1, 0.5, 1, 5, 10, 30],
  ];
  $: domain = domains[currentMap];

  $: palette = () =>
    scaleThreshold().range(color(domain.length)).domain(domain);
</script>

<section>
  <h3 class="col-text">{@html map.head}</h3>
  <nav class="col-text">
    {#each maps as map, i}
      <button
        class={currentMap === i ? "active" : ""}
        on:click={() => (currentMap = i)}>{map.button}</button
      >
    {/each}
  </nav>
  <Map
    {data}
    map={{ json: world, features: "countries" }}
    borders={{ jsonBorders: borders, featuresBorders: "lines" }}
    {waterbodies}
    id={currentMap}
    options={{
      scale: palette(),
      projection: projection,
      join: { data: "id", map: "alpha3" },
      value: "pct",
      legend: {
        title: maps[currentMap].legend,
        format: format,
        position: ["bottom", "center"],
      },
      layout: "wide",
      title: "Title",
      desc: "Description",
    }}
  />
  <p class="col-text note">{note}</p>
  <p class="col-text note">{source}</p>
</section>

<style>
  .note {
    color: #505050;
  }
  h3 {
    padding-bottom: 0.5rem;
  }
  button {
    background-color: #e0e0e0; /* Green */
    border: 1px solid #f3f3f3;
    color: #808080;
    padding: 0.5rem 1.6rem;
    text-align: left;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin-top: 1rem;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
  }
  .active {
    background-color: #187db5;
    color: white;
  }
  button:first-child {
    border-radius: 2rem 0 0 2rem;
  }
  button:last-child {
    border-radius: 0 2rem 2rem 0;
  }
  nav {
    text-align: left;
    padding-bottom: 2rem;
  }
</style>
