const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: path.join(__dirname, '..', 'test/index.ts'),
  mode: 'none',
  devtool: 'inline-source-map',
  output: {
    filename: 'test.js'
  }
});
