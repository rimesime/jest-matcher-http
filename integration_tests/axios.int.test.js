'use strict';

const express = require('express');
const http = require('http');
const axios = require('axios');

describe('axios', () => {
  let server;
  let url;

  const body = { name: 'john' };
  const headerName = 'Some';
  const headerValue = 'Header';

  let response;

  // eslint-disable-next-line jest/no-done-callback
  beforeAll((done) => {
    // eslint-disable-next-line new-cap
    const app = new express();
    app.get('/', (req, res) => {
      res
        .status(200)
        .set(headerName, headerValue)
        .json(body);
    });

    server = http.createServer(app);
    const listener = server.listen(async () => {
      url = `http://localhost:${listener.address().port}`;
      const request = axios.create({ baseURL: url });
      response = await request.get(`${url}/`);
      server.close(done);
    });
  });

  describe('toReturnHttpCode', () => {
    it('should succeed if http code is as expected', async () => {
      expect(response).toReturnHttpCode(200);
    });

    it('should fail if http code is not as expected', async () => {
      let caughtError;
      try {
        expect(response).toReturnHttpCode(500);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toContain('expected http status code 200 to equal 500\n');
      expect(caughtError.message).toContain(`"${headerName.toLowerCase()}": "${headerValue}"`);
    });
  });

  describe('toReturnHttpHeader', () => {
    it('should succeed if http header is as expected', async () => {
      expect(response).toReturnHttpHeader(headerName, headerValue);
    });

    it('should fail if http header is not as expected', async () => {
      let caughtError;
      try {
        expect(response).toReturnHttpHeader(headerName, '');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toContain(
        `expected http header "${headerName.toLowerCase()}" with value ""\n`
              + '\n'
              + 'server responded with body:\n'
              + `${JSON.stringify(body, null, 2)}\n`
              + '\n'
              + 'server responded with headers:\n',
      );
      expect(caughtError.message).toContain(`"${headerName.toLowerCase()}": "${headerValue}"`);
    });
  });
});
