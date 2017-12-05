const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = require('./routes')
router(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`)
})
