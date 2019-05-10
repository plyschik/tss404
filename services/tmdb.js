const axios = require('axios')
const config = require('../config')

let tmdb = {}

tmdb.getGenreNamesFromIds = function (genreIds, genres) {
  let genreNames = new Set()

  genreIds.forEach((genreId) => {
    for (let genre of genres) {
      if (genreId === genre.id) {
        genreNames.add(genre.name)
      }
    }
  })

  return Array.from(genreNames)
}

tmdb.getReducedMovieInfo = function (movie, genreNames) {
  return {
    id: movie.id,
    title: movie.title,
    poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    original_language: movie.original_language,
    overview: movie.overview,
    release_date: movie.release_date,
    genres: genreNames
  }
}

tmdb.api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: config.tmdb.api_key
  }
})

module.exports = tmdb
