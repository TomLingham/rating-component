'use strict';

const path = require('path');

module.exports = require('./webpack.config.base');

module.exports.mode = 'development';

module.exports.serve = {
  content: path.resolve(__dirname, '..', 'public'),
  port: 8080,
};
