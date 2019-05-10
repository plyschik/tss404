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
    Movie.belongsTo(models.Playlist);
  };
  return Movie;
};