import { Socket } from "dgram";

class Snake {
  constructor(x,y) {
    this.x = x; this.y = y;
    this.direction = {x:0, y:1}; // snake initially heading downwards
    this.colors = [randomColor(), randomColor()];
    // create snake body of random length
    this.trail = [];
    for (let counter = 0; counter < random(3, random(3, 1000)); counter++) {
      this.trail.push([this.x, this.y-counter]);
    }
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

    // removes end of tail and adds new head position to body
    this.trail.pop();
    this.trail.unshift([this.x, this.y]);
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
    socket.emit("update", n);

    /* Changes snake direction to corresponding number */
    switch (n) {
      case (0) : this.direction.x = 0; this.direction.y = -1; break;    // turn UP
      case (1) : this.direction.x = 1; this.direction.y = 0; break;     // turn RIGHT
      case (2) : this.direction.x = 0; this.direction.y = 1; break;     // turn DOWN
      case (3) : this.direction.x = -1; this.direction.y = 0; break;    // turn LEFT
    }
  }

}
