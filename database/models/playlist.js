'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsToMany(models.Movie, {through: 'movie_playlist' } );
  };
  return Playlist;
};