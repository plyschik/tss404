'use strict';
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {});
  RefreshToken.associate = function(models) {
    RefreshToken.belongsTo(models.User)
  };
  return RefreshToken;
};