const express = require('express');
const router = express.Router();
const db = require ('../config/database');
const player= require ('../models/mmodb');
const moment= require ('moment');
const bcrypt = require('bcryptjs');

// auth middleware
const { isLoggedIn } = require("../middleware/auth")

//time
let now = new Date();

// register router
router.post('/register', (req,res) => {
    const { email, password } = req.body;
    

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
            

        })

      })
})


router.post("/logout", isLoggedIn, isLoggedIn, (req, res) => {
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
router.post('/highscore', isLoggedIn, (req,res) => {
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

