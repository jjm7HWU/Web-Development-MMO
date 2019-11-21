class Snake {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display() {
    // iterate through each point on the body excluding the tips
    for (var index = 1; index < this.trail.length-1; index++) {
      let point = this.trail[index];                    // get current point
      let prevPoint = this.trail[index-1] || undefined; // get point before (closer to head)
      let nextPoint = this.trail[index+1] || undefined; // get point after (closer to tail)

      // calculate grid position for plotting current point
      let X = getPlotX(point[0]);
      let Y = getPlotY(point[1]);

      // determine the shape and angle that the current point should be
      let cellCurve = getBodyCurve(prevPoint, point, nextPoint);

      // get the image of the shape
      let skin = skins[2*(this.skinIndex-1) + cellCurve.shape];

      // draw the image at the appropriate angle
      skin.display(X*TILE_SIZE, Y*TILE_SIZE, cellCurve.angle); // draws cell
    }

    this.displayTail(); // draws tip of tail (to be replaced)
  }

  displayHead() {
    /* Display the head of the snake */
    drawRect(getPlotX(this.x), getPlotY(this.y), 1, 1, this.colors[1]);
    ctx.stroke();
  }

  displayTail() {
    /* Display the tip of the snake's tail */
    let index = this.trail.length - 1;
    let point = this.trail[index];
    drawRect(getPlotX(point[0]), getPlotY(point[1]), 1, 1, this.colors[1]);
    ctx.stroke();
  }

}
