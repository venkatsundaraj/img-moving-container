const Todo = require('../module/todoModule')


////////////PAGES
const showForm = function(req,res,next){
    res.render('admin-todos/add-todos',{
        path:'add-todos',
        title:'Add todos',
        editing:false
    })
}


const showAllTodos = function(req,res,next){
    Todo.findAll().then(todos=>{
    
        res.render('user-todos/all-todos',{
            todos:todos,
            title:'All todos',
            path:'all-todos'
        })
    }).catch(err=>console.log(err))
}

const showTodoDetails = function(req, res, next){
    const todoId = req.params.todoId
    req.user.getTodos({where:{id:todoId}})
    .then(data=>{
        res.render('user-todos/todo-details',{
        title:'Todo Detail',
        path:'edit-todos',
        todo:data[0]    
    })
    })
    .catch(err=>{
        console.log(err)
    })
    
}


const showTodoEditPage = function(req,res,next){
    const edit = req.query.edit
    const todoId = req.params.todoId

    if(edit===false) res.redirect('/')

    req.user.getTodos({where:{id:todoId}})
    .then(data=>{
        res.render('admin-todos/add-todos',{
        todo:data[0],
        editing:edit,
        title:'Update product',
        path:'edit-todos',
    })
    })
    .catch(err=>{
        console.log(err)
    })
    
}

const submitEditedTodo  = function(req,res,next){
    const todoId = req.body.todoId
    const todo = req.body.todo
    const description = req.body.description
    
    req.user.getTodos({where:{id:todoId}})
    .then(todos=>{
        todos[0].todo = todo;
        todos[0].description = description
        return todos[0].save()
    })
    .then(data=>{
        res.redirect('/')
    })
    .then(err=>{
        console.log(err)
    })
   
}


////////////CONTROLLERS
const postTodo = function(req,res,next){
    const todo = req.body.todo;
    const description = req.body.description
    
    req.user.createTodo({
        todo:todo,
        description:description
    })
    .then(data=>{
        res.redirect('/')
    }) 
    .catch(err=>{
        console.log(err)
    }) 
}


const addItemToFavourite = function(req,res,next){
    const todoId = req.body.todoId
    req.user.getFavourite()
    .then(fav=>{
        return fav.getTodos({where:{id:1}}).then(todo=>{
            console.log(todo)
            res.redirect('/')
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = {
    showAllTodos:showAllTodos,
    showForm:showForm,
    postTodo:postTodo,
    addItemToFavourite:addItemToFavourite,
    showTodoDetails:showTodoDetails,
    showTodoEditPage:showTodoEditPage,
    submitEditedTodo:submitEditedTodo,
}