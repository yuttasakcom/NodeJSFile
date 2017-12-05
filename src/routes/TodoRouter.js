const Router = require('express').Router()

const TodoController = require('../controllers/TodoController')

Router.get('/', TodoController.get)
Router.post('/create', TodoController.create)
Router.put('/:id', TodoController.update)
Router.delete('/remove', TodoController.removeAll)
Router.delete('/:id', TodoController.destroy)
Router.get('/:id', TodoController.getById)

module.exports = Router
