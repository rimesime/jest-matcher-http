'use strict';

describe('matchers', () => {
  describe('toReturnHttpCode', () => {
    it('should succeed if http code is as expected - status', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      expect(response).toReturnHttpCode(response.status);
    });

    it('should succeed if http code is as expected - statusCode', async () => {
      const response = {
        statusCode: 200,
        body: {},
        headers: {},
      };

      expect(response).toReturnHttpCode(response.statusCode);
    });

    it('should succeed if data instead of body provided', async () => {
      const response = {
        status: 200,
        data: {},
        headers: {},
      };

      expect(response).toReturnHttpCode(response.status);
    });

    it('should succeed if result is in text', async () => {
      const response = {
        status: 200,
        text: 'result',
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

    it('should succeed if http code is not as expected - negated', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      expect(response).not.toReturnHttpCode(1);
    });

    it('should fail if http code is not as expected - negated', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      let caughtError;
      try {
        expect(response).not.toReturnHttpCode(response.status);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toBe(
        'expected http status code 200 not to equal 200\n'
          + '\n'
          + 'server responded with body:\n'
          + '{}\n'
          + '\n'
          + 'server responded with headers:\n'
          + '{}',
      );
    });

    it('should throw if result is not supported', async () => {
      const response = {
        status: 200,
        headers: {},
      };

      let caughtError;
      try {
        expect(response).toReturnHttpCode(1);
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toBe('jest-matcher-http does not support this library');
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

    it('should succeed if data instead of body provided', async () => {
      const response = {
        status: 200,
        data: {},
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
        'expected http header "request-id" to have value "some-uuid"\n'
          + '\n'
          + 'server responded with body:\n'
          + '{}\n'
          + '\n'
          + 'server responded with headers:\n'
          + '{}',
      );
    });

    it('should succeed if http header is not as expected - negated', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {},
      };

      expect(response).not.toReturnHttpHeader('request-id', 'some-uuid');
    });

    it('should fail if http header is not as expected - negated', async () => {
      const response = {
        status: 200,
        body: {},
        headers: {
          'request-id': 'some-uuid',
        },
      };

      let caughtError;
      try {
        expect(response).not.toReturnHttpHeader('request-id', 'some-uuid');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError.message).toBe(
        'expected http header "request-id" not to have value "some-uuid"\n'
          + '\n'
          + 'server responded with body:\n'
          + '{}\n'
          + '\n'
          + 'server responded with headers:\n'
          + '{\n'
          + '  "request-id": "some-uuid"\n'
          + '}',
      );
    });
  });
});
