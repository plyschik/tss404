require('dotenv').config()

const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const authorizationMiddleware = require('./middlewares/authorization')
const acl = require('./services/acl')

const server = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use(helmet())
  .use('/docs', express.static('docs'))
  .use(authorizationMiddleware)
  .use(acl.authorize)
  .use('/api/v1', routes)

if (config.env !== 'test') {
  server.listen(config.port, () => console.log(`Server is running on port: ${config.port}.`))
}

module.exports = server
