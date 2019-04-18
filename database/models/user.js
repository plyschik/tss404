'use strict';

const bcryptjs = require('bcryptjs')

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
    user.password = bcryptjs.hashSync(user.password, 10)
  });

  return User;
};