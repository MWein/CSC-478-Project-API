import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import sinon from 'sinon'
import smokeTestController from '../../src/controllers/smokeTest'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Smoketest... test', () => {
  it('Returns 200 and ok', () => {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    smokeTestController(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.send).to.be.calledWith('ok')
    expect(next.calledOnce).to.equal(true)
  })
})
