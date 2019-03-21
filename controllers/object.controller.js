const Object = require('../database/models').Object

/**
 * @api {get} /api/v1/objects Request for list of objects
 * @apiVersion 1.0.0
 * @apiGroup Object
 * @apiDescription This endpoint return list of objects
 * @apiSuccess {Number}   id          Object id.
 * @apiSuccess {String}   name        Object name.
 * @apiSuccess {Date}     createdAt   Object create date.
 * @apiSuccess {Date}     updatedAt   Object update date.
 */
exports.getObjects = async (request, response) => {
  Object.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(objects => {
    response.status(200).json(objects)
  })
}

/**
 * @api {get} /api/v1/objects/:id Request for specific object by ID
 * @apiVersion 1.0.0
 * @apiGroup Object
 * @apiDescription This endpoint return object by ID.
 * @apiParam    {Number}    id          Object id.
 * @apiSuccess  {Number}    id          Object id.
 * @apiSuccess  {String}    name        Object name.
 * @apiSuccess  {Date}      createdAt   Object create date.
 * @apiSuccess  {Date}      updatedAt   Object update date.
 */
exports.getObject = async (request, response) => {
  Object.findOne({
    where: {
      id: request.params.id
    }
  }).then(object => {
    if (object) {
      response.json(object)
    } else {
      response.status(404).json(null)
    }
  })
}

/**
 * @api {post} /api/v1/objects Create new object
 * @apiVersion 1.0.0
 * @apiGroup Object
 * @apiDescription Endpoint for create object.
 * @apiParam    {String}   name        Object name.
 * @apiSuccess  {Number}   id          Created object id.
 * @apiSuccess  {String}   name        Created object name.
 * @apiSuccess  {Date}     createdAt   Created object create date.
 * @apiSuccess  {Date}     updatedAt   Created object update date.
 */
exports.createObject = async (request, response) => {
  Object.create({
    name: request.body.name
  }).then(object => response.status(201).json(object))
}

/**
 * @api {put} /api/v1/objects/:id Update object by ID
 * @apiVersion 1.0.0
 * @apiGroup Object
 * @apiDescription Endpoint for update object.
 * @apiParam    {String}   name        Object name.
 * @apiSuccess  {Number}   id          Created object id.
 * @apiSuccess  {String}   name        Created object name.
 * @apiSuccess  {Date}     createdAt   Created object create date.
 * @apiSuccess  {Date}     updatedAt   Created object update date.
 */
exports.updateObject = async (request, response) => {
  Object.update({
    name: request.body.name
  }, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    Object.findOne({
      where: {
        id: request.params.id
      }
    }).then(object => response.status(201).json(object))
  })
}

/**
 * @api {delete} /api/v1/objects/:id Delete object by ID
 * @apiVersion 1.0.0
 * @apiGroup Object
 * @apiDescription Endpoint for delete object.
 */
exports.deleteObject = async (request, response) => {
  Object.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => response.status(204).json(null))
}
