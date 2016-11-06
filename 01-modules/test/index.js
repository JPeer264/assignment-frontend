import should from 'should'
import {
  valid,
  degreeProgram,
  level,
  graduationYear
} from '../src/module'

describe('01-modules', () => {
  describe('#valid()', () => {
    it.skip('should be a valid FH/MMT email', () => {
      valid('hmoser.mmt-b2015@fh-salzburg.ac.at').should.be.true()
    })
    it.skip('should be an invalid FH/MMT email', () => {
      valid('hannes.moser@fh-salzburg.ac.at').should.be.false()
    })
  })

  describe('#degreeProgram()', () => {
    it.skip('should match MMT', () => {
      degreeProgram('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql('MMT')
    })
  })

  describe('#level()', () => {
    it.skip('should match BA or MA', () => {
      level('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql('BA')
    })
  })

  describe('#graduationYear()', () => {
    it.skip('should be your graduation year', () => {
      graduationYear('hmoser.mmt-b2015@fh-salzburg.ac.at').should.eql(2018)
    })
  })
})
