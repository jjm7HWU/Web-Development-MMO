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

    console.log(req.body)
    let body = req.body;

    res.send({
        string: "Hello Guys"
    })
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

    console.log(req.body)
    res.send(req.body)

})


router.post("/logout", (req, res) => {
    //logout player and last_time_online
    const {email, last_time_online} = req.body;
    player.update(
        {
            last_time_online
        },
        {
            where:{
                email
            }
        }
    )
    .then(player => {
        res.send(player)
        console.log(12343132432414341241342)
    })
    .catch(err=> res.status(500).send(err));


    res.send(req.body)
})

//update highscore
router.post('/highscore', (req,res) => {
    const {email,highscore} = req.body;
    player.update(
        {
            highscore
        },
        {
            where:{
                email
            }
        }
    )
    .then(player => res.send(player) )
    .catch(err=> res.status(500).send(err));

})


module.exports = router;

