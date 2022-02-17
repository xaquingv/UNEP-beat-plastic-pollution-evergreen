<script>
    import Scroller from '@sveltejs/svelte-scroller'
    import Mapbox from '../maps/Mapbox.svelte'

    export let type;
    export let text;

    let index = 0;

    const steps = [
		  {center: [0,0], zoom:1.8, speed: 2},
		  {center: [90.5,23.5], zoom:5, speed: 0.5},
		  {center: [121.5,31.5], zoom:5, speed: 0.5},
      {center: [-90.5, 29.5], zoom:6, speed: 0.5},
      {center: [0,0], zoom:1.8, speed: 2},
	  ]

</script>

<section class='full {type}'>
    <Scroller
        top={0}
        bottom={1}
		    bind:index
        >

      <div slot='background'>
          <div class='video-wrapper'>
            <Mapbox 
            options={
                {
                    style:'mapbox://styles/xocasgv/ckysglyl0dvbc14qpxw3spbmz',
                    scrollZoom:false,
                    accessToken:'pk.eyJ1IjoieG9jYXNndiIsImEiOiI0eDhKVHlZIn0.YdtRFZW4yC0tSdoXoTgGUA',
                    layout:'full',
                    projection: 'equalEarth',
                    version: 'v2.7.0',
                    steps:steps,
                    index: index
                }}
            />
          </div>
      </div>

      <div slot='foreground'>
            {#each text as p}
            <section class='step'>
              <h3 class='narrow'>{@html p.p}</h3>
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
    color:#222;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .video-wrapper{
    width: 100%;
    height: 100vh;
  }
  .header { padding: 4rem 0; }
  .bg-text { 
    background-color: rgba(0,0,0,.3);
    padding: 0.08rem 0;
  }
  :global(.mapboxgl-ctrl-top-right) {
      top:4rem!important;
    }
  @media screen and (min-width: 48rem) {
    .step { 
      margin-left: 0;
      margin-right: 0;
    }
    :global(.mapboxgl-ctrl-top-right) {
      top:5rem!important;
    }
  }
</style>