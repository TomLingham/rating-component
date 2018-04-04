'use strict';

const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = require('./webpack.config.base');

module.exports.output.filename = '[name].[hash].js';

module.exports.mode = 'production';

module.exports.plugins = [new ManifestPlugin()];
