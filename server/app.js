// loads the native path module
const path = require("path");

// loads expressjs module
const express = require("express");

// adding the cors module
var cors = require('cors')

// Load BodyParser 
const bodyParser = require('body-parser');

// Instantiates the app
const app = express();

// using the cors module
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

// Body parser
app.use(bodyParser.urlencoded({extended: false}));



//load db
 const db = require('./config/database');

// //connect with sequelize
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//MMO routes
app.use('/mmo', require('./routes/mmodb')); 

// setting the public directory as a public static folder
app.use(express.static("public"));

// get auth middleware
const { isLoggedIn } = require("./middleware/auth")

app.get("/", isLoggedIn, (req, res) => {
  
  console.log("home page loaded")
  res.sendFile( path.join(__dirname, "/../views/index.html") )
})


app.get("/game", isLoggedIn, (req, res) => {
  console.log("game page loaded")


  res.sendFile( path.join(__dirname, "/../views/game.html") )
})




// exports the app instance
module.exports = app;