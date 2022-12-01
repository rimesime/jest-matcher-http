'use strict';

const matchers = require('./index');

describe('index', () => {
  it('should add matchers', () => {
    expect(expect.toReturnHttpCode).toBeDefined();
    expect(expect.toReturnHttpHeader).toBeDefined();
  });

  it('should export matchers', () => {
    expect(matchers.toReturnHttpCode).toBeDefined();
    expect(matchers.toReturnHttpHeader).toBeDefined();
  });
});
