const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: 'src/index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ],
        include: [
          path.resolve(__dirname, '..', 'src'),
          path.resolve(__dirname, '..', 'test')
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [new Dotenv()],
  output: {
    path: path.resolve(__dirname, '..', 'dist')
  }
};
