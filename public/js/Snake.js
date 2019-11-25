class Snake {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display() {
    if (!this.isAlive) return; // snake is dead so do not display

    // draw tail of snake
    this.displayTail();

    // iterate through each point on the body excluding the tips
    for (var index = this.trail.length-2; index > 0; index--) {
      let point = this.trail[index];                    // get current point
      let prevPoint = this.trail[index-1] || undefined; // get point before (closer to head)
      let nextPoint = this.trail[index+1] || undefined; // get point after (closer to tail)

      // calculate grid position for plotting current point
      let X = getPlotX(point[0])+currentOffset.x;
      let Y = getPlotY(point[1])+currentOffset.y;

      // determine the shape and angle that the current point should be
      let cellCurve = getBodyCurve(prevPoint, point, nextPoint);

      // get the image of the shape
      let skin = skins[5*(this.skinIndex-1) + cellCurve.shape];

      // draw the image at the appropriate angle
      skin.display(X*TILE_SIZE, Y*TILE_SIZE, cellCurve.angle); // draws cell
    }

    // draw head of snake
    this.displayHead();
  }

  displayHead() {
    if (!this.isAlive) return; // snake is dead so do not display

    /* Display the head of the snake */
    let skin = skins[5*(this.skinIndex-1) + 2];           // get the image of the head
    let bearing = this.getDirectionNumber();              // determine the bearing the snake is facing
    let X = getPlotX(this.x);                             // calculate horizontal grid position of head
    let Y = getPlotY(this.y);                             // calculate vertical grid position of head
    skin.display(X*TILE_SIZE, Y*TILE_SIZE, 90*bearing);   // draw head

    /* Display image extending from head */
    skin = skins[5*(this.skinIndex-1) + 4];               // get the image of the neck
    X = getPlotX(this.x) - this.direction.x;              // calculate horizontal grid position of neck
    Y = getPlotY(this.y) - this.direction.y;              // calculate vertical grid position of neck
    skin.display(X*TILE_SIZE, Y*TILE_SIZE, 90*bearing);   // draw neck
  }

  displayTail() {
    if (!this.isAlive) return; // snake is dead so do not display

    /* Display the tip of the snake's tail */
    let index = this.trail.length - 1;                    // get index of tail
    let point = this.trail[index];                        // get coordinate of tail
    let point2 = this.trail[index-1];                     // get coordinate of cell attached to tail
    let skin = skins[5*(this.skinIndex-1) + 3];           // get the image of the tail
    let bearing = this.getDirectionNumber(                // determine the bearing of tail
      point2[0]-point[0], point2[1]-point[1]);
    let X = getPlotX(point[0])+currentOffset.x;           // calculate horizontal grid position of tail
    let Y = getPlotY(point[1])+currentOffset.y;           // calculate vertical grid position of tail
    skin.display(X*TILE_SIZE, Y*TILE_SIZE, 90*bearing);   // draw tail
  }

  getDirectionNumber(x=this.direction.x, y=this.direction.y) {
    /* Returns direction index of cell or of direction that player is moving */
    if (x == 0) {
      if (y == -1) return 0;  // cell heading up
      else return 2;          // cell heading down
    }
    else {
      if (x == -1) return 3;  // cell heading left
      else return 1;          // cell heading right
    }
  }

}
