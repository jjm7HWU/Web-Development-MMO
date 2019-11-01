
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