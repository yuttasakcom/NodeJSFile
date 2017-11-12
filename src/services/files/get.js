const fs = require('fs')

module.exports = (file, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)
    
    callback(null, JSON.parse(data))
  })
}