const ArenaFile = require("./arena");

const {random, randomColor, decToHex} = require("./functions");

class Food {

    /* spawn food randomly */
    constructor(arena) {
      this.colors = ["#edca6b","#d9b44e"];
      this.nutrition = 5; // length added to snake that eats this
      this.respawn(arena);
    }

    respawn(arena) {
      /* Respawn at random empty position */
      this.x = random(1,98);
      this.y = random(1,98);
      while (arena.atTile(this.x, this.y) != "-1") {
        this.x = random(1,98);
        this.y = random(1,98);
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
