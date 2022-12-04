const path = require('path');

module.exports = {
  entry: './source/main.js',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'main.bundle.js',
  },
};
