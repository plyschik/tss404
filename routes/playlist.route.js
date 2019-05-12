const express = require('express')
const router = express.Router()
const playlistController = require('./../controllers/playlist.controller')

router.get('/', playlistController.getPlaylists)
router.get('/:id', playlistController.getPlaylist)
router.post('/', playlistController.createPlaylist)
router.put('/:id', playlistController.updatePlaylist)
router.delete('/:id', playlistController.deletePlaylist)

module.exports = router
