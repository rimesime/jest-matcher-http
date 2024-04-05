'use strict';

module.exports = {
  preset: 'ts-jest',
  // For real projects, use:
  // setupFilesAfterEnv: ['jest-matcher-http'],
  // Since this is a integration test project, living in the main
  // package, we have to import the main package with a relative path.
  setupFilesAfterEnv: ['../../'],
};
