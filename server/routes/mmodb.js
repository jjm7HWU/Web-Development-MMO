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

    player.findOne({ where: {id} }).then(player => {
        var hashedPassword = player.password;
        
        bcrypt.compare(password, hashedPassword, function(err, res) {
            if (err || !res) {
                res.status(500).send("Internal error")
            }

            // final request
            res.send(req.body)

        })

      })
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
    .then(player => res.send(player) )
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

