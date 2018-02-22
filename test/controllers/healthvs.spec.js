import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db'
import healthController from '../../src/controllers/healthv2'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Health V2 test', () => {
  let dbStub

  afterEach(() => {
    dbStub.restore()
  })

  const noErrorsReturn = {
    error: false,
    errorMsg: '',
  }


  it('Successfully returns health of API if all tables exist', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns({ error: false, errorMsg: '' })

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    await healthController(req, res, next)

    expect(dbStub.callCount).to.equal(4)
    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({
      customersDatabase: { error: false, errorMsg: '' },
      moviesDatabase: { error: false, errorMsg: '' },
      usersDatabase: { error: false, errorMsg: '' },
      error: false,
    })
    expect(next).to.be.called
  })


  it('Successfully creates all tables if they dont already exist', async() => {
    dbStub = sinon.stub(db, 'sqlQuery')
      .onCall(0).returns({ error: true, errorMsg: 'relation "users" does not exist' })
      .onCall(1).returns(noErrorsReturn) // Create users table
      .onCall(3).returns(noErrorsReturn) // Create superuser
      .onCall(4).returns({ error: true, errorMsg: 'relation "customers" does not exist' })
      .onCall(5).returns(noErrorsReturn) // Create customers table
      .onCall(6).returns({ error: true, errorMsg: 'relation "movies" does not exist' })
      .onCall(7).returns(noErrorsReturn) // Create movies table

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    await healthController(req, res, next)

    expect(dbStub.callCount).to.equal(8)
    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith({
      customersDatabase: { error: false, errorMsg: '' },
      moviesDatabase: { error: false, errorMsg: '' },
      usersDatabase: { error: false, errorMsg: '' },
      error: false,
    })
    expect(next).to.be.called
  })


  // it('Successfully creates user table if it does not exist', () => {  
  //   const usersTableError = {
  //     error: true,
  //     errorMsg: 'relation "users" does not exist',
  //   }

  //   dbStub = sinon.stub(db, 'sqlQuery')
  //     .onCall(0).returns(usersTableError)
  //     .onCall(1).returns({ error: false, errorMsg: '' })


  // })
})
