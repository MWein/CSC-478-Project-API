import {
  getCopyRow,
  getMovieRowUPC,
} from '../../src/db/movieManagement'
import chai from 'chai'
import db from '../../src/db/index'
import movieByCopyId from '../../src/helpers/movieByCopyId'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('movie by copy ID helper tests', () => {
  let dbStub

  afterEach(() => {
    dbStub.restore()
  })

  it('Responds properly to database error', async() => {
    const dbReturn = {
      numRows: 0,
      rows: [],
      error: true,
      errorMsg: 'Some database error',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const copyId = 'someID'
    const actual = await movieByCopyId(copyId)

    expect(actual).to.deep.equal({ error: true, errorMsg: 'Database error' })
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(getCopyRow(copyId))
  })

  it('Returns error if copyID is not provided', async() => {
    dbStub = sinon.spy(db, 'sqlQuery')

    const actual = await movieByCopyId()

    expect(actual).to.deep.equal({ error: true, errorMsg: 'Copy ID not provided' })
    expect(dbStub).to.not.be.called
  })

  it('Returns error if copy ID is not found in the database', async() => {
    const dbReturn = {
      numRows: 0,
      rows: [],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const copyId = 'ID that doesnt exist'
    const actual = await movieByCopyId(copyId)

    expect(actual).to.deep.equal({ error: true, errorMsg: 'Copy ID does not exist' })
    expect(dbStub.callCount).to.equal(1)
    expect(dbStub).to.be.calledWith(getCopyRow(copyId))
  })

  it('Returns error if copy ID is found but the movie attached to the UPC is not', async() => {
    const copyDbReturn = {
      numRows: 1,
      rows: [
        {
          id: 'some ID',
          upc: '1234',
          active: true,
        },
      ],
      error: false,
      errorMsg: '',
    }

    const movieDbReturn = {
      numRows: 0,
      rows: [],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery')
      .onCall(0).returns(copyDbReturn)
      .onCall(1).returns(movieDbReturn)

    const copyId = 'some ID'
    const actual = await movieByCopyId(copyId)

    expect(actual).to.deep.equal({ error: true, errorMsg: 'UPC does not exist' })
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getCopyRow(copyId))
    expect(dbStub).to.be.calledWith(getMovieRowUPC(copyDbReturn.rows[0].upc))
  })


  it('Successfully returns movie data for copy ID', async() => {
    const copyDbReturn = {
      numRows: 1,
      rows: [
        {
          id: 'some ID',
          upc: '1234',
          active: true,
        },
      ],
      error: false,
      errorMsg: '',
    }

    const movieDbReturn = {
      numRows: 1,
      rows: [
        {
          upc: '1234',
          title: 'Bruce Almighty',
          poster: 'www.IAmBruceAlmighty.com/poster',
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery')
      .onCall(0).returns(copyDbReturn)
      .onCall(1).returns(movieDbReturn)

    const copyId = 'some ID'
    const actual = await movieByCopyId(copyId)

    const expected = {
      error: false,
      errorMsg: '',
      copyId,
      ...movieDbReturn.rows[0],
    }

    expect(actual).to.deep.equal(expected)
    expect(dbStub.callCount).to.equal(2)
    expect(dbStub).to.be.calledWith(getCopyRow(copyId))
    expect(dbStub).to.be.calledWith(getMovieRowUPC(copyDbReturn.rows[0].upc))
  })
})
