/* eslint-disable max-lines */

import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import editCustomerController from '../../../src/controllers/customerManagement/editCustomer'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Edit customer controller test', () => {
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
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editCustomerController(req, res, next)

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

    await editCustomerController(req, res, next)

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
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called
  })


  const dbReturn = {
    rowNum: 0,
    rows: [
      {
        id: '654987',
        f_name: 'Mike',
        l_name: 'Nobody',
        phone: '123456789',
        address: '123 Fake Street',
        active: false,
        email: 'someemail@email.ca',
      },
    ],
    error: false,
    errorMsg: '',
  }


  it('Successfully edits customer, without changing f_name', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        //f_name: 'Jeff',
        l_name: 'Somebody',
        phone: '789456',
        address: '123 Real Street',
        active: true,
        email: 'someemail@email.us',
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

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })


  it('Successfully edits customer, without changing l_name', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        f_name: 'Jeff',
        //l_name: 'Somebody',
        phone: '789456',
        address: '123 Real Street',
        active: true,
        email: 'someemail@email.us',
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

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })


  it('Successfully edits customer, without changing phone', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        f_name: 'Jeff',
        l_name: 'Somebody',
        //phone: '789456',
        address: '123 Real Street',
        active: true,
        email: 'someemail@email.us',
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

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })


  it('Successfully edits customer, without changing address', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        f_name: 'Jeff',
        l_name: 'Somebody',
        phone: '789456',
        //address: '123 Real Street',
        active: true,
        email: 'someemail@email.us',
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

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })


  it('Successfully edits customer, without changing active', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        f_name: 'Jeff',
        l_name: 'Somebody',
        phone: '789456',
        address: '123 Real Street',
        //active: true,
        email: 'someemail@email.us',
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

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })

  it('Successfully edits customer, without changing email', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        f_name: 'Jeff',
        l_name: 'Somebody',
        phone: '789456',
        address: '123 Real Street',
        active: true,
        //email: 'someemail@email.us',
      },
    }

    const expected = {
      ...request.body,
      email: dbReturn.rows[0].email,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })


  it('Successfully edits customer, random mix of things', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: '654987',
        f_name: 'Jeff',
        //l_name: 'Somebody',
        phone: '789456',
        address: '123 Real Street',
        //active: true,
        //email: 'someemail@email.us',
      },
    }

    const expected = {
      ...request.body,
      l_name: dbReturn.rows[0].l_name,
      active: dbReturn.rows[0].active,
      email: dbReturn.rows[0].email,
      error: false,
      errorMsg: '',
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await editCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(2)
  })
})
