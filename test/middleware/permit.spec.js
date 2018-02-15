import permit from '../../src/middleware/permit'
import sinon from 'sinon'
import chai from 'chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Permit.js test', () => {

  it('Returns a function that responds with a 403 when given a request with no user, does not call next()', () => {
    const permitFunction = permit('admin')
    
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    
    permitFunction(req, res, next)

    expect(res.status).to.be.calledWith(403)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Forbidden' })
    expect(next).to.not.be.called
  })


  it('Returns a function that responds with a 403 when given a request with a denied user, does not call next()', () => {
    const permitFunction = permit('admin')

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    res.locals.user = {
      role: 'some other role',
    }

    permitFunction(req, res, next)

    expect(res.status).to.be.calledWith(403)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Forbidden' })
    expect(next).to.not.be.called
  })


  it('Returns a function that responds with a 403 when given a request with a denied user and multiple possibilities, does not call next()', () => {
    const permitFunction = permit('manager', 'employee')

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    res.locals.user = {
      role: 'that guy, Fred, who steals from the cash register and thinks I dont know',
    }
    
    permitFunction(req, res, next)

    expect(res.status).to.be.calledWith(403)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Forbidden' })
    expect(next).to.not.be.called
  })


  it('Returns a function that calls next() with proper single permission', () => {
    const permitFunction = permit('admin')

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    res.locals.user = {
      role: 'admin',
    }
    
    permitFunction(req, res, next)

    expect(res.status).to.not.be.called
    expect(res.json).to.not.be.called
    expect(next).to.be.called
  })


  it('Returns a function that calls next() with proper multiple permission', () => {
    const permitFunction = permit(['admin', 'some guy'])
    
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    res.locals.user = {
      role: 'admin',
    }
    
    permitFunction(req, res, next)

    expect(res.status).to.not.be.called
    expect(res.json).to.not.be.called
    expect(next).to.be.called
  })

})
