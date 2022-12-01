'use strict';

const { expect } = require('@jest/globals');
const matchers = require('./matchers');

expect.extend(matchers);

module.exports = matchers;
