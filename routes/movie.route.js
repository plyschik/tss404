const express = require('express')
const router = express.Router()
const movieController = require('./../controllers/movie.controller')

router.get('/', movieController.getMovies)
router.get('/:movieId', movieController.getMovie)
router.post('/playlist/:playlistId/movies/:movieId', movieController.createMovie)
router.delete('/playlist/:playlistId/movies/:movieId', movieController.deleteMovie)

module.exports = router
