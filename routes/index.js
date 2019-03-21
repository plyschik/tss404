const express = require('express')
const router = express.Router()
const objectRoute = require('./object.route')

router.use('/objects', objectRoute)

module.exports = router
