import loginController from '../../src/controllers/login'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'
import sinon from 'sinon'
import genUniqKey from '../../src/helpers/generateUniqueKey'

chai.use(require('sinon-chai'))
const expect = chai.expect

const generateUniqueKey = genUniqKey.generateUniqueKey


describe('Login controller tests', () => {

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
        id: 'hello',
        pin: 'myp@ssw0rd',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await loginController(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })



  it('Returns invalid if id is missing from request', async() => {
    const request = {
      body: {
        pin: 'myp@ssw0rd',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await loginController(req, res, next)
  
    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No ID provided' })
    expect(next).to.not.be.called
  })

  it('Returns invalid if pin is missing from request', async() => {
    const request = {
      body: {
        id: 'batman',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await loginController(req, res, next)
  
    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'No pin provided' })
    expect(next).to.not.be.called
  })

  
  const dbReturn = {
    rowNum: 2,
      rows: [
        {
          id: 'superman',
          pin: 'password',
        },
        {
          id: 'batman',
          pin: 'fuzzylotus6893',
          f_name: 'Jerry',
          l_name: 'Who cares',
          role: 'employee',
          token: '',
          timestamp: '',
        },
      ],
      error: false,
      errorMsg: null,
  }



  it('Returns invalid if id does not exist in database', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'aquaman',
        pin: 'paSSWoRd',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await loginController(req, res, next)
  
    expect(res.status).to.be.calledWith(404)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'User not found' })
    expect(next).to.not.be.called

    
  })

  it('Returns invalid if pin does not match database', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        id: 'superman',
        pin: 'paSSWoRd',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await loginController(req, res, next)
  
    expect(res.status).to.be.calledWith(401)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Invalid credentials' })
    expect(next).to.not.be.called
  })

  it('Returns JSON of user (without password) including key', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const genUniqTokenStub = sinon.stub(genUniqKey, 'generateUniqueKey').returns('hello')

    const thisUser = dbReturn.rows[1]

    const request = {
      body: {
        id: thisUser.id,
        pin: thisUser.pin,
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
  
    await loginController(req, res, next)

    const expected = {
      id: thisUser.id,
      f_name: thisUser.f_name,
      l_name: thisUser.l_name,
      role: thisUser.role,
      token: genUniqTokenStub.returnValues[0],
      error: false,
      errorMsg: '',
    }

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called

    // One for allUsers call
    // One for setting key and timestamp
    expect(dbStub.callCount).to.equal(2)

    genUniqTokenStub.restore()
  })

})
