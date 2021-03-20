function returnUnauthorised(res) {
  res.status(401).json({ message: 'Not authorised to access this resource.' })
}

module.exports = returnUnauthorised