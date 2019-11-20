class Snake {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display() {
    let X, Y, skin, cellCurve, point, prevPoint, nextPoint;
    for (let index = 0; index < this.trail.length; index++) {
      point = this.trail[index];
      prevPoint = this.trail[index-1] || undefined;
      nextPoint = this.trail[index+1] || undefined;

      X = getPlotX(point[0]); Y = getPlotY(point[1]);

      cellCurve = getCellCurve(prevPoint, nextPoint);

      skin = skins[cellCurve.shape];

      skin.display(X*TILE_SIZE, Y*TILE_SIZE, cellCurve.angle); // draws cell
    }
  }

  displayHead() {
    drawRect(getPlotX(this.x), getPlotY(this.y), 1, 1, this.colors[1]); // draws head cell
  }

}
