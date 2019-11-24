class Food {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display(frameIndex) {
    // get plotting coordinates
    let X = getPlotX(this.x);
    let Y = getPlotY(this.y);

    // draw food item at specified frame
    foodAnimation.display(X+currentOffset.x, Y+currentOffset.y, (frameIndex+this.frameIndex)%6);
  }

  getType() {
    return "Food";
  }

}
