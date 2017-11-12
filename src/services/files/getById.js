const fs = require('fs')

module.exports = (file, req, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)

    const currentData = JSON.parse(data)
    const result = currentData.find(e => e.id === req.params.id)

    if (! result) callback(null, null)

    callback(null, result)
  })
}