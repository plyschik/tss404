const Playlist = require('../database/models').Playlist
const Movie = require('../database/models').Movie
const tmdb = require('../services/tmdb')

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
  const { page } = request.query
  const allGenres = []
  let allGenreIds = []
  const alreadyWatchedMovieIds = []

  function modeString(array) {
    if (array.length == 0) return null

    var modeMap = {},
      maxEl = array[0],
      maxCount = 1

    for (var i = 0; i < array.length; i++) {
      var el = array[i]

      if (modeMap[el] == null) modeMap[el] = 1
      else modeMap[el]++

      if (modeMap[el] > maxCount) {
        maxEl = el
        maxCount = modeMap[el]
      } else if (modeMap[el] == maxCount) {
        maxEl += '|' + el
        maxCount = modeMap[el]
      }
    }
    return maxEl //returns pipe-seprated(|) most occured items in the given array
  }

  Playlist.findAll({
    where: { userId: id },
    include: [Movie]
  }).then(playlists => {
    playlists.forEach(playlist => {
      playlist.Movies.forEach(movie => {
        movie.genres.split(',').forEach(genre => allGenres.push(genre))
        alreadyWatchedMovieIds.push(movie.id)
      })
    })

    tmdb.api.get('/genre/movie/list').then(genres => {
      allGenreIds = tmdb.getGenreIdsFromNames(allGenres, genres.data.genres)
      tmdb.api
        .get('/discover/movie', {
          params: {
            with_genres: modeString(allGenreIds),
            page
          }
        })
        .then(recommendations => {
          recommendations.data.results = tmdb.removeWatchedMoviesFromRecommendations(
            alreadyWatchedMovieIds,
            recommendations
          )
          response.send(recommendations.data)
        })
    })
  })
}
