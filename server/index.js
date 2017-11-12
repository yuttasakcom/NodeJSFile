const express = require('express')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1');
const faker = require('faker');
const moment = require('moment')
const time = moment()
const app = express()
const port = process.env.PORT || 3000

const posts = path.resolve(__dirname, 'databases/files/posts.txt')

app.get('/', (req, res) => {
  fs.readFile(posts, 'utf-8', (err, data) => {
    if (err) console.error(err)

    res.status(200).json(JSON.parse(data))
  })
})

app.get('/post/:id', (req, res) => {
  fs.readFile(posts, 'utf-8', (err, data) => {
    if (err) console.error(err)
    const currentData = JSON.parse(data)
    const result = currentData.find(e => e.id === req.params.id)

    if (!result) res.status(404).json({status: 404, message: 'page not found'})

    res.status(200).json(result)
  })
})

app.get('/create/post', (req, res) => {
  const newPost = {
    id: uuidv1(),
    topic: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    created_at: time.format(),
    updated_at: time.format(),
    owner_id: faker.random.number(100)
  }

  fs.readFile(posts, 'utf-8', (err, data) => {
    if (err) console.error(err)

    const currentData = JSON.parse(data)

    fs.writeFile(posts, JSON.stringify([...currentData, newPost]), (err) => {
      if (err) console.error(err)

      res.status(200).json({message: 'success'})
    })
  })
  
})

app.get('/edit/post/:id', (req, res) => {
  
  fs.readFile(posts, 'utf-8', (err, data) => {
    if (err) console.error(err)

    const currentData = JSON.parse(data)
    const currentPost = currentData.find(e => e.id === req.params.id)

    currentPost.topic = 'edit topic'
    currentPost.content = 'edit content'
    currentPost.updated_at = time.format()

    fs.writeFile(posts, JSON.stringify([...currentData.filter(e => e.id !== req.params.id), currentPost]), (err) => {
      if (err) console.error(err)

      res.status(200).json(currentPost)
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running at port:${port}`)
})