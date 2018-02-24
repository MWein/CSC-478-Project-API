/* eslint-disable max-lines */

import {
  allUserIDs,
  createUser,
} from '../../../src/db/userManagement'
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
      numRows: 0,
      rows: [],
      error: true,
      errorMsg: 'Some database error',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'some jerk',
        pin: 'with some password',
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        role: 'pain in the ass',
        phone: '123456',
        address: '45 3rd Ave',
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
    expect(dbStub).to.be.calledWith(allUserIDs())
  })


  it('Returns error if id not provided', async() => {
    const dbReturn = {
      numRows: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        //id: 'some jerk',
        pin: 'with some password',
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        role: 'pain in the ass',
        phone: '123456',
        address: '45 3rd Ave',
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
      numRows: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'some jerk',
        //pin: 'with some password',
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        role: 'pain in the ass',
        phone: '123456',
        address: '45 3rd Ave',
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
      numRows: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'some jerk',
        pin: 'with some password',
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        //role: 'pain in the ass',
        phone: '123456',
        address: '45 3rd Ave',
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
      numRows: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'Santa',
        pin: 'with some password',
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        role: 'pain in the ass',
        phone: '123456',
        address: '45 3rd Ave',
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
    expect(dbStub).to.be.calledWith(allUserIDs())
  })


  it('Creates the new user in database', async() => {
    const dbReturn = {
      numRows: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'Batman',
        pin: 'SupermanSucks123',
        f_name: 'Bruce',
        l_name: 'Wayne',
        role: 'security',
        phone: '123456',
        address: '45 3rd Ave',
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
    expect(dbStub).to.be.calledWith(allUserIDs())
    expect(dbStub).to.be.calledWith(createUser(
      request.body.id,
      request.body.f_name,
      request.body.l_name,
      request.body.pin,
      request.body.role,
      true,
      request.body.phone,
      request.body.address
    ))
  })

  it('Creates the new user in database, without optional parameters', async() => {
    const dbReturn = {
      numRows: 1,
      rows: [
        { id: 'Santa' },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'Batman',
        pin: 'SupermanSucks123',
        role: 'security',
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
    expect(dbStub).to.be.calledWith(allUserIDs())
    expect(dbStub).to.be.calledWith(createUser(
      request.body.id,
      '',
      '',
      request.body.pin,
      request.body.role,
      true,
      '',
      ''
    ))
  })
})
