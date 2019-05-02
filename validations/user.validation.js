const models = require('./../database/models')

module.exports = {
  patchCurrentUserValidationSchema: {
    email: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isEmail: true,
      errorMessage: 'Invalid e-mail format.',
      custom: {
        options: (email) => {
          return models.User.count({
            where: { email: email }
          }).then((user) => {
            if (user) {
              return Promise.reject('E-mail already in use.')
            }
          })
        }
      }
    },
    password: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password should be at least 3 characters long.'
      }
    },
    firstName: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: {
          min: 2,
          max: 32
        },
        errorMessage: 'First name should be at least 2 characters long and maximum of 32 characters.'
      }
    },
    lastName: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: {
          min: 2,
          max: 32
        },
        errorMessage: 'Last name should be at least 2 characters long and maximum of 32 characters.'
      }
    }
  },
  patchUserValidationSchema: {
    email: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isEmail: true,
      errorMessage: 'Invalid e-mail format.',
      custom: {
        options: (email) => {
          return models.User.count({
            where: { email: email }
          }).then((user) => {
            if (user) {
              return Promise.reject('E-mail already in use.')
            }
          })
        }
      }
    },
    password: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password should be at least 3 characters long.'
      }
    },
    role: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isIn: {
        options: [['user', 'administrator']],
        errorMessage: 'There are two valid roles: user and administrator.'
      }
    },
    firstName: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: {
          min: 2,
          max: 32
        },
        errorMessage: 'First name should be at least 2 characters long and maximum of 32 characters.'
      }
    },
    lastName: {
      optional: {
        options: {
          checkFalsy: true
        }
      },
      isLength: {
        options: {
          min: 2,
          max: 32
        },
        errorMessage: 'Last name should be at least 2 characters long and maximum of 32 characters.'
      }
    }
  }
}
