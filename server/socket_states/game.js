
// this class stores and manages the game state
class GameState {

    // initializes the object
    constructor() 
    {
        // initi
        this.players = []
    }

    // adds a player to the state
    addPlayer(socket) 
    {
        this.players.push(socket.id);
    }

    // removes a player from a state
    removePlayer(socket) 
    {
        // removes the player that meets the condition
        this.players = this.players.filter( function (value) {
            console.log("value: ")
            console.log(typeof value)
            console.log("id: ")
            console.log(typeof socket.id)
            console.log(value == socket.id)
            return value == socket.id
        } )
        
    }

    // displays the players
    displayPlayers() {
        console.log(this.players)
    }

};



// exporting the game state
module.exports = {
    GameState
};