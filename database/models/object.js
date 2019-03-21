'use strict';
module.exports = (sequelize, DataTypes) => {
  const Object = sequelize.define('Object', {
    name: DataTypes.STRING
  }, {});
  Object.associate = function(models) {
    // associations can be defined here
  };
  return Object;
};