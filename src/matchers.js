'use strict';

/**
 * Expect a http request to return given http status code.
 * Log response body and headers otherwise.
 *
 * @param {{status: number, body: any, headers: any}} response - The response of the request.
 * @param {number} expectedHttpStatusCode - The expected http status code.
 * @returns {{message: Function, pass: boolean}} The expect result according to jest.
 * @see {@link https://jestjs.io/docs/expect#expectextendmatchers}
 */
function toReturnHttpCode(response, expectedHttpStatusCode) {
  const body = response.body ?? response.data;
  const { status, headers } = response;

  const pass = status === expectedHttpStatusCode;

  if (pass) {
    return { pass };
  }

  return {
    pass,
    message: () => `expected http status code ${status} to equal ${expectedHttpStatusCode}\n\n`
      + `server responded with body:\n${JSON.stringify(body, null, 2)}\n\n`
      + `server responded with headers:\n${JSON.stringify(headers, null, 2)}`,
  };
}

/**
 * Expect a http request to return the given http header.
 * Log response body and headers otherwise.
 *
 * @param {{body: any, headers: any}} response - The response of the request.
 * @param {string} headerField - The expected http header field.
 * @param {string} headerValue - The expected http header value.
 * @returns {{message: Function, pass: boolean}} The expect result according to jest.
 * @see {@link https://jestjs.io/docs/expect#expectextendmatchers}
 */
function toReturnHttpHeader(response, headerField, headerValue) {
  const body = response.body ?? response.data;
  const { headers } = response;
  const headerFieldLowerCase = headerField.toLowerCase();

  const pass = headers[headerFieldLowerCase] === headerValue;

  if (pass) {
    return { pass };
  }

  return {
    pass,
    message: () => `expected http header "${headerFieldLowerCase}" with value "${headerValue}"\n\n`
      + `server responded with body:\n${JSON.stringify(body, null, 2)}\n\n`
      + `server responded with headers:\n${JSON.stringify(headers, null, 2)}`,
  };
}

module.exports = {
  toReturnHttpCode,
  toReturnHttpHeader,
};
