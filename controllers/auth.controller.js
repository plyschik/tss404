const User = require('../database/models').User
const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('./../config')
const bcryptjs = require('bcryptjs')

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
        const token = jwt.sign({ user_id: user.id }, config.secret)

        return response.status(200).json({ token })
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