const Sequelize = require('sequelize')
const sequelize =require('../utilities/database')

const User = sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userName:Sequelize.STRING,
    password:Sequelize.STRING
},
{timestamps:false})

module.exports = User