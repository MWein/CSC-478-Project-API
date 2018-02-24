/* eslint-disable max-lines */

import {
  editUser,
  getUserRow,
} from '../../../src/db/userManagement'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import editUserController from '../../../src/controllers/userManagement/editUser'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Edit user controller tests', () => {
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
        id: 'mrNobody',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
  })


  it('returns an error if id is not passed to controller', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No ID provided' })
    expect(next).to.not.be.called
  })

  it('returns an error if id is not found in database', async() => {
    const dbReturn = {
      numRows: 0,
      rows: [],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrNobody',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
  })


  it('Refuses to edit superuser', async() => {
    const dbReturn = {
      numRows: 0,
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
        active: false,
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(403)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Forbidden' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  const dbReturn = {
    numRows: 0,
    rows: [
      {
        id: 'mrSombody',
        f_name: 'Mike',
        l_name: 'Nobody',
        role: 'employee',
        active: false,
        phone: '123456789',
        address: '123 FakeNews Street',
      },
    ],
    error: false,
    errorMsg: '',
  }


  it('Successfully edits user, without changing f_name', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        //f_name: 'Jack',
        l_name: 'Somebody',
        role: 'admin',
        active: true,
        phone: '8675309',
        address: '123 Fake Street',
      },
    }

    const expected = {
      ...request.body,
      f_name: dbReturn.rows[0].f_name,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      dbReturn.rows[0].f_name,
      request.body.l_name,
      request.body.role,
      request.body.active,
      request.body.phone,
      request.body.address
    ))
  })


  it('Successfully edits user, without changing l_name', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        f_name: 'Jack',
        //l_name: 'Somebody',
        role: 'admin',
        active: true,
        phone: '8675309',
        address: '123 Fake Street',
      },
    }

    const expected = {
      ...request.body,
      l_name: dbReturn.rows[0].l_name,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      request.body.f_name,
      dbReturn.rows[0].l_name,
      request.body.role,
      request.body.active,
      request.body.phone,
      request.body.address
    ))
  })


  it('Successfully edits user, without changing role', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        f_name: 'Jack',
        l_name: 'Somebody',
        //role: 'admin',
        active: true,
        phone: '8675309',
        address: '123 Fake Street',
      },
    }

    const expected = {
      ...request.body,
      role: dbReturn.rows[0].role,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      request.body.f_name,
      request.body.l_name,
      dbReturn.rows[0].role,
      request.body.active,
      request.body.phone,
      request.body.address
    ))
  })


  it('Successfully edits user, without changing active', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        f_name: 'Jack',
        l_name: 'Somebody',
        role: 'admin',
        //active: true,
        phone: '8675309',
        address: '123 Fake Street',
      },
    }

    const expected = {
      ...request.body,
      active: dbReturn.rows[0].active,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      request.body.f_name,
      request.body.l_name,
      request.body.role,
      dbReturn.rows[0].active,
      request.body.phone,
      request.body.address
    ))
  })


  it('Successfully edits user, without changing phone', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        f_name: 'Jack',
        l_name: 'Somebody',
        role: 'admin',
        active: true,
        //phone: '8675309',
        address: '123 Fake Street',
      },
    }

    const expected = {
      ...request.body,
      phone: dbReturn.rows[0].phone,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      request.body.f_name,
      request.body.l_name,
      request.body.role,
      request.body.active,
      dbReturn.rows[0].phone,
      request.body.address
    ))
  })

  it('Successfully edits user, without changing address', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        f_name: 'Jack',
        l_name: 'Somebody',
        role: 'admin',
        active: true,
        phone: '8675309',
        //address: '123 Fake Street',
      },
    }

    const expected = {
      ...request.body,
      address: dbReturn.rows[0].address,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      request.body.f_name,
      request.body.l_name,
      request.body.role,
      request.body.active,
      request.body.phone,
      dbReturn.rows[0].address
    ))
  })


  it('Successfully edits user, random mix of things', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'mrSomebody',
        l_name: 'Somebody',
        active: true,
        phone: '8675309',
      },
    }

    const expected = {
      ...request.body,
      address: dbReturn.rows[0].address,
      f_name: dbReturn.rows[0].f_name,
      role: dbReturn.rows[0].role,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editUserController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getUserRow(request.body.id))
    expect(dbStub).to.be.calledWith(editUser(
      request.body.id,
      dbReturn.rows[0].f_name,
      request.body.l_name,
      dbReturn.rows[0].role,
      request.body.active,
      request.body.phone,
      dbReturn.rows[0].address
    ))
  })
})
