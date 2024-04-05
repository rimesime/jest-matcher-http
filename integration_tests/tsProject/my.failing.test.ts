// For real projects, use:
// import 'jest-matcher-http';
// Since this is a integration test project, living in the main
// package, we have to import the main package with a relative path.
import '../../';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

const { runAgainstServer } = require('../localServer.int.helper');

describe('matchers', () => {
  let request: AxiosInstance;
  let response: AxiosResponse;

  test('should always fail', async () => {
    await runAgainstServer(async (url: string) => {
      request = axios.create({ baseURL: url });
      response = await request.get('/get-json');
    });

    expect(response).toReturnHttpCode(500);
    expect(response).toReturnHttpHeader('non-existing', 'Header');
  });
});