const config = require('../config')
const passportJWT = require('passport-jwt')
const models = require('../database/models')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  models.User.findOne({
    where: { id: jwtPayload.userId }
  }).then(user => {
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  }).catch(error => done(error))
})  

exports.jwtOptions = jwtOptions
exports.jwt = jwtStrategy
