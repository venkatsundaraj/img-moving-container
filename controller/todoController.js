const Todo = require('../module/todoModule')

const CompletedTodo = require('../module/CompletedTodo')


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


const renderAllFavourites = function(req,res,next){
    req.user.getFavourite()
    .then(fav=>{
        return fav.getTodos()
    })
    .then(todo=>{
        
        res.render('user-todos/favourite-todos',{
            path:'favourites',
            title:'Favourites',
            favourites:todo
        })
    })
    .catch(err=>{
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


const deleteTodoHandler = function(req,res,next){
    const todoId = req.body.todoId
    req.user.getTodos({where:{id:todoId}})
    .then(product=>{
        // console.log(product)
        return product[0].destroy()
    })
    .then(data=>{
        res.redirect('/')
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






const addItemToFavourite = function(req,res,next){
    const todoId = req.body.todoId;
    let newImportantPercentage = 10;
    let fetchFavourite;
    req.user.getFavourite()
    .then(fav=>{
        
        fetchFavourite = fav
        return fav.getTodos({where:{id:todoId}})
        
    })
    .then(todos=>{
            let todo;
            if(todos.length > 0){
                todo = todos[0]
            }

            if(todo){
                const oldPercentage = todo.favouriteItem.importantPercentage
                newImportantPercentage = +oldPercentage + 10
                // console.log(todo)
                return todo
            }

            return Todo.findByPk(todoId)
        })
        .then(todo=>{
            
            return fetchFavourite.addTodo(todo, {through: {importantPercentage : newImportantPercentage}})
        })
        .then(data=>{
            
            res.redirect('/')
        })
    .catch(err=>{
        console.log(err)
    })
}



const removeFavouriteTodo  = function(req,res,next){
    const todoId = req.body.todoId
    req.user.getFavourite()
    .then(fav=>{
        return fav.getTodos({where:{id:todoId}})
    })
    .then(todo=>{
        return todo[0].favouriteItem.destroy()
        
    })
    .then(data=>{
        res.redirect('/favourites')
    })
    .then(err=>{
        console.log(err)
    })
}


/*const todoCompletedHandler= function(req,res,next){
    const todoId = req.body.todoId
    
    let filteredTodo
    req.user.getFavourite()
    .then(fav=>{       
        return fav.getTodos({where:{id:todoId}})
        .then(todo=>{
            filteredTodo = todo
            console.log(todo)
            req.user.createCompleted()
            .then(completedTodo=>{
                return completedTodo.addTodo(todo, {through:{importantPercentage:todo[0].favouriteItem.importantPercentage}})
            })
            
        })
    })
    .then(todo=>{
        
        return filteredTodo[0].favouriteItem.destroy()
        
    })
    .then(data=>{
        res.redirect('/favourites')
    })
    
    .catch(err=>{
        console.log(err)
    })
    
}*/

const todoCompletedHandler = function(req,res,next){
    const todoId = req.body.todoId
    let filteredTodo
    req.user.getTodos({where:{id:todoId}})
    .then(todo=>{
        filteredTodo = todo
       return todo[0].destroy()
    })
    .then(data=>{
        return req.user.getCompleted()
    })
    
    .then(completed=>{
        
        return completed.createCompletedTodo({
            todo:filteredTodo[0].todo,
            description:filteredTodo[0].description,
            
        })
    })
    .then(data=>{
        console.log(data)
    })
    
    .then(data=>{
        
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
    
}


/*const renderCompletedTodosHandler = function(req,res,next){
    
    req.user.getCompleted({include:['todos']})
    .then(completed=>{
       return completed.getTodos()
      
    })
    .then(data=>{
        console.log(data)
         res.render('user-todos/completed-todos',{
        path:'completed',
        title:'Completed Todos',
        // todos:tod
    })
    })
    
    // .then(data=>{
    //     console.log(data)
       
    // })

    // res.render('user-todos/completed-todos',{
    //     path:'completed',
    //     title:'Completed Todos',
    //     // todos:tod
    // })
    .catch(err=>{
        console.log(err)
    })
    
}*/

const renderCompletedTodosHandler = function(req,res,next){
    req.user.getCompleted()
    .then(CompletedTodo=>{
        return CompletedTodo.getCompletedTodos()
    })
    .then(data=>{
        console.log(data)
        res.render('user-todos/completed-todos',{
        path:'completed',
        title:'Completed Todos',
        todos:data
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
    renderAllFavourites:renderAllFavourites,
    removeFavouriteTodo:removeFavouriteTodo,
    todoCompletedHandler:todoCompletedHandler,
    deleteTodoHandler:deleteTodoHandler,
    renderCompletedTodosHandler:renderCompletedTodosHandler
}