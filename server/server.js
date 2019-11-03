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



// requires the game state
let gameState = require("./socket_states/game");

io.on("connection", (socket) => {

    gameState.displayPlayers();


    gameState.addPlayer(socket);

    
    gameState.displayPlayers();
  
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
  
    socket.on("disconnect", (socket) => {
        console.log("user disconnect")

        gameState.removePlayer(socket);
    
        gameState.displayPlayers();


    })


})