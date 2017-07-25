# Sleeep

[![npm](https://img.shields.io/npm/v/sleeep.svg?style=flat-square)](https://www.npmjs.com/package/sleeep)

A promise-based function for halting the execution of the current promise-chain or async/await-block in a non-blocking way.

The implementation is written in TypeScript and therefore comes with typings already bundled.

## Installation

Install the library via your favourite package manager.

```
npm install sleeep --save
```
or
```
yarn add sleeep
```

## Usage

The following code should output something like `Sleep: 101.337ms` after 100 milliseconds.

```
import sleep from 'sleeep'

run()

async function run() {
  console.time('sleep')
  await sleep(100)
  console.timeEnd('sleep')
}
```

You can also use sleep in Promise-chains. The following code should print `Hello, world!` after 100 milliseconds.

```
import sleep from 'sleeep'

Promise.resolve('Hello, world!')
.then(sleep(100))
.then(x => console.log(x))
```
