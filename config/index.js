require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenTTL: process.env.JWT_ACCESS_TOKEN_TTL,
    refreshTokenTTL: process.env.JWT_REFRESH_TOKEN_TTL
  }
}
