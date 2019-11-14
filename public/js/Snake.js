
class Snake {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display() {
    ctx.lineWidth = 20;
    ctx.strokeStyle = this.colors[1];
    ctx.moveTo(Math.floor((CENTER_X+0.5)*TILE_SIZE), Math.floor((CENTER_Y+0.5)*TILE_SIZE));
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

}
