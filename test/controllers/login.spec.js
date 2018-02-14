import loginController, { generateUniqueKey } from '../../src/controllers/login'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db/index'

chai.use(require('sinon-chai'))
const expect = chai.expect


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
    console.log('finish me')
  })

  it('Returns invalid if pin does not match database', async() => {
    console.log('finish me')
  })

  it('Returns JSON of user (without password) including key', async() => {
    console.log('finish me')
  })

})
