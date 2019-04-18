const User = require('../database/models').User
const { validationResult } = require('express-validator/check')

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
