const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const os = require('node:os');
const fs = require('node:fs');

let server;
let base;
before(async () => {
  server = require('../webserver.js');
  if (!(server instanceof http.Server)) return;
  if (!server.listening) await new Promise((resolve) => server.listen(0, resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server && server.close && server.close());

async function get(path) {
  assert.ok(server instanceof http.Server, 'webserver.js should export the server created with http.createServer (module.exports = server)');
  const res = await fetch(base + path);
  return { status: res.status, body: await res.text() };
}

describe('R3: webserver.js answers / and unknown routes', () => {
  it('GET / returns the welcome message', async () => {
    const r = await get('/');
    assert.equal(r.status, 200, 'GET / should respond with status 200');
    assert.ok(r.body.includes('Welcome to my API'), 'GET / should return "Welcome to my API"');
  });
  it('unknown routes return 404', async () => {
    assert.equal((await get('/does-not-exist')).status, 404, 'An unknown route should respond with status 404');
  });
});

describe('R4: webserver.js reports the server status', () => {
  it('/serverstatus/mem reports the total memory', async () => {
    assert.ok((await get('/serverstatus/mem')).body.includes(String(os.totalmem())), '/serverstatus/mem should include os.totalmem()');
  });
  it('/serverstatus/os reports the operating system', async () => {
    assert.ok((await get('/serverstatus/os')).body.includes(os.type()), '/serverstatus/os should include os.type()');
  });
  it('/serverstatus/path reports the working directory', async () => {
    assert.ok((await get('/serverstatus/path')).body.includes(process.cwd()), '/serverstatus/path should include process.cwd()');
  });
  it('/serverstatus/files lists the files in the working directory', async () => {
    const body = (await get('/serverstatus/files')).body;
    for (const f of fs.readdirSync(process.cwd()).filter((n) => !n.startsWith('.'))) assert.ok(body.includes(f), `/serverstatus/files should list "${f}"`);
  });
});
