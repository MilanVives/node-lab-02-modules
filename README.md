# Lab 02: Node Module System

Practice the module system: write your own modules, use EventEmitter and build an HTTP server with built-in modules.

## Getting started

```bash
npm install
npm test
```

`npm test` runs the same checks as the autograder. Run a single requirement with `npm test -- --test-name-pattern="^R1:"`. Try your modules with `node app.js` and the server with `npm start` (http://localhost:4000).

## Requirements

### R1: calculator.js exports the four operations
**2 points**

In `calculator.js` write `add(a, b)`, `subtract(a, b)`, `multiply(a, b)` and `divide(a, b)` and export them as one object: `module.exports = { add, subtract, multiply, divide }`. `divide(a, 0)` throws `new Error('Cannot divide by zero')`.

### R2: printer.js emits stringConverted
**3 points**

`Printer` extends `EventEmitter` (`require('node:events')`). `print(message)` logs the message in upper case with `console.log` and then emits the event `stringConverted` with one object: `{ oldString: message, newString: <upper case> }`.

### R3: webserver.js answers / and unknown routes
**2 points**

`GET /` answers `Welcome to my API` (status 200). Any other URL that is not listed below answers `Not found` with status 404 (`res.statusCode = 404`).

### R4: webserver.js reports the server status
**3 points**

Use the built-in modules `os` and `fs`:

| URL | Answer |
|---|---|
| `/serverstatus/mem` | `This server has <os.totalmem()> bytes of memory` |
| `/serverstatus/os` | `This server runs on <os.type()>` |
| `/serverstatus/path` | `This app has <process.cwd()> as working directory` |
| `/serverstatus/files` | `These files are in the working directory: <fs.readdirSync(process.cwd()) joined with ", ">` |

Keep `module.exports = server` and the `require.main === module` check: the tests start the server themselves.

## Submitting

Commit your work and run `npm run submit`. Your score and feedback appear under **Releases** after a few minutes. You can submit as often as you like; the latest submission counts.
