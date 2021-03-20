const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Colour = require('../models/Colour')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(
  () => {
    return Colour.create([
      { name: 'Yellow C', hex: 'FEDD00', rgb: [254, 221, 0], order: 1 },
      { name: 'Yellow 012 C', hex: 'FFD700', rgb: [255, 215, 0], order: 2 },
      { name: 'Orange 021 C', hex: 'FE5000', rgb: [254, 80, 0], order: 3 }
    ])
      .then(colours => console.log(`${colours.length} colours created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  },
  err => {
    console.log(err)
  }
)