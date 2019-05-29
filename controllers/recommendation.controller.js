const ger = require('../services/recommender')
const Playlist = require('../database/models').Playlist
const Movie = require('../database/models').Movie

/**
 * @api             {get}      /api/v1/search Search for movies in TMDB.
 * @apiVersion      1.0.0
 * @apiGroup        Search
 * @apiParam        {String}    q         Query string.
 * @apiParam        {String}    api_key   TMDB API key.
 * @apiSuccess      {String}    movies    Array of found movies.
 * @apiError        {Object[]}  errors    Array of errors messages.
 */
exports.recommend = (request, response) => {
  const { id } = request.user

  Playlist.findAll({
    where: { userId: id },
    include: [Movie]
  }).then(playlists => response.send(playlists))
}
