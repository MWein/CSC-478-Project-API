import logoutController from '../../src/controllers/logout'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('logout controller tests', () => {


  it('Responds properly to database error', async() => {
    const dbReturn = {
      rowNum: 0,
      rows: [],
      error: true,
      errorMsg: 'Some database error',
    }

    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'hello',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await logoutController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)

    dbStub.restore()
  })


  it('Returns user not found error when no id is sent in body', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await logoutController(req, res, next)
  
    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next.called).to.equal(false)
  })


  it('Retuns user not found when id is not found in db', async() => {
    const dbReturn = {
      rowNum: 2,
        rows: [
          {
            id: 'A',
          },
          {
            id: 'B',
          },
        ],
        error: false,
        errorMsg: null,
    }
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await logoutController(req, res, next)
  
    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next.called).to.equal(false)

    dbStub.restore()
  })


  it('Returns "Logout successful" when id is found', async() => {
    const dbReturn = {
      rowNum: 2,
        rows: [
          {
            id: 'A',
          },
          {
            id: 'superman',
          },
        ],
        error: false,
        errorMsg: null,
    }
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await logoutController(req, res, next)
  
    expect(res.status).to.be.calledWith(200)
    expect(res.send).to.be.calledWith('success')
    expect(next.called).to.equal(true)

    dbStub.restore()
  })
})