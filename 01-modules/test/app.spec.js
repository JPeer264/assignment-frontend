const expect = require('chai').expect;
const app    = require('../src/module');

describe('app.js', () => {
    describe('valid', () => {
        it('have a valid university mail', () => {
            const validem  = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';
            const validem2 = 'fhs39850@fh-salzburg.ac.at';

            expect(app.valid(validem)).to.be.true;
            expect(app.valid(validem2, true)).to.be.true;
        });

        it('should fail', () => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';
            const nonvalieemail3 = 'fhs39850@fh-salzburg.ac.at';

            expect(app.valid(nonvalieemail)).to.be.false;
            expect(app.valid(nonvalieemail2)).to.be.false;
            expect(app.valid(nonvalieemail3)).to.be.false;
        });
    });

    describe('degreeProgram', () => {
        it('should have a valid university email', () => {
            const validemail  = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';
            const validemail2 = 'jstoecklmair.heb-b2016@fh-salzburg.ac.at';

            expect(app.degreeProgram(validemail)).to.equal('MMT');
            expect(app.degreeProgram(validemail2)).to.equal('HEB');
        });

        it('should fail - valid but not defined programm', () => {
            const notClear = 'fhs39850@fh-salzburg.ac.at';
            const programmOne = app.degreeProgram(notClear);

            expect(programmOne).to.be.an('object');
            expect(programmOne.code).to.equal('EUNSURE');
        });

        it('should fail - not valid university mail', () => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';

            const programmOne = app.degreeProgram(nonvalieemail);
            const programmTwo = app.degreeProgram(nonvalieemail2);

            expect(programmOne).to.be.an('object');
            expect(programmTwo).to.be.an('object');

            expect(programmOne.code).to.equal('ENOSTUDY');
            expect(programmTwo.code).to.equal('ENOSTUDY');
        });
    });

    describe('level', () => {
        it('should have a valid university email', () => {
            const validemail  = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';
            const validemail2 = 'jstoecklmair.heb-b2016@fh-salzburg.ac.at';

            expect(app.level(validemail)).to.equal('MA');
            expect(app.level(validemail2)).to.equal('BA');
        });

        it('should fail - valid but not defined programm', () => {
            const notClear = 'fhs39850@fh-salzburg.ac.at';

            const programmOne = app.level(notClear);

            expect(programmOne).to.be.an('object');
            expect(programmOne.code).to.equal('EUNSURE');
        });

        it('should fail - not valid university mail', () => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';

            const programmOne = app.level(nonvalieemail);
            const programmTwo = app.level(nonvalieemail2);

            expect(programmOne).to.be.an('object');
            expect(programmTwo).to.be.an('object');

            expect(programmOne.code).to.equal('ENOSTUDY');
            expect(programmTwo.code).to.equal('ENOSTUDY');
        });
    });

    describe('graduationYear', () => {
        it('should predict right graduation year', () => {
            const validemail  = 'jstoecklmair.mmt-m2013@fh-salzburg.ac.at';
            const validemail2 = 'jstoecklmair.heb-b2016@fh-salzburg.ac.at';
            const validemail3 = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';

            expect(app.graduationYear(validemail)).to.equal(2015);
            expect(app.graduationYear(validemail2)).to.equal(2019);
            expect(app.graduationYear(validemail3)).to.equal(2018);
        });

        it('should fail - valid but not defined programm', () => {
            const notClear = 'fhs39850@fh-salzburg.ac.at';

            const programmOne = app.graduationYear(notClear);

            expect(programmOne).to.be.an('object');
            expect(programmOne.code).to.equal('EUNSURE');
        });

        it('should fail - not valid university mail', () => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';

            const programmOne = app.graduationYear(nonvalieemail);
            const programmTwo = app.graduationYear(nonvalieemail2);

            expect(programmOne).to.be.an('object');
            expect(programmTwo).to.be.an('object');

            expect(programmOne.code).to.equal('ENOSTUDY');
            expect(programmTwo.code).to.equal('ENOSTUDY');
        });
    });
});
