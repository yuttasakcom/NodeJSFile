const Router = require('express').Router()

const TodoController = require('../controllers/TodoController')

Router.get('/', TodoController.get)
Router.post('/create', TodoController.create)
Router.get('/:id/edit', TodoController.update)
Router.get('/:id/delete', TodoController.destroy)
Router.get('/:id', TodoController.getById)

module.exports = Router
