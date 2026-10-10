const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const EventEmitter = require('node:events');
const Printer = require('../printer.js');

describe('R2: printer.js emits stringConverted', () => {
  it('exports a class that extends EventEmitter', () => {
    assert.equal(typeof Printer, 'function', 'printer.js should export the Printer class (module.exports = Printer)');
    assert.ok(new Printer() instanceof EventEmitter, 'Printer should extend EventEmitter');
  });
  it('prints the message in upper case', (t) => {
    t.mock.method(console, 'log', () => {});
    new Printer().print('hello');
    assert.ok(console.log.mock.calls.some((c) => c.arguments.includes('HELLO')), 'print("hello") should console.log "HELLO"');
  });
  it('emits stringConverted with the old and new string', (t) => {
    t.mock.method(console, 'log', () => {});
    const printer = new Printer();
    let payload;
    printer.on('stringConverted', (arg) => { payload = arg; });
    printer.print('hello');
    assert.deepEqual(payload, { oldString: 'hello', newString: 'HELLO' }, 'print("hello") should emit "stringConverted" with { oldString: "hello", newString: "HELLO" }');
  });
});
