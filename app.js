const express = require('express')

const sequelize = require('./utilities/database')

const todoRouter = require('./routes/todo')

const path = require('path')

const root = require('./utilities/path')

const User = require('./module/userModule')

const Todo = require('./module/todoModule')

const Favourite = require('./module/Favourites')

const FavouriteItem = require('./module/FavouriteItem')

const ejs = require('ejs')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(root, 'style')))

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user
        // console.log(req.user)
        next()
    })
    .catch(err=>{
        console.log(err)
    })
})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(todoRouter.router)



//Associations
//One to Many relationship

User.hasMany(Todo, {constraints:true, onDelete:'CASCADE'})
Todo.belongsTo(User)

//One to One relationship

User.hasOne(Favourite)
Favourite.belongsTo(User)

//Many to many relationship

Favourite.belongsToMany(Todo, {through: FavouriteItem})
Todo.belongsToMany(Favourite, {through: FavouriteItem})



sequelize
.sync()
// .sync({alter:true})
.then(data=>{
    
})
.then(data=>{
    return User.findByPk(1)
})
.then(user=>{
    if(!user){
        return User.create({userName:'venkat', password:'12345'})
    }
    return user
})
.then(user=>{
    user.createFavourite()
})
.then(data=>{
    app.listen(3000,()=>{console.log('Server started')})
})
.catch(err=>{
    console.log(err)
})

