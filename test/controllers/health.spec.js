import healthController,
{
  checkForCustomersTable,
  checkForMoviesTable,
  checkForUsersTable,
} from '../../src/controllers/health'
import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../src/db'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('Health tests', () => {
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
      customersDatabase: noErrorsReturn,
      moviesDatabase: noErrorsReturn,
      usersDatabase: noErrorsReturn,
      error: false,
    })
    expect(next).to.be.called
  })


  it('Returns errors if database is not reachable', async() => {
    dbStub = sinon.stub(db, 'sqlQuery').returns({ error: true, errorMsg: '' })

    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()

    await healthController(req, res, next)

    expect(dbStub.callCount).to.equal(4)
    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({
      customersDatabase: { error: true, errorMsg: 'Could not reach customers table' },
      moviesDatabase: { error: true, errorMsg: 'Could not reach movies table' },
      usersDatabase: { error: true, errorMsg: 'Could not reach users table' },
      error: true,
    })
    expect(next).to.be.called
  })


  describe('checkForUsersTable tests', () => {
    it('Returns an error if table is unreachable', async() => {
      dbStub = sinon.stub(db, 'sqlQuery').returns({ error: true, errorMsg: '' })

      const actual = await checkForUsersTable()

      expect(dbStub.callCount).to.equal(1)
      expect(actual).to.deep.equal({ error: true, errorMsg: 'Could not reach users table' })
    })

    it('Throws error if table does not exist and creation fails', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: true, errorMsg: 'users table does not exist' })
        .onCall(1).returns({ error: true, errorMsg: '' })

      const actual = await checkForUsersTable()

      expect(dbStub.callCount).to.equal(2)
      expect(actual).to.deep.equal({ error: true, errorMsg: 'Could not create users table' })
    })

    it('Returns success if table does not exist but is successfully created', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: true, errorMsg: 'users table does not exist' })
        .onCall(1).returns({ error: false, errorMsg: '' })

      const actual = await checkForUsersTable()

      expect(dbStub.callCount).to.equal(2)
      expect(actual).to.deep.equal({ error: false, errorMsg: '' })
    })

    it('Returns success if table exists', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: false, errorMsg: '' })

      const actual = await checkForUsersTable()

      expect(dbStub.callCount).to.equal(1)
      expect(actual).to.deep.equal({ error: false, errorMsg: '' })
    })
  })


  describe('checkForCustomersTable tests', () => {
    it('Returns an error if table is unreachable', async() => {
      dbStub = sinon.stub(db, 'sqlQuery').returns({ error: true, errorMsg: '' })

      const actual = await checkForCustomersTable()

      expect(dbStub.callCount).to.equal(1)
      expect(actual).to.deep.equal({ error: true, errorMsg: 'Could not reach customers table' })
    })

    it('Throws error if table does not exist and creation fails', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: true, errorMsg: 'users table does not exist' })
        .onCall(1).returns({ error: true, errorMsg: '' })

      const actual = await checkForCustomersTable()

      expect(dbStub.callCount).to.equal(2)
      expect(actual).to.deep.equal({ error: true, errorMsg: 'Could not create customers table' })
    })

    it('Returns success if table does not exist but is successfully created', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: true, errorMsg: 'customers table does not exist' })
        .onCall(1).returns({ error: false, errorMsg: '' })

      const actual = await checkForCustomersTable()

      expect(dbStub.callCount).to.equal(2)
      expect(actual).to.deep.equal({ error: false, errorMsg: '' })
    })

    it('Returns success if table exists', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: false, errorMsg: '' })

      const actual = await checkForCustomersTable()

      expect(dbStub.callCount).to.equal(1)
      expect(actual).to.deep.equal({ error: false, errorMsg: '' })
    })
  })


  describe('checkForMoviesTable tests', () => {
    it('Returns an error if table is unreachable', async() => {
      dbStub = sinon.stub(db, 'sqlQuery').returns({ error: true, errorMsg: '' })

      const actual = await checkForMoviesTable()

      expect(dbStub.callCount).to.equal(1)
      expect(actual).to.deep.equal({ error: true, errorMsg: 'Could not reach movies table' })
    })

    it('Throws error if table does not exist and creation fails', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: true, errorMsg: 'users table does not exist' })
        .onCall(1).returns({ error: true, errorMsg: '' })

      const actual = await checkForMoviesTable()

      expect(dbStub.callCount).to.equal(2)
      expect(actual).to.deep.equal({ error: true, errorMsg: 'Could not create movies table' })
    })

    it('Returns success if table does not exist but is successfully created', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: true, errorMsg: 'movies table does not exist' })
        .onCall(1).returns({ error: false, errorMsg: '' })

      const actual = await checkForMoviesTable()

      expect(dbStub.callCount).to.equal(2)
      expect(actual).to.deep.equal({ error: false, errorMsg: '' })
    })

    it('Returns success if table exists', async() => {
      dbStub = sinon.stub(db, 'sqlQuery')
        .onCall(0).returns({ error: false, errorMsg: '' })

      const actual = await checkForMoviesTable()

      expect(dbStub.callCount).to.equal(1)
      expect(actual).to.deep.equal({ error: false, errorMsg: '' })
    })
  })
})
