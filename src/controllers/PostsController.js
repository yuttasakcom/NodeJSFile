const path = require('path')
const FilesService = require('../services/files')
const posts = path.resolve(__dirname, '../databases/files/posts.txt')

const get = (req, res) => {
  FilesService.get(posts, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json(data)
  })
}

const create = (req, res) => {
  FilesService.create(posts, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

const update = (req, res) => {
  FilesService.update(posts, req, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json(data)
  })
}

const destroy = (req, res) => {
  FilesService.destroy(posts, req, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

const getById = (req, res) => {
  FilesService.getById(posts, req, (err, data) => {
    if (err) res.status(500).json(err)

    if (data === null) {
      res.status(404).json({message: 'Not Found'})
    } else {
      res.status(200).json(data)
    }
  })
}

module.exports = {
  get,
  create,
  update,
  destroy,
  getById
}
