const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { dbURI, port } = require('./config/environment')
const router = require('./config/router')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
  () => console.log('Mongo is connected')
)

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

app.use('/api', router)

app.listen(port, () => console.log(`Running on port ${port}`))

module.exports = app