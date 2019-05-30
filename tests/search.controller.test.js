process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const { generateJWTtoken } = require('./helpers')
const db = require('../database/models')

chai.use(chaiHttp)
chai.should()

describe('Search controller', () => {
  describe('GET /api/v1/search', () => {
    it('It should return success message with 200 HTTP status for request', done => {
      db.User.create({
        email: 'search@test.test',
        password: 'password',
        role: 'user',
        firstName: 'Test',
        lastName: 'Test'
      }).then(user => {
        let jwtToken = generateJWTtoken(user)

        chai
          .request(server)
          .get('/api/v1/search')
          .query({ q: 'Avengers' })
          .set('Authorization', `Bearer ${jwtToken}`)
          .end((error, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.a('object')
            response.body.should.have.property('results')
            response.body.results[0].should.have.property('id')
            response.body.results[0].should.have.property('title')
            response.body.results[0].should.have.property('poster')
            response.body.results[0].should.have.property('original_language')
            response.body.results[0].should.have.property('overview')
            response.body.results[0].should.have.property('release_date')
            response.body.results[0].should.have.property('genres')

            user.destroy().then(() => done())
          })
      })
    }).timeout(5000)
  })

  describe('GET /api/v1/search', () => {
    it('It should return success message with 200 HTTP status for request', done => {
      db.User.create({
        email: 'search@test.test',
        password: 'password',
        role: 'user',
        firstName: 'Test',
        lastName: 'Test'
      }).then(user => {
        let jwtToken = generateJWTtoken(user)

        chai
          .request(server)
          .get('/api/v1/search')
          .query({ q: 'asdsadasdasdas' })
          .set('Authorization', `Bearer ${jwtToken}`)
          .end((error, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.a('object')
            response.body.should.have.property('results')
            response.body.results.should.have.lengthOf(0)

            user.destroy().then(() => done())
          })
      })
    }).timeout(5000)
  })

  describe('GET /api/v1/search', () => {
    it('It should return error message with 422 HTTP status for request', done => {
      db.User.create({
        email: 'search@test.test',
        password: 'password',
        role: 'user',
        firstName: 'Test',
        lastName: 'Test'
      }).then(user => {
        let jwtToken = generateJWTtoken(user)

        chai
          .request(server)
          .get('/api/v1/search')
          .set('Authorization', `Bearer ${jwtToken}`)
          .end((error, response) => {
            response.should.have.status(422)
            response.should.be.json
            response.body.should.be.a('object')
            response.body.should.have.property('message')
            response.body.should.have.property('errors')

            user.destroy().then(() => done())
          })
      })
    }).timeout(5000)
  })

  describe('GET /api/v1/search', () => {
    it('It should return response with 403 HTTP status for request without JWT token', done => {
      chai
        .request(server)
        .post('/api/v1/search')
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
  })
})
