<<<<<<< HEAD

// stores and manages the game state
let gameState = {
    players: [],
    addPlayer: (socket) => {
        if(!this.players)
        {
            this.players = [socket.id]
        }
        else {
            this.players
        }

        //this.players.push(socket.id);
    },
    removePlayer: (socket) => {
        this.players.filter( (value) => value != socket.id )

        console.log("removing player")
        console.log(this.players)
    },
    displayPlayers: () => {
        if(!this.players)
        {
            console.log("Zero players")
        } else
        {
            console.log(this.players);
        }
    }
};




// exporting the game state
module.exports = gameState;
=======
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
>>>>>>> upstream/master
