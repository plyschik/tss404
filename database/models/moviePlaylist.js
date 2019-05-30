'use strict'
module.exports = (sequelize, DataTypes) => {
  const movie_playlist = sequelize.define('movie_playlist', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    movieId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, { freezeTableName: true })
  return movie_playlist
}
