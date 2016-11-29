const units = require('../index.js'); // eslint-disable-line
const BigNumber = require('bignumber.js'); // eslint-disable-line
const Web3 = require('web3'); // eslint-disable-line
const web3 = new Web3(); // eslint-disable-line
const assert = require('chai').assert; // eslint-disable-line

function testRandomunitsAndNumber() {
  const stringTestValue = String(Math.floor((Math.random() * 1000000000000000) + 1));
  const testValue = new BigNumber(stringTestValue);
  const totalTypes = Object.keys(units.unitMap).length;
  const randomunitsType = Object.keys(units.unitMap)[Math.floor((Math.random() * (totalTypes - 1)) + 1)];

  assert.equal(units.toWei(testValue, randomunitsType).toString(10), web3.toWei(testValue, randomunitsType).toString(10));
  assert.equal(units.fromWei(testValue, randomunitsType).toString(10), web3.fromWei(testValue, randomunitsType).toString(10));
}

describe('units', () => {
  describe('normal functionality', () => {
    it('should function as web3 does, without string return', () => {
      for (var i = 0; i < 100000; i++) { // eslint-disable-line
        testRandomunitsAndNumber();
      }
    });
  });
});

describe('fromWei', () => {
  it('should return the correct value', () => {
    assert.equal(units.fromWei(1000000000000000000, 'wei').toString(10), '1000000000000000000');
    assert.equal(units.fromWei(1000000000000000000, 'kwei').toString(10), '1000000000000000');
    assert.equal(units.fromWei(1000000000000000000, 'mwei').toString(10), '1000000000000');
    assert.equal(units.fromWei(1000000000000000000, 'gwei').toString(10), '1000000000');
    assert.equal(units.fromWei(1000000000000000000, 'szabo').toString(10), '1000000');
    assert.equal(units.fromWei(1000000000000000000, 'finney').toString(10), '1000');
    assert.equal(units.fromWei(1000000000000000000, 'ether').toString(10), '1');
    assert.equal(units.fromWei(1000000000000000000, 'kether').toString(10), '0.001');
    assert.equal(units.fromWei(1000000000000000000, 'grand').toString(10), '0.001');
    assert.equal(units.fromWei(1000000000000000000, 'mether').toString(10), '0.000001');
    assert.equal(units.fromWei(1000000000000000000, 'gether').toString(10), '0.000000001');
    assert.equal(units.fromWei(1000000000000000000, 'tether').toString(10), '0.000000000001');
  });
});

describe('toWei', () => {
  it('should return the correct value', () => {
    assert.equal(units.toWei(1, 'wei').toString(10), '1');
    assert.equal(units.toWei(1, 'kwei').toString(10), '1000');
    assert.equal(units.toWei(1, 'Kwei').toString(10), '1000');
    assert.equal(units.toWei(1, 'babbage').toString(10), '1000');
    assert.equal(units.toWei(1, 'mwei').toString(10), '1000000');
    assert.equal(units.toWei(1, 'Mwei').toString(10), '1000000');
    assert.equal(units.toWei(1, 'lovelace').toString(10), '1000000');
    assert.equal(units.toWei(1, 'gwei').toString(10), '1000000000');
    assert.equal(units.toWei(1, 'Gwei').toString(10), '1000000000');
    assert.equal(units.toWei(1, 'shannon').toString(10), '1000000000');
    assert.equal(units.toWei(1, 'szabo').toString(10), '1000000000000');
    assert.equal(units.toWei(1, 'finney').toString(10), '1000000000000000');
    assert.equal(units.toWei(1, 'ether').toString(10), '1000000000000000000');
    assert.equal(units.toWei(1, 'kether').toString(10), '1000000000000000000000');
    assert.equal(units.toWei(1, 'grand').toString(10), '1000000000000000000000');
    assert.equal(units.toWei(1, 'mether').toString(10), '1000000000000000000000000');
    assert.equal(units.toWei(1, 'gether').toString(10), '1000000000000000000000000000');
    assert.equal(units.toWei(1, 'tether').toString(10), '1000000000000000000000000000000');

    assert.equal(units.toWei(1, 'kwei').toString(10), units.toWei(1, 'femtoether').toString(10));
    assert.equal(units.toWei(1, 'szabo').toString(10), units.toWei(1, 'microether').toString(10));
    assert.equal(units.toWei(1, 'finney').toString(10), units.toWei(1, 'milliether').toString(10));
    assert.equal(units.toWei(1, 'milli').toString(10), units.toWei(1, 'milliether').toString(10));
    assert.equal(units.toWei(1, 'milli').toString(10), units.toWei(1000, 'micro').toString(10));

    assert.throws(() => { units.toWei(1, 'wei1'); }, Error);
  });
});

const tests = [
  { value: function () {}, is: false }, // eslint-disable-line
  { value: new Function(), is: false }, // eslint-disable-line
  { value: 'function', is: false },
  { value: {}, is: false },
  { value: new String('hello'), is: false }, // eslint-disable-line
  { value: new BigNumber(0), is: true },
  { value: 132, is: false },
  { value: '0x12', is: false },
];

describe('isBigNumber', () => {
  tests.forEach((test) => {
    it(`shoud test if value ${test.value} is BigNumber: ${test.is}`, () => {
      assert.equal(units.isBigNumber(test.value), test.is);
    });
  });
});


const toBigNumberTests = [
  { value: 1, expected: '1' },
  { value: '1', expected: '1' },
  { value: '0x1', expected: '1' },
  { value: '0x01', expected: '1' },
  { value: 15, expected: '15' },
  { value: '15', expected: '15' },
  { value: '0xf', expected: '15' },
  { value: '0x0f', expected: '15' },
  { value: new BigNumber('f', 16), expected: '15' },
  { value: -1, expected: '-1' },
  { value: '-1', expected: '-1' },
  { value: '-0x1', expected: '-1' },
  { value: '-0x01', expected: '-1' },
  { value: -15, expected: '-15' },
  { value: '-15', expected: '-15' },
  { value: '-0xf', expected: '-15' },
  { value: '-0x0f', expected: '-15' },
  { value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', expected: '115792089237316195423570985008687907853269984665640564039457584007913129639935' },
  { value: '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd', expected: '115792089237316195423570985008687907853269984665640564039457584007913129639933' },
  { value: '-0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', expected: '-115792089237316195423570985008687907853269984665640564039457584007913129639935' },
  { value: '-0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd', expected: '-115792089237316195423570985008687907853269984665640564039457584007913129639933' },
  { value: 0, expected: '0' },
  { value: '0', expected: '0' },
  { value: '0x0', expected: '0' },
  { value: -0, expected: '0' },
  { value: '-0', expected: '0' },
  { value: '-0x0', expected: '0' },
  { value: new BigNumber(0), expected: '0' },
];

describe('toBigNumber', () => {
  toBigNumberTests.forEach((test) => {
    it(`should turn ${test.value} to 4 ${test.expected}`, () => {
      assert.equal(units.toBigNumber(test.value).toString(10), test.expected);
    });
  });
});
