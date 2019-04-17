var Sequelize = require('sequelize')
const User = require('../database/models').User

/**
 * @api {post} /api/v1/auth/signup Request for JWT token
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiDescription This endpoint return JWT token for signed in user
 * @apiSuccess {String}   token       User JWT token.
 */
exports.signup = async (request, response) => {
  const Joi = require('joi')

  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
    firstName: Joi.string().trim().min(2).max(32).required(),
    lastName: Joi.string().trim().min(2).max(32).required()
  })

  Joi.validate(request.body, schema, { abortEarly: false }, (error, value) => {
    if (error) {
      response.status(422).json({
        status: 'error',
        message: 'Invalid request data.',
        errors: error.details.map(error => {
          return {
            field: error.context.key,
            message: error.message
          }
        })
      })
    } else {
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
        response.status(422).json({
          status: 'error',
          message: 'Invalid request data.',
          errors: [
            {
              field: 'email',
              message: 'E-mail address must be unique.'
            }
          ]
        })
      })
    }
  })
}
