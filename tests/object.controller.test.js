process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let describe = require('mocha').describe
let it = require('mocha').it
let Object = require('../database/models').Object

chai.use(chaiHttp)
chai.should()

afterEach((done) => {
  Object.destroy({ truncate : true, restartIdentity: true })

  done()
})

describe('Objects', () => {
  describe('GET /api/v1/objects', () => {
    it('it should get list of objects', (done) => {
      Object.bulkCreate([
        {
          name: 'Foo'
        },
        {
          name: 'Bar'
        },
        {
          name: 'Baz'
        }
      ])
      
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
      Object.create({
        name: 'Foo'
      }).then((object) => console.log(object.id))

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
        .get('/api/v1/objects/1')
        .end((request, response) => {
          response.should.have.status(404)

          done()
        })
    })
  })
})
