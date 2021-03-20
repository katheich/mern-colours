const Colour = require('../models/Colour')

function index(req, res) {
  Colour
    .find()
    .then(colours => res.status(200).json(colours))
    .catch(err => res.json(err))
}

module.exports = {
  index
}