const config = require('../config/db.config')
const Sequelize = require('sequelize')

//configuration d'acces a la database 
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//tables
db.user = require('../models/user.model')(sequelize, Sequelize);

module.exports = db 