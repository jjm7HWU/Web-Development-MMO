const Sequelize= require('sequelize');
const db = require('../config/database');

const player= db.define('player', {
    id: {
        type: Sequelize.STRING, primaryKey: true
    },
    password: {
        type: Sequelize.STRING
    },
    highscore: {
        type: Sequelize.INTEGER
    },
    lasttimeonline: {
        type: Sequelize.DATE
    },

}, {
    freezeTableName:true,
    timestamps: false,
})

module.exports = player;