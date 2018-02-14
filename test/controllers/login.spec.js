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
  it('generateUniqueKey generates a unique key', () => {
    const mockKeys = [
      'ghKjfdUkfj',
      'oPfjdkslaj',
      'hYkkdhsLui',
    ]
    const actual = generateUniqueKey(mockKeys)

    expect(mockKeys.includes(actual)).to.equal(false)
  })

  it('generateUniqueKey does not create the same key in consequtive calls', () => {
    const mockKeys = [
      'ghKjfdUkfj',
      'oPfjdkslaj',
      'hYkkdhsLui',
    ]
    const first = generateUniqueKey(mockKeys)
    const second = generateUniqueKey([...mockKeys, first])
    const third = generateUniqueKey([...mockKeys, first, second])

    expect(first).not.to.equal(second)
    expect(first).not.to.equal(third)
    expect(second).not.to.equal(third)
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
  
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Invalid credentials' })
    expect(next.called).to.equal(false)
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
  
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Invalid credentials' })
    expect(next.called).to.equal(false)
  })

  it('Returns invalid if id does not exist in database', async() => {
    const dbReturn = {
      rowNum: 2,
        rows: [
          {
            id: 'A',
          },
          {
            id: 'B',
          },
        ],
        error: false,
        errorMsg: null,
    }
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

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
  
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Invalid credentials' })
    expect(next.called).to.equal(false)

    dbStub.restore()
  })

  it('Returns invalid if pin does not match database', async() => {
    const dbReturn = {
      rowNum: 2,
        rows: [
          {
            id: 'superman',
            pin: 'password',
          },
          {
            id: 'batman',
            pin: 'fuzzylotus6893'
          },
        ],
        error: false,
        errorMsg: null,
    }
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

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
  
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Invalid credentials' })
    expect(next.called).to.equal(false)

    dbStub.restore()
  })

  it('Returns JSON of user (without password) including key', async() => {
    const thisUser = {
      id: 'batman',
      pin: 'fuzzylotus6893',
      f_name: 'Jerry',
      l_name: 'Who cares',
      role: 'employee',
      token: '',
      timestamp: '',
    }
    
    const dbReturn = {
      rowNum: 2,
        rows: [
          {
            id: 'superman',
            pin: 'password',
          },
          {
            ...thisUser,
          },
        ],
        error: false,
        errorMsg: null,
    }
    const dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const genUniqTokenStub = sinon.stub(genUniqKey, 'generateUniqueKey').returns('hello')

    const request = {
      body: {
        id: 'batman',
        pin: 'fuzzylotus6893',
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
    expect(next.called).to.equal(true)

    // One for allUsers call
    // One for setting key and timestamp
    expect(dbStub.callCount).to.equal(2)

    dbStub.restore()
    genUniqTokenStub.restore()
  })

})
