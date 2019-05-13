const models = require('../database/models')

module.exports = {
  createPlaylistValidationSchema: {
    name: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Name should be at least 3 characters long.'
      },
      custom: {
        options: (name, request) => {
          return models.Playlist.count({
            where: { name: name, userId: request.body.user.id }
          }).then((name) => {
            if (name) {
              return Promise.reject('Playlist with that name already exists.')
            }
          })
        }
      }
    },
    description: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Description should be at least 3 characters long.'
      }
    },
  }
}
