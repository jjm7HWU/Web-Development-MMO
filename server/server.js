//loads the socketio module
const socketio = require("socket.io");

// Instantiates an app variable
let app;


// TEMPORARY PORT -- REMOVE!!!!!!!!!!!!!!!
process.env.PORT = 3000

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

io.on("connection", (socket) => {

    
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

    socket.on("disconnect", () => {
        console.log("user disconnect")
    })
})