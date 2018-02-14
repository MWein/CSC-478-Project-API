import deleteUserController from '../../src/controllers/deleteUser'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('delete user controller tests', () => {

  it('returns an error if id is not passed to controller', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await deleteUserController(req, res, next)

    expect(res.status).to.be.calledWith(500)
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

    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrNobody',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await deleteUserController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called

    dbStub.restore()
  })


  it('returns an error if id is not found in database', async() => {
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

    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
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

    dbStub.restore()
  })


})