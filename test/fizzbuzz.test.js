const expect = require('chai').expect;

function fizzbuzz(value) {
    if (value % 3 === 0 && value % 5 === 0) return 'fizzbuzz';
    if (value % 3 === 0) return 'fizz';
    if (value % 5 === 0) return 'buzz';
    return value
}

function expectation(value, expected) {
    const result = fizzbuzz(value);
    expect(result).to.equals(expected);
}

it('should return 1 if 1 is passed', () => {
    expectation(1,1);
});

it('should return 2 if 2 is passed', () => {
    expectation(2,2);
});

it('should return fizz if 3 is passed', () => {
    expectation(3,'fizz');
});

it('should return fizz if 6 is passed', () => {
    expectation(6,'fizz');
});

it('should return buzz if 5 is passed', () => {
    expectation(5,'buzz');
});

it('should return fizzbuzz if 15 is passed', () => {
    expectation(15,'fizzbuzz');
});

