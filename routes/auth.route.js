const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./../controllers/auth.controller')
const { checkSchema } = require('express-validator/check')
const { signupValidationSchema, signinValidationSchema, tokenValidationSchema } = require('../validations/auth.validation')

router.post('/signup', checkSchema(signupValidationSchema), authController.signup)
router.post('/signin', checkSchema(signinValidationSchema), authController.signin)
router.post('/signout', passport.authenticate('jwt', { session: false }), authController.signout)
router.post('/token', passport.authenticate('jwt', { session: false }), checkSchema(tokenValidationSchema), authController.token)

module.exports = router
