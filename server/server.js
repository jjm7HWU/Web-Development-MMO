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
gameState.displayDirs();




// initialise web socket
io.on("connection", function (socket) {


    // setInterval(function() {
    //     console.log("Emitting game state");
    //     socket.emit("game state" + gameState)
    // }, 1000)


    // add new player to game state
    gameState.addPlayer(socket);

    console.log("after player was added")
    gameState.displayPlayers();
    gameState.displayDirs();
  
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    socket.on("update dir", function(socket, dir) {
        console.log("UPDATE DIR EVENT!!!!!!!!!!!!!!!!!!!")
        gameState.updateDir(socket, dir)
    })
  
    socket.on("disconnect", function () {
        console.log("user disconnect")

        gameState.removePlayer(socket);
    
        console.log("after player was removed")
        gameState.displayPlayers();
        gameState.displayDirs();


    })


})