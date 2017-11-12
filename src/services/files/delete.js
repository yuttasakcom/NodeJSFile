const fs = require('fs')

module.exports = (file, req, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)

    const currentData = JSON.parse(data)
    const currentPost = currentData.find(e => e.id === req.params.id)

    fs.writeFile(file, JSON.stringify([...currentData.filter(e => e.id !== req.params.id)]), (err) => {
      if (err) callback(err, null)

      callback(null, true)
    })
  })
}