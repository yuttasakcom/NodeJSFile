const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')

router(app)

app.listen(port, () => {
  console.log(`Server running at port:${port}`)
})
