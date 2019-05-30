const Playlist = require('../database/models').Playlist
const Movie = require('../database/models').Movie
const tmdb = require('../services/tmdb')

/**
 * @api             {get}      /api/v1/recommend  Get user's recommendations based on watch history.
 * @apiVersion      1.0.0
 * @apiGroup        Recommend
 * @apiParam        {Number}    page      Page number from pagination.
 * @apiSuccess      {Object[]}  recommendations  Array of recommendation objects.
 * @apiError        {Object[]}  errors    Array of error messages.
 */
exports.recommend = (request, response) => {
  const { id } = request.user
  const { page } = request.query
  const allGenres = []
  let allGenreIds = []
  const alreadyWatchedMovieIds = []

  Playlist.findAll({
    where: { userId: id },
    include: [Movie]
  })
    .then(playlists => {
      playlists.forEach(playlist => {
        playlist.Movies.forEach(movie => {
          movie.genres.split(',').forEach(genre => allGenres.push(genre))
          alreadyWatchedMovieIds.push(movie.id)
        })
      })

      tmdb.api
        .get('/genre/movie/list')
        .then(genres => {
          allGenreIds = tmdb.getGenreIdsFromNames(allGenres, genres.data.genres)
          tmdb.api
            .get('/discover/movie', {
              params: {
                with_genres: tmdb.helpers.modeString(allGenreIds),
                page
              }
            })
            .then(recommendations => {
              recommendations.data.results = tmdb.removeWatchedMoviesFromRecommendations(
                alreadyWatchedMovieIds,
                recommendations
              )
              response.send({ recommendations: recommendations.data })
            })
            .catch(errors => {
              response.status(errors.response.status).send({
                message: 'External database error',
                errors: errors.response.data
              })
            })
        })
        .catch(errors => {
          response.status(errors.response.status).send({
            message: 'External database error',
            errors: errors.response.data
          })
        })
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown database error. Try again.' })
    })
}
