'use strict';

describe('matchers', () => {
  describe('toReturnHttpCode', () => {
    it('should succeed if http code is as expected', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      expect(response).toReturnHttpCode(response.status);
    });

    it('should fail if http code is not as expected', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      let caughtError;
      try {
        expect(response).toReturnHttpCode(1);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toBe(
        'expected http status code 200 to equal 1\n'
          + '\n'
          + 'server responded with body:\n'
          + '{}\n'
          + '\n'
          + 'server responded with headers:\n'
          + '{}',
      );
    });
  });

  describe('toReturnHttpHeader', () => {
    it('should succeed if http header is as expected', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {
          'request-id': 'some-uuid',
        },
      };

      expect(response).toReturnHttpHeader('request-id', 'some-uuid');
    });

    it('should fail if http header is not as expected', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      let caughtError;
      try {
        expect(response).toReturnHttpHeader('request-id', 'some-uuid');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toBe(
        'expected http header "request-id" with value "some-uuid"\n'
          + '\n'
          + 'server responded with body:\n'
          + '{}\n'
          + '\n'
          + 'server responded with headers:\n'
          + '{}',
      );
    });
  });
});