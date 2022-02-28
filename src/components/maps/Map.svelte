<script>
  import Tooltip from "../common/Tooltip.svelte";
  import Legend from "../common/Legend.svelte";
  import { mesh, feature } from "topojson-client";
  import { geoPath } from "d3-geo";
  import { get } from "lodash";
  import countryDict from "../../data/countryDictionary.json";

  export let data;
  export let map;
  export let waterbodies;
  export let borders;
  export let options;
  export let id;
  let { join, value, layout, projection, title, desc } = options;
  let { json, features } = map;
  let { jsonBorders, featuresBorders } = borders;

  let tooltipOptions, width, height;

  const land = feature(json, json.objects[features]);
  const border = feature(jsonBorders, jsonBorders.objects[featuresBorders]);
  const lakes = mesh(waterbodies, waterbodies.objects.lakes);
  const caspian = mesh(waterbodies, waterbodies.objects.caspian);

  $: scale = options.scale;
  $: legend = options.legend;

  $: _projection = projection.fitSize([width, height], land);
  $: path = geoPath().projection(_projection);

  $: fill = (_id) => {
    const d = data.find((d) => d[join.data] === _id);
    return d !== undefined ? scale(get(d, value)) : "#E0E0E0";
  };
  $: handleHover = (e, _id) => {
    let x, y;
    if (e) {
      x = e.offsetX;
      y = e.offsetY;
    }
    let visible = true;

    const d = data.find((d) => d[join.data] === _id);
    const tip = d !== undefined ? `${d}` : null;
    const countryName = countryDict.find((d) => d.id === _id);

    if (tip) {
      tooltipOptions = {
        x: x,
        y: y,
        tip:
          id === 0
            ? `<strong>${
                countryName.en
              }</strong><br/> Mismanages ${legend.format(
                d.pct
              )}% of its plastic waste`
            : `<strong>${countryName.en}</strong><br/> ${legend.format(
                d.pct
              )}% of the global total`,
        visible: visible,
      };
    }

    return tip;
  };

  $: handleLeave = () => {
    tooltipOptions = { x: -1000, y: -1000, tip: "", visible: false };
  };

  const lineType = (type) => {
    switch (type) {
      case "Continuous line":
        return "solid";
      case "Dashed boundary line":
        return "dashed";
      case "More dotted line":
        return "dotted";
    }
  };
</script>

<div class="graphic full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg
    viewBox="0 0 {width} {height}"
    {width}
    {height}
    role="img"
    aria-labelledby="title desc"
  >
    <g>
      {#each land.features as feature}
        <path
          d={path(feature)}
          fill={fill(feature.properties[join.map])}
          class="country"
        />
      {/each}
    </g>
    <g>
      {#each border.features as feature}
        <path
          d={path(feature)}
          class="border {lineType(feature.properties.line)}"
        />
      {/each}
    </g>
    <g>
      {#each land.features as feature}
        <path
          d={path(feature)}
          class={handleHover(null, feature.properties[join.map])
            ? "selection"
            : "empty"}
          on:mousemove={(e) => handleHover(e, feature.properties[join.map])}
          on:mouseleave={handleLeave}
        />
      {/each}
    </g>
    <g>
      <path d={path(lakes)} class="lakes" />
      <path d={path(caspian)} class="lakes" />
    </g>
  </svg>

  <Legend
    {scale}
    title={legend.title}
    mapWidth={width}
    mapHeight={height}
    format={legend.format}
    position={legend.position}
  />

  <Tooltip {...tooltipOptions} {width} {height} />
</div>

<style>
  path {
    transition: fill 0.3s;
  }
  .border {
    fill: none;
    stroke: #808080;
    stroke-opacity: 0.5;
  }
  .land {
    transition: fill 0.3s;
  }
  .lakes {
    fill: #fff;
  }
  .selection {
    fill-opacity: 0;
    stroke: #000;
    stroke-opacity: 0;
    stroke-width: 1.5px;
    transition: stroke-opacity 0.3s;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .empty {
    fill-opacity: 0;
    stroke-opacity: 0;
  }
  .selection:hover {
    stroke-opacity: 1;
  }
  .full {
    width: 90%;
  }
  .solid {
    stroke-dasharray: none;
  }
  .dashed {
    stroke-dasharray: 3 2;
  }
  .dotted {
    stroke-dasharray: 1 1;
  }
</style>
