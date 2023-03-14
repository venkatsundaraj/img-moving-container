const express = require('express')

const router = express.Router()

const todoController = require('../controller/todoController')


router.get('/',todoController.showAllTodos)

router.get('/add-todos', todoController.showForm)

router.post('/post-todo', todoController.postTodo)

router.get('/show-todo-details/:todoId', todoController.showTodoDetails)

router.get('/edit-product/:todoId', todoController.showTodoEditPage)

router.post('/edit-todo', todoController.submitEditedTodo)


router.post('/add-to-favourites', todoController.addItemToFavourite)




module.exports = {
    router:router
}