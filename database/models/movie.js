'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    poster: DataTypes.STRING,
    originalLanguage: DataTypes.STRING,
    overview: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    genres: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    Movie.belongsToMany(models.Playlist, {through: 'movie_playlist', foreignKey: 'movieId'})
  };
  return Movie;
};