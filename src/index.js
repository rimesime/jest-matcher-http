'use strict';

const { expect } = require('@jest/globals');
const { toReturnHttpCode, toReturnHttpHeader } = require('./matchers');

expect.extend({
  toReturnHttpCode,
  toReturnHttpHeader,
});
