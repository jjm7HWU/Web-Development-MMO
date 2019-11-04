// it requires the player file property
const playerFile = require("./properties/player");

// this class stores and manages the game state
class GameState {

    // initializes the object
    constructor() 
    {
        // initialises the players array
        this.players = []
    }

    // adds a player to the state
    addPlayer(socket) 
    {
        // it initialises the a player instance
        var newPlayer = new playerFile.Player(socket);

        // it pushes a player instance
        this.players.push(newPlayer);
    }

    // removes a player from a state
    removePlayer(socket) 
    {
        // stores the socket id
        var id = socket.id;

        // removes the player that meets the condition
        this.players = this.players.filter( function (tempPlayer) 
        {
            // checks the id of each player
            return tempPlayer.isTheID(id);
        })
        
    }

    // displays the players
    displayPlayers() {
        console.log(this.players)
    }

};



// exporting the objects
module.exports = {
    GameState
};
