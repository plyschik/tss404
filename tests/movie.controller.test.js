process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require('../database/models')
const {
  generateJWTtoken
} = require('./helpers')
const models = require('../database/models')

chai.use(chaiHttp)
chai.should()

describe('Movie controller', () => {
    describe('POST /api/v1/playlists/1/movies', () => {
        it('It should return success message with 201 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
            let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .post('/api/v1/playlists/1/movies')
              .set('Authorization', `Bearer ${jwtToken}`)
              .send({
                'id': 299534
              })
              .end((error, response) => {
                response.should.have.status(201)
                response.should.be.json
                response.body.should.be.a('object')
  
                response.body.should.have.property('message');
                response.body.should.have.property('movie');
                response.body.movie.should.have.property('title');
                response.body.movie.should.have.property('poster');
                response.body.movie.should.have.property('originalLanguage');
                response.body.movie.should.have.property('overview');
                response.body.movie.should.have.property('releaseDate');
                response.body.movie.should.have.property('updatedAt');
                response.body.movie.should.have.property('createdAt');
                response.body.movie.should.have.property('id').not.null;
  
             cleanup(done);
              })
          })
        }).timeout(5000)
      }),
      describe('POST /api/v1/playlists/1/movies', () => {
        it('It should return client error message with 404 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
            let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .post('/api/v1/playlists/1/movies')
              .set('Authorization', `Bearer ${jwtToken}`)
              .send({
                'id': 1
              })
              .end((error, response) => {
                response.should.have.status(404)
            
             cleanup(done);
              })
          })
        }).timeout(5000)
      }),
      describe('GET /api/v1/movies', () => {
        it('It should return success message with 200 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
             let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .get('/api/v1/movies')
              .set('Authorization', `Bearer ${jwtToken}`)
              .end((error, response) => {
                response.should.have.status(200)
                response.should.be.json
                response.body.should.be.a('object')
  
                response.body.should.have.property('movies');
                response.body.movies[0].should.have.property('title');
                response.body.movies[0].should.have.property('poster');
                response.body.movies[0].should.have.property('originalLanguage');
                response.body.movies[0].should.have.property('overview');
                response.body.movies[0].should.have.property('releaseDate');
                response.body.movies[0].should.have.property('id').not.null;

                response.body.should.have.property('movies');
                response.body.movies[1].should.have.property('title');
                response.body.movies[1].should.have.property('poster');
                response.body.movies[1].should.have.property('originalLanguage');
                response.body.movies[1].should.have.property('overview');
                response.body.movies[1].should.have.property('releaseDate');
                response.body.movies[1].should.have.property('id').not.null;
  
             cleanup(done);
              })
          })
        }).timeout(5000)
      }),
      describe('GET /api/v1/movies/:movieId', () => {
        it('It should return success message with 200 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
             let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .get('/api/v1/movies/1')
              .set('Authorization', `Bearer ${jwtToken}`)
              .end((error, response) => {
                response.should.have.status(200)
                response.should.be.json
                response.body.should.be.a('object')

                response.body.should.have.property('movie');
                response.body.movie[0].should.have.property('title');
                response.body.movie[0].should.have.property('poster');
                response.body.movie[0].should.have.property('originalLanguage');
                response.body.movie[0].should.have.property('overview');
                response.body.movie[0].should.have.property('releaseDate');
                response.body.movie[0].should.have.property('updatedAt');
                response.body.movie[0].should.have.property('createdAt');
                response.body.movie[0].should.have.property('id').not.null;
  
             cleanup(done);
              })
          })
        }).timeout(5000)
      }),
      describe('GET /api/v1/movies/:movieId', () => {
        it('It should return error message with 500 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
             let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .get('/api/v1/movies/4')
              .set('Authorization', `Bearer ${jwtToken}`)
              .end((error, response) => {
                response.should.have.status(404)

             cleanup(done);
              })
          })
        }).timeout(5000)
      }),
      describe('DELETE /api/v1/playlists/:playlistId/movies/:movieId', () => {
        it('It should return success message with 201 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
             let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .delete('/api/v1/playlists/1/movies/1')
              .set('Authorization', `Bearer ${jwtToken}`)
              .end((error, response) => {
                response.should.have.status(201)

                response.body.should.have.property('movie');

             cleanup(done);
              })
          })
        }).timeout(5000)
      }),
      describe('DELETE /api/v1/playlists/:playlistId/movies/:movieId', () => {
        it('It should return success message with 404 HTTP status for request', (done) => {
  
          prepareDatabase().then((user) => {
  
             let jwtToken = generateJWTtoken(user)
  
            chai.request(server)
              .delete('/api/v1/playlists/31/movies/1')
              .set('Authorization', `Bearer ${jwtToken}`)
              .end((error, response) => {
                response.should.have.status(404)

                response.body.should.have.property('message');

             cleanup(done);
              })
          })
        }).timeout(5000)
      })            
})

async function prepareDatabase () {
  let user = await db.User.create({
    email: 'playlist@test.test',
    password: 'password',
    role: 'administrator',
    firstName: 'Test',
    lastName: 'Test'
  })

  const playlist1 = await db.Playlist.create({
    id: 1,
    name: 'test_playlist',
    description: 'test_description',
    userId: user.id
  })

  const movie1 = await db.Movie.create({
    id: 1,
    title: 'test title 1',
    poster: 'test poster 1',
    originalLanguage: 'test pl',
    overview: 'test 1',
    releaseDate: '1999-10-10',
    genres: 'test 1'
  })

  movie1.addPlaylists(playlist1.id)

  const movie2 = await db.Movie.create({
    title: 'test title 2',
    poster: 'test poster 2',
    originalLanguage: 'test pl',
    overview: 'test 2',
    releaseDate: '1999-10-10',
    genres: 'test 2'
  })

  movie2.addPlaylists(playlist1.id)

  return user
}

function cleanup (done) {
  models.Playlist.destroy({
    where: {}
  }).then(() => {
    models.Movie.destroy({
      where: {}
    }).then(() => {
      models.User.destroy({
        where: {}
      }).then(() => {
        models.movie_playlist.destroy({
          where: {}
        }).then(() => done())
      })
    })
  })
}
