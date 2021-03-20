const Colour = require('../models/Colour')
const returnUnauthorised = require('../lib/returnUnauthorised')

function create(req, res) {
  req.body.user = req.currentUser
  Colour
    .create(req.body)
    .then(colour => res.status(201).json(colour))
    .catch(err => {
      res.status(422).json({ message: err.message })
    })
}

function index(req, res) {
  Colour
    .find()
    .populate('user')
    .then(colours => res.status(200).json(colours))
    .catch(err => res.json(err))
}

function show(req, res) {
  Colour
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(colour => {
      if (colour) res.status(200).json(colour)
      else res.status(404).json({ message: '404 not found' })
    })
}

function edit(req, res) {
  req.body.user = req.currentUser
  Colour
    .findById(req.params.id)
    .then(colour => {
      if (!colour) return res.status(404).json({ message: '404 not found' })
      if (!req.currentUser._id.equals(colour.user)) return returnUnauthorised(res)
      return colour.set(req.body)
    })
    .then(colour => colour.save())
    .then(colour => res.status(202).json(colour))
    .catch(err => {
      res.status(422).json({ message: err.message })
    })
}

function remove(req, res) {
  Colour
    .findById(req.params.id)
    .then(colour => {
      if (!colour) return res.status(404).json({ message: '404 not found' })
      if (!req.currentUser._id.equals(colour.user)) return returnUnauthorised(res)
      return colour.remove()
    })
    .then(() => res.status(202).json({ message: 'Colour deleted' }))
}

function createComment(req, res) {
  req.body.user = req.currentUser
  Colour
    .findById(req.params.id)
    .then(colour => {
      if (!colour) return res.status(404).json({ message: '404 not found' })
      colour.comments.push(req.body)
      return colour
    })
    .then(colour => colour.save())
    .then(colour => res.status(202).json({ colour }))
}

function deleteComment(req, res) {
  Colour
    .findById(req.params.id)
    .then(colour => {

      if (!colour) return res.status(404).json({ message: '404 not found' })
      const comment = colour.comments.id(req.params.id2)
      if (!req.currentUser._id.equals(colour.user) && !req.currentUser._id.equals(comment.user)) return returnUnauthorised(res)
      comment.remove()
      return colour.save()
    })
    .then(() => res.status(202).json({ message: 'Comment deleted' }))
    .catch(err => res.json(err))
}



module.exports = {
  create,
  index,
  show,
  edit, 
  remove, 
  createComment,
  deleteComment
}