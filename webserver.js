const http = require('node:http');
// TODO R4: import the built-in modules you need (os, fs)

const server = http.createServer((req, res) => {
  // TODO R3: '/'  -> 200 'Welcome to my API'; unknown routes -> 404 'Not found'
  // TODO R4: '/serverstatus/mem'   -> 'This server has <os.totalmem()> bytes of memory'
  //          '/serverstatus/os'    -> 'This server runs on <os.type()>'
  //          '/serverstatus/path'  -> 'This app has <process.cwd()> as working directory'
  //          '/serverstatus/files' -> 'These files are in the working directory: <files joined with ", ">'
  res.end();
});

// Only listen when started with `node webserver.js`, not when the tests require it.
if (require.main === module) server.listen(4000, () => console.log('Listening on http://localhost:4000'));

module.exports = server;
