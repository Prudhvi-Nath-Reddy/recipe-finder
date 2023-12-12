// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['C:/recipe-finder/frontend/src/setupTests.js'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  };
  