const express = require('express');
const router = express.Router();
const db = require ('../config/database');
const player= require ('../models/mmodb');
const moment= require ('moment');

//time
let now = new Date();

//Get mmodb list 

router.get('/', (req,res) => {
    player.findAll()
    .then(players => {
        res.send(players)
    })
    .catch(err=> res.status(500).send(err));
})


//add info in db
router.post('/add', (req,res) => {
    const { email, password } = req.body;

    console.log("email: " + email + ", password: " + password)

    //Insert into player table
    player.create({
        email,
        password,
        highscore: 0,
        last_time_online: now
    })
     .then(player => res.send(player) )
     .catch(err=> res.status(500).send(err));
})

module.exports = router;

