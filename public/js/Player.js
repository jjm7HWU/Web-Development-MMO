class Player extends Snake {
  constructor(x,y) {
    // constructs player snake with black-red color theme
    super(x,y);
    this.colors = [BLACK, RED];
  }
}
