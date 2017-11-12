const Router = require('express').Router()

const PostsController = require('../controllers/PostsController')

Router.get('/', PostsController.get)
Router.get('/create', PostsController.create)
Router.get('/:id/edit', PostsController.update)
Router.get('/:id/delete', PostsController.destroy)
Router.get('/:id', PostsController.getById)

module.exports = Router
