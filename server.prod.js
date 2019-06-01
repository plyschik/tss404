require('dotenv').config()

const fs = require('fs')
const http = require('http')
const https = require('https')
const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const authorizationMiddleware = require('./middlewares/authorization')
const acl = require('./services/acl')
const privateKey = fs.readFileSync('/etc/letsencrypt/live/plyschik.me/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/plyschik.me/cert.pem', 'utf8')
const ca = fs.readFileSync('/etc/letsencrypt/live/plyschik.me/chain.pem', 'utf8')
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}

const server = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use(helmet())
  .use('/docs', express.static('docs'))
  .use(authorizationMiddleware)
  .use(acl.authorize)
  .use('/api/v1', routes)

const httpServer = http.createServer(server)
const httpsServer = https.createServer(credentials, server)

httpServer.listen(config.portHTTP, () => console.log(`Server is running on port: ${config.portHTTP}.`))
httpsServer.listen(config.portHTTPS, () => console.log(`Server is running on port: ${config.portHTTPS}.`))
