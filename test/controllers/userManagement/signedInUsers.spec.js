/* eslint-disable max-lines */

import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import signedInUsersController from '../../../src/controllers/userManagement/signedInUsers'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('signed in users controller tests', () => {
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

    await signedInUsersController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns all signed in users in database without token, password, or timestamp. Does not return inactive users', async() => {
    const fiveMinutesAgo = new Date() - 300000
    const twentyMinutesAgo = new Date() - 1200000

    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'mrSomebody',
          f_name: 'Mister',
          l_name: 'Somebody',
          pin: 'mypassword',
          token: 'asdlkfjasdf',
          timestamp: new Date(fiveMinutesAgo).toString(),
          role: 'admin',
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          pin: 'mypassword',
          token: 'fklklfglkjfgdjlk',
          timestamp: new Date(twentyMinutesAgo).toString(),
          role: 'admin',
          active: true,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          pin: 'passwooooooooooord',
          token: 'asdfasdfdfhfhjhjk',
          timestamp: new Date(fiveMinutesAgo).toString(),
          role: 'employee',
          active: false,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          pin: 'passwooooooooooord',
          token: '',
          timestamp: new Date(fiveMinutesAgo).toString(),
          role: 'employee',
          active: true,
        },
      ],
      error: false,
      errorMsg: '',
    }

    const expected = {
      rowNum: dbReturn.rowNum,
      rows: [
        {
          id: 'mrSomebody',
          f_name: 'Mister',
          l_name: 'Somebody',
          role: 'admin',
          timestamp: new Date(fiveMinutesAgo).toString(),
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    await signedInUsersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })
})
