const Sequelize = require('sequelize')

const sequelize = require('../utilities/database')

const FavouriteItem = sequelize.define('favouriteItem', {
     id : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    importantPercentage:Sequelize.INTEGER
}, {
    timestamps:false
})


module.exports = FavouriteItem