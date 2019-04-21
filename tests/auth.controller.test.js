process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const models = require('../database/models')

chai.use(chaiHttp)
chai.should()

describe('Auth controller', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('It should return validation errors with 400 HTTP status for request without data', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .end((error, response) => {
          response.should.have.status(400)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.should.have.property('errors')
          response.body.errors.should.be.a('array')
          response.body.errors[0].should.all.have.keys('location', 'param', 'msg')

          done()
        })
    })

    it('It should return success message with 201 HTTP status for request with correct data', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          'email': 'test@test.test',
          'password': 'password',
          'firstName': 'Test',
          'lastName': 'Test'
        })
        .end((error, response) => {
          response.should.have.status(201)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
  
          models.User.destroy({
            where: { email: 'test@test.test' }
          }).then(() => {
            done()
          })
        })
    })
  })

  describe('POST /api/v1/auth/signin', () => {
    it('It should return validation errors with 400 HTTP status for request without data', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .end((error, response) => {
          response.should.have.status(400)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.should.have.property('errors')
          response.body.errors.should.be.a('array')
          response.body.errors[0].should.all.have.keys('location', 'param', 'msg')

          done()
        })
    })

    it('It should return error message with 422 HTTP status for request with credentials of user that not exists', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send({
          'email': 'test@test.test',
          'password': 'password'
        })
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
  
          done()
        })
    })

    it('It should return tokens with 200 HTTP status for request with correct credentials of user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          'email': 'test@test.test',
          'password': 'password',
          'firstName': 'Test',
          'lastName': 'Test'
        })
        .end((error, response) => {
          chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
              'email': 'test@test.test',
              'password': 'password'
            })
            .end((error, response) => {
              response.should.have.status(200)
              response.should.be.json
              response.body.should.be.a('object')
              response.body.should.have.property('message')
              response.body.should.have.property('data')
              response.body.data.should.have.property('accessToken')
              response.body.data.should.have.property('refreshToken')
      
              models.User.destroy({
                where: { email: 'test@test.test' }
              }).then(() => {
                done()
              })
            })
        })
    })
  })

  describe('POST /api/v1/auth/signout', () => {
    it('It should return response with 403 HTTP status for request without JWT token', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signout')
        .end((error, response) => {
          response.should.have.status(403)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('status')
          response.body.should.have.property('success')
          response.body.should.have.property('message')

          done()
        })
    })

    it('It should return success message with 200 HTTP status for request with correct JWT token', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          'email': 'test@test.test',
          'password': 'password',
          'firstName': 'Test',
          'lastName': 'Test'
        })
        .end((error, response) => {
          chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
              'email': 'test@test.test',
              'password': 'password'
            })
            .end((error, response) => {
              const token = response.body.data.accessToken

              chai.request(server)
                .post('/api/v1/auth/signout')
                .set('Authorization', `Bearer ${token}`)
                .end((error, response) => {
                  response.should.have.status(200)
                  response.should.be.json
                  response.body.should.be.a('object')
                  response.body.should.have.property('message')
          
                  models.User.destroy({
                    where: { email: 'test@test.test' }
                  }).then(() => {
                    done()
                  })
                })
            })
        })
    })
  })

  describe('POST /api/v1/auth/token', () => {
    it('It should return new access token with 200 HTTP status for request with correct refresh tokens', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          'email': 'test@test.test',
          'password': 'password',
          'firstName': 'Test',
          'lastName': 'Test'
        })
        .end((error, response) => {
          chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
              'email': 'test@test.test',
              'password': 'password'
            })
            .end((error, response) => {
              const refreshToken = response.body.data.refreshToken

              chai.request(server)
                .post('/api/v1/auth/token')
                .send({
                  'refreshToken': refreshToken
                })
                .end((error, response) => {
                  response.should.have.status(200)
                  response.should.be.json
                  response.body.should.be.a('object')
                  response.body.should.have.property('message')
                  response.body.should.have.property('data')
                  response.body.data.should.have.property('accessToken')
          
                  models.User.destroy({
                    where: { email: 'test@test.test' }
                  }).then(() => {
                    done()
                  })
                })
            })
        })
    })
  })
})
