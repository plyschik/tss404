'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    Playlist.hasMany(models.Movie),
    Playlist.belongsTo(models.User, {foreignKey: "userId"})
  };
  return Playlist;
};