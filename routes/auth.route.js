const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./../controllers/auth.controller')
const { check } = require('express-validator/check')
const User = require('./../database/models').User

router.post('/signup', [
  check('email').isEmail().normalizeEmail().custom(value => {
    return User.count({
      where: [{ email: value }]
    }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use.')
      }
    })
  }),
  check('password').isLength({ min: 3 }),
  check('firstName').isLength({ min: 2, max: 32 }),
  check('lastName').isLength({ min: 2, max: 32 })
], authController.signup)

router.post('/signin', authController.signin)

router.post('/token', authController.token)

router.post('/signout', passport.authenticate('jwt', { session: false }), authController.signout)

module.exports = router
