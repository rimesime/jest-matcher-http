'use strict';

/**
 * Extract the result from the response.
 *
 * @param {object} response - The response of the request.
 * @returns {object} The result. Empty string if no result found.
 */
function extractResult(response) {
  if (response.data) {
    return response.data;
  }

  if (response.text && response.text !== JSON.stringify(response.body)) {
    return response.text;
  }

  if (response.body) {
    return response.body;
  }

  return '';
}

/**
 * Expect a http request to return given http status code.
 * Log response body and headers otherwise.
 *
 * @param {object} response - The response of the request.
 * @param {number} expectedHttpStatusCode - The expected http status code.
 * @returns {{message: Function, pass: boolean}} The expect result according to jest.
 * @see {@link https://jestjs.io/docs/expect#expectextendmatchers}
 */
function toReturnHttpCode(response, expectedHttpStatusCode) {
  const result = extractResult(response);
  const status = response.status ?? response.statusCode;
  const { headers } = response;

  const pass = status === expectedHttpStatusCode;

  return {
    pass,
    message: () => `expected http status code ${status}${pass ? ' not' : ''} `
      + `to equal ${expectedHttpStatusCode}\n\n`
      + `server responded with body:\n${JSON.stringify(result, null, 2)}\n\n`
      + `server responded with headers:\n${JSON.stringify(headers, null, 2)}`,
  };
}

/**
 * Expect a http request to return the given http header.
 * Log response body and headers otherwise.
 *
 * @param {object} response - The response of the request.
 * @param {string} headerField - The expected http header field.
 * @param {string} headerValue - The expected http header value.
 * @returns {{message: Function, pass: boolean}} The expect result according to jest.
 * @see {@link https://jestjs.io/docs/expect#expectextendmatchers}
 */
function toReturnHttpHeader(response, headerField, headerValue) {
  const result = extractResult(response);
  const { headers } = response;
  const headerFieldLowerCase = headerField.toLowerCase();

  const pass = headers[headerFieldLowerCase] === headerValue;

  return {
    pass,
    message: () => `expected http header "${headerFieldLowerCase}"`
      + `${pass ? ' not' : ''} to have value "${headerValue}"\n\n`
      + `server responded with body:\n${JSON.stringify(result, null, 2)}\n\n`
      + `server responded with headers:\n${JSON.stringify(headers, null, 2)}`,
  };
}

module.exports = {
  toReturnHttpCode,
  toReturnHttpHeader,
};
