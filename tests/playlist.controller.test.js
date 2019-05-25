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


describe('Playlist controller', () => {
  describe('GET /api/v1/playlists', () => {
      it('It should return success message with 200 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .get('/api/v1/playlists')
            .set('Authorization', `Bearer ${jwtToken}`)
            .end((error, response) => {
              response.should.have.status(200)
              response.should.be.json
              response.body.should.be.a('object')
              response.body.playlist.should.have.lengthOf(2);

              response.body.playlist[0].should.have.property('name', 'test_playlist2');
              response.body.playlist[0].should.have.property('description', 'test_description2');
              response.body.playlist[0].should.have.property('userId').not.null;

              response.body.playlist[1].should.have.property('name', 'test_playlist');
              response.body.playlist[1].should.have.property('description', 'test_description');
              response.body.playlist[1].should.have.property('userId').not.null;

           cleanup(done);
            })
        })
      })
    }),
    describe('GET /api/v1/playlists/:id', () => {
      it('It should return success message with 200 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .get('/api/v1/playlists/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .end((error, response) => {
              response.should.have.status(200)
              response.should.be.json
              response.body.should.be.a('object')

              response.body.should.have.property('name', 'test_playlist');
              response.body.should.have.property('description', 'test_description');
              response.body.should.have.property('userId', 1);
              response.body.should.have.property('id', 1);

           cleanup(done);
            })
        })
      })
    }),
    describe('GET /api/v1/playlists/:id', () => {
      it('It should return client error message with 403 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .get('/api/v1/playlists/3')
            .set('Authorization', `Bearer ${jwtToken}`)
            .end((error, response) => {
              response.should.have.status(403)

           cleanup(done);
            })
        })
      })
    }),
    describe('POST /api/v1/playlists', () => {
      it('It should return success message with 201 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .post('/api/v1/playlists')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({
              'name': 'playlist_name',
              'description': 'playlist_description',
            })
            .end((error, response) => {
              response.should.have.status(201)
              response.should.be.json
              response.body.should.be.a('object')

              response.body.should.have.property('name', 'playlist_name');
              response.body.should.have.property('description', 'playlist_description');
              response.body.should.have.property('userId', 1);
              response.body.should.have.property('id').not.null;

           cleanup(done);
            })
        })
      })
    }),
    describe('POST /api/v1/playlists', () => {
      it('It should return client error message with 400 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .post('/api/v1/playlists')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({
              'name': 'ww',
              'description': 'ww',
            })
            .end((error, response) => {
              response.should.have.status(400)
              response.should.be.json
              response.body.errors.should.have.lengthOf(2);

           cleanup(done);
            })
        })
      })
    }),
    describe('PUT /api/v1/playlists/:id', () => {
      it('It should return success message with 201 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .put('/api/v1/playlists/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({
              'name': 'updated_name',
            })
            .end((error, response) => {
              response.should.have.status(201)
              response.should.be.json
              response.body.should.be.a('object')

              response.body.should.have.property('name', 'updated_name');
              response.body.should.have.property('description', 'test_description');
              response.body.should.have.property('userId', 1);
              response.body.should.have.property('id').not.null;

           cleanup(done);
            })
        })
      })
    }),
    describe('PUT /api/v1/playlists/:id', () => {
      it('It should return client error message with 400 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .put('/api/v1/playlists/2')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({
              'name': 'ww'
            })
            .end((error, response) => {
              response.should.have.status(400)
              response.should.be.json
              response.body.errors.should.have.lengthOf(1);

           cleanup(done);
            })
        })
      })
    }),
    describe('PUT /api/v1/playlists/:id', () => {
      it('It should return client error message with 403 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .put('/api/v1/playlists/3')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({
              'name': 'ww',
            })
            .end((error, response) => {
              response.should.have.status(403)

              cleanup(done);
            })
        })
      })
    }),
    describe('DELETE /api/v1/playlists/:id', () => {
      it('It should return success message with 204 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .delete('/api/v1/playlists/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .end((error, response) => {
              response.should.have.status(204)

           cleanup(done);
            })
        })
      })
    }),
    describe('DELETE /api/v1/playlists/:id', () => {
      it('It should return client error message with 403 HTTP status for request', (done) => {

        prepareDatabase().then((user) => {

          let jwtToken = generateJWTtoken(user)

          chai.request(server)
            .delete('/api/v1/playlists/3')
            .set('Authorization', `Bearer ${jwtToken}`)
            .end((error, response) => {
              response.should.have.status(403)

           cleanup(done);
            })
        })
      })
    })
})

async function prepareDatabase() {
  let user = await db.User.create({
    id: 1,
    email: 'playlist@test.test',
    password: 'password',
    role: 'user',
    firstName: 'Test',
    lastName: 'Test'
  })

  await db.User.create({
    id: 2,
    email: 'test@test.test',
    password: 'password',
    role: 'user',
    firstName: 'Test2',
    lastName: 'Test2'
  })

  await db.Playlist.create({
    id: 1,
    name: 'test_playlist',
    description: 'test_description',
    userId: user.id
  })

  await db.Playlist.create({
    id: 2,
    name: 'test_playlist2',
    description: 'test_description2',
    userId: user.id
  })

  await db.Playlist.create({
    id: 3,
    name: 'test_playlist3',
    description: 'test_description3',
    userId: 2
  })

  return user;
}

function cleanup(done) {
  models.Playlist.destroy({
    where: {}
  }).then(() => {
    models.User.destroy({
      where: {}
    }).then(() => {
      done();
    });
  });
}
