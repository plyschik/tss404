require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  portHTTP: process.env.PORT_HTTP,
  portHTTPS: process.env.PORT_HTTPS,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenTTL: process.env.JWT_ACCESS_TOKEN_TTL,
    refreshTokenTTL: process.env.JWT_REFRESH_TOKEN_TTL
  },
  tmdb: {
    api_key: process.env.TMDB_API_KEY
  }
}
