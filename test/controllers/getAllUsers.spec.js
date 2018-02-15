import getAllUsersController from '../../src/controllers/userManagement/getAllUsers'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('get all users controller tests', () => {

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

    await getAllUsersController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns all active users in database without token, password, or timestamp', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'mrSomebody',
          f_name: 'Mister',
          l_name: 'Somebody',
          pin: 'mypassword',
          token: 'asdlkfjasdf',
          timestamp: 'January 21, 2018',
          role: 'admin',
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          pin: 'mypassword',
          token: 'fklklfglkjfgdjlk',
          timestamp: 'January 21, 2018',
          role: 'admin',
          active: true,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          pin: 'passwooooooooooord',
          token: 'asdfasdfdfhfhjhjk',
          timestamp: 'January 21, 2018',
          role: 'employee',
          active: false,
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
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          role: 'admin',
          active: true,
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

    await getAllUsersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns all users, active or not, in database without token, password, or timestamp', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'mrSomebody',
          f_name: 'Mister',
          l_name: 'Somebody',
          pin: 'mypassword',
          token: 'asdlkfjasdf',
          timestamp: 'January 21, 2018',
          role: 'admin',
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          pin: 'mypassword',
          token: 'fklklfglkjfgdjlk',
          timestamp: 'January 21, 2018',
          role: 'admin',
          active: true,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          pin: 'passwooooooooooord',
          token: 'asdfasdfdfhfhjhjk',
          timestamp: 'January 21, 2018',
          role: 'employee',
          active: false,
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
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          role: 'admin',
          active: true,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          role: 'employee',
          active: false,
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

    await getAllUsersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns all users, active or not, in database without token, password, or timestamp if excludeInactive is not sent', async() => {
    const dbReturn = {
      rowNum: 2,
      rows: [
        {
          id: 'mrSomebody',
          f_name: 'Mister',
          l_name: 'Somebody',
          pin: 'mypassword',
          token: 'asdlkfjasdf',
          timestamp: 'January 21, 2018',
          role: 'admin',
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          pin: 'mypassword',
          token: 'fklklfglkjfgdjlk',
          timestamp: 'January 21, 2018',
          role: 'admin',
          active: true,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          pin: 'passwooooooooooord',
          token: 'asdfasdfdfhfhjhjk',
          timestamp: 'January 21, 2018',
          role: 'employee',
          active: false,
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
          active: true,
        },
        {
          id: 'jackspar',
          f_name: 'Jack',
          l_name: 'Sparrow',
          role: 'admin',
          active: true,
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          role: 'employee',
          active: false,
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

    await getAllUsersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  

})