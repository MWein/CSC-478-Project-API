import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import setSecurityQuestionController from '../../../src/controllers/userManagement/setSecurityQuestion'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('set user security question controller tests', () => {
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
        question: 'whats my name?',
        answer: 'FRANCIS!!!',
      },
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {
      id: 'fakeUser',
    }

    const next = sinon.spy()

    await setSecurityQuestionController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns an error if question is not passed to controller', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        {
          id: 'fakeUser',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        answer: 'FRANCIS!!!',
      },
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {
      id: 'fakeUser',
    }

    const next = sinon.spy()

    await setSecurityQuestionController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No question provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })

  it('Returns an error if answer is not passed to controller', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        {
          id: 'fakeUser',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        question: 'Why is the sky blue?',
      },
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {
      id: 'fakeUser',
    }

    const next = sinon.spy()

    await setSecurityQuestionController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No answer provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })

  it('Successfully sets security question and answer', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        {
          id: 'fakeUser',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        question: 'Why is the sky blue?',
        answer: 'Because something something infantry',
      },
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {
      id: 'fakeUser',
    }

    const next = sinon.spy()

    await setSecurityQuestionController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub).to.be.called
  })
})
