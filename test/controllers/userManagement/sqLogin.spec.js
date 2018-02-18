/* eslint-disable max-lines */

import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import genUniqKey from '../../../src/helpers/generateUniqueKey'
import sinon from 'sinon'
import sqLoginController from '../../../src/controllers/sqLogin'

chai.use(require('sinon-chai'))
const expect = chai.expect

describe('Login controller tests', () => {
  let dbStub
  let genUniqTokenStub = sinon.stub(genUniqKey, 'generateUniqueKey').returns('hello')

  afterEach(() => {
    dbStub.restore()
    genUniqTokenStub.restore()
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
        id: 'hello',
        answer: 'myAnswer',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(res.status).to.be.calledWith(500)
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns invalid if id is missing from request', async() => {
    const request = {
      body: {
        answer: 'Flat. The earth is flat.',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No ID provided' })
    expect(next).to.not.be.called
  })

  it('Returns invalid if answer is missing from request', async() => {
    const request = {
      body: {
        id: 'batman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No answer provided' })
    expect(next).to.not.be.called
  })


  it('Returns an error if security question is not set', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'superman',
          pin: 'password',
          question: '',
          answer: null,
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superman',
        answer: 'Im actually batman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Security question not set' })
    expect(next).to.not.be.called
  })


  it('Returns an error if security answer is not set', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'superman',
          pin: 'password',
          question: 'Who am I?',
          answer: null,
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superman',
        answer: 'Im actually batman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Security question not set' })
    expect(next).to.not.be.called
  })


  it('Returns an error if security answer provided is incorrect', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'superman',
          pin: 'password',
          question: 'Who am I?',
          answer: 'Im Spiderman',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superman',
        answer: 'Im actually batman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Incorrect answer' })
    expect(next).to.not.be.called
  })


  it('Returns user information if the answer was correct', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'superman',
          pin: 'password',
          f_name: 'Megan',
          l_name: 'Fox',
          role: 'admin',
          question: 'Who am I?',
          answer: 'Im Spiderman',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    genUniqTokenStub = sinon.stub(genUniqKey, 'generateUniqueKey').returns('hello')

    const request = {
      body: {
        id: 'superman',
        answer: 'Im Spiderman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await sqLoginController(req, res, next)

    const thisUser = dbReturn.rows[0]
    const expected = {
      id: thisUser.id,
      f_name: thisUser.f_name,
      l_name: thisUser.l_name,
      role: thisUser.role,
      token: genUniqTokenStub.returnValues[0],
      error: false,
      errorMsg: '',
    }

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })
})
