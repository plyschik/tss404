const User = require('../database/models').User
const RefreshToken = require('../database/models').RefreshToken
const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('./../config')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const moment = require('moment')

/**
 * @api {post} /api/v1/auth/signup Request for JWT token
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiDescription This endpoint return JWT token for signed in user
 * @apiSuccess {String}   token   User JWT token.
 */
exports.signup = async (request, response) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(422).json({
      status: 'error',
      message: 'Invalid request data.',
      data: errors.array()
    });
  }

  User.create({
    email: request.body.email,
    password: request.body.password,
    role: 'user',
    firstName: request.body.firstName,
    lastName: request.body.lastName
  }).then(() => {
    response.status(201).json({
      status: 'success',
      message: 'Account created.',
      data: null
    })
  }).catch(error => {
    response.status(500).json({
      status: 'error',
      message: 'Unknown database error. Try again.',
      data: null
    })
  })
}

/**
 * @api {post} /api/v1/auth/signin Request for JWT token
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiDescription This endpoint return JWT token for signed in user
 * @apiSuccess {String}   token   User JWT token.
 */
exports.signin = async (request, response, next) => {
  // const errors = validationResult(request)

  // if (!errors.isEmpty()) {
  //   return response.status(422).json({
  //     status: 'error',
  //     message: 'Invalid request data.',
  //     data: errors.array()
  //   });
  // }

  const email = request.body.email
  const password = request.body.password

  User.findOne({
    where: { email: email }
  }).then(user => {
    if (user) {
      if (bcryptjs.compareSync(password, user.password)) {
        RefreshToken.findOne({
          where: {
            userId: user.id
          }
        }).then(token => {
          if (token) {
            token.destroy()
          }
        })

        let refreshToken = crypto.randomBytes(64).toString('hex')

        RefreshToken.create({
          userId: user.id,
          token: refreshToken,
          expiredAt: moment().add(config.jwt.refreshTokenTTL, 'minutes').format()
        }).then(() => {
          const accessToken = jwt.sign({ user_id: user.id }, config.jwt.secret, { expiresIn: `${config.jwt.accessTokenTTL}m` })

          return response.status(200).json({
            status: 'success',
            message: 'Signed in successfully.',
            data: {
              accessToken,
              refreshToken
            }
          })
        })
      } else {
        return response.status(422).json({
          status: 'error',
          message: 'Invalid email or password.',
          data: null
        })
      }
    } else {
      return response.status(422).json({
        status: 'error',
        message: 'Invalid email or password.',
        data: null
      })
    }
  }).catch(error => console.log(error))
}

/**
 * @api {post} /api/v1/auth/token Request for new JWT token with refresh token.
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiDescription This endpoint return new JWT token based on refresh token.
 * @apiSuccess {String}   refreshToken    Refresh token.
 */
exports.token = async (request, response, next) => {
  let refreshToken = request.body.refreshToken
  
  RefreshToken.findOne({
    where: { token: refreshToken },
    include: [ User ]
  }).then(token => {
    if (token) {
      if (moment() <= moment(token.expiredAt)) {
        const accessToken = jwt.sign({ user_id: token.User.dataValues.id }, config.jwt.secret, { expiresIn: `${config.jwt.accessTokenTTL}m` })

        return response.status(200).json({
          message: 'Access token successfully refreshed.',
          data: {
            accessToken
          }
        })
      } else {
        token.destroy()

        return response.status(401).json({
          message: 'Refresh token expired.'
        })
      }
    } else {
      return response.status(401).json({
        message: 'Invalid refresh token.'
      })
    }
  })
}

/**
 * @api {post} /api/v1/auth/signout Request for new JWT token with refresh token.
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiDescription This endpoint return new JWT token based on refresh token.
 * @apiSuccess {String}   refreshToken    Refresh token.
 */
exports.signout = async (request, response, next) => {
  RefreshToken.destroy({
    where: {
      userId: request.user.id
    }
  }).then(() => {
    return response.status(200).json({
      message: 'Signed out successfully.'
    })
  })
}