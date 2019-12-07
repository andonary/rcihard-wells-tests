const expect = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Checkout = require('./checkout');
const fs = require('fs');
const util = require('util');

let checkout;
chai.should();
chai.use(sinonChai);

beforeEach(() => {
    checkout = new Checkout();
    checkout.addItemPrice('a', 1);
    checkout.addItemPrice('b', 2);
});

afterEach(() => {
    sinon.restore();
});

it('should calculate the current total', () => {
    checkout.addItem('a');
    expect(checkout.calculateTotal()).to.equal(1);
});

it('should calculate total with multiple item', () => {
    checkout.addItem('a');
    checkout.addItem('b');
    expect(checkout.calculateTotal()).to.equal(3);
});

it('should add a discount for a number of item', () => {
    checkout.addDiscount('a', 3, 2);
});

it('should apply discount to total', () => {
    checkout.addDiscount('a', 3, 2);
    checkout.addItem('a');
    checkout.addItem('a');
    checkout.addItem('a');
    expect(checkout.calculateTotal()).to.equal(2);
});

it('should throw an error if no price is added with item', () => {
    expect(() => {checkout.addItem('c')}).to.throw();
});

it('should read file', async () => {
    sinon.stub(fs, 'readFileSync').callsFake((fileName, encoding, callback) => {
        return util.format("a 3\nb 4");
    });
    const res = await checkout.readFile('testfile', 'utf8');
    fs.readFileSync.should.have.been.calledWith('testfile', 'utf8');
    expect(res['a'].price).to.equal(3);
    expect(res['b'].price).to.equal(4);
});
