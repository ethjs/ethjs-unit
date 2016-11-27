const units = require('../index.js'); // eslint-disable-line
const BigNumber = require('bignumber.js'); // eslint-disable-line
const Web3 = require('web3'); // eslint-disable-line
const web3 = new Web3(); // eslint-disable-line
const assert = require('chai').assert; // eslint-disable-line

function testRandomUnitAndNumber() {
  const stringTestValue = String(Math.floor((Math.random() * 1000000000000000) + 1));
  const testValue = new BigNumber(stringTestValue);
  const totalTypes = Object.keys(units.unitMap).length;
  const randomUnitType = Object.keys(units.unitMap)[Math.floor((Math.random() * (totalTypes - 1)) + 1)];

  assert.equal(units.toWei(testValue, randomUnitType).toString(10), web3.toWei(testValue, randomUnitType).toString(10));
  assert.equal(units.fromWei(testValue, randomUnitType).toString(10), web3.fromWei(testValue, randomUnitType).toString(10));
}

describe('units', () => {
  describe('normal functionality', () => {
    it('should function as web3 does, without string return', () => {
      for (var i = 0; i < 1000; i++) { // eslint-disable-line
        testRandomUnitAndNumber();
      }
    });
  });
});
