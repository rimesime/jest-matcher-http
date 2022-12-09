'use strict';

const express = require('express');
const http = require('http');
const { createHttpTerminator } = require('http-terminator');
const Signal = require('signal-promise');

const body = { name: 'john' };
const headerName = 'Some';
const headerValue = 'Header';

/**
 * Start a simple http server and invoke the given function as
 * soon as the server is ready.
 *
 * @param {Function} func - The (async) function
 * that is called when http server is ready.
 */
async function runAgainstServer(func) {
  // eslint-disable-next-line new-cap
  const app = new express();
  app.get('/', (req, res) => {
    res
      .status(200)
      .set(headerName, headerValue)
      .json(body);
  });
  const server = http.createServer(app);
  const httpTerminator = createHttpTerminator({ server });
  const barrier = new Signal();
  const listener = server.listen(async () => {
    await func(`http://localhost:${listener.address().port}`);
    await httpTerminator.terminate();
    barrier.notify();
  });

  await barrier.wait();
}

module.exports = {
  runAgainstServer,
  staticVariables: {
    body,
    headerName,
    headerValue,
  },
};