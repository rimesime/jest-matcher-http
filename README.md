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


Jest [matchers](https://jestjs.io/docs/using-matchers) (`toReturnHttpCode`, `toReturnHttpHeader`) to [expect](https://jestjs.io/docs/expect) http responses.

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

Add this setting to your `jest.config.js`:
```
setupFilesAfterEnv: ['jest-matcher-http'],
```

There's an example typescript project here: [integration_tests/tsProject/](integration_tests/tsProject/). This is used for integration testing this lib to ensure typescript compatibility.


# Usage

```javascript
expect(response).toReturnHttpCode(307);
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

      expect(response).toReturnHttpCode(307);
      expect(response).toReturnHttpHeader('Location', '/v1/new-path');
    })
});
```

# Contributing

Thank you for investing time to contribute to this project.

Clone the repository:
  ```shell
  $ git clone git@github.com:rimesime/jest-matcher-http.git
  $ npm ci
  $ npm test
  ```

If you spot a problem, search if an issue already exists. If a 
related issue doesn't exist, you can open a new issue providing 
all relevant information to e.g. reproduce the problem or motivate 
your change. You are welcome to open a PR for any ticket.

# License

This is free software, distributed under the [ISC license](https://opensource.org/licenses/ISC).