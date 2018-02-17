import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import setPasswordController from '../../../src/controllers/userManagement/setPassword'
import sinon from 'sinon'

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
        pin: 'newPin',
      },
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {
      id: 'someUser',
    }

    const next = sinon.spy()

    await setPasswordController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('returns an error if pin is not passed to controller', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {}

    const next = sinon.spy()

    await setPasswordController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No pin provided' })
    expect(next).to.not.be.called
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
        pin: 'my new pin',
      },
    }

    const req = mockReq(request)
    const res = mockRes()

    res.locals.user = {
      id: 'someuser',
    }

    const next = sinon.spy()

    await setPasswordController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })
})
