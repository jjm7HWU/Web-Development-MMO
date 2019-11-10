const express = require('express');
const router = express.Router();
const db = require ('../config/database');
const player= require ('../models/mmodb');
const moment= require ('moment');

//time
let now = new Date();

//Get mmodb list 

router.get('/', (req,res) => 
    player.findAll()
    .then(player => {
        console.log(player);
        res.sendStatus(200);
    })
    .catch(err=>console.log(err)));

module.exports = router;

//add info in db
router.post('/add', (req,res) => {
    const { email, password, highscore, last_time_online} = req.body;

    //Insert into player table
    player.create({
        email,
        password,
        highscore,
        last_time_online
    })
     .then(player =>res.redirect('/mmo'))
     .catch(err => console.log(err));

})


