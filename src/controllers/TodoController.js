const _ = require('lodash')
const path = require('path')
const todos = path.resolve(__dirname, '../databases/files/todos.txt')

exports.get = async (req, res) => {
  try {
    const get = require('../services/files/get')
    const data = await get(todos)
    res.status(200).json(JSON.parse(data))
  } catch(err) {
    res.status(500).json(err)
  }
}

exports.create = (req, res) => {
  const create = require('../services/files/create')

  create(todos, _.pick(req.body, ['topic', 'content']), (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

exports.update = (req, res) => {
  const update = require('../services/files/update')
  update(todos, req, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json(data)
  })
}

exports.removeAll = (req, res) => {
  const removeAll = require('../services/files/removeAll')
  removeAll(todos, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

exports.destroy = (req, res) => {
  const destroy = require('../services/files/delete')
  destroy(todos, req, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

exports.getById = (req, res) => {
  const getById = require('../services/files/getById')
  getById(todos, req, (err, data) => {
    if (err) res.status(500).json(err)

    if (data === null) {
      res.status(404).json({message: `Post id: ${req.params.id} not found!`})
    } else {
      res.status(200).json(data)
    }
  })
}
