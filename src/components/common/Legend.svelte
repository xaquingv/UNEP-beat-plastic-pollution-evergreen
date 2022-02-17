<script>
	export let scale;
	export let title;
	export let mapWidth;
	export let mapHeight;
	export let width = 320;
	export let position;
	export let format;
	
	$: t = position[0] === 'top'
		? 0
		: position[0] === 'bottom'
		? mapHeight - 60
		: position [0];
	
	$: l = position[1] === 'left'
		? 0
		: position[1] === 'center'
		? mapWidth / 2 - width / 2
		: position[1] === 'right'
		? mapWidth - width
		: position[1];
	
	$: colors = scale.range();
	$: values = scale.domain();
	$: bw = width / values.length;
	
</script>

<div class="legend" style="top: {t}px; left: {l}px">
	<h5>{title}</h5>
	<ul class="scale" style="width: {width}px">
	{#each colors as color, i }	
		<li style="width: {bw}px">
			<div class="color" style="background: {color};"></div>
			{#if i > 0}
			<div class="ticks"></div>
			<p class="value" style="width:{bw}px; margin-left: -{bw/2}px">{format(values[i - 1])}%</p>
			{/if}
		</li>
	{/each}
	</ul>
</div>

<style>
	h5 {
		margin: 0 0 .33rem 0;
		font-size: .9rem;
	}
	ul {
		position: absolute;
		margin: 0;
		padding: 0;
	}
	li {
		display: inline-block;
		vertical-align: top;
	}
	.legend {
		position: absolute;
	}
	.scale {
		min-width: 20rem;
	}
	.color {
		height: .6rem;
	}
	.ticks {
		border-left: .5px solid #808080;
		height: .4rem;
	}
	.value {
		padding: .1rem 0 0 0;
		margin: 0;
		font-size: .8rem;
		color: #808080;
		text-align: center;
	}
</style>