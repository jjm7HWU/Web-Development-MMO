class Player extends Snake {
  constructor(x,y) {
    super(x,y);
    this.colors = [BLACK, RED];
  }

  update() {
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.trail.pop();
    this.trail.unshift([this.x, this.y])
  }
}
