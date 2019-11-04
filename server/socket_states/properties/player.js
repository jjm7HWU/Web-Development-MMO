// Player class
class Player 
{
    // it initialises the player variable
    constructor(socket)
    {
        // it assigns the socket id to the object's id property
        this.id = socket.id;

        
    }


    isTheID(id)
    {
        return this.id == id;
    }

}

// exporting objects
module.exports = {
    Player
}