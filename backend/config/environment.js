const port = 8000

const dbURL = 'mongo:27017/colours'
const dbUser = 'root'
const dbPWD = 'password'

const dbURI = `mongodb://${dbUser}:${dbPWD}@${dbURL}`


module.exports = {
  port,
  dbURI
}