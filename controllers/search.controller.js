const config = require('./../config')
const axios = require('axios')
const CircularJSON = require('circular-json')

/**
 * @api             {get}      /api/v1/search Search for movies in TMDB.
 * @apiVersion      1.0.0
 * @apiGroup        Search
 * @apiParam        {String}    q         Query string.
 * @apiParam        {String}    api_key   TMDB API key.
 * @apiSuccess      {String}    movies    Array of found movies.
 * @apiError        {Object[]}  errors    Array of errors messages.
 */
exports.search = (request, response) => {
    const query = request.query.q;
    axios.get('https://api.themoviedb.org/3/search/movie', { params: { api_key: config.tmdb.api_key, query } })
        .then((movies) => {
            let results = [];
            let genreNames = new Set();

            axios.get('https://api.themoviedb.org/3/genre/movie/list', { params: { api_key: config.tmdb.api_key } })
                .then((fetchedGenres) => {
                    movies.data.results.forEach((movie) => {
                        movie.genre_ids.forEach((genreId) => {
                            for (let genre of fetchedGenres.data.genres) {
                                if (genreId === genre.id) {
                                    genreNames.add(genre.name);
                                }
                            }
                        })

                        results.push({
                            id: movie.id,
                            title: movie.title,
                            poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                            original_language: movie.original_language,
                            overview: movie.overview,
                            release_date: movie.release_date,
                            genres: Array.from(genreNames)
                        })
                    });
                    response.send(results);
                })
                .catch((errors) => {
                    response.status(errors.response.status).send(errors.response.data);
                })
        })
        .catch((errors) => {
            response.status(errors.response.status).send(errors.response.data);
        })
}