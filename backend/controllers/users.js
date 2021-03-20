const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const returnUnauthorised = require('../lib/returnUnauthorised')

function register(req, res) {
  User
    .create(req.body)
    .then(user => res.status(200).json({ message: `Great to have you on board, ${user.username}!` }))
    .catch(err => {
      res.status(422).json({ message: err.message })
    })
}

function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return returnUnauthorised(res)
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '12h' })
      res.status(202).json({
        message: `Hello again, ${user.username}!`,
        token
      })
    })
    .catch(() => returnUnauthorised(res))
}

module.exports = {
  register,
  login
}
