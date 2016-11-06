# 01-modules

## Assignment

* Implement function by function (start with `#valid()`)
* Open `test/index.js` and remove `.skip` at the specific test

```
it.skip('should be a valid FH/MMT email', () => {
  valid('hmoser.mmt-b2015@fh-salzburg.ac.at').should.be.true()
})
// should become
it('should be a valid FH/MMT email', () => {
  valid('hmoser.mmt-b2015@fh-salzburg.ac.at').should.be.true()
})
```
* Run `grunt` (watch task) or `grunt test` (single)

## Setup

```bash
npm install
```

## Dev

```bash
npm start
```
