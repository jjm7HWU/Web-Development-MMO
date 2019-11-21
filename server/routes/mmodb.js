const express = require('express');
const router = express.Router();
const db = require ('../config/database');
const player= require ('../models/mmodb');
const moment= require ('moment');
const bcrypt = require('bcryptjs');

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
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    console.log(req.body)
    bcrypt.genSalt(10, function( error, salt ) {
        bcrypt.hash(password, salt, function( error, hashedPassword ) {
            if (error) {
                res.status(500).send("Internal error")
            }
            
            
            //Insert into player table
            player.create({
                email,
                password: hashedPassword,
                highscore: 0,
                last_time_online: now
            })
            .then(player => {
                // final request
                res.send(player) 
            })
            .catch(err=> res.status(500).send(err));

        })
    })

})

// login router
router.post("/login", (req, res) => {
    // login player
    const { id, password } = req.body;

    player.findOne({ where: id }).then(player => {
        var hashedPassword = player.password;
        console.log(password)
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if (err || !result) {
                res.status(500).send("Internal error")
            }

            console.log(result)

            // final request
            res.send(player)

        })

      })
})


router.post("/logout", (req, res) => {
    //logout player and last_time_online
    const {email, last_time_online} = req.body;
    
    console.log("logout")

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
        console.log('retrieving player')
        console.log(player)
    })
    .catch(err=> res.status(500).send(err));

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

