const Movie = require('../database/models').Movie
const Playlist = require('../database/models').Playlist
const tmdb = require('../services/tmdb')

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
    order: [
      ['id', 'DESC']
    ]
  })
    .then(movies => {
      response.status(200).json({
        message: 'Movies found.'
      })
    })
    .catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
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
  const { movieId } = request.params
  console.log(movieId)
  Movie.findAll({
    where: {
      id: movieId
    }
  })
    .then(movies => {
      response.status(200).json({
        message: 'Movie find successfully.'
      })
    })
    .catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
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
  const { movieId, playlistId } = request.params

  tmdb.api.get(`/movie/${movieId}`)
    .then(movie => {
      const { movie_id, original_title, original_language, poster_path, overview, release_date, genres } = movie.data

      const genreNames = genres.map(genre => genre.name)

      Movie.create({
        id: movie_id,
        title: original_title,
        poster: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        originalLanguage: original_language,
        overview,
        playlistId: playlistId,
        releaseDate: release_date,
        genres: genreNames.toString()
      }).then(createdMovie => response.status(200).json({
        message: 'Your movie was successfully added.'
      })).catch((error) => {
        response.status(500).json({ message: 'Unknown database error. Try again.' })
      })
    }).catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
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
    .catch((error) => {
      response.status(500).json({ message: 'Unknown database error. Try again.' })
    })
}
