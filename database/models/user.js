'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => user.password = hash)
      .catch(error => {
        throw new Error()
      });
  });
  return User;
};