<h1 align="center" style="border-bottom: none;">jest-matcher-http</h1>
<h3 align="center">Extension for <a href="https://facebook.github.io/jest">Jest</a> providing http-related matchers.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/jest-matcher-http">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/jest-matcher-http/latest.svg">
  </a>
  <a href="https://github.com/rimesime/jest-matcher-http/actions?query=workflow%3ATest+branch%3Amain">
    <img alt="Build states" src="https://github.com/rimesime/jest-matcher-http/workflows/Test/badge.svg">
  </a>
  <a href="https://codecov.io/gh/rimesime/jest-matcher-http" >
    <img src="https://codecov.io/gh/rimesime/jest-matcher-http/branch/main/graph/badge.svg?token=OY3A3BFOUG"/>
  </a>
  <a href="#badge">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
</p>


Jest [matchers](https://jestjs.io/docs/using-matchers) (`toReturnHttpStatus`, `toReturnHttpHeader`) to [expect](https://jestjs.io/docs/expect) http responses.

Logs received body and headers if response is not as expected.

Supported http libraries:
- [superagent](https://www.npmjs.com/package/superagent)/[supertest](https://www.npmjs.com/package/supertest)
- [axios](https://www.npmjs.com/package/axios)
- [needle](https://www.npmjs.com/package/needle)

Supported content types:
- application/json
- text/plain

# Installation & Configuration

With npm:

```shell
$ npm install --save-dev jest-matcher-http
```

Either, or:
* Via configuration - Add this package to your `jest.config.js`:
    ```
    setupFilesAfterEnv: ['jest-matcher-http'],
    ```

* Or, if you need fine-grained control, load specific matchers in your test file:
    ```javascript
    const { toReturnHttpCode } = require('jest-matcher-http');

    expect.extend({ toReturnHttpCode });
    ```

# Usage

```javascript
expect(response).toReturnHttpStatus(307);
expect(response).toReturnHttpHeader('Location', '/v1/new-path');
```

## Log Output Example
```bash
expected http status code 500 to equal 307

    server responded with body:
    {
      "requestId": "<uuid>",
      "message": "Some helpful information."
    }

    server responded with headers:
    {
      "content-type": "application/json",
      ...
    }
```

## Extended Example
```javascript
const supertest = require('supertest');
const request = supertest('www.the-host.com');

describe('Example', () => {
    it('should accept empty object', async () => {
      const response = await request
        .post('/v1/objects')
        .send({});

      expect(response).toReturnHttpCode(200);
    })

    it('should redirect', async () => {
      const response = await request
        .get('/v1/old-path');

      expect(response).toReturnHttpStatus(307);
      expect(response).toReturnHttpHeader('Location', '/v1/new-path');
    })
});
```

# Contributing

1. Clone the repository:
    ```shell
    $ git clone git@github.com:rimesime/jest-matcher-http.git
    ```

1. Install dependencies:
    ```shell
    $ npm ci
    ```

1. Test:
    ```shell
    $ npm test
    ```

1. Commit (using commitizen for semantic releases):
    ```shell
    $ npm run commit
    ```

# License

This is free software, distributed under the [ISC license](https://opensource.org/licenses/ISC).