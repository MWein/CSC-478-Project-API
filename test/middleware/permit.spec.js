import permit from '../../src/middleware/permit'
import sinon from 'sinon'


console.log('REWRITE PERMIT TESTS')

describe('Permit.js test', () => {
  const res = {
    status: () => { return { json: () => {} }},
    json: () => {},
  }

  it('Returns a function that responds with a 401 when given a request with no user, does not call next()', () => {
    const permitFunction = permit('admin')
    
    const req = {
      locals: {

      }
    }

    const statusSpy = sinon.spy(res, 'status')
    const next = sinon.spy()
    
    permitFunction(req, res, next)

    expect(statusSpy.withArgs(401).calledOnce).toEqual(true)
    expect(next.notCalled).toEqual(true)

    statusSpy.restore()
  })


  it('Returns a function that responds with a 401 when given a request with a denied user, does not call next()', () => {
    const permitFunction = permit('admin')
    
    const req = {
      locals: {
        user: {
          role: 'some other role',
        },
      },
    }

    const statusSpy = sinon.spy(res, 'status')
    const next = sinon.spy()
    
    permitFunction(req, res, next)

    expect(statusSpy.withArgs(401).calledOnce).toEqual(true)
    expect(next.notCalled).toEqual(true)

    statusSpy.restore()
  })


  it('Returns a function that responds with a 401 when given a request with a denied user and multiple possibilities, does not call next()', () => {
    const permitFunction = permit('manager', 'employee')
    
    const req = {
      locals: {
        user: {
          role: 'that guy, Fred, who steals from the cash register and thinks I dont know'
        }
      }
    }

    const statusSpy = sinon.spy(res, 'status')
    const next = sinon.spy()
    
    permitFunction(req, res, next)

    expect(statusSpy.withArgs(401).calledOnce).toEqual(true)
    expect(next.notCalled).toEqual(true)

    statusSpy.restore()
  })


  it('Returns a function that calls next() with proper single permission', () => {
    const permitFunction = permit('admin')
    
    const req = {
      locals: {
        user: {
          role: 'admin'
        }
      }
    }

    const statusSpy = sinon.spy(res, 'status')
    const next = sinon.spy()
    
    permitFunction(req, res, next)

    expect(statusSpy.notCalled).toEqual(true)
    expect(next.called).toEqual(true)

    statusSpy.restore()
  })


  it('Returns a function that calls next() with proper multiple permission', () => {
    const permitFunction = permit(['admin', 'some guy'])
    
    const req = {
      locals: {
        user: {
          role: 'some guy'
        }
      }
    }

    console.log(req.locals.user.role)

    const statusSpy = sinon.spy(res, 'status')
    const next = sinon.spy()
    
    permitFunction(req, res, next)

    expect(statusSpy.notCalled).toEqual(true)
    expect(next.called).toEqual(true)

    statusSpy.restore()
  })

})
