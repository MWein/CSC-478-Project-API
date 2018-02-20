import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import imdbMovieSearch from '../../../src/controllers/movieManagement/imdbMovieSearch'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect

describe('IMDB search controller tests', () => {
  // NOTE: Other tests not written because I could not find a way to stub network calls
  // Other tests relating to IMDB search can be found in /helpers/imdbResponseParser.spec

  it('Returns error if search string not provided', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await imdbMovieSearch(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No search string provided' })
    expect(next).to.not.be.called
  })
})
