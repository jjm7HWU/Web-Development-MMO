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

    // update gameState
    

    // adds a player to the state
    addPlayer(socket) 
    {
        // stores the socket id 
        const id = socket.id;

        // it initialises the a player instance
        var newSnake = new SnakeFile.Snake(0,0,id);

        // it pushes a player instance
        this.snakes.push(newSnake);

        // it pushes a change position
        this.changes.push(-1);
    }

    // removes a player from a state
    removePlayer(socket) 
    {
        // stores the socket id
        var id = socket.id;
        
        let tempIndex = -1;

        // removes the snake that meets the condition
        this.snakes = this.snakes.filter( function (tempSnake, index) 
        {
            // checks the id of each player
            var isTheID = tempSnake.isTheID(id);

            // if snake is being removed
            if (isTheID)
            {
                tempIndex = index
            }
            
            // return value
            return !isTheID;
        })
        
        // if the index was found, remove the change index as well
        if ( tempIndex != -1) this.changes.splice(tempIndex, 1)
        
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
