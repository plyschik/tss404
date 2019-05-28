const Movie = require('../database/models').Movie
const Playlist = require('../database/models').Playlist
const tmdb = require('../services/tmdb')
const ger = require('../services/recommender')

/**
 * @api             {get}     /api/v1/movies/    Show all movies from database.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiDescription  This endpoint return list of movies.
from user playlist.
 * @apiSuccess      {Date}     updatedAt     Movie update date.
 * @apiError        {Object[]}  errors              Array of field validation errors.
 */

exports.getMovies = async (request, response) => {
  Movie.findAll({
    order: [['id', 'DESC']]
  })
    .then(movies => {
      response.status(200).json({
        message: 'Movies found.'
      })
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown database error. Try again.' })
    })
}

/**
 * @api             {get}     /api/v1/movies/:movieId    Show movies from user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiDescription  This endpoint return object by ID.
 * @apiSuccess      {Date}     updatedAt     Movie update date.
 * @apiError        {Object[]}  errors              Array of field validation errors.
 */

exports.getMovie = async (request, response) => {
  const { id } = request.params
  Movie.findAll({
    where: {
      id
    }
  })
    .then(movies => {
      response.status(200).json({
        message: 'Movie find successfully.'
      })
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown database error. Try again.' })
    })
}

/**
 * @api             {post}     /api/v1//playlist/:playlistId/movies/:movieId
 * @apiDescription  This endpoint create movie to user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiParam        {String}    title               Movie title.
 * @apiParam        {String}    poster           User first name.
 * @apiParam        {String}    originalLanguage            User last name.
 * @apiParam        {String}    overview           User first name.
 * @apiParam        {String}    poster           User first name.
 * @apiSuccess      {String}    message             Status message.
 * @apiError        {Object[]}  errors              Array of field validation errors.
 */

exports.createMovie = async (request, response) => {
  const { playlistId } = request.params
  const { id } = request.body

  tmdb.api
    .get(`/movie/${id}`)
    .then(movie => {
      const {
        id,
        original_title,
        original_language,
        poster_path,
        overview,
        release_date,
        genres
      } = movie.data

      const genreNames = genres.map(genre => genre.name)

      Movie.findOrCreate({
        where: { id: id },
        defaults: {
          title: original_title,
          poster: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          originalLanguage: original_language,
          overview,
          releaseDate: release_date,
          genres: genreNames.toString()
        }
      })
        .then(([createdMovie, wasCreated]) => {
          ger.events([
            {
              namespace: 'movies',
              person: 'bob',
              action: 'likes',
              thing: 'xmen',
              expires_at: '2020-06-06'
            },
            {
              namespace: 'movies',
              person: 'bob',
              action: 'likes',
              thing: 'avengers',
              expires_at: '2020-06-06'
            },
            {
              namespace: 'movies',
              person: request.user.id,
              action: 'likes',
              thing: 'xmen',
              expires_at: '2020-06-06'
            }
          ])

          response.status(200).json({
            message: 'Your movie was successfully added.',
            wasCreated
          })
        })
        .catch(error => {
          response
            .status(500)
            .json({ error, message: 'Unknown database error. Try again.' })
        })
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown external database error. Try again.' })
    })
}

/**
 * @api             {delete}     /api/v1/playlist/:playlistId/movies/:movieId
 * @apiDescription  This endpoint delete movie from user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiDescription  This endpoint delete movie from user playlist.
 * @apiSuccess      {Date}     updatedAt     Movie update date.
 * @apiError        {Object[]}  errors              Array of field validation errors.validation errors.
 */

exports.deleteMovie = async (request, response) => {
  const { movieId, playlistId } = request.params
  Movie.destroy({
    where: {
      movieId,
      playlistId
    }
  })
    .then(movie => {
      response.status(200).json({
        message: 'Movie successfully deleted.'
      })
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown database error. Try again.' })
    })
}
