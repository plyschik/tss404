const acl = require('express-acl')

acl.config({
  filename: 'acl.json',
  path: 'config',
  baseUrl: '/api/v1',
  decodedObjectName: 'user'
})

module.exports = acl