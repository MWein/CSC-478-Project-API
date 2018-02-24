/* eslint-disable max-lines */

import {
  allUPCAndCopyIds as allUPCAndCopyIdsQuery,
  createMovie,
  createMovieCopy,
} from '../../../src/db/movieManagement'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import createMovieController from '../../../src/controllers/movieManagement/createMovie'
import db from '../../../src/db/index'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('create movie controller tests', () => {
  let dbStub

  afterEach(() => {
    dbStub.restore()
  })

  it('Responds properly to database error', async() => {
    const dbReturn = {
      numRows: 0,
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

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
  })


  it('Returns error if upc is not provided', async() => {
    const dbReturn = {
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        //upc: '232423434242',
        title: 'V for Vendetta',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No UPC provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Returns error if title is not provided', async() => {
    const dbReturn = {
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '2342423434',
        //title: 'Star Wars Episode 53',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No title provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Returns error UPC already exists in the database', async() => {
    const dbReturn = {
      numRows: 2,
      rows: [
        {
          upc: '245345345534',
        },
        {
          upc: '889443493345',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '889443493345',
        title: 'Star Wars Episode 53',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'UPC already exists' })
    expect(next).to.not.be.called
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
  })

  it('Successfully creates movie without poster location', async() => {
    const dbReturn = {
      numRows: 2,
      rows: [
        {
          upc: '245345345534',
        },
        {
          upc: '889443493345',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
    expect(dbStub).to.be.calledWith(createMovie(request.body.upc, request.body.title, ''))
  })

  it('Successfully creates movie with poster location', async() => {
    const dbReturn = {
      numRows: 2,
      rows: [
        {
          upc: '245345345534',
        },
        {
          upc: '889443493345',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
        poster: 'somewhere.com',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
    expect(dbStub).to.be.calledWith(createMovie(request.body.upc, request.body.title, request.body.poster))
  })


  it('Returns an error if copies is not an array', async() => {
    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
        poster: 'somewhere.com',
        copies: 'not an array',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Copies must be of type "array"' })
    expect(next).to.not.be.called
  })

  it('Returns an error if copies contains an item that is not a string', async() => {
    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
        poster: 'somewhere.com',
        copies: [
          'asldkfjasdl;fj',
          123,
          'sdfdfsfsdfsa',
        ],
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Copies must be an array of strings' })
    expect(next).to.not.be.called
  })


  it('Successfully creates movie with copies', async() => {
    const dbReturn = {
      numRows: 2,
      rows: [
        {
          upc: '245345345534',
        },
        {
          upc: '889443493345',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
        poster: 'somewhere.com',
        copies: [
          'asdfasdfasdf',
          'jfjsdkdlfjfjs',
          'fjgkdla;asldkf',
        ],
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(5)
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
    expect(dbStub).to.be.calledWith(createMovie(request.body.upc, request.body.title, request.body.poster))
    expect(dbStub).to.be.calledWith(createMovieCopy(request.body.copies[0], request.body.upc, true))
    expect(dbStub).to.be.calledWith(createMovieCopy(request.body.copies[1], request.body.upc, true))
    expect(dbStub).to.be.calledWith(createMovieCopy(request.body.copies[2], request.body.upc, true))
  })


  it('Successfully creates movie with copies, filters out duplicate copies', async() => {
    const dbReturn = {
      numRows: 2,
      rows: [
        {
          upc: '245345345534',
        },
        {
          upc: '889443493345',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
        poster: 'somewhere.com',
        copies: [
          'asdfasdfasdf',
          'jfjsdkdlfjfjs',
          'fjgkdla;asldkf',
          'jfjsdkdlfjfjs',
        ],
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(5)
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
    expect(dbStub).to.be.calledWith(createMovie(request.body.upc, request.body.title, request.body.poster))
    expect(dbStub).to.be.calledWith(createMovieCopy(request.body.copies[0], request.body.upc, true))
    expect(dbStub).to.be.calledWith(createMovieCopy(request.body.copies[1], request.body.upc, true))
    expect(dbStub).to.be.calledWith(createMovieCopy(request.body.copies[2], request.body.upc, true))
  })


  it('Returns error if one of the copies is already in the database', async() => {
    const dbReturn = {
      numRows: 1,
      rows: [
        {
          id: 'fjgkdla;asldkf',
          upc: 'asdflkjasdf',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '5464656464564465',
        title: 'Star Wars Episode 53',
        poster: 'somewhere.com',
        copies: [
          'asdfasdfasdf',
          'jfjsdkdlfjfjs',
          'fjgkdla;asldkf',
          'jfjsdkdlfjfjs',
        ],
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createMovieController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Copy ID already exists' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(allUPCAndCopyIdsQuery())
  })
})
