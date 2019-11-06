class Food {
  constructor() {
    this.x = random(-20,20);
    this.y = random(-20,20);
    this.colors = ["#edca6b","#d9b44e"];
  }

  display() {
    let X = getPlotX(this.x);
    let Y = getPlotY(this.y);
    drawRect(X, Y, 1, 1, this.colors[1]);
    drawSquare(X, Y, 1, 1, this.colors[0], 0.1);
  }

}
