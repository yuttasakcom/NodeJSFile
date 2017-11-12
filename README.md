## Node Sample

## Directory Structure
![My Image](https://github.com/yuttasakcom/NodeSample/blob/master/code_structure.png)

## index.js
```javascript
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')

router(app)

app.listen(port, () => {
  console.log(`Server running at port:${port}`)
})
```

## routes index.js
```javascript
const PostsRouter = require('./PostsRouter')

module.exports = app => {
  app.use('/post', PostsRouter)
  app.use('*', (req, res) => res.status(404).send({msg: '404!'}))
}
```

## routes PostsRouter.js
```javascript
const Router = require('express').Router()

const PostsController = require('../controllers/PostsController')

Router.get('/', PostsController.get)
Router.get('/create', PostsController.create)
Router.get('/:id/edit', PostsController.update)
Router.get('/:id/delete', PostsController.destroy)
Router.get('/:id', PostsController.getById)

module.exports = Router
```

## constrollers PostsController.js
```javascript
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
```
## services files/index.js
```javascript
const get = require('./get')
const create = require('./create')
const update = require('./update')
const destroy = require('./delete')
const getById = require('./getById')

module.exports = {
  get,
  create,
  update,
  destroy,
  getById
}
```

## services files/create.js
```javascript
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
```

## services files/update.js
```javascript
const fs = require('fs')
const moment = require('moment')
const time = moment()

module.exports = (file, req, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)

    const currentData = JSON.parse(data)
    const currentPost = currentData.find(e => e.id === req.params.id)

    currentPost.topic = 'edit topic'
    currentPost.content = 'edit content'
    currentPost.updated_at = time.format()

    fs.writeFile(file, JSON.stringify([...currentData.filter(e => e.id !== req.params.id), currentPost]), (err) => {
      if (err) callback(err, null)
      callback(null, currentPost)
    })
  })
}
```

## services files/delete.js
```javascript
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
```

## services files/get.js
```javascript
const fs = require('fs')

module.exports = (file, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) callback(err, null)
    
    callback(null, JSON.parse(data))
  })
}
```

## services files/getById.js
```javascript
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
```