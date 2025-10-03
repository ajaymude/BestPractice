// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');

describe('sum()', () => {
  it('returns the sum of two positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('returns the sum when one or both numbers are negative', () => {
    expect(sum(-1, -2)).toBe(-3);
    expect(sum(-1,  2)).toBe(1);
  });

  it('handles zero correctly', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(5, 0)).toBe(5);
  });
});



// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');

describe('sum()', () => {
  test('adds two positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('handles negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
    expect(sum(-1,  2)).toBe(1);
  });

  test('works with zero', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(5, 0)).toBe(5);
  });
});
