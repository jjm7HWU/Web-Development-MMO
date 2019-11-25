// it requires the player file property
const FunctionsFile = require("./properties/functions");
const ArenaFile = require("./properties/arena");
const SnakeFile = require("./properties/snake");
const FoodFile = require("./properties/food");

// this class stores and manages the game state
class GameState {

    // initializes the object
    constructor()
    {
        this.arena = new ArenaFile.Arena(100,100);
        // initialises the players array
        [this.snakes, this.foodItems, this.arena] = this.initializeEntities(this.arena);

        // hold directions
        this.dirs = []
    }

    // update gameState
    update(){
        this.updateSnakes();
    }

    updateSnakes(){
      // loops through the directions array
      for(var i = 0; i < this.snakes.length; i++)
      {
        // stores each position
        var dir = this.dirs[i];

        var snake = this.snakes[i];

        if (snake.isAlive) {

          // changes snake direction
          snake.turn(dir);

          // move snake body
          this.arena = snake.update(this.arena);
        }

        if (!snake.isAlive) {

          if (snake.despawnCounter === 10) {
            // remove snake from grid and replace snake body on grid with food
            let newFoodItems = this.arena.removeSnake(snake);
            this.foodItems = this.foodItems.concat(newFoodItems);
            snake.despawnCounter--;
          }
          else if (snake.despawnCounter === 0) {
            // remove snake from array of snakes
            var id = snake.id;
            this.removePlayerID(id);
          }
          else {
            // count down to despawn
            snake.despawnCounter--;
          }
        }
      }

    }

    updateDir(socket, dir)
    {
        // stores socket id
        var id = socket.id;

        // loops through the snakes array
        for(var i = 0; i < this.snakes.length; i++)
        {
            // if the id matches
            if(this.snakes[i].id === id)
            {
                // override the the direction
                this.dirs[i] = dir;

                //stops the loop
                break;
            }
        }
    }


    // adds a player to the state
    addPlayer(socket)
    {
        // stores the socket id
        const id = socket.id;

        // it initialises the a player instance
        var initialPos = this.findSpawnLocation();

        var newSnake = new SnakeFile.Snake(initialPos.x,initialPos.y,id);

        // it pushes a player instance
        this.snakes.push(newSnake);

        // maps snake body on grid
        this.arena.placeSnake(newSnake);

        // it pushes a change position
        this.dirs.push(-1);

    }

    // removes a player from a state
    removePlayer(socket)
    {
        // stores the socket id
        var id = socket.id;
        this.removePlayerID(id);

    }

    removePlayerID(id)
    {
        // finds index of snake with given id
        let tempIndex = this.snakes.findIndex(function(tempSnake) {
          return tempSnake.isTheID(id);
        });

        if ( tempIndex != -1) {                                 // if snake was found
          let tempSnake = this.snakes[tempIndex];               // get snake
          let newFoodItems = this.arena.removeSnake(tempSnake); // remove snake form grid and get new food items
          this.foodItems = this.foodItems.concat(newFoodItems); // add new food items
          this.snakes.splice(tempIndex, 1);                     // remove snake entity
          this.dirs.splice(tempIndex, 1);                       // remove change index
        }
    }

    initializeEntities(arena) {
      let snakes = [];

      // Add 100 random food
      let foods = [];
      for (let c = 0; c < 100; c++) {
        foods.push(new FoodFile.Food(arena));
      }

      return [snakes, foods, arena];
    }

    findSpawnLocation() {
      /* Find random spawn location for player until a free space is found */
      let spawnX, spawnY;
      let isValid = false;
      while (!isValid) {
        spawnX = FunctionsFile.random(1,this.arena.width-2);
        spawnY = FunctionsFile.random(1,this.arena.height-8);
        isValid = true;
        for (let yCounter = -2; yCounter < 4; yCounter++) {
          if (this.arena.atTile(spawnX,spawnY+yCounter) != -1) {
            isValid = false; break;
          }
        }
      }

      // return spawn point
      return {x: spawnX, y: spawnY};
    }

};



// exporting the objects
module.exports = {
    GameState
};
