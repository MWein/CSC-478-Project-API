import {
  allUsers,
  updateTokenAndTimestampForUser,
} from '../../src/db/userManagement'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'
import logoutController from '../../src/controllers/logout'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('logout controller tests', () => {
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

    const req = mockReq()
    const res = mockRes()

    res.locals.user = {
      id: 'hello',
    }

    const next = sinon.spy()

    await logoutController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(allUsers())
  })


  it('Returns user not found error when no id is sent in body', async() => {
    const req = mockReq()
    const res = mockRes()

    res.locals.user = {}

    const next = sinon.spy()

    await logoutController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No ID provided' })
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

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const req = mockReq()
    const res = mockRes()

    res.locals.user = {
      id: 'superman',
    }

    const next = sinon.spy()

    await logoutController(req, res, next)

    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next.called).to.equal(false)
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(allUsers())
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

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const req = mockReq()
    const res = mockRes()

    res.locals.user = {
      id: 'superman',
    }

    const next = sinon.spy()

    await logoutController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next.called).to.equal(true)
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(allUsers())
    expect(dbStub).to.be.calledWith(updateTokenAndTimestampForUser(res.locals.user.id, '', ''))
  })
})
