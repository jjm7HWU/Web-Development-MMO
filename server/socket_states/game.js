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

          // changes snake direction
          snake.turn(dir);

          // move snake body
          this.arena = snake.update(this.arena);

          if (!snake.isAlive) {
            console.log("DIE");
            var id = snake.id;
            this.arena.removeSnake(snake.id, snake.trail);
            this.removePlayerID(id);
          }
      }

      this.displayDirs();
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
        var initialPos ={
            x: Math.floor(this.arena.width/2),
            y: Math.floor(this.arena.height/2)
        }

        var newSnake = new SnakeFile.Snake(initialPos.x,initialPos.y,id);

        // it pushes a player instance
        this.snakes.push(newSnake);

        // maps snake body on grid
        this.arena.placeSnake(newSnake.id, newSnake.trail);

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

        let tempIndex = -1;

        // removes the snake that meets the condition
        this.snakes = this.snakes.filter( function (tempSnake, index)
        {
            // checks the id of each player
            var isTheID = tempSnake.isTheID(id);

            // if snake is being removed
            if (isTheID)
            {
                tempIndex = index;
            }

            // return value
            return !isTheID;
        })

        // if the index was found, remove the change index as well
        if ( tempIndex != -1) this.dirs.splice(tempIndex, 1)

    }

    // displays the players
    displayPlayers() {
        console.log(this.snakes)
    }

    // display directions
    displayDirs(){
        console.log(this.dirs)
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

};



// exporting the objects
module.exports = {
    GameState
};
