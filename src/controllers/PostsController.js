const path = require('path')
const posts = path.resolve(__dirname, '../databases/files/posts.txt')

// Callback
// exports.get = (req, res) => {
//   const get = require('../services/files/get')
//   get(posts, (err, data) => {
//     if (err) {
//       res.status(500).json(err)
//     } else {
//       res.status(200).json(JSON.parse(data))
//     }
//   })
// }

// Promise then
exports.get = (req, res) => {
  const get = require('../services/files/get')
  get(posts)
    .then(data => res.status(200).json(JSON.parse(data)))
    .catch(err => res.status(500).json(err))
}

// Async Await
// exports.get = async (req, res) => {
//   try {
//     const get = require('../services/files/get')
//     const data = await get(posts)
//     res.status(200).json(JSON.parse(data))
//   } catch(err) {
//     res.status(500).json(err)
//   }
// }

exports.create = (req, res) => {
  const create = require('../services/files/create')
  create(posts, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

exports.update = (req, res) => {
  const update = require('../services/files/update')
  update(posts, req, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json(data)
  })
}

exports.destroy = (req, res) => {
  const destroy = require('../services/files/delete')
  destroy(posts, req, (err, data) => {
    if (err) res.status(500).json(err)
    res.status(200).json({message: 'success'})
  })
}

exports.getById = (req, res) => {
  const getById = require('../services/files/getById')
  getById(posts, req, (err, data) => {
    if (err) res.status(500).json(err)

    if (data === null) {
      res.status(404).json({message: `Post id: ${req.params.id} not found!`})
    } else {
      res.status(200).json(data)
    }
  })
}
