'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsToMany(models.Movie, {through: 'movie_playlist', foreignKey: 'playlistId'}),
    Playlist.belongsTo(models.User, {foreignKey: "userId"})
  };
  return Playlist;
};