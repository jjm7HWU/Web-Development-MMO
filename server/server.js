//loads the socketio module
const socketio = require("socket.io");

// Instantiates an app variable
let app;


// TEMPORARY PORT -- REMOVE BEFORE DEPLOYMENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var port = process.env.PORT || 5000;

try
{
    // loads the instance into the variable
    app = require("./app");

} catch (error)
{
    // logs an error if anything unexpected happens while initializing the app
    console.log(error)
}


// Instantiates the server instance
const server = app.listen(port, () => {
    // logs the message if everything is fine
    console.log("Server is up on port " + process.env.PORT)
})


// instantiates the web socket
const io = socketio(server);



// requires the game state class
const game_state = require("./socket_states/game");

// game state variable
let gameState = new game_state.GameState();

// stream game state
let streamGameState = () => {
    gameState.update()
    io.sockets.emit("game state", gameState)
}





// initialise web socket
io.on("connection", function (socket) {

    // add new player to game state
    gameState.addPlayer(socket);


    // streams the game state after adding a player
    streamGameState()

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    socket.on("update dir", function(dir) {
        gameState.updateDir(socket, dir)
    })

    socket.on("disconnect", function () {
        console.log("user disconnect")

        gameState.removePlayer(socket);

        // streams the game state after removing a player
        streamGameState()

    })


})


// sends the global game state to everybody
setInterval(function() {
    streamGameState()
}, 200)
