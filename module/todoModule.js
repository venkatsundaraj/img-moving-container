const Sequelize = require('sequelize')

const sequelize = require('../utilities/database')

const Todo = sequelize.define('todo',{
    id : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },

    todo : Sequelize.STRING,        

    description:Sequelize.STRING,
        
    
},{
    timestamps:false
})

module.exports = Todo