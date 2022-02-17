<script>
export let img;
export let head;
export let source;
</script>

<section class='gallery'>
    <h3 class='col-text'>{head}</h3>
    {#each img as i}
        <div class='gallery-item'>
            <img src='./img/{i.img}.png'alt='{i.head}'/>
            <h4>{i.head}</h4>
            <p>{@html i.p}</p>
        </div>
    {/each}
    <p class="col-text note">{source}</p>
</section>

<style>
    .note { color: #505050 }
    .gallery-item p, .gallery-item h4 { 
        margin: 0;
        font-size: 1rem;
    }
    .gallery-item { 
        max-width: calc(50% - 2rem);   
        display: inline-block;
        vertical-align: top;
        margin-right:2rem;
    }
    img { 
        width: 100%;
        padding: 1rem
    }
    .gallery { margin: 1rem}

    @media screen and (min-width: 48rem) {
        .gallery-item { max-width: 15rem;}
        .gallery { margin: 0}
    }

    @media screen and (min-width: 66rem) {
        .gallery-item { max-width: 10rem }
    }
</style>