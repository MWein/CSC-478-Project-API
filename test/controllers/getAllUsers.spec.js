import getAllUsersController from '../../src/controllers/getAllUsers'
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


  it('Returns all users in database without token, password, or timestamp', async() => {
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
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          pin: 'passwooooooooooord',
          token: 'asdfasdfdfhfhjhjk',
          timestamp: 'January 21, 2018',
          role: 'employee',
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
        },
        {
          id: 'Santa',
          f_name: 'Chris',
          l_name: 'Kringle',
          role: 'employee',
        },
      ],
      error: dbReturn.error,
      errorMsg: dbReturn.errorMsg,
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    await getAllUsersController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.send).to.be.calledWith(expected)
    expect(next).to.be.called

    expect(dbStub.callCount).to.equal(1)
  })

})