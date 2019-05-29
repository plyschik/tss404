'use strict'

const bcryptjs = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'user@tss404.io',
          password: bcryptjs.hashSync('password', 10),
          role: 'user',
          firstName: 'User',
          lastName: 'User'
        },
        {
          email: 'user2@tss404.io',
          password: bcryptjs.hashSync('password', 10),
          role: 'user',
          firstName: 'User',
          lastName: 'User'
        },
        {
          email: 'user3@tss404.io',
          password: bcryptjs.hashSync('password', 10),
          role: 'user',
          firstName: 'User',
          lastName: 'User'
        },
        {
          email: 'administrator@tss404.io',
          password: bcryptjs.hashSync('password', 10),
          role: 'administrator',
          firstName: 'Administrator',
          lastName: 'Administrator'
        }
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
