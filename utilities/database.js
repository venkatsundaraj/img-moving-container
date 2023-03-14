const Sequelize = require('sequelize')

const sequelize = new Sequelize('todo-app','root','Sv@1531262',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize