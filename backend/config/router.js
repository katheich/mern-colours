const router = require('express').Router()
const colours = require('../controllers/colours')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')

router.route('/colours')
  .get(colours.index)
  .post(secureRoute, colours.create)

router.route('/colours/:id')
  .get(colours.show)
  .put(secureRoute, colours.edit)
  .delete(secureRoute, colours.remove)
  

router.route('/colours/:id/comment')
  .post(secureRoute, colours.createComment)

router.route('/colours/:id/comment/:id2')
  .delete(secureRoute, colours.deleteComment)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router