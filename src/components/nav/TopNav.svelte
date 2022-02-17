<script>
  import Logo from '../nav/Logo.svelte'
  export let languages;
  export let lang;

  let y, width, height, submenu;

  $: placement = (y > height * 1.8)? 'below': '';
  $: desktop = (width > 1008);

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={width} bind:innerHeight={height}/>
<nav class={desktop ? placement : 'below'}>

    <Logo 
    alt='UNEP@50 logo'
    {lang}
    {placement}
    align={lang === 'ar' ? 'right' : ''}
    />

    {#if desktop}
    <ul>
      {#each languages as l}
      <li><a href="?lang={l.short}">{l.long}</a></li>
      {/each}
    </ul>

    {:else}
    <ul class="lang-menu">
          {#each languages as l}
          <li><a href="?lang={l.short}">{l.short}</a></li>
          {/each}
    </ul>
    {/if}

</nav>

<style>
  nav {
    width:100%;
    padding:1rem;
    position:fixed;
    top:0;
    z-index: 100;
    height: 3rem;
  }
  .lang-menu {
    width:100%;
    background-color: #2e2e2e;
  }
  .below {
    background-color: #1E1E1E;
    transition: background-color .5s;
  }
  ul { 
    float: right;
    padding: .5rem .5rem 1rem;
    margin-top: .35rem!important;
    color:#fff;
    text-shadow: 0 0 2rem #00000066, 0 0 1rem #00000099, 0 0 .5rem #000000CC;
  }
  .below ul {
    text-shadow:none;
  }
  li { 
    list-style-type: none;
    display: inline-block;
    margin-left: 0 0 0 1rem;
    padding: 0 0 0 1rem;
    font-size: 1rem;
  }
  li a, .download a { border: none; }

  .download {
    font-size: 1rem;
    border: 2px solid #FFF;
    border-radius: 100rem;
    height: 1.6rem;
    margin-right:2rem;
    margin-top: .3rem;
    padding:.3rem .7rem 0 .7rem;
    cursor: pointer;
    float:right;
    color:#fff;
  }
  @media screen and (min-width: 48rem) {
    .download {
      margin-left: 2rem;
      margin-top: -0.35rem;
      margin-right: 1rem;
      padding:.5rem .7rem 0 .7rem;
      
    }
  }
</style>