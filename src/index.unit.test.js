'use strict';

describe('index', () => {
  it('should add matchers', () => {
    expect(expect.toReturnHttpCode).toBeDefined();
    expect(expect.toReturnHttpHeader).toBeDefined();
  });
});
