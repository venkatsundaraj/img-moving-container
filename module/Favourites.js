const Sequelize = require('sequelize')

const sequelize = require('../utilities/database')

const Favourites = sequelize.define('favourites', {
     id : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
}, {
    timestamps:false
})


module.exports = Favourites