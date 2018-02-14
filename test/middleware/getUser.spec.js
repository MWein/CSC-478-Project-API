import getUser from '../../src/middleware/getUser'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


const dbReturn = {
  rowNum: 2,
    rows: [
      {
        id: 'the_real_batman',
        role: 'admin',
        token: 'fffffffff',
        timestamp: 'January 1, 4000'
      },
      {
        id: 'batman2',
        role: 'employee',
        token: 'ddddddddd',
        timestamp: 'January 1, 1999',
      },
      {
        id: 'batman',
        role: 'employee',
        token: 'ttttttttt',
        timestamp: '',
      },
    ],
    error: false,
    errorMsg: null,
}


describe('getUser middleware tests', () => {

  it('returns error if token is not provided', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getUser(req, res, next)

    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No token provided' })
    expect(next).to.not.be.called
  })


  it('returns error if token does not exist in the table', async() => {
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)
    
    const request = {
      body: {
        token: 'someinvalidtoken',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getUser(req, res, next)

    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called

    dbStub.restore()
  })

  it('returns error if token exists but the timestamp is empty string', async() => {
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)
    
    const request = {
      body: {
        token: 'ttttttttt',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getUser(req, res, next)

    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Session timeout' })
    expect(next).to.not.be.called

    dbStub.restore()
  })
  
  it('returns error if token exists but the timestamp is expired', async() => {
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)
    
    const request = {
      body: {
        token: 'ddddddddd',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getUser(req, res, next)

    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Session timeout' })
    expect(dbStub.callCount).to.equal(2)
    expect(next).to.not.be.called

    dbStub.restore()
  })


  it('returns role if token exists and the timestamp is not expired', async() => {
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)
    
    const request = {
      body: {
        token: 'fffffffff',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getUser(req, res, next)
    
    const user = res.locals.user

    expect(user).to.equal(dbReturn.rows[0])
    expect(next).to.be.called

    // One for allUsers call
    // One for setting key and timestamp
    expect(dbStub.callCount).to.equal(2)

    dbStub.restore()
  })



})
