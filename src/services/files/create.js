const fs = require('fs')
const uuidv1 = require('uuid/v1');
const faker = require('faker');
const moment = require('moment')
const time = moment()

module.exports = (file, callback) => {
  const newPost = {
    id: uuidv1(),
    topic: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    created_at: time.format(),
    updated_at: time.format(),
    owner_id: faker.random.number(100)
  }

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)

    const currentData = JSON.parse(data)

    fs.writeFile(file, JSON.stringify([...currentData, newPost]), (err) => {
      if (err) callback(err, null)

      callback(null, true)
    })
  })
}