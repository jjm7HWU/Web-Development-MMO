class Arena {

  constructor() {
    this.width = 100;
    this.height = 100;
    this.grid = [];
    // create grid of width x height
    for (let i = 0; i < this.width; i++) {
      let column = [];
      for (let j = 0; j < this.height; j++) {
        column.push(-1);
      }
      this.grid.push(column);
    }
  }

  setTile(x, y, value) {
    // set tile (x,y) to value
    this.grid[x][y] = value;
  }

  atTile(x, y) {
    // return value at tile (x,y)
    return this.grid[x][y];
  }

}
