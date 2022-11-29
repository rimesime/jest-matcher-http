# Description
Jest Expect Matcher for HTTP requests.

# Setup

Install the package:

``npm install --save-dev jest-matcher-http``

Add this package to your `jest.config.js`:

```json
  // The path to a module that runs some
  // code to configure or set up the testing
  // framework before each test
  setupFilesAfterEnv: ['jest-matcher-http'],
```

# Usage

```javascript
const superagentDefaults = require('superagent-defaults');
const supertest = require('supertest');
const request = superagentDefaults(
  supertest('www.the-host.com'),
);

describe('Example', () => {
    it('should accept empty object', async () => {
      const response = await request
        .post('/v1/messages')
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

# Working with the Repository

This repository uses conventional commits that are validated using `git-conventional-commits`. To validate this automatically, git-hooks need to be enabled manually after cloning this repository:

``git config core.hooksPath .git-hooks``