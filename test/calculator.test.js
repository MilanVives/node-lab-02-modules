const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const calc = require('../calculator.js');

describe('R1: calculator.js exports the four operations', () => {
  it('exports add, subtract, multiply and divide', () => {
    for (const fn of ['add', 'subtract', 'multiply', 'divide']) assert.equal(typeof calc[fn], 'function', `calculator.js should export a function "${fn}"`);
  });
  it('computes correctly', () => {
    assert.equal(calc.add(2, 3), 5, 'add(2, 3) should return 5');
    assert.equal(calc.subtract(2, 3), -1, 'subtract(2, 3) should return -1');
    assert.equal(calc.multiply(4, 3), 12, 'multiply(4, 3) should return 12');
    assert.equal(calc.divide(9, 3), 3, 'divide(9, 3) should return 3');
  });
  it('refuses to divide by zero', () => {
    assert.throws(() => calc.divide(1, 0), { message: 'Cannot divide by zero' }, 'divide(1, 0) should throw an Error with message "Cannot divide by zero"');
  });
});
