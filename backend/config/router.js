const router = require('express').Router()
const colours = require('../controllers/colours')

router.route('/colours')
  .get(colours.index)

module.exports = router