class Food {

  /* spawn food randomly */
  constructor() {
    this.colors = ["#edca6b","#d9b44e"];
    this.nutrition = 5; // length added to snake that eats this
    this.respawn();
  }

  display() {
    // get plotting coordinates
    let X = getPlotX(this.x);
    let Y = getPlotY(this.y);

    // draw food
    drawRect(X, Y, 1, 1, this.colors[1]);
    drawSquare(X, Y, 1, 1, this.colors[0], 0.1);
  }

  respawn() {
    // respawn at random position
    this.x = random(0,99);
    this.y = random(0,99);
    arena.setTile(this.x, this.y, this);
  }

  getType() {
    return "Food";
  }

}
