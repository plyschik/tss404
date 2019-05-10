const Movie = require('../database/models').Movie
const Playlist = require('../database/models').Playlist
const tmdb = require('../services/tmdb')

/**
 * @api             {get}     /api/v1/movies/    Show all movies from database.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiDescription This endpoint return list of movies.
 * @apiSuccess {Number}   id            Movie id.
 * @apiSuccess {String}   title         Movie name.
 * @apiSuccess {String}   poster        Url of movie poster.
 * @apiSuccess {String}   originalLanguage        
 * Movie language.
 * @apiSuccess {Date}     releaseDate   Movie release date.
 * @apiSuccess {String}   geners        Movie geners.
 * @apiSuccess {Number}   playlistId    Movie playlists.
 * @apiSuccess {Date}     createdAt     Movie create date.
 * @apiSuccess {Date}     updatedAt     Movie update date.
 */

exports.getMovies = async (request, response) => {
    Movie.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
        .then(movies => {
            response.status(200).json({
                movies
            })
        })
        .catch(err => res.status(400).json('unable to find movies'));
}

/**
 * @api             {get}     /api/v1/:id/movies/    Show movies from user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
* @apiSuccess {Number}   id            Movie id.
 * @apiSuccess {String}   title         Movie name.
 * @apiSuccess {String}   poster        Url of movie poster.
 * @apiSuccess {String}   originalLanguage        
 * Movie language.
 * @apiSuccess {Date}     releaseDate   Movie release date.
 * @apiSuccess {String}   geners        Movie geners.
 * @apiSuccess {Number}   playlistId    Movie playlists.
 * @apiSuccess {Date}     createdAt     Movie create date.
 * @apiSuccess {Date}     updatedAt     Movie update date.
 * @apiError   {Object[]}  errors              Array of field validation errors.
 */

exports.getMovie = async (request, response) => {
    const { id } = request.params;
    Movie.findAll({
        where: {
            id
        }
    })
        .then(movies => {
            response.status(200).json({
                movies
            })
        })
        .catch(err => res.status(404).json('unable to find movie'));
}

/**
 * @api             {post}     /api/v1/:id/movies/:playlistId    Adding movie to user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiParam        {String}    email               User e-mail address.
 * @apiParam        {String}    password            User password.
 * @apiParam        {String}    firstName           User first name.
 * @apiParam        {String}    lastName            User last name.
 * @apiSuccess      {String}    message             Status message.
 * @apiError        {Object[]}  errors              Array of field validation errors.
 */

exports.createMovie = (request, response) => {

    const { id } = request.body;

    tmdb.api.get(`/movie/${id}`)
        .then(movie => {
            const { movie_id, original_title, original_language, poster_path, overview, release_date, genres } = movie.data;

            const genreNames = genres.map(genre => genre.name);

            Movie.create({
                id: movie_id,
                title: original_title,
                poster: `https://image.tmdb.org/t/p/w500/${poster_path}`,
                originalLanguage: original_language,
                overview,
                playlistId: 1,
                releaseDate: release_date,
                genres: genreNames.toString()
            }).then(createdMovie => response.send(createdMovie))
        })
}

/**
 * @api             {delete}     /api/v1/:id/movies/:playlistId    Delete movie from user playlist.
 * @apiVersion      1.0.0
 * @apiGroup        Movies
 * @apiSuccess {Number}   id            Movie id.
 * @apiSuccess {String}   title         Movie name.
 * @apiSuccess {String}   poster        Url of movie poster.
 * @apiSuccess {String}   originalLanguage        
 * Movie language.
 * @apiSuccess {Date}     releaseDate   Movie release date.
 * @apiSuccess {String}   geners        Movie geners.
 * @apiSuccess {Number}   playlistId    Movie playlists.
 * @apiSuccess {Date}     createdAt     Movie create date.
 * @apiSuccess {Date}     updatedAt     Movie update date.
 * @apiError        {Object[]}  errors              Array of field validation errors.
 */

exports.deleteMovie = (request, response) => {
    const { movieId, playlistId } = request.params;
    Movie.destroy({
        where: {
            movieId,
            playlistId
        }
    })
        .then(movie => {
            response.status(200).json({
                movie
            })
        })
        .catch(err => res.status(400).json('unable to delete movie'));
}