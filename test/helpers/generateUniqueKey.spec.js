import chai from 'chai'
import genUniqKey from '../../src/helpers/generateUniqueKey'

chai.use(require('sinon-chai'))
const expect = chai.expect

const generateUniqueKey = genUniqKey.generateUniqueKey


describe('generateUniqueKey tests', () => {
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
    const second = generateUniqueKey([ ...mockKeys, first ])
    const third = generateUniqueKey([ ...mockKeys, first, second ])

    expect(first).not.to.equal(second)
    expect(first).not.to.equal(third)
    expect(second).not.to.equal(third)
  })
})
