const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorizationHeader = request.headers['authorization'];

  if (!authorizationHeader) {
    request.user = {
      role: 'guest'
    }

    next()
  } else {
    const authorizationHeaderPatternRegExp = /Bearer\s+(\S+)/

    if (!authorizationHeaderPatternRegExp.test(authorizationHeader)) {
      return response.status(400).json({
        message: 'Invalid JWT token format.'
      })
    } else {
      let [matches, token] = authorizationHeader.match(/Bearer\s+(\S+)/)

      jwt.verify(token, config.jwt.secret, (error, payload) => {
        if (error) {
          return response.status(400).json({
            message: 'Invalid JWT token.'
          })
        }

        request.user = payload.user

        return next()
      })
    }
  }
}