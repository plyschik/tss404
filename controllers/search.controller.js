const tmdb = require('../services/tmdb')

/**
 * @api             {get}      /api/v1/search Search for movies in TMDB.
 * @apiVersion      1.0.0
 * @apiGroup        Search
 * @apiParam        {String}    q         Query string.
 * @apiSuccess      {Object[]}    movies    Array of found movies.
 * @apiError        {Object[]}  errors    Array of errors messages.
 */
exports.search = (request, response) => {
  const query = request.query.q
  tmdb.api
    .get('/search/movie', { params: { query } })
    .then(movies => {
      let results = []

      tmdb.api
        .get('/genre/movie/list')
        .then(fetchedGenres => {
          movies.data.results.forEach(movie => {
            const genreNames = tmdb.getGenreNamesFromIds(
              movie.genre_ids,
              fetchedGenres.data.genres
            )

            results.push(tmdb.getReducedMovieInfo(movie, genreNames))
          })

          response.send({ results })
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
}
