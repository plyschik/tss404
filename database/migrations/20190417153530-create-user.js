'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: Sequelize.CHAR(60),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      role: {
        type: Sequelize.ENUM('user', 'administrator'),
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 32]
        }
      },
      lastName: {
        type: Sequelize.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 32]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};