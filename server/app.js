// loads the native path module
const path = require("path");

// loads expressjs module
const express = require("express");

// Instantiates the app
const app = express();


app.get("/", (req, res) => {
    res.sendFile( path.join(__dirname, "/../index.html") )
})



// exports the app instance
module.exports = app;