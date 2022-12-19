'use strict';

const superagent = require('superagent');

const { runAgainstServer, staticVariables } = require('./localServer.int.helper');

describe('superagent', () => {
  let responseJson;
  let responseText;
  const {
    resultJson,
    resultText,
    headerName,
    headerValue,
  } = staticVariables;

  beforeAll(async () => {
    await runAgainstServer(async (url) => {
      responseJson = await superagent.get(`${url}/json`);
      responseText = await superagent.get(`${url}/text`);
    });
  });

  describe('toReturnHttpCode', () => {
    it('should succeed if http code is as expected', async () => {
      expect(responseJson).toReturnHttpCode(200);
    });

    it('should fail if http code is not as expected for application/json responses', async () => {
      let caughtError;
      try {
        expect(responseJson).toReturnHttpCode(500);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toContain('expected http status code 200 to equal 500\n');
      expect(caughtError.message).toContain(`${JSON.stringify(resultJson, null, 2)}\n`);
      expect(caughtError.message).toContain(`"${headerName.toLowerCase()}": "${headerValue}"`);
    });

    it('should fail if http code is not as expected for plain/text responses', async () => {
      let caughtError;
      try {
        expect(responseText).toReturnHttpCode(500);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toContain('expected http status code 200 to equal 500\n');
      expect(caughtError.message).toContain(`${JSON.stringify(resultText, null, 2)}\n`);
      expect(caughtError.message).toContain(`"${headerName.toLowerCase()}": "${headerValue}"`);
    });
  });

  describe('toReturnHttpHeader', () => {
    it('should succeed if http header is as expected', async () => {
      expect(responseJson).toReturnHttpHeader(headerName, headerValue);
    });

    it('should fail if http header is not as expected', async () => {
      let caughtError;
      try {
        expect(responseJson).toReturnHttpHeader(headerName, '');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toContain(
        `expected http header "${headerName.toLowerCase()}" with value ""\n`
              + '\n'
              + 'server responded with body:\n'
              + `${JSON.stringify(resultJson, null, 2)}\n`
              + '\n'
              + 'server responded with headers:\n',
      );
      expect(caughtError.message).toContain(`"${headerName.toLowerCase()}": "${headerValue}"`);
    });
  });
});
