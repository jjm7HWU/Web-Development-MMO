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
router.get('/add', (req,res) => {
    const data = {
        id:'',
        password:'',
        highscore:2020,
        last_time_online: now
    }

    let { id, password, highscore, last_time_online} = data;

    //Insert into player table
    player.create({
        id,
        password,
        highscore,
        last_time_online
    })
     .then(player =>res.redirect('/mmo'))
     .catch(err => console.log(err));

})


