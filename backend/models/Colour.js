const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const rgbs = [
  { validator: length, message: 'needs to be 3 values long' },
  { validator: values, message: 'needs to between 0 and 255' }
]

function length(v) {
  return v.length === 3
}

function values(v) {
  return v.reduce((bol, elem) => {
    return (elem >= 0 && elem <= 255) ? (bol && true) : false
  }, true)
}

function validateHex(v) {
  const re = new RegExp(/^([0-9A-F]{6})$/, 'g', 'i')
  return re.test(v)
}

const colourSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hex: { type: String, required: true,  validate: {
    validator: validateHex,
    message: () => 'not a valid hex code'
  } },
  rgb: { type: [Number], required: true, validate: rgbs },
  order: { type: Number },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
},{
  timestamps: true
})

colourSchema.plugin(uniqueValidator)


module.exports = mongoose.model('Colour', colourSchema)