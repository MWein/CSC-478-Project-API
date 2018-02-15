import deleteUserController from '../../src/controllers/deleteUser'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('delete user controller tests', () => {
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
        doomedId: 'mrNobody',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await deleteUserController(req, res, next)

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

    await deleteUserController(req, res, next)

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
        doomedId: 'mrNobody',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await deleteUserController(req, res, next)

    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called
  })


  it('Refuses to delete superuser from database', async() => {
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
        doomedId: 'superuser',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await deleteUserController(req, res, next)

    expect(res.status).to.be.calledWith(403)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Forbidden' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })



  it('Successfully deletes user from database', async() => {
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
        doomedId: 'mrSomebody',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await deleteUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.send).to.be.calledWith('success')
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })

})