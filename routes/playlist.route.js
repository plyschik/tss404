const express = require('express')
const router = express.Router()
const playlistController = require('./../controllers/playlist.controller')
const movieController = require('./../controllers/movie.controller')
const { checkSchema } = require('express-validator/check')
const {
  createPlaylistValidationSchema: createPlaylistValidationSchema
} = require('../validations/playlist.validation')
const {
  updatePlaylistValidationSchema: updatePlaylistValidationSchema
} = require('../validations/playlist.validation')
const {
  ownerValidationSchema: ownerValidationSchema
} = require('../validations/playlist.validation')

router.get('/', playlistController.getPlaylists)
router.get(
  '/:id',
  checkSchema(ownerValidationSchema),
  playlistController.getPlaylist
)
router.post(
  '/',
  checkSchema(createPlaylistValidationSchema),
  playlistController.createPlaylist
)
router.put(
  '/:id',
  checkSchema(updatePlaylistValidationSchema),
  playlistController.updatePlaylist
)
router.delete(
  '/:id',
  checkSchema(ownerValidationSchema),
  playlistController.deletePlaylist
)

router.post('/:playlistId/movies', movieController.createMovie)
router.delete('/:playlistId/movies/:movieId', movieController.deleteMovie)

module.exports = router
