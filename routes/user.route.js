const express = require('express')
const router = express.Router()
const userController = require('./../controllers/user.controller')
const { checkSchema } = require('express-validator/check')
const { patchCurrentUserValidationSchema, patchUserValidationSchema } = require('../validations/user.validation')

router.patch('/me', checkSchema(patchCurrentUserValidationSchema), userController.patchCurrentUser)
router.patch('/:id', checkSchema(patchUserValidationSchema), userController.patchUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
