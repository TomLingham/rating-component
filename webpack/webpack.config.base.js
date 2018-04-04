'use strict';

const path = require('path');

module.exports = {
  entry: {
    app: ['@babel/polyfill', path.resolve(__dirname, '..', 'src', 'index.js')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [],
};
