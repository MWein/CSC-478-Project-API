import app from '../../src/app'
import request from 'supertest'
import loginActions, { generateUniqueKey } from '../../src/controllers/login'
import sinon from 'sinon'


describe('Login controller tests', () => {
  it('generateUniqueKey generates a unique key', () => {
    const mockKeys = [
      'ghKjfdUkfj',
      'oPfjdkslaj',
      'hYkkdhsLui',
    ]
    const actual = generateUniqueKey(mockKeys)

    expect(mockKeys.includes(actual)).toEqual(false)
  })

  it('generateUniqueKey does not create the same key in consequtive calls', () => {
    const mockKeys = [
      'ghKjfdUkfj',
      'oPfjdkslaj',
      'hYkkdhsLui',
    ]
    const first = generateUniqueKey(mockKeys)
    const second = generateUniqueKey(mockKeys)
    const third = generateUniqueKey(mockKeys)

    expect(first).not.toEqual(second)
    expect(first).not.toEqual(third)
    expect(second).not.toEqual(third)
  })

  it('reminder', () => {
    console.log('WRITE TESTS FOR LOGIN CONTROLLER')
  })

})
