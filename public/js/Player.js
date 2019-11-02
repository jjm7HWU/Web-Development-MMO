class Player extends Snake {
  constructor(x,y) {
     // constructs player snake with black-red color theme
    super(x,y);
    this.colors = [BLACK, RED];
  }

  update() {
    // updates snake's position
    this.x += this.direction.x;
    this.y += this.direction.y;

    // removes end of tail and adds new head position to body
    this.trail.pop();
    this.trail.unshift([this.x, this.y]);
  }
}
