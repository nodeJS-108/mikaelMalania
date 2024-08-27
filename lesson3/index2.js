// const {ReadStream,} = require('fs'); //// commonJS import method
// import { ReadStream,  } from 'fs';  //// ECMAscript import method
// const abc = ReadStream;

// abc.

const calculator = require('./calculator_common_js.js');

console.log(calculator.calculate(1,2,"+"))