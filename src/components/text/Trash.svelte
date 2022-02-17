<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, Sprite, Loader } from 'svelte-pixi'
  import { onMount } from 'svelte'

  export let index, width, height, count = 0;

  const app = new PIXI.Application({
    width: width,
    height: height,
    backgroundColor: 0xf3f3f3
  })

  const amount = [5,20,35,65];
  const total = Math.max(...amount);
  const trash = [
    './img/bottle.png',
    './img/bottle-2.png',
    './img/bag.png',
    './img/bag-2.png',
    './img/fork.png',
    './img/styro.png'
  ];

  const objects = [...Array(total)]
    .map((d,i) => {
      let z = rand(0.5,2)
      let blurFilter = new PIXI.filters.BlurFilter();
      blurFilter.blur = 1 / z;
      return {
        texture: PIXI.Texture.from(trash[rand(0,trash.length-1,true)]),
        position: new PIXI.Point(rand(0,width), rand(-100, -50)),
        angle: rand(0,360),
        scale: new PIXI.Point(z / 6, z / 6),
        alpha: i < amount[index] ? z : 0,
        filters: [blurFilter],
        z: z
      }
    });

  onMount(() => {
    app.ticker.add(tick);
    return () => app.ticker.remove(tick)
  });

  function tick() {
    objects.forEach((d,i) => {
      d.position = i < amount[index] ? move(d.position, d.z) : new PIXI.Point(rand(0,width), rand(-100, -50));
      d.angle = i < amount[index] ? rotate(d.angle, d.z) : d.angle;
      d.alpha = i < amount[index] ? d.z : 0;
    })
    objects = objects;
  }

  function move(position, z) {
      count += 1;
      let y = position.y < height + 100 ? position.y + 4 * z : rand(-100, -50);
      let p = new PIXI.Point(position.x, y)
      return p;
  }

  function rotate(angle, z) {
      let a = angle + .2 * z
      return a;
  }

  function rand(min, max, round = false) {
    const r = Math.random() * (max - min + 1) + min
    return round ? Math.floor(r) : r;
  }

</script>

<div class="cover">
  <Pixi {app}>
    <Loader resources={trash}>
      {#each objects as obj}
      <Sprite
        texture={obj.texture}
        anchor={new PIXI.Point(0.5, 0.5)}
        position={obj.position}
        angle={obj.angle}
        scale={obj.scale}
        filters={obj.filters}
        alpha={obj.alpha}
      />
      {/each}
    </Loader>
  </Pixi>
</div>
