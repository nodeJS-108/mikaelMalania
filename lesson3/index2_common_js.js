// const {ReadStream,} = require('fs'); //// commonJS import method
// import { ReadStream,  } from 'fs';  //// ECMAscript import method
// const abc = ReadStream;

// abc.

const calculator = require('./calculator_common_js.js');
// import * as calculatorV2 from './calculator.mjs';

console.log(calculator.calculate(1,2,"+"))

require('fs').writeFileSync('output.txt', String(calculator.calculate(1,2,"+")));