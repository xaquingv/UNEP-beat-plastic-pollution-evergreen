<script>
    import Scroller from '@sveltejs/svelte-scroller'
    import Trash from './Trash.svelte'

    export let type;
    export let text;

    let progress, index = 0, width, height;

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<section class='full {type} diagram'>
    <Scroller
        top={0}
        bottom={1}
				bind:progress
        bind:index
        >

      <div slot='background'>
          <div class='video-wrapper'>
          {#if width}
          <Trash {index} {width} {height} />
          {/if}
          </div>
      </div>

      <div slot='foreground'>
          {#each text as p}
          <section class='step'>
            <h3 class='narrow'><span class='bg-text'>{@html p.p}</span></h3>
          </section>
        {/each}
      </div>

    </Scroller>
</section>

<style>
  .diagram {
		background-color: #f3f3f3;
	}
  .step { 
    height: 80vh;
    padding-top: 60vh;
    color:#000;
    margin-left: 1rem;
    margin-right: 1rem;
    
  }
  .video-wrapper{
    width: 100%;
    height: 100vh;
  }
  .header { padding: 4rem 0; }
  .bg-text { 
    background-color: #f3f3f3aa;
    padding: 0.08rem 0;
  }
  .white { 
    background-color: #f9f9f9;
    color:#000;
  }
  @media screen and (min-width: 48rem) {
    .step { 
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>