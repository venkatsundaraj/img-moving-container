const express = require('express')

const router = express.Router()

const todoController = require('../controller/todoController')


router.get('/',todoController.showAllTodos)

router.get('/add-todos', todoController.showForm)

router.post('/post-todo', todoController.postTodo)

router.get('/show-todo-details/:todoId', todoController.showTodoDetails)

router.get('/edit-product/:todoId', todoController.showTodoEditPage)

router.post('/edit-todo', todoController.submitEditedTodo)

router.get('/favourites', todoController.renderAllFavourites)

router.post('/delete-todo', todoController.deleteTodoHandler)

router.get('/completed', todoController.renderCompletedTodosHandler)


router.post('/add-to-favourites', todoController.addItemToFavourite)

router.post('/remove-favourite', todoController.removeFavouriteTodo)

router.post('/complete-todo', todoController.todoCompletedHandler)




module.exports = {
    router:router
}