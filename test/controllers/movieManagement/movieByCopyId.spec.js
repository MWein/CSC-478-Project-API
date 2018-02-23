import { mockReq, mockRes } from 'sinon-express-mock'
import chai from 'chai'
import db from '../../../src/db/index'
import movieByCopyId from '../../../src/controllers/movieManagement/movieByCopyId'
import sinon from 'sinon'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('create customer controller tests', () => {
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
        copy: '232423434242',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await movieByCopyId(req, res, next)

    expect(res.status).to.be.calledWith(500)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Database error' })
    expect(next).to.not.be.called

    expect(dbStub.callCount).to.equal(1)
  })


  it('Returns error if copy is not passed', async() => {
    const request = {
      body: {},
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await movieByCopyId(req, res, next)

    expect(res.status).to.be.calledWith(449)
    expect(res.json).to.be.calledWith({ error: true, errorMsg: 'Copy ID not provided' })
    expect(next).to.not.be.called
  })


  const dbReturn = {
    rowNum: 2,
    rows: [
      {
        upc: '245345345534',
        title: 'Fast and Furious 42',
        poster_loc: 'www.fasterandfuriouser.com/poster',
        copies: [
          '123456',
          '987654',
        ],
      },
      {
        upc: '23424342342343242343',
        title: 'Fast and Furious 47',
        poster_loc: 'www.fasterandfuriouser7.com/poster',
        copies: [
          '852123',
          '789456',
        ],
      },
      {
        upc: '888888888888888',
        title: 'Star Wars: Episode 94',
        poster_loc: 'www.anotherstarwarsmovie.com/poster',
        copies: [
          '456456',
          '123456',
        ],
      },
      {
        upc: '77777777777',
        title: 'Pulp Fiction',
        poster_loc: 'www.thepf.com/poster',
        copies: [
          '777777',
          '222222',
        ],
      },
    ],
    error: false,
    errorMsg: '',
  }


  it('Successfully returns the movie with copy id', async() => {
    const expected = {
      movies: [
        {
          upc: '77777777777',
          title: 'Pulp Fiction',
          poster_loc: 'www.thepf.com/poster',
          copies: [
            '777777',
            '222222',
          ],
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        copy: '222222',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await movieByCopyId(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
  })


  it('Successfully returns the movie with copy id, again', async() => {
    const expected = {
      movies: [
        {
          upc: '23424342342343242343',
          title: 'Fast and Furious 47',
          poster_loc: 'www.fasterandfuriouser7.com/poster',
          copies: [
            '852123',
            '789456',
          ],
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        copy: '852123',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await movieByCopyId(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
  })


  it('Successfully returns multiple movies with the same copy id', async() => {
    const expected = {
      movies: [
        {
          upc: '245345345534',
          title: 'Fast and Furious 42',
          poster_loc: 'www.fasterandfuriouser.com/poster',
          copies: [
            '123456',
            '987654',
          ],
        },
        {
          upc: '888888888888888',
          title: 'Star Wars: Episode 94',
          poster_loc: 'www.anotherstarwarsmovie.com/poster',
          copies: [
            '456456',
            '123456',
          ],
        },
      ],
      error: false,
      errorMsg: '',
    }

    dbStub = sinon.stub(db, 'sqlQuery').returns(dbReturn)

    const request = {
      body: {
        copy: '123456',
      },
    }

    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    await movieByCopyId(req, res, next)

    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be.calledWith(expected)
    expect(next).to.be.called
  })
})
