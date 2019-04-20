const models = require('./../database/models')

module.exports = {
  signupValidationSchema: {
    email: {
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
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password should be at least 3 characters long.'
      }
    },
    firstName: {
      isLength: {
        options: {
          min: 2,
          max: 32
        },
        errorMessage: 'First name should be at least 2 characters long and maximum of 32 characters.'
      }
    },
    lastName: {
      isLength: {
        options: {
          min: 2,
          max: 32
        },
        errorMessage: 'Last name should be at least 2 characters long and maximum of 32 characters.'
      }
    }
  },
  signinValidationSchema: {
    email: {
      isEmail: true,
      errorMessage: 'Invalid e-mail format.'
    },
    password: {
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password should be at least 3 characters long.'
      }
    }
  },
  tokenValidationSchema: {
    refreshToken: {
      isLength: {
        options: {
          min: 128,
          max: 128
        }
      }
    }
  }
}
