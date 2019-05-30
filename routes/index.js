const express = require('express')
const router = express.Router()
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const movieRoute = require('./movie.route')
const searchRoute = require('./search.route')
const playlistRoute = require('./playlist.route')
const recommendationRoute = require('./recommendation.route')

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/movies', movieRoute)
router.use('/search', searchRoute)
router.use('/playlists', playlistRoute)
router.use('/recommend', recommendationRoute)

module.exports = router
