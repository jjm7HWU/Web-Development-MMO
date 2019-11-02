//loads the socketio module
const socketio = require("socket.io");

// Instantiates an app variable
let app;


// TEMPORARY PORT -- REMOVE BEFORE DEPLOYMENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
process.env.PORT = 5000

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
const server = app.listen(process.env.PORT, () => {
    // logs the message if everything is fine
    console.log("Server is up on port " + process.env.PORT)
})


// instantiates the web socket
const io = socketio(server);



// requires the game state class
const game_state = require("./socket_states/game");

// game state variable
let gameState = new game_state.GameState();


console.log("no players");
gameState.displayPlayers();

io.on("connection", function (socket) {


    gameState.addPlayer(socket);

    console.log("after player was added")
    gameState.displayPlayers();
  
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
  
    socket.on("disconnect", function () {
        console.log("user disconnect")

        gameState.removePlayer(socket);
    
        console.log("after player was removed")
        gameState.displayPlayers();


    })


})