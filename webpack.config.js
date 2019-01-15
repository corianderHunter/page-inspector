const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const spinner = ora('building for production...')
spinner.start()

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
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
    plugins: []
  };

  if (uglify) {
    config.plugins.push(
      new UglifyJSPlugin()
    );
  }

  return config;
}

['recorder', 'recorder.min'].forEach(function (key) {
  webpack(generateConfig(key), (err, stats) => {
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
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })

});