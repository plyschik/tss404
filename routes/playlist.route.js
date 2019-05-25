const express = require('express')
const router = express.Router()
const playlistController = require('./../controllers/playlist.controller')
const { checkSchema } = require('express-validator/check')
const { createPlaylistValidationSchema: createPlaylistValidationSchema } = require('../validations/playlist.validation')
const { updatePlaylistValidationSchema: updatePlaylistValidationSchema } = require('../validations/playlist.validation')
const { ownerValidationSchema: ownerValidationSchema } = require('../validations/playlist.validation')

router.get('/', playlistController.getPlaylists)
router.get('/:id', checkSchema(ownerValidationSchema), playlistController.getPlaylist)
router.post('/', checkSchema(createPlaylistValidationSchema), playlistController.createPlaylist)
router.put('/:id', checkSchema(updatePlaylistValidationSchema), playlistController.updatePlaylist)
router.delete('/:id', checkSchema(ownerValidationSchema), playlistController.deletePlaylist)

module.exports = router
