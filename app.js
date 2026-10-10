// Try your modules here: node app.js
const calc = require('./calculator.js');
const Printer = require('./printer.js');

const printer = new Printer();
printer.on('stringConverted', ({ oldString, newString }) => console.log(`Converted "${oldString}" to "${newString}"`));
printer.print('hello world');
console.log('2 + 3 =', calc.add(2, 3));
