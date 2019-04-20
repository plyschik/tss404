const express = require('express')
const router = express.Router()
const authController = require('./../controllers/auth.controller')
const { checkSchema } = require('express-validator/check')
const { signupValidationSchema, signinValidationSchema, tokenValidationSchema } = require('../validations/auth.validation')

router.post('/signup', checkSchema(signupValidationSchema), authController.signup)
router.post('/signin', checkSchema(signinValidationSchema), authController.signin)
router.post('/signout', authController.signout)
router.post('/token', checkSchema(tokenValidationSchema), authController.token)

module.exports = router
