const express = require('express')
const router = express.Router()
const playlistController = require('./../controllers/playlist.controller')
const { checkSchema } = require('express-validator/check')
const { createPlaylistValidationSchema } = require('../validations/playlist.validation')

router.get('/', playlistController.getPlaylists)
router.get('/:id', playlistController.getPlaylist)
router.post('/', checkSchema(createPlaylistValidationSchema), playlistController.createPlaylist)
router.put('/:id', checkSchema(createPlaylistValidationSchema), playlistController.updatePlaylist)
router.delete('/:id', playlistController.deletePlaylist)

module.exports = router
