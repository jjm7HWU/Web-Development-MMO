const Sequelize= require('sequelize');
const db = require('../config/database');
const moment = require('moment');

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
    last_time_online: {
        type: Sequelize.DATEONLY,
        get:function() {
            return moment.utc(this.getDataValue('last_time_online')).format('YYYY-MM-DD')
        }
    },

}, {
    freezeTableName:true,
    timestamps: false,
})

module.exports = player;