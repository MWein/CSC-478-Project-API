import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import createUserController from '../../../src/controllers/userManagement/createUser'
import db from '../../../src/db/index'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('create user controller tests', () => {
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
        newId: 'some jerk',
        newPin: 'with some password',
        newFName: 'a stupid first name',
        newLName: 'a stupid last name',
        newRole: 'pain in the ass',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createUserController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns error if id not provided', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        //newId: 'some jerk',
        newPin: 'with some password',
        newFName: 'a stupid first name',
        newLName: 'a stupid last name',
        newRole: 'pain in the ass',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createUserController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No ID provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Returns error if pin not provided', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        newId: 'some jerk',
        //newPin: 'with some password',
        newFName: 'a stupid first name',
        newLName: 'a stupid last name',
        newRole: 'pain in the ass',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createUserController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No pin provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })

  it('Returns error if role not provided', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        newId: 'some jerk',
        newPin: 'with some password',
        newFName: 'a stupid first name',
        newLName: 'a stupid last name',
        //newRole: 'pain in the ass',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createUserController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No role provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Returns error if ID already exists in database', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        newId: 'Santa',
        newPin: 'with some password',
        newFName: 'a stupid first name',
        newLName: 'a stupid last name',
        newRole: 'pain in the ass',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createUserController(req, res, next)

    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'ID already exists' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
  })


  it('Creates the new user in database', async() => {
    const dbReturn = {
      rowNum: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        newId: 'Batman',
        newPin: 'SupermanSucks123',
        newFName: 'Bruce',
        newLName: 'Wayne',
        newRole: 'security',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
  })
})
