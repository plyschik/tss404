const config = require('../config')
const User = require('../database/models').User
const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findOne({
    where: { id: jwtPayload.user_id }
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
