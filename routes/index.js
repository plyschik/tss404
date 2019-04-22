const express = require('express')
const router = express.Router()
const objectRoute = require('./object.route')
const authRoute = require('./auth.route')
const searchRoute = require('./search.route')

router.use('/objects', objectRoute)
router.use('/auth', authRoute)
router.use('/search', searchRoute)

module.exports = router
