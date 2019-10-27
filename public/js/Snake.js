class Snake {
  constructor(x,y) {
    this.x = x; this.y = y;
    this.direction = {x:0, y:1};
    this.colors = [randomColor(), randomColor()];
    this.trail = [];
    for (let counter = 0; counter < random(3, random(3, 1000)); counter++) {
      this.trail.push([this.x, this.y-counter]);
    }
    this.turn_countdown = random(10,12);
  }

  update() {
    this.turn_countdown -= 1;
    if (this.turn_countdown == 0) {
      this.turn(random(0,3));
      this.turn_countdown = random(10,12);
    }
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.trail.pop();
    this.trail.unshift([this.x, this.y]);
  }

  display() {
    ctx.lineWidth = 20;
    ctx.strokeStyle = this.colors[1];
    ctx.moveTo(CENTER_X*TILE_SIZE+30, CENTER_Y*TILE_SIZE+30);
    ctx.beginPath();
    let X, Y;
    for (const point of this.trail) {
      X = getPlotX(point[0]); Y = getPlotY(point[1]);
      drawRect(X, Y, 1, 1, this.colors[0]);
      ctx.lineTo(TILE_SIZE*(X + 0.5), TILE_SIZE*(Y + 0.5));
    }
    ctx.stroke();
  }

  displayHead() {
    drawRect(getPlotX(this.x), getPlotY(this.y), 1, 1, this.colors[1]);
  }

  turn(n) {
    switch (n) {
      case (0) : this.direction.x = 0; this.direction.y = -1; break;
      case (1) : this.direction.x = 1; this.direction.y = 0; break;
      case (2) : this.direction.x = 0; this.direction.y = 1; break;
      case (3) : this.direction.x = -1; this.direction.y = 0; break;
    }
  }

}
