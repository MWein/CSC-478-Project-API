import app from '../src/app'
import request from 'supertest'


describe('App.js test', () => {
  it('Responds with 200 and "ok"', done => {
    request(app).get('/status').then(response => {
      expect(response.text).toEqual('ok')
      expect(response.statusCode).toEqual(200)
      done()
    })
  })
})
