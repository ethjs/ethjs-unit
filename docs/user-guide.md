# User Guide

All information for developers using `ethjs-unit` should consult this document.

## Install

```
npm install --save ethjs-unit
```

## Usage

```js
const unit = require('ethjs-unit');

var val1 = unit.toWei(249824778, 'ether');

// result <BigNumber ...>

var val2 = unit.fromWei('7282837', 'finney');

// result <BigNumber ...>
});
```

## API Design

### toWei

[index.js:ethjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a single Ethereum denominated value at a specified unit, and convert it to its `wei` value. Intakes a `value` and `unit` specifier, outputs a single wei value `BigNumber` object.

**Parameters**

-   `value` **BigNumber|Number|String** a single number `wei` value
-   `unit` **String** the unit to covert to (i.e. `finney`, `ether` etc..)

Result output single BigNumber **Object**.

```js
const unit = require('ethjs-unit');

var val1 = unit.toWei(249824778, 'ether');

// result <BigNumber ...> [.toString(10) : 249824778000000000000000000]
```

### fromWei

[index.js:ethjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a wei denominated value into another Ethereum denomination. Intakes a single wei `value` and outputs a BigNumber object.

**Parameters**

-   `value` **BigNumber|Number|String** a single number Ethereum denominated value
-   `unit` **String** the unit to covert to (i.e. `finney`, `ether` etc..)

Result output single BigNumber **Object**.

```js
const unit = require('ethjs-unit');

var val1 = unit.fromWei(249824778000000000000000000, 'ether');

// result <BigNumber ...> [.toString(10) : 49824778 ]
```

### isBigNumber

[index.js:ethjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Is the specified value a BigNumber object instance.

**Parameters**

-   `value` **Optional** a single optional type value

Result output is a single **Boolean** (is the value a BigNumber or not).

```js
const unit = require('ethjs-unit');
const BigNumber = require('bignumber.js');

var val1 = unit.isBigNumber(249824778000000000000000000);

// result false

var val1 = unit.isBigNumber(new BigNumber(10));

// result true
```

### toBigNumber

[index.js:ethjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a specified value to a BigNumber if possible.

**Parameters**

-   `value` **String|Number|Object** a single optional type value number

Result output is a single `BigNumber` **Object** a BigNumber value.

```js
const unit = require('ethjs-unit');
const BigNumber = require('bignumber.js');

var val1 = unit.toBigNumber(249824778000000000000000000);

// result <BigNumber ...>

var val1 = unit.toBigNumber(new BigNumber(10));

// result <BigNumber ...>
```

## Supported Units

```
'wei':          '1',
'kwei':         '1000',
'Kwei':         '1000',
'babbage':      '1000',
'femtoether':   '1000',
'mwei':         '1000000',
'Mwei':         '1000000',
'lovelace':     '1000000',
'picoether':    '1000000',
'gwei':         '1000000000',
'Gwei':         '1000000000',
'shannon':      '1000000000',
'nanoether':    '1000000000',
'nano':         '1000000000',
'szabo':        '1000000000000',
'microether':   '1000000000000',
'micro':        '1000000000000',
'finney':       '1000000000000000',
'milliether':   '1000000000000000',
'milli':        '1000000000000000',
'ether':        '1000000000000000000',
'kether':       '1000000000000000000000',
'grand':        '1000000000000000000000',
'mether':       '1000000000000000000000000',
'gether':       '1000000000000000000000000000',
'tether':       '1000000000000000000000000000000'
```

## Notes on Handling BigNumber Objects

There are two kinds of BigNumber modules most commonly used across JS:  [`bn.js`](https://github.com/indutny/bn.js/) and [`bignumber.js`](https://github.com/MikeMcl/bignumber.js/). There are many differences between the two (namely that BN is smaller and doesn't handle floats, while BigNumber handles floats but is much larger). This module uses `bignumber.js` (as it can handle decimal float values) which returns the `BigNumber` **Object** instance.

We use BigNumber objects because javascript has trouble handling very large numbers, which Ethereum uses all the time across the blockchain.

The `BigNumber` object can be converted to a string or number with a specified base (i.e. generally `.toString(10)` for non hex values and `.toString(16)` for hex values or `toNumber(10)` and `toNumber(16)`).

```js
const num = new BigNumber(1000);

num.toString(10); // result '1000'

num.toNumber(10); // result 1000
```

Make sure you know which BigNumber modules you are using, and watchout for your types and convertions of these numbers.

This module has two methods for helping handling the `BigNumber` objects. `isBigNumber` and `toBigNumber` which can help you convert values to the BigNumber object.


## Other Awesome Modules, Tools and Frameworks

 - [web3.js](https://github.com/ethereum/web3.js) -- the original Ethereum swiss army knife **Ethereum Foundation**
 - [ethereumjs](https://github.com/ethereumjs) -- critical ethereumjs infrastructure **Ethereum Foundation**
 - [browser-solidity](https://ethereum.github.io/browser-solidity) -- an in browser Solidity IDE **Ethereum Foundation**
 - [wafr](https://github.com/silentcicero/wafr) -- a super simple Solidity testing framework
 - [truffle](https://github.com/ConsenSys/truffle) -- a solidity/js dApp framework
 - [embark](https://github.com/iurimatias/embark-framework) -- a solidity/js dApp framework
 - [dapple](https://github.com/nexusdev/dapple) -- a solidity dApp framework
 - [chaitherium](https://github.com/SafeMarket/chaithereum) -- a JS web3 unit testing framework
 - [contest](https://github.com/DigixGlobal/contest) -- a JS testing framework for contracts

## Our Relationship with Ethereum & EthereumJS

 We would like to mention that we are not in any way affiliated with the Ethereum Foundation or `ethereumjs`. However, we love the work they do and work with them often to make Ethereum great! Our aim is to support the Ethereum ecosystem with a policy of diversity, modularity, simplicity, transparency, clarity, optimization and extensibility.

 Many of our modules use code from `web3.js` and the `ethereumjs-` repositories. We thank the authors where we can in the relevant repositories. We use their code carefully, and make sure all test coverage is ported over and where possible, expanded on.
