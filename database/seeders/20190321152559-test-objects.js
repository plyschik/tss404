'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Objects', [
      {
        name: 'Foo'
      },
      {
        name: 'Bar'
      },
      {
        name: 'Baz'
      }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Objects', null, {})
  }
}
