const Playlist = require('../database/models').Playlist
const {
  validationResult
} = require('express-validator/check')
const models = require('../database/models')


/**
 * @api {get} /api/v1/playlists Request for list of playlist
 * @apiVersion 1.0.0
 * @apiGroup Playlist
 * @apiDescription This endpoint return list of playlist
 * @apiSuccess {Number}   id                   Playlist id.
 * @apiSuccess {String}   name                 Playlist name.
 * @apiSuccess {String}   description          Playlist description.
 * @apiSuccess {Integer}  userId               Playlist owner id.
 * @apiSuccess {Integer}  userId               Playlist owner id.
 * @apiSuccess {Movie[]}  Movies               Array of playlist movies.
 * @apiSuccess {Date}     createdAt            Playlist create date.
 * @apiSuccess {Date}     updatedAt            Playlist update date.
 */
exports.getPlaylists = async (request, response) => {

  Playlist.findAll({
    where: [{
      userId: request.user.id
    }],
    order: [
      ['id', 'DESC']
    ],
    include: [
      models.Movie
    ],
  }).then(playlist => {
    response.status(200).json({
      playlist
    })
  })
}

/**
 * @api {get} /api/v1/playlists/:id Request for specific playlist by ID
 * @apiVersion 1.0.0
 * @apiGroup Playlist
 * @apiDescription This endpoint return playlist by ID.
 * @apiParam    {Number}    id                  Playlist id.
 * @apiSuccess  {Number}    id                  Playlist id.
 * @apiSuccess  {String}    name                Playlist name.
 * @apiSuccess  {String}    description         Playlist description.
 * @apiSuccess  {Integer}   userId              Playlist owner id.
 * @apiSuccess {Movie[]}  Movies               Array of playlist movies.
 * @apiSuccess  {Date}      createdAt           Playlist create date.
 * @apiSuccess  {Date}      updatedAt           Playlist update date.
 */
exports.getPlaylist = async (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    })
  } else {
    Playlist.findOne({
      where: {
        id: request.params.id
      },
      include: [
        models.Movie
      ],
    }).then(playlist => {
      if (playlist) {
        response.json(playlist)
      } else {
        response.status(404).json(null)
      }
    })
  }
}

/**
 * @api {post} /api/v1/playlists Create new playlist
 * @apiVersion 1.0.0
 * @apiGroup Playlist
 * @apiDescription Endpoint for create playlist.
 * @apiParam    {String}   name               Playlist name.
 * @apiParam    {String}   description        Playlist description.
 * @apiSuccess  {Number}   id                 Created playlist id.
 * @apiSuccess  {String}   name               Created playlist name.
 * @apiSuccess  {String}   description        Created playlist description.
 * @apiSuccess  {Integer}  userId             Created playlist owner id.
 * @apiSuccess  {Date}     createdAt          Created playlist create date.
 * @apiSuccess  {Date}     updatedAt          Created playlist update date.
 */
exports.createPlaylist = async (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    })
  } else {
    Playlist.create({
      userId: request.user.id,
      name: request.body.name,
      description: request.body.description,
    }).then(playlist => response.status(201).json(playlist))
  }
}

/**
 * @api {put} /api/v1/playlists/:id Update playlist by ID
 * @apiVersion 1.0.0
 * @apiGroup Playlist
 * @apiDescription Endpoint for update playlist.
 * @apiParam    {String}   name               Playlist name.
 * @apiSuccess  {Number}   id                 Created playlist id.
 * @apiSuccess  {String}   name               Created playlist name.
 * @apiSuccess  {String}   description        Created playlist name.
 * @apiSuccess  {Integer}  userId             Created playlist owner id. 
 * @apiSuccess  {Movie[]}  Movies             Array of playlist movies.
 * @apiSuccess  {Date}     createdAt          Created playlist create date.
 * @apiSuccess  {Date}     updatedAt          Created playlist update date.
 */
exports.updatePlaylist = async (request, response) => {

  Playlist.update({
    name: request.body.name,
    description: request.body.description
  }, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    Playlist.findOne({
      where: {
        id: request.params.id
      },
      include: [
        models.Movie
      ],
    }).then(playlist => response.status(201).json(playlist))
  })
}

/**
 * @api {delete} /api/v1/playlists/:id Delete playlist by ID
 * @apiVersion 1.0.0
 * @apiGroup Playlist
 * @apiDescription Endpoint for delete playlist.
 */
exports.deletePlaylist = async (request, response) => {
  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    response.status(400).json({
      message: 'Invalid request data.',
      errors: validationErrors.array()
    })
  } else {
    Playlist.destroy({
      where: {
        id: request.params.id
      }
    }).then(() => response.status(204).json(null))
  }
}