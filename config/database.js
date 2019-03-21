require('dotenv').config()

module.exports = {
  development: {
    dialect: process.env.DEVELOPMENT_DATABASE_DIALECT,
    host: process.env.DEVELOPMENT_DATABASE_HOST,
    username: process.env.DEVELOPMENT_DATABASE_USERNAME,
    password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE_NAME
  },
  test: {
    dialect: process.env.TEST_DATABASE_DIALECT,
    host: process.env.TEST_DATABASE_HOST,
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME
  },
  production: {
    dialect: process.env.PRODUCTION_DATABASE_DIALECT,
    host: process.env.PRODUCTION_DATABASE_HOST,
    username: process.env.PRODUCTION_DATABASE_USERNAME,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME
  },
}
