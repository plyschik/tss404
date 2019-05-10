const express = require('express')
const router = express.Router()
const objectRoute = require('./object.route')
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const movieRoute = require('./movie.route')
const searchRoute = require('./search.route')

router.use('/objects', objectRoute)
router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/movies', movieRoute)
router.use('/search', searchRoute)

module.exports = router
