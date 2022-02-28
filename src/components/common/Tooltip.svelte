<script>
  export let x;
  export let y;
  export let width;
  export let height;
  export let tip;
  export let visible = false;
  let tooltipWidth = 160;
  let tooltipHeight = 10;

  $: tx =
    x < width - tooltipWidth && x >= tooltipWidth / 2
      ? x - tooltipWidth / 2
      : x < tooltipWidth / 2
      ? 0
      : width - tooltipWidth - tooltipWidth / 2;

  $: ty =
    y < height - tooltipHeight - 30 && y >= 0
      ? y + 30
      : y < tooltipHeight
      ? 0
      : y - tooltipHeight - 30;
</script>

{#if tip}
  <div
    class="tooltip"
    style="top: {ty}px; left: {tx}px; opacity: {visible
      ? 1
      : 0}; width: {tooltipWidth}px"
    bind:clientHeight={tooltipHeight}
  >
    <p>{@html tip}</p>
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 9px;
    padding: 0.5rem;
    transition: opacity 0.3s;
  }
  p {
    font-size: 0.85rem;
    margin: 0;
  }
</style>
