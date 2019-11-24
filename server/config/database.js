//const mysql = require ('mysql2');
const Sequelize = require('sequelize');

//Create connection with sequelize
module.exports = new Sequelize('heroku_1fa46b55d9fa001', 'b1866cd0990886', 'bae005fc', {
  host: 'eu-cdbr-west-02.cleardb.net',
  dialect:'mysql'
});

/*

// Create connection without sequelize
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
})

//connect with sequalize
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
} )

//Create database
app.get('/createdb',(req,res) => {
    let sql= 'CREATE DATABASE databaseMMO';
    db.query(sql, (err,result) =>{
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    })
})

//Create table
app.let('/createplayertable', (req,res) => {
    let sql ='CREATE TABLE player(USERNAME VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255) NOT NULL,HIGHSCORE int,LASTCONNECTION smalldatetime NOT NULL, PRIMARY KEY (USERNAME)';
    db.query(sql, (err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Player table created...');
    })
})*/
