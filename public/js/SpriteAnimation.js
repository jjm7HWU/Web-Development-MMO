class SpriteAnimation {
  constructor(name, frames) {
    this.frames = frames;     // number of frames
    this.fetchImages(name);
  }

  display(x, y, frameNumber) {
    let image = this.images[frameNumber];
    image.display(x*TILE_SIZE, y*TILE_SIZE);
  }

  fetchImages(name) {
    this.images = [];
    for (let frameIndex = 0; frameIndex < this.frames; frameIndex++) {
      let image = new Sprite(name+frameIndex+".png");
      this.images.push(image);
    }
  }
}
