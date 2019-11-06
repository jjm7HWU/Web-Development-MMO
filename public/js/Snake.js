class Snake {
  constructor(x,y) {
    this.x = x; this.y = y;
    this.direction = {x:0, y:1}; // snake initially heading downwards
    this.colors = [randomColor(), randomColor()];
    this.eatStack = 0;
    // create snake body of random length
    this.trail = [[this.x, this.y], [this.x, this.y-1]];
    // turn_countdown decreases by one each frame and when zero is reached the snake turns
    // in a random direction and countdown_timer is reset
    // TEMPORARY - to be removed when multiplayer is functioning
    this.turn_countdown = random(10,12);
  }

  /* Changes snake position according to current directions */
  update() {
    // updates snake's position
    this.x += this.direction.x;
    this.y += this.direction.y;

    if (arena.atTile(this.x, this.y) == -2) {
      this.eatStack += 5;
    }

    // removes end of tail
    if (this.eatStack == 0) {
      let tail = this.trail.pop();
      arena.setTile(tail[0], tail[1], -1);
    }
    else { // unless snake is eating
      this.eatStack--;
    }

    // adds new position to body
    this.trail.unshift([this.x, this.y]);
    arena.setTile(this.x, this.y, 1);
  }

  display() {
    // TODO: Integrate PixiJS. This implementation is temporary.
    ctx.lineWidth = 20;
    ctx.strokeStyle = this.colors[1];
    ctx.moveTo(CENTER_X*TILE_SIZE+30, CENTER_Y*TILE_SIZE+30);
    ctx.beginPath();
    let X, Y;
    for (const point of this.trail) {
      X = getPlotX(point[0]); Y = getPlotY(point[1]);
      drawRect(X, Y, 1, 1, this.colors[0]); // draws cell
      ctx.lineTo(TILE_SIZE*(X + 0.5), TILE_SIZE*(Y + 0.5)); // traces inner line
    }
    ctx.stroke(); // draws inner line
  }

  displayHead() {
    drawRect(getPlotX(this.x), getPlotY(this.y), 1, 1, this.colors[1]); // draws head cell
  }

  turn(n) {
    /* Changes snake direction to corresponding number */
    switch (n) {
      case (0) : this.direction.x = 0; this.direction.y = -1; break;    // turn UP
      case (1) : this.direction.x = 1; this.direction.y = 0; break;     // turn RIGHT
      case (2) : this.direction.x = 0; this.direction.y = 1; break;     // turn DOWN
      case (3) : this.direction.x = -1; this.direction.y = 0; break;    // turn LEFT
    }
  }

}
