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

// result <BN ...> 249824778000000000000000000

var val2 = unit.fromWei('7282837', 'ether');

// result '0.00000000000000007282837'
});
```

## API Design

### toWei

[index.js:ethjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a single Ethereum denominated value at a specified unit, and convert it to its `wei` value. Intakes a `value` and `unit` specifier, outputs a single wei value `BN` object.

**Parameters**

-   `value` **Object|Number|String** a single number `wei` value as a integer, BN.js object instance, string hex integer, BN.js object instance (no decimals)
-   `unit` **String** the unit to covert to (i.e. `finney`, `ether` etc..)

Result output single BN **Object**.

```js
const unit = require('ethjs-unit');

var val1 = unit.toWei(249824778, 'ether');

// result <BN ...> [.toString(10) : 249824778000000000000000000]
```

### fromWei

[index.js:ethjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a wei denominated value into another Ethereum denomination. Intakes a single wei `value` and outputs a BN object.

**Parameters**

-   `value` **Object|Number|String** a single number Ethereum denominated value
-   `unit` **String** the unit to covert to (i.e. `finney`, `ether` etc..)

Result output single **String** number.

```js
const unit = require('ethjs-unit');

var val1 = unit.fromWei(249824778000000000000000000, 'ether');

// result '249824778'
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

## Why BN.js?

`ethjs` has made a policy of using `BN.js` across all of its repositories. Here are some of the reasons why:

  1. lighter than alternatives (BigNumber.js)
  2. faster than most alternatives, see [benchmarks](https://github.com/indutny/bn.js/issues/89)
  3. used by the Ethereum foundation across all [`ethereumjs`](https://github.com/ethereumjs) repositories
  4. is already used by a critical JS dependency of many ethereum packages, see package [`elliptic`](https://github.com/indutny/elliptic)
  5. purposefully **does not support decimals or floats numbers** (for greater precision), remember, the Ethereum blockchain cannot and will not support float values or decimal numbers.

## A Note On Handling Numbers

If you want to handle **floats** or **decimal** numbers, `toWei` your values into their base integer wei values and do the operations (e.g. multiplying and dividing) with `BN.js`, then `fromWei` those values back into the desired denomination.

This is procedurally safer, more accurate and computationally faster than the alternative.

If you absolutely cannot do it this way, use a module like `BigNumber.js` which supports floats and decimals, but remember to convert everything back down to integer wei values when you send it to the chain.

Remember, the Ethereum blockchain only supports integer hex number values at this time.

## Browser Builds

`ethjs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/ethjs-unit.js` or `dist/ethjs-unit.min.js` directly into an HTML file to start using this module. Note, an `ethUnit` object is made available globally.

```html
<script type="text/javascript" src="ethjs-unit.min.js"></script>
<script type="text/javascript">
ethUnit(...);
</script>
```

Note, even though `ethjs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

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
