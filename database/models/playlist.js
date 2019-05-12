'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.hasMany(models.Movie),
    Playlist.belongsTo(models.User)
  };
  return Playlist;
};