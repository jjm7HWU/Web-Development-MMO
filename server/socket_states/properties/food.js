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
      // respawn at random position
      this.x = random(0,99);
      this.y = random(0,99);
      arena.setTile(this.x, this.y, this);
      return arena
    }

    getType() {
      return "Food";
    }

  }


module.exports = {
    Food
}
