const express = require('express')
const router = express.Router()
const objectController = require('./../controllers/object.controller')
const passport = require('passport')

router.get('/', objectController.getObjects)
router.get('/:id', objectController.getObject)
router.post('/', passport.authenticate('jwt', { session: false }), objectController.createObject)
router.put('/:id', passport.authenticate('jwt', { session: false }), objectController.updateObject)
router.delete('/:id', passport.authenticate('jwt', { session: false }), objectController.deleteObject)

module.exports = router
