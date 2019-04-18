require('dotenv').config()

const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const passport = require('passport')
const passportJWT = require('./services/passport')

const server = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use(helmet())
  .use('/api/v1', routes)
  .use('/docs', express.static('docs'))

server.use(passport.initialize())
passport.use('jwt', passportJWT.jwt)

if (config.env !== 'test') {
  server.listen(config.port, () => console.log(`Server is running on port: ${config.port}.`))
}

module.exports = server
