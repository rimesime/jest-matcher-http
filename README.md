<h1 align="center" style="border-bottom: none;">jest-matcher-http</h1>
<h3 align="center">Extension for <a href="https://facebook.github.io/jest">Jest</a> providing http-related matchers.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/jest-matcher-http">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/jest-matcher-http/latest.svg">
  </a>
  <a href="https://github.com/rimesime/jest-matcher-http/actions?query=workflow%3ATest+branch%3Amain">
    <img alt="Build states" src="https://github.com/semantic-release/semantic-release/workflows/Test/badge.svg">
  </a>
  <a href="#badge">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
</p>



# Installation

With npm:

```shell
$ npm install --save-dev jest-matcher-http
```

# Configuration

Either, or:
* Via configuration - Add this package to your `jest.config.js`:
    ```json
    setupFilesAfterEnv: ['jest-matcher-http'],
    ```

* Or, if you need fine-grained control, load specific matchers in your test file:
    ```javascript
    const { toReturnHttpCode } = require('jest-matcher-http');

    expect.extend({ toReturnHttpCode });
    ```

# Usage

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

# Cloning & Working with the Repository

1. Run
    ```shell
    $ npm install
    ```

1. This repository uses conventional commits that are validated using `git-conventional-commits`. To validate this automatically, git-hooks need to be enabled manually after cloning this repository:
    ```shell
    $ git config core.hooksPath .git-hooks
    ```

# License

This is free software, distributed under the [ISC license](https://opensource.org/licenses/ISC).