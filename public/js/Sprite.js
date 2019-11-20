class Sprite {

  constructor(source)
  {
    // create <img> element given image name
    this.image = new Image();
    this.image.src = "../imgs/"+source;

  }

  display(x, y, angle=0)
  {
    // adjust x for actual size
    x += Math.floor(TILE_SIZE/2);
    y += Math.floor(TILE_SIZE/2);

    // store current canvas state before rotating
    ctx.save();

    // rotate canvas at origin (x,y)
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);

    // draw image
    ctx.drawImage(this.image, -(TILE_SIZE/2), -(TILE_SIZE/2), TILE_SIZE, TILE_SIZE);

    // restore canvas
    ctx.restore();
  }

}
