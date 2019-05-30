process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const { generateJWTtoken } = require('./helpers')
const db = require('../database/models')

chai.use(chaiHttp)
chai.should()

describe('Recommendation controller', () => {
  describe('GET /api/v1/recommend', () => {
    it('It should return success message with 200 HTTP status for request', done => {
      db.User.create({
        email: 'recommend@test.test',
        password: 'password',
        role: 'user',
        firstName: 'Test',
        lastName: 'Test'
      }).then(user => {
        let jwtToken = generateJWTtoken(user)

        chai
          .request(server)
          .get('/api/v1/recommend')
          .set('Authorization', `Bearer ${jwtToken}`)
          .end((error, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.a('object')
            response.body.should.have.property('recommendations')
            response.body.recommendations.should.have.property('page', 1)
            response.body.recommendations.should.have.property('results')
            response.body.recommendations.results[0].should.have.property(
              'original_title'
            )
            response.body.recommendations.results[0].should.have.property(
              'release_date'
            )
            response.body.recommendations.results[0].should.have.property(
              'overview'
            )

            user.destroy().then(() => done())
          })
      })
    }).timeout(5000)
  })

  describe('GET /api/v1/recommend', () => {
    it('It should return success message with 200 HTTP status for request', done => {
      db.User.create({
        email: 'recommend@test.test',
        password: 'password',
        role: 'user',
        firstName: 'Test',
        lastName: 'Test'
      }).then(user => {
        db.Playlist.create({
          name: 'Recommendation test',
          description: 'Test',
          userId: user.id
        }).then(playlist => {
          db.Movie.create({
            id: 299534,
            title: 'Avengers: Endgame',
            poster:
              'https://image.tmdb.org/t/p/w500//or06FN3Dka5tukK1e9sl16pB3iy.jpg',
            original_language: 'en',
            overview:
              "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
            release_date: '2019-04-24',
            genres: 'Adventure,Science Fiction,Action'
          }).then(movie => {
            movie.setPlaylists(playlist.id)
            let jwtToken = generateJWTtoken(user)

            chai
              .request(server)
              .get('/api/v1/recommend')
              .set('Authorization', `Bearer ${jwtToken}`)
              .end((error, response) => {
                response.should.have.status(200)
                response.should.be.json
                response.body.should.be.a('object')
                response.body.should.have.property('recommendations')
                response.body.recommendations.should.have.property('page', 1)
                response.body.recommendations.should.have.property('results')
                response.body.recommendations.results[0].should.have.property(
                  'original_title'
                )
                response.body.recommendations.results[0].should.have.property(
                  'release_date'
                )
                response.body.recommendations.results[0].should.have.property(
                  'overview'
                )
                response.body.recommendations.results[0].should.have.property(
                  'genre_ids'
                )
                response.body.recommendations.results[0].genre_ids
                  .indexOf(12)
                  .should.not.equal(-1) // recommendation should have Adventure(id: 12) genre

                movie.destroy().then(() => {
                  playlist.destroy().then(() => {
                    user.destroy().then(() => {
                      done()
                    })
                  })
                })
              })
          })
        })
      })
    }).timeout(5000)
  })

  describe('GET /api/v1/recommend', () => {
    it('It should return response with 403 HTTP status for request without JWT token', done => {
      chai
        .request(server)
        .post('/api/v1/recommend')
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
