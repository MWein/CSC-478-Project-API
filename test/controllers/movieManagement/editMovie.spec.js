/* eslint-disable max-lines */

import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import editMovieController from '../../../src/controllers/movieManagement/editMovie'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Edit movie controller test', () => {
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
        upc: 'someUPC',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editMovieController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('returns an error if upc is not passed to controller', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editMovieController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No UPC provided' })
    expect(next).to.not.be.called
  })

  it('returns an error if upc is not found in database', async() => {
    const dbReturn = {
      rowNum: 0,
      rows: [],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: 'someUPC',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editMovieController(req, res, next)

    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Movie not found' })
    expect(next).to.not.be.called
  })


  const dbReturn = {
    rowNum: 0,
    rows: [
      {
        upc: '654987',
        title: 'Black Panther',
        poster: 'nowhereToBeFound',
      },
    ],
    error: false,
    errorMsg: '',
  }


  it('Successfully edits movie, without changing title', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '654987',
        //title: 'Iron Man',
        poster: 'www.ironman.com/poster',
      },
    }

    const expected = {
      ...request.body,
      title: dbReturn.rows[0].title,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editMovieController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })


  it('Successfully edits movie, without changing poster', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        upc: '654987',
        title: 'Iron Man',
        //poster: 'www.ironman.com/poster',
      },
    }

    const expected = {
      ...request.body,
      poster: dbReturn.rows[0].poster,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editMovieController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })
})
