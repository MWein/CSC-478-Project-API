import {
  allMovies,
  getMovieRowTitle,
  getMovieRowUPC,
} from '../../../src/db/movieManagement'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import getAllMoviesController from '../../../src/controllers/movieManagement/allMovies'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('get all movies controller tests', () => {
  let dbStub

  afterEach(() => {
    dbStub.restore()
  })

  it('Responds properly to database error', async() => {
    const dbReturn = {
      rowNum: 0,
      rows: [],
      error: true,
      errorMsg: 'Some database error',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '232423434242',
        title: 'V for Vendetta',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllMoviesController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(getMovieRowUPC(request.body.upc))
  })

  it('Successfully returns all movies without UPC or title filters', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          upc: '245345345534',
          title: 'Fast and Furious 42',
        },
        {
          upc: '889443493345',
          title: 'Pulp Fiction',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllMoviesController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(dbReturn)
    expect(next).to.be.called
    expect(dbStub).to.be.calledWith(allMovies())
  })

  it('Successfully returns all movies with a UPC filter', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        {
          upc: '889443493345',
          title: 'Pulp Fiction',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '889443493345',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllMoviesController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(dbReturn)
    expect(next).to.be.called
    expect(dbStub).to.be.calledWith(getMovieRowUPC(request.body.upc))
  })

  it('Successfully returns all movies with a title filter', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        {
          upc: '245345345534',
          title: 'Fast and Furious 42',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        title: 'Fast and Furious 42',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllMoviesController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(dbReturn)
    expect(next).to.be.called
    expect(dbStub).to.be.calledWith(getMovieRowTitle(request.body.title))
  })

  it('Successfully returns all movies with a upc and title filter', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        {
          upc: '245345345534',
          title: 'Fast and Furious 42',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '245345345534',
        title: 'Fast and Furious 42',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllMoviesController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(dbReturn)
    expect(next).to.be.called
    expect(dbStub).to.be.calledWith(getMovieRowUPC(request.body.upc))
  })
})
