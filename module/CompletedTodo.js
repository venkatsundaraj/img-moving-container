const Sequelize = require('sequelize')

const sequelize = require('../utilities/database')

const CompletedTodo = sequelize.define('completedTodo', {
     id : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    todo:Sequelize.STRING,
    description:Sequelize.STRING,
    
}, {
    timestamps:false
})


module.exports = CompletedTodo