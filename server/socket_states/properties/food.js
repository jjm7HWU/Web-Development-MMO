const ArenaFile = require("./arena");

const {random, randomColor, decToHex} = require("./functions");

class Food {

    /* spawn food randomly */
    constructor(arena, x=null, y=null) {
      this.colors = ["#edca6b","#d9b44e"];
      this.nutrition = 5; // length added to snake that eats this
      this.frameIndex = 0;
      this.respawn(arena, x, y);
    }

    respawn(arena, x=null, y=null) {
      /* Respawn at random empty position */
      if (x == null || y == null) {
        this.x = random(1,98);
        this.y = random(1,98);
        while (arena.atTile(this.x, this.y) != "-1") {
          this.x = random(1,98);
          this.y = random(1,98);
        }
      }
      else {
        this.x = x;
        this.y = y;
      }
      arena.setTile(this.x, this.y, this);
      return arena;
    }

    getType() {
      return "Food";
    }

  }


module.exports = {
    Food
}
