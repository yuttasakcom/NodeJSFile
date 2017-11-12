const fs = require('fs')

// Callback
module.exports = (file, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)
    
    callback(null, JSON.parse(data))
  })
}

// Promise
// module.exports = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, 'utf-8', (err, data) => {
//       if (err) reject(err)
//       resolve(JSON.parse(data))
//     })
//   })
// }