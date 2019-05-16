const models = require('../database/models')
const { validationResult } = require('express-validator/check')
const bcryptjs = require('bcryptjs')

/**
 * @api           {patch}       /api/v1/users/me    Update current authenticated user profile.
 * @apiVersion    1.0.0
 * @apiGroup      Users
 * @apiParam      {String}      email               User e-mail address.
 * @apiParam      {String}      password            User password.
 * @apiParam      {String}      firstName           User first name.
 * @apiParam      {String}      lastName            User last name.
 * @apiSuccess    {String}      message             Status message.
 * @apiError      {Object[]}    errors              Array of validation errors.
 */
exports.patchCurrentUser = (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    })
  }

  models.User.findByPk(request.user.id).then((user) => {
    user.update({
      email: request.body.email || user.email,
      password: request.body.password ? bcryptjs.hashSync(request.body.password, 10) : user.password,
      firstName: request.body.firstName || user.firstName,
      lastName: request.body.lastName || user.lastName
    }).then((user) => {
      response.status(200).json({
        message: 'Your profile was successfully updated.'
      })
    }).catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
    })
  }).catch((error) => {
    response.status(500).json({ message: 'Unknown database error. Try again.' })
  })
}

/**
 * @api           {patch}       /api/v1/users/:id   Update user profile.
 * @apiVersion    1.0.0
 * @apiGroup      Users
 * @apiParam      {String}      email               User e-mail address.
 * @apiParam      {String}      password            User password.
 * @apiParam      {String}      role                User role.
 * @apiParam      {String}      firstName           User first name.
 * @apiParam      {String}      lastName            User last name.
 * @apiSuccess    {String}      message             Status message.
 * @apiError      {Object[]}    errors              Array of validation errors.
 */
exports.patchUser = (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    })
  }

  models.User.findByPk(request.params.id).then((user) => {
    user.update({
      email: request.body.email || user.email,
      password: request.body.password ? bcryptjs.hashSync(request.body.password, 10) : user.password,
      role: request.body.role || user.role,
      firstName: request.body.firstName || user.firstName,
      lastName: request.body.lastName || user.lastName
    }).then((user) => {
      response.status(200).json({
        message: 'User successfully updated.'
      })
    }).catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
    })
  }).catch((error) => {
    response.status(500).json({ message: 'Unknown database error. Try again.' })
  })
}

/**
 * @api           {delete}      /api/v1/users/:id   Delete user by ID.
 * @apiVersion    1.0.0
 * @apiGroup      Users
 * @apiSuccess    {String}      message             Status message.
 * @apiError      {Object[]}    errors              Array of validation errors.
 */
exports.deleteUser = (request, response) => {
  models.User.findByPk(request.params.id).then((user) => {
    user.destroy().then(() => {
      response.status(200).json({
        message: 'User successfully deleted.'
      })
    }).catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
    })
  }).catch((error) => {
    response.status(500).json({ message: 'User not found.' })
  })
}
