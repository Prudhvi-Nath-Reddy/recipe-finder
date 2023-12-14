const path = require('path');

module.exports = {
  // ... other configuration options ...

  resolve: {
    fallback: {
      util: require.resolve('util/'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    },
  },

  // ... other configuration options ...
};
