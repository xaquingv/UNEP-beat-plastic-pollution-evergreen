<script>
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    export let options;
    
	$:({layout, style, version, steps, index } = options)
    let map;
    const { GeolocateControl, NavigationControl, ScaleControl } = controls;
    options.showCompass = false;
    let currentIndex = -1;

    let world = {center: [0,0], zoom: 1}

    $:if(map && currentIndex !== index) {
        if(index >= 0 && index < steps.length) {
            map.flyTo(steps[index]);
            currentIndex = index;
        }
    }

</script>

<div class='{layout} mapbox'>

    <Map
        {style}
        {version}
        bind:this={map}
        {options}
    >
    <NavigationControl {options} />
    </Map>

</div>

<style>
    :global(.mapboxgl-ctrl-group){
        box-shadow: rgba(0,0,0,.2) 1px 1px 9px!important;
    }
	.mapbox {
		height:100vh;
	}
</style>