<script>
import { scaleThreshold } from 'd3-scale';
import chroma from 'chroma-js'
import world from '../../data/world-un-alpha3.json'
import share from '../../data/mismanaged-plastic-total.json'
import shareTotal from '../../data/mismanaged-plastic-share.json'
import shareProjection from '../../data/mismanaged-plastic-2025.json'
import { geoEqualEarth } from "d3-geo";
import Map from '../maps/Map.svelte'

export let maps;
export let note;
export let source;
export let format;
export let legend;

let currentMap = 0;
$:map = maps[currentMap];

const datasets = [
    share,
    shareTotal,
    shareProjection
]
$:data = datasets[currentMap];

const projection = geoEqualEarth().rotate([-10, 0]);

const color = (n) => chroma
  .scale(['#ADE8FF', '#022944'])
  .mode('lab')
  .colors(n);

const domains = [
  [.1, 1, 5, 10, 50, 100],
  [.1, .5, 1, 5, 10, 30],
  [.1, .25, 1, 5, 10],
]
$: domain = domains[currentMap];

$:palette = () => scaleThreshold()
    	.range(color(domain.length))
    	.domain(domain)

</script>
<section>
  <h3 class='col-text'>{@html map.head}</h3>
  <nav class='col-text'>
    {#each maps as map,i}
    <button on:click={() => currentMap = i}>{map.button}</button>
    {/each}
  </nav>
  <Map 
    data={data}
    map={{json:world, features:'countries'}}
    options={
        {	
            scale:palette(),
            projection:projection,
            join:{data:'id', map:'alpha3'},
            value:'pct',
            legend:{title: maps[currentMap].legend, format: format, position: ['bottom', 'center']},
            layout:'wide',
            title:'Title',
            desc:'Description'
        }
    }
    />
  <p class="col-text note">{note}</p>
  <p class="col-text note">{source}</p>
</section>

<style>
.note { color: #505050 }
h3 { padding-bottom: .5rem; }
button {
  background-color: #e0e0e0; /* Green */
  border: 1px solid white;
  color: white;
  padding: .5rem 1.6rem;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
}
button:active, button:focus, button:target {
  background-color: #187DB5;
}
button:first-child {
  border-radius: 1rem 0 0 1rem;
}
button:last-child {
  border-radius: 0 1rem 1rem 0;
}
nav {
  text-align: left;
  padding-bottom: 2rem;
}
</style>