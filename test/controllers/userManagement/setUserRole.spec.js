import setUserRoleController from '../../../src/controllers/userManagement/setUserRole'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('set user role controller tests', () => {
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
        id: 'mrNobody',
        role: 'nameless employee',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await setUserRoleController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('returns an error if id is not passed to controller', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await setUserRoleController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No ID provided' })
    expect(next).to.not.be.called
  })

  it('returns an error if id is not found in database', async() => {
    const dbReturn = {
      rowNum: 0,
      rows: [],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrNobody',
        role: 'the manager nobody likes'
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await setUserRoleController(req, res, next)

    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called
  })


  it('Refuses to change role of superuser', async() => {
    const dbReturn = {
      rowNum: 0,
      rows: [
        {
          id: 'superuser',
        },
        {
          id: 'Santa',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superuser',
        role: 'not an admin',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await setUserRoleController(req, res, next)

    expect(res.status).to.be.calledWith(403)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Forbidden' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Successfully changes role of user', async() => {
    const dbReturn = {
      rowNum: 0,
      rows: [
        {
          id: 'mrSomebody',
        },
        {
          id: 'Santa',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        role: 'new role',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await setUserRoleController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })

})