const models = require('../database/models')

module.exports = {
  createOrUpdatePlaylistValidationSchema: {
    name: {
      exists: {
        options: {
          checkFalsy: true,
        },
        errorMessage: 'Name is required.'
      },
      isLength: {
        options: {
          min: 3
        },
        errorMessage: 'Name should be at least 3 characters long.'
      },
      custom: {
        options: (name, {
          req
        }) => {
          if (name) {
            return models.Playlist.count({
              where: {
                name: name,
                userId: req.user.id
              }
            }).then((nameExists) => {
              if (nameExists) {
                return Promise.reject('Playlist with that name already exists.')
              }
            })
          }
        }
      }
    },
    description: {
      exists: {
        options: {
          checkFalsy: true,
        },
        errorMessage: 'Description is required.'
      },
      isLength: {
        options: {
          min: 3
        },
        errorMessage: 'Description should be at least 3 characters long.'
      }
    },
  },
  ownerValidationSchema: {
    id: {
      custom: {
        options: (id, {
          req
        }) => {
          return models.Playlist.findOne({
            where: {
              id: id
            }
          }).then((playlist) => {
            if (playlist.userId != req.user.id) {
              return Promise.reject('You are not the owner of this playlist.');
            }
          })
        },
      }
    }
  },
}