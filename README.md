# jest-matcher-http

This is a simple matcher for [Jest](https://facebook.github.io/jest) that provides http-related matchers.

## Installation

With npm:

```shell
$ npm install --save-dev jest-matcher-http
```

Add this package to your `jest.config.js`:

```json
setupFilesAfterEnv: ['jest-matcher-http'],
```

## Usage

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

## Cloning & Working with the Repository

1. Run
    ```shell
    $ npm install
    ```

1. This repository uses conventional commits that are validated using `git-conventional-commits`. To validate this automatically, git-hooks need to be enabled manually after cloning this repository:
    ```shell
    $ git config core.hooksPath .git-hooks
    ```

## License

This is free software, distributed under the [ISC license](https://opensource.org/licenses/ISC).