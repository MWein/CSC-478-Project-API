/* eslint-disable max-lines */

import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import getAllCustomersController from '../../../src/controllers/customerManagement/getAllCustomers'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('get all customers controller tests', () => {
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
    const next = sinon.spy()

    await getAllCustomersController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  const dbReturn = {
    rowNum: 2,
    rows: [
      {
        id: '456789',
        f_name: 'Mister',
        l_name: 'Somebody',
        active: true,
        phone: '1234',
        address: '123 Fake Street',
        email: 'someemail@email.com',
      },
      {
        id: '852147',
        f_name: 'Mister',
        l_name: 'Nobody',
        active: true,
        phone: '8675309',
        address: '321 Elm Street',
        email: 'someEmail@pornhub.com',
      },
      {
        id: '124578',
        f_name: 'Santa',
        l_name: 'Clause',
        active: false,
        phone: '963258',
        address: '12 North Pole',
        email: 'santa@flatearthsociety.com',
      },
    ],
    error: false,
    errorMsg: '',
  }


  it('Returns all active customers in database', async() => {
    const expected = {
      rowNum: dbReturn.rowNum,
      rows: [
        {
          id: '456789',
          f_name: 'Mister',
          l_name: 'Somebody',
          active: true,
          phone: '1234',
          address: '123 Fake Street',
          email: 'someemail@email.com',
        },
        {
          id: '852147',
          f_name: 'Mister',
          l_name: 'Nobody',
          active: true,
          phone: '8675309',
          address: '321 Elm Street',
          email: 'someEmail@pornhub.com',
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        excludeInactive: true,
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllCustomersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns all users, active or not', async() => {
    const expected = {
      rowNum: dbReturn.rowNum,
      rows: [
        {
          id: '456789',
          f_name: 'Mister',
          l_name: 'Somebody',
          active: true,
          phone: '1234',
          address: '123 Fake Street',
          email: 'someemail@email.com',
        },
        {
          id: '852147',
          f_name: 'Mister',
          l_name: 'Nobody',
          active: true,
          phone: '8675309',
          address: '321 Elm Street',
          email: 'someEmail@pornhub.com',
        },
        {
          id: '124578',
          f_name: 'Santa',
          l_name: 'Clause',
          active: false,
          phone: '963258',
          address: '12 North Pole',
          email: 'santa@flatearthsociety.com',
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        excludeInactive: false,
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllCustomersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns all customers, active or not if excludeInactive is not sent', async() => {
    const expected = {
      rowNum: dbReturn.rowNum,
      rows: [
        {
          id: '456789',
          f_name: 'Mister',
          l_name: 'Somebody',
          active: true,
          phone: '1234',
          address: '123 Fake Street',
          email: 'someemail@email.com',
        },
        {
          id: '852147',
          f_name: 'Mister',
          l_name: 'Nobody',
          active: true,
          phone: '8675309',
          address: '321 Elm Street',
          email: 'someEmail@pornhub.com',
        },
        {
          id: '124578',
          f_name: 'Santa',
          l_name: 'Clause',
          active: false,
          phone: '963258',
          address: '12 North Pole',
          email: 'santa@flatearthsociety.com',
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllCustomersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })

  it('Returns all active users, with excludeInactive as string "true"', async() => {
    const expected = {
      rowNum: dbReturn.rowNum,
      rows: [
        {
          id: '456789',
          f_name: 'Mister',
          l_name: 'Somebody',
          active: true,
          phone: '1234',
          address: '123 Fake Street',
          email: 'someemail@email.com',
        },
        {
          id: '852147',
          f_name: 'Mister',
          l_name: 'Nobody',
          active: true,
          phone: '8675309',
          address: '321 Elm Street',
          email: 'someEmail@pornhub.com',
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        excludeInactive: 'true',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllCustomersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns customers by phone number', async() => {
    const expected = {
      rowNum: dbReturn.rowNum,
      rows: [
        {
          id: '852147',
          f_name: 'Mister',
          l_name: 'Nobody',
          active: true,
          phone: '8675309',
          address: '321 Elm Street',
          email: 'someEmail@pornhub.com',
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        phone: '8675309',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await getAllCustomersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })
})
