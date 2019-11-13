class Food {

  display() {
    // get plotting coordinates
    let X = getPlotX(this.x);
    let Y = getPlotY(this.y);

    // draw food
    drawRect(X, Y, 1, 1, this.colors[1]);
    drawSquare(X, Y, 1, 1, this.colors[0], 0.1);
  }

}
