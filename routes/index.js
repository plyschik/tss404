const express = require('express')
const router = express.Router()
const objectRoute = require('./object.route')
const authRoute = require('./auth.route')
const userRoute = require('./user.route')

router.use('/objects', objectRoute)
router.use('/auth', authRoute)
router.use('/users', userRoute)

module.exports = router
