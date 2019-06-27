const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const spinner = ora('building for production...')
spinner.start()

function generateConfig(source, outputName) {
  var uglify = outputName.indexOf('min') > -1;
  var config = {
    entry: source,
    output: {
      path: path.join(__dirname, 'dist'),
      filename: outputName + '.js',
      libraryTarget: 'umd',
      sourceMapFilename: outputName + '.map',
    },
    node: {
      process: true
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
    },
    devtool: 'source-map',
    plugins: [
      new Dotenv()
    ]
  };

  if (uglify) {
    config.plugins.push(
      new UglifyJSPlugin()
    );
  }

  return config;
}

let configs = [{
  source: './src/record.js',
  outputName: ['page-record', 'page-record.min']
}, {
  source: './src/replay.js',
  outputName: ['page-replay', 'page-replay.min']
}]

configs.forEach(val => {
  val.outputName.forEach(key => {
    webpack(generateConfig(val.source, key), (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
    })
  })
})