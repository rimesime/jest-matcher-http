'use strict';

const { exec } = require('child_process');

describe('typescript project', () => {
  // eslint-disable-next-line jest/no-done-callback
  it('should successfully run jest tests of typescript project', (done) => {
    const cmd = 'cd integration_tests/tsProject && npx jest my.successful.test.ts';
    exec(cmd, (error) => {
      expect(error).toBeNull();
      done();
    });
  }, 30000);

  // eslint-disable-next-line jest/no-done-callback
  it('should let jest tests fail if tests failing', (done) => {
    const cmd = 'cd integration_tests/tsProject && npx jest my.failing.test.ts';
    exec(cmd, (error) => {
      expect(error?.code).toBe(1);
      expect(error?.message).toStrictEqual(
        expect.stringContaining('expected http status code 200 to equal 500'),
      );
      done();
    });
  }, 30000);
});
