const config = require('./../config')
const jwt = require('jsonwebtoken')

exports.generateJWTtoken = (user) => {
    return jwt.sign({ user }, config.jwt.secret, { expiresIn: `${config.jwt.accessTokenTTL}m` })
}