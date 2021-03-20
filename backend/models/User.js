const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, json) {
      return { 
        username: json.username,
        id: json._id
      }
    }
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(conf) {
    this._passwordConfirmation = conf
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match password')
    }
    next()
  })

userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)