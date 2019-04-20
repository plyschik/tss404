const config = require('./../config')
const models = require('../database/models')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const moment = require('moment')
const { validationResult } = require('express-validator/check')

/**
 * @api             {post}      /api/v1/auth/signup Register new user account.
 * @apiVersion      1.0.0
 * @apiGroup        Auth
 * @apiParam        {String}    email     User e-mail address.
 * @apiParam        {String}    password  User password.
 * @apiParam        {String}    firstName User first name.
 * @apiParam        {String}    lastName  User last name.
 * @apiSuccess      {String}    message   Status message.
 * @apiError        {Object[]}  errors    Array of field validation errors.
 */
exports.signup = async (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    return response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    });
  }

  models.User.create({
    email: request.body.email,
    password: request.body.password,
    role: 'user',
    firstName: request.body.firstName,
    lastName: request.body.lastName
  }).then(() => {
    response.status(201).json({ message: 'Account created.' })
  }).catch((error) => {
    response.status(500).json({ message: 'Unknown database error. Try again.' })
  })
}

/**
 * @api             {post}  /api/v1/auth/signin Request for JWT token with user credentials.
 * @apiVersion      1.0.0
 * @apiGroup        Auth
 * @apiParam        {String}    email         User e-mail address.
 * @apiParam        {String}    password      User password.
 * @apiSuccess      {String}    accessToken   JWT access token.
 * @apiSuccess      {String}    refreshToken  JWT refresh token.
 * @apiError        {String}    message       Error message.
 */
exports.signin = async (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    return response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    });
  }

  const email = request.body.email
  const password = request.body.password

  models.User.findOne({
    where: { email: email }
  }).then((user) => {
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return response.status(422).json({ message: 'Invalid email or password.' })
    }

    models.RefreshToken.destroy({
      where: { userId: user.id }
    })

    let refreshToken = crypto.randomBytes(64).toString('hex')

    models.RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiredAt: moment().add(config.jwt.refreshTokenTTL, 'minutes').format()
    }).then(() => {
      const accessToken = jwt.sign({
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }, config.jwt.secret, { expiresIn: `${config.jwt.accessTokenTTL}m` })

      return response.status(200).json({
        message: 'Signed in successfully.',
        data: {
          accessToken,
          refreshToken
        }
      })
    })
  })
}

/**
 * @api             {post}  /api/v1/auth/signout  Request for JWT token invalidation.
 * @apiVersion      1.0.0
 * @apiGroup        Auth
 * @apiParam        {String}    token         JWT token.
 * @apiSuccess      {String}    message       Success message.
 */
exports.signout = async (request, response) => {
  models.RefreshToken.destroy({
    where: { userId: request.user.id }
  }).then(() => {
    return response.status(200).json({ message: 'Signed out successfully.' })
  })
}

/**
 * @api             {post}  /api/v1/auth/signin Request for JWT token with user credentials.
 * @apiVersion      1.0.0
 * @apiGroup        Auth
 * @apiParam        {String}    refreshToken  User refresh token.
 * @apiSuccess      {String}    accessToken   New JWT token.
 * @apiError        {String}    message       Error message.
 */
exports.token = async (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    return response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    });
  }

  let refreshToken = request.body.refreshToken
  
  models.RefreshToken.findOne({
    where: { token: refreshToken },
    include: [ models.User ]
  }).then((token) => {
    if (!token) {
      return response.status(400).json({ message: 'Invalid refresh token.' })
    }

    user = token.User.dataValues

    if (moment() > moment(token.expiredAt)) {
      token.destroy()

      return response.status(400).json({ message: 'Refresh token expired.' })
    }

    const accessToken = jwt.sign({
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    }, config.jwt.secret, { expiresIn: `${config.jwt.accessTokenTTL}m` })

    return response.status(200).json({
      message: 'Access token successfully refreshed.',
      data: {
        accessToken
      }
    })
  })
}
