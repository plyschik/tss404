const express = require('express')
const router = express.Router()
const playlistController = require('./../controllers/playlist.controller')
const { checkSchema } = require('express-validator/check')
const { createOrUpdatePlaylistValidationSchema: createOrUpdatePlaylistValidationSchema } = require('../validations/playlist.validation')
const { ownerValidationSchema: ownerValidationSchema } = require('../validations/playlist.validation')

router.get('/', playlistController.getPlaylists)
router.get('/:id', checkSchema(ownerValidationSchema), playlistController.getPlaylist)
router.post('/', checkSchema(createOrUpdatePlaylistValidationSchema), playlistController.createPlaylist)
router.put('/:id', checkSchema(createOrUpdatePlaylistValidationSchema), playlistController.updatePlaylist)
router.delete('/:id', checkSchema(ownerValidationSchema), playlistController.deletePlaylist)

module.exports = router
