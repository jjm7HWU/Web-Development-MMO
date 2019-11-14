const express = require('express');
const router = express.Router();
const db = require ('../config/database');
const player= require ('../models/mmodb');
const moment= require ('moment');

//time
let now = new Date();

// Get mmodb list 
router.get('/', (req,res) => {
    // player.findAll()
    // .then(players => {
    //     res.send(players)
    // })
    // .catch(err=> res.status(500).send(err));


    res.send(req.body)
})



// register router
router.post('/register', (req,res) => {
    // const { email, password } = req.body;

    // //Insert into player table
    // player.create({
    //     email,
    //     password,
    //     highscore: 0,
    //     last_time_online: now
    // })
    //  .then(player => res.send(player) )
    //  .catch(err=> res.status(500).send(err));


    res.send(req.body)
})

// login router
router.post("/login", (req, res) => {
    // login player
    res.send(req.body)

})


router.post("/logout", (req, res) => {
    //logout player

    res.send(req.body)
})


module.exports = router;

