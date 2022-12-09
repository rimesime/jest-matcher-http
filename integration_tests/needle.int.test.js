'use strict';

const needle = require('needle');

const { runAgainstServer, staticVariables } = require('./localServer.int.helper');

describe('needle', () => {
  let response;
  const { body, headerName, headerValue } = staticVariables;

  beforeAll(async () => {
    await runAgainstServer(async (url) => {
      response = await needle('get', url);
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
