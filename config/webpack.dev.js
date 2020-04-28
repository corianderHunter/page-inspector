const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  entry: {
    record: path.join(__dirname, '..', 'src/record.ts'),
    replay: path.join(__dirname, '..', 'src/replay.ts')
    // 'record-min': path.join(__dirname, '..', 'src/record.ts'),
    // 'replay-min': path.join(__dirname, '..', 'src/replay.ts')
  },
  mode: 'development',
  devtool: 'source-map',

  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    sourceMapFilename: '[name].map'
  }
});
