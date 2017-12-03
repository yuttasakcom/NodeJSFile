const TodoRouter = require('./TodoRouter')

module.exports = app => {
  app.use('/todos', TodoRouter)
  app.use('*', (req, res) => res.status(404).send({msg: '404!'}))
}
