
class Snake {
  constructor(x,y) {
    this.x = x; this.y = y;
    this.direction = {x:0, y:1}; // snake initially heading downwards
    this.colors = [randomColor(), randomColor()];
    this.eatStack = 0;
    this.length = 1;
    this.trail = []
    for (let c = 0; c < this.length; c++) {
      this.trail.push([this.x, this.y+c]);
      arena.setTile(this.x, this.y+c, 0);
    }
  }

  /* Changes snake position according to current directions */
  update() {
    // updates snake's position
    this.x += this.direction.x;
    this.y += this.direction.y;

    let cell = arena.atTile(this.x, this.y);
    let isAlive = true;

    // collision detection
    if (typeof(cell) == "object") {

      switch (cell.getType()) {
        case("Food"):
          // food detected
          this.eatStack += cell.nutrition;
          cell.respawn();
          break;
      }

    }

    if (isAlive) {

      // removes end of tail
      if (this.eatStack == 0) {
        let tail = this.trail.pop();
        arena.setTile(tail[0], tail[1], -1);
      }
      else { // unless snake is eating
        this.eatStack--;
      }

      // adds new head position to body
      this.trail.unshift([this.x, this.y]);
      arena.setTile(this.x, this.y, 0);
    }
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
    // emit new direction
    socket.emit("update dir", n);

    /* Changes snake direction to corresponding number */
    switch (n) {
      case (0) : this.direction.x = 0; this.direction.y = -1; break;    // turn UP
      case (1) : this.direction.x = 1; this.direction.y = 0; break;     // turn RIGHT
      case (2) : this.direction.x = 0; this.direction.y = 1; break;     // turn DOWN
      case (3) : this.direction.x = -1; this.direction.y = 0; break;    // turn LEFT
    }
  }

}
