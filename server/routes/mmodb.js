const express = require('express');
const router = express.Router();
const db = require ('../config/database');
const player= require ('../models/mmodb');

router.get('/', (req,res) => 
    player.findAll()
    .then(player => {
        console.log(player);
        res.sendStatus(200);
    })
    .catch(err=>console.log(err)));

module.exports = router;