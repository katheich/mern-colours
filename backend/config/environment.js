const port = 8000

const dbURL = 'mongo:27017/colours'
const dbUser = 'root'
const dbPWD = 'password'

const dbURI = `mongodb://${dbUser}:${dbPWD}@${dbURL}`

const secret = 'Some secret that should be moved into an environmental variable'

module.exports = {
  port,
  dbURI,
  secret
}