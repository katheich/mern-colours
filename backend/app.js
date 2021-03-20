const express = require('express')
const mongoose = require('mongoose')
const { port, dbURI } = require('./config/environment')
const router = require('./config/router')

const app = express()

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
  () => console.log('Mongo is connected')
)

app.use('/api', router)

app.listen(port, () => console.log(`Running on port ${port}`))
