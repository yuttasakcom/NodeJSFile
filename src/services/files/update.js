const fs = require('fs')
const moment = require('moment')
const time = moment()

module.exports = (file, {params, body}, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)

    const currentData = JSON.parse(data)
    const currentPost = currentData.find(e => e.id === params.id)

    currentPost.topic = body.topic
    currentPost.content = body.content
    currentPost.updated_at = time.format()

    fs.writeFile(file, JSON.stringify([...currentData.filter(e => e.id !== params.id), currentPost]), (err) => {
      if (err) callback(err, null)
      callback(null, currentPost)
    })
  })
}