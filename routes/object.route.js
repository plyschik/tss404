const express = require('express')
const router = express.Router()
const objectController = require('./../controllers/object.controller')

router.get('/', objectController.getObjects)
router.get('/:id', objectController.getObject)
router.post('/', objectController.createObject)
router.put('/:id', objectController.updateObject)
router.delete('/:id', objectController.deleteObject)

module.exports = router
