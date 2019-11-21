class Food {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display() {
    // get plotting coordinates
    let X = getPlotX(this.x);
    let Y = getPlotY(this.y);

    // draw food
    foodAnimation.display(X, Y, this.frameIndex);
    this.frameIndex++;
  }

}
