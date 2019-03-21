process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let describe = require('mocha').describe
let it = require('mocha').it

chai.use(chaiHttp)
chai.should()

describe('Objects', () => {
  describe('GET /api/v1/objects', () => {
    it('it should get list of objects', (done) => {
      chai.request(server)
        .get('/api/v1/objects')
        .end((request, response) => {
          response.should.have.status(200)
          response.body.should.be.a('array')

          done()
        })
    })
  })

  describe('GET /api/v1/objects/:id', () => {
    it('it should get exists object', (done) => {
      chai.request(server)
        .get('/api/v1/objects/1')
        .end((request, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')

          done()
        })
    })

    it('it should return not found status on not exists object', (done) => {
      chai.request(server)
        .get('/api/v1/objects/10')
        .end((request, response) => {
          response.should.have.status(404)

          done()
        })
    })
  })
})
