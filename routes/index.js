const express = require('express')
const router = express.Router()
const objectRoute = require('./object.route')
const authRoute = require('./auth.route')

router.use('/objects', objectRoute)
router.use('/auth', authRoute)

module.exports = router
