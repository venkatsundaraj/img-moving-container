const Sequelize = require('sequelize')

const sequelize = require('../utilities/database')

const Completed = sequelize.define('completed', {
     id : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
}, {
    timestamps:false
})


module.exports = Completed