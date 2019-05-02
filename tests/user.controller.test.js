process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require('../database/models')
const { generateJWTtoken } = require('./helpers')

chai.use(chaiHttp)
chai.should()

describe('User controller', () => {
  describe('PATCH /api/v1/users/me', () => {
    it('It should return success message with 200 HTTP status for request', (done) => {
      db.User.create({
        email: 'test@test.test',
        password: 'password',
        role: 'user',
        firstName: 'Test',
        lastName: 'Test'
      }).then((user) => {
        let jwtToken = generateJWTtoken(user)

        chai.request(server)
          .patch('/api/v1/users/me')
          .send({
            firstName: 'Test 1',
            lastName: 'Test 1'
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .end((error, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.a('object')
            response.body.should.have.property('message')

            db.User.findByPk(user.id).then((user) => {
              user.firstName.should.be.equal('Test 1')
              user.lastName.should.be.equal('Test 1')

              user.destroy().then(() => {
                done()
              })
            })
          })
      })
    })
  })

  describe('PATCH /api/v1/users/:id', () => {
    it('It should return success message with 200 HTTP status for request', (done) => {
      db.User.create({
        email: 'test@test.test',
        password: 'password',
        role: 'administrator',
        firstName: 'Test',
        lastName: 'Test'
      }).then((user) => {
        let jwtToken = generateJWTtoken(user)

        chai.request(server)
          .patch(`/api/v1/users/${user.id}`)
          .send({
            firstName: 'Test 1',
            lastName: 'Test 1'
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .end((error, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.a('object')
            response.body.should.have.property('message')

            db.User.findByPk(user.id).then((user) => {
              user.firstName.should.be.equal('Test 1')
              user.lastName.should.be.equal('Test 1')

              user.destroy().then(() => {
                done()
              })
            })
          })
      })
    })
  })

  describe('DELETE /api/v1/users/:id', () => {
    it('It should return success message with 200 HTTP status for request', (done) => {
      db.User.create({
        email: 'test@test.test',
        password: 'password',
        role: 'administrator',
        firstName: 'Test',
        lastName: 'Test'
      }).then((user) => {
        let jwtToken = generateJWTtoken(user)

        db.User.create({
          email: 'test1@test.test',
          password: 'password',
          role: 'administrator',
          firstName: 'Test1',
          lastName: 'Test1'
        }).then((user2) => {
          chai.request(server)
            .delete(`/api/v1/users/${user2.id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .end((error, response) => {
              response.should.have.status(200)
              response.should.be.json
              response.body.should.be.a('object')
              response.body.should.have.property('message')

              db.User.count({ where: {'id': user2.id }}).then((count) => {
                count.should.be.equal(0)

                user.destroy().then(() => {
                  user2.destroy().then(() => {
                    done()
                  })
                })
              })
            })
        })
      })
    })
  })
})
