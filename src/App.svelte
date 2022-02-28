<script>
  import Text from "./components/text/Text.svelte";
  import Gallery from "./components/text/Gallery.svelte";
  import Footer from "./components/text/Footer.svelte";
  import TopNav from "./components/nav/TopNav.svelte";
  import BigText from "./components/text/BigText.svelte";
  import RainingTrash from "./components/text/RainingTrash.svelte";
  import ChapterHeader from "./components/text/ChapterHeader.svelte";
  import locale from "@reuters-graphics/d3-locale";
  import ScrollerMapbox from "./components/text/ScrollerMapbox.svelte";
  import MapCollection from "./components/text/MapCollection.svelte";
  import ScrollerGallery from "./components/text/ScrollerGallery.svelte";

  export let content, languages, lang;

  const loc = new locale(lang);

  const format = loc.format(".2f");

  const components = {
    intro: ChapterHeader,
    text: Text,
    "raining-trash": RainingTrash,
    footer: Footer,
    "big-text": BigText,
    "scrolly-map": ScrollerMapbox,
    "map-collection": MapCollection,
    gallery: Gallery,
    "scrolly-gallery": ScrollerGallery,
  };
</script>

<TopNav {languages} {lang} />
<main>
  <article class={lang === "ar" ? "rtl" : ""} dir={lang === "ar" ? "rtl" : ""}>
    {#each content as block}
      {#if components[block.type]}
        <svelte:component this={components[block.type]} {...block} {format} />
      {:else}
        <div>Missing component for '{block.type}'</div>
      {/if}
    {/each}
  </article>
</main>

<style>
  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
  }

  .rtl {
    text-align: right !important;
  }

  .twitter-share-button {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 4rem;
    left: 1rem;
    background-color: red;
  }

  :global(.graphic) {
    height: 60vh;
    margin-bottom: 3rem;
    margin-top: 2rem;
  }
</style>
