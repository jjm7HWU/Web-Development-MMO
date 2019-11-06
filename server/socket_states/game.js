// it requires the player file property
const SnakeFile = require("./properties/snake");

// this class stores and manages the game state
class GameState {

    // initializes the object
    constructor() 
    {
        // initialises the players array
        this.snakes = []

        // hold changes
        this.changes = []
    }

    // adds a player to the state
    addPlayer(socket) 
    {
        // stores the socket id 
        const id = socket.id;

        // it initialises the a player instance
        var newSnake = new SnakeFile.Snake(0,0,id);

        // it pushes a player instance
        this.snakes.push(newSnake);
    }

    // removes a player from a state
    removePlayer(socket) 
    {
        // stores the socket id
        var id = socket.id;

        // removes the player that meets the condition
        this.snakes = this.snakes.filter( function (tempSnake) 
        {
            // checks the id of each player
            return tempSnake.isTheID(id);
        })
        
    }

    // displays the players
    displayPlayers() {
        console.log(this.snakes)
    }

    // display changes
    displayTurns(){
        console.log(this.changes)
    }

};



// exporting the objects
module.exports = {
    GameState
};
