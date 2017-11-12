const PostsRouter = require('./PostsRouter')

module.exports = app => {
  app.use('/post', PostsRouter)
  app.use('*', (req, res) => res.status(404).send({msg: '404!'}))
}
