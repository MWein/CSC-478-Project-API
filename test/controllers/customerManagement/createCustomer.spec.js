/* eslint-disable max-lines */

import {
  allCustomerIDs,
  createCustomer,
} from '../../../src/db/customerManagement'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import createCustomerController from '../../../src/controllers/customerManagement/createCustomer'
import db from '../../../src/db/index'
import genUniqKey from '../../../src/helpers/generateUniqueKey'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('create customer controller tests', () => {
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
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        phone: '123456',
        address: '45 3rd Ave',
        email: 'dirtytrucker@pornhub.com',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(allCustomerIDs())
  })


  it('Returns error if f_name is not provided', async() => {
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
        //f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        phone: '123456',
        address: '45 3rd Ave',
        email: 'dirtytrucker@pornhub.com',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No first name provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Returns error if l_name is not provided', async() => {
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
        f_name: 'a stupid first name',
        //l_name: 'a stupid last name',
        phone: '123456',
        address: '45 3rd Ave',
        email: 'dirtytrucker@pornhub.com',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No last name provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })


  it('Returns error if phone is not provided', async() => {
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
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        //phone: '123456',
        address: '45 3rd Ave',
        email: 'dirtytrucker@pornhub.com',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No phone number provided' })
    expect(next).to.not.be.called
    expect(dbStub).to.not.be.called
  })

  it('Creates the new customer in database', async() => {
    const genUniqTokenStub = sinon.stub(genUniqKey, 'generateUniqueKey').returns('hello')

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
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        phone: '123456',
        address: '45 3rd Ave',
        email: 'dirtytrucker@pornhub.com',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ id: 'hello', error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(allCustomerIDs())
    expect(dbStub).to.be.calledWith(createCustomer(
      'hello', request.body.f_name,
      request.body.l_name,
      request.body.phone,
      request.body.address,
      true,
      request.body.email
    ))

    genUniqTokenStub.restore()
  })

  it('Creates the new customer in database, without optional parameters', async() => {
    const genUniqTokenStub = sinon.stub(genUniqKey, 'generateUniqueKey').returns('hello')

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
        f_name: 'a stupid first name',
        l_name: 'a stupid last name',
        phone: '123456',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await createCustomerController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({ id: 'hello', error: false, errorMsg: '' })
    expect(next).to.be.called
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(allCustomerIDs())
    expect(dbStub).to.be.calledWith(createCustomer('hello', request.body.f_name, request.body.l_name, request.body.phone, '', true, ''))

    genUniqTokenStub.restore()
  })
})
