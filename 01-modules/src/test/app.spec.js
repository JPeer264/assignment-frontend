const expect = require('chai').expect;
const app    = require('../module');

describe('app.js', () => {
    describe('valid', () => {
        it('should have a valid university email', done => {
            const validemail  = 'jstoecklmair.mmt-m@fh-salzburg.ac.at';

            expect(app.valid(validemail)).to.be.true;
        });

        it('should fail', done => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';
            const nonvalieemail3 = 'fhs39850@fh-salzburg.ac.at';

            expect(app.valid(nonvalieemail)).to.be.false;
            expect(app.valid(nonvalieemail2)).to.be.false;
            expect(app.valid(nonvalieemail3)).to.be.false;

            done();
        });
    });

    describe('degreeProgramm', () => {
        it('should have a valid university email', done => {
            const validemail  = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';
            const validemail2 = 'jstoecklmair.heb-b2016@fh-salzburg.ac.at';

            expect(app.degreeProgramm(validemail)).to.equal('MMT');
            expect(app.degreeProgramm(validemail2)).to.equal('HEB');

            done();
        });

        it('should fail - valid but not defined programm', done => {
            const notClear = 'fhs39850@fh-salzburg.ac.at';

            const programmOne = app.degreeProgramm(notClear);

            expect(programmOne).to.be.an('object');
            expect(programmOne.code).to.equal('EUNSURE');

            done();
        });

        it('should fail - not valid university mail', done => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';

            const programmOne = app.degreeProgramm(nonvalieemail);
            const programmTwo = app.degreeProgramm(nonvalieemail2);

            expect(programmOne).to.be.an('object');
            expect(programmTwo).to.be.an('object');

            expect(programmOne.code).to.equal('ENOSTUDY');
            expect(programmTwo.code).to.equal('ENOSTUDY');

            done();
        });
    });

    describe('level', () => {
        it('should have a valid university email', done => {
            const validemail  = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';
            const validemail2 = 'jstoecklmair.heb-b2016@fh-salzburg.ac.at';

            expect(app.level(validemail)).to.equal('master');
            expect(app.level(validemail2)).to.equal('bachelor');

            done();
        });

        it('should fail - valid but not defined programm', done => {
            const notClear = 'fhs39850@fh-salzburg.ac.at';

            const programmOne = app.level(notClear);

            expect(programmOne).to.be.an('object');
            expect(programmOne.code).to.equal('EUNSURE');

            done();
        });

        it('should fail - not valid university mail', done => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';

            const programmOne = app.level(nonvalieemail);
            const programmTwo = app.level(nonvalieemail2);

            expect(programmOne).to.be.an('object');
            expect(programmTwo).to.be.an('object');

            expect(programmOne.code).to.equal('ENOSTUDY');
            expect(programmTwo.code).to.equal('ENOSTUDY');

            done();
        });
    });

    describe('graduationYear', () => {
        it('should predict right graduation year', done => {
            const validemail  = 'jstoecklmair.mmt-m2013@fh-salzburg.ac.at';
            const validemail2 = 'jstoecklmair.heb-b2016@fh-salzburg.ac.at';
            const validemail3 = 'jstoecklmair.mmt-m2016@fh-salzburg.ac.at';

            expect(app.graduationYear(validemail)).to.equal(2015);
            expect(app.graduationYear(validemail2)).to.equal(2019);
            expect(app.graduationYear(validemail3)).to.equal(2018);

            done();
        });

        it('should fail - valid but not defined programm', done => {
            const notClear = 'fhs39850@fh-salzburg.ac.at';

            const programmOne = app.graduationYear(notClear);

            expect(programmOne).to.be.an('object');
            expect(programmOne.code).to.equal('EUNSURE');

            done();
        });

        it('should fail - not valid university mail', done => {
            const nonvalieemail  = 'janpeer264@gmail.com';
            const nonvalieemail2 = 'goofy@example.com';

            const programmOne = app.graduationYear(nonvalieemail);
            const programmTwo = app.graduationYear(nonvalieemail2);

            expect(programmOne).to.be.an('object');
            expect(programmTwo).to.be.an('object');

            expect(programmOne.code).to.equal('ENOSTUDY');
            expect(programmTwo.code).to.equal('ENOSTUDY');

            done();
        });
    });
});
