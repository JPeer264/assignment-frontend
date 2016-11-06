import should from 'should'
import {
  valid,
  degreeProgram,
  level,
  graduationYear
} from '../src/module'

describe('01-modules', () => {
  describe('#valid()', () => {
    it('should be a valid FH/MMT email', done => {
      valid('hmoser.mmt-b2015@fh-salzburg.ac.at').should.be.true()

      done()
    })
    it('should be an invalid FH/MMT email', done => {
      valid('hannes.moser@fh-salzburg.ac.at').should.be.false()

      done()
    })
  })

  describe('#degreeProgram()', () => {
    it('should match MMT', done => {
      degreeProgram('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql('MMT')

      done()
    })
  })

  describe('#level()', () => {
    it('should match BA or MA', done => {
      level('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql('BA')

      done()
    })
  })

  describe('#graduationYear()', () => {
    it('should be your graduation year', done => {
      graduationYear('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql(2018)

      done()
    })
  })
})
