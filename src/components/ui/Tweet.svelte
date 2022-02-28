<script>
  export let text;
  export let url;
  export let hashtags;
  export let via;
  export let related;
  export let in_reply_to;
  export let pic;

  let twitter_web_intent = `https://twitter.com/intent/tweet?text=${text}%20${pic}&hasktags=${hashtags}&url=${url}&via=${via}`;
</script>

<a href={twitter_web_intent}>
  <div class="share">
    <img
      src="img/twitter.svg"
      alt="Twitter Logo"
      target="_blank"
      rel="noopener"
    />
  </div>
</a>

<style>
  .share {
    background-color: #222;
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    padding: 0.5rem;
    margin-top: 1rem;
    transition: all 0.3s;
  }
  a {
    border: none;
  }
  .share:hover {
    margin-top: 0.5rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>
