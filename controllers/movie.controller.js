const Movie = require('../database/models').Movie
const Playlist = require('../database/models').Playlist
const movie_playlist = require('../database/models').movie_playlist
const tmdb = require('../services/tmdb')

/**
 * @api             {get}     /api/v1/movies/    Show all movies from database.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiSuccess      {Object[]}  movies              Array of all movies objects from database
 * @apiError        {Object[]}  errors              Array of field validation errors.
 */

exports.getMovies = async (request, response) => {
  Movie.findAll({
    order: [['id', 'DESC']]
  })
    .then(movies => {
      response.status(200).json({
        movies
      })
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown database error. Try again.' })
    })
}

/**
 * @api             {get}      /api/v1/movies/:movieId  This endpoint returns movie by Id.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiSuccess      {Object}    movie               Movie object by given id
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
    .then(movie => {
      if (movie.length === 0) {
        response.status(404).json({
          message: 'Movie not found'
        })
      } else {
      response.status(200).json({
        movie
      })
     }
    })
    .catch(error => {
      response
        .status(500)
        .json({ message: 'Unknown database error. Try again.' })
    })
}

/**
 * @api             {post}     /api/v1//playlists/:playlistId/movies/:movieId
 * @apiDescription  This endpoint adds movie to user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiParam        {Number}    id                  Movie id from tmdb database.
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
        .then(([movie, wasCreated]) => {
          Playlist.findAll({
            where: { id: playlistId }
          }).then(playlist => {
            if (playlist.length === 0) {
              response.status(404).json({
                message: 'Playlist not found'
              })
            } else {
              movie_playlist.findAll({ where: { movieId: movie.id, playlistId: playlistId } })
                .then(associations => {
                  if (associations.length > 0) {
                    response.status(400).json({
                      message: 'Movie is already in playlist'
                    })
                  } else {
                    movie.addPlaylists(playlistId)
                    response.status(201).json({
                      message: 'Your movie was successfully added.',
                      movie
                    })
                  }
                })
            }
          })
        })
        .catch(error => {
          response
            .status(500)
            .json({ error, message: 'Unknown database error. Try again.' })
        })
    })
    .catch(errors => {
      response.status(errors.response.status).send({
        message: 'External database error',
        errors: errors.response.data
      })
    })
}

/**
 * @api             {delete}     /api/v1/playlists/:playlistId/movies/:movieId   This endpoint deletes movie from user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiSuccess      {Number}     movie               Amount of deleted movie from user playlist
 * @apiError        {Object[]}   errors              Array of field validation errors.
 */

exports.deleteMovie = async (request, response) => {
  const { movieId, playlistId } = request.params
  movie_playlist.destroy({ where: { movieId: movieId, playlistId: playlistId } })
    .then(movie => {
      if (movie === 0) {
        response.status(404).json({
          message: 'Movie or playlist not found'
        })
      } else {
        response.status(201).send({ 
          movie 
        })
      }
    })
    .catch(error => {
      response
        .status(500)
        .json({ error, message: 'Unknown database error. Try again.' })
    })
}
