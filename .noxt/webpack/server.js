const path = require('path');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    devtool: 'source-map',

    target: 'node',

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },

    entry: path.join(process.cwd(), '.noxt/server/ssr-server.js'),

    output: {
      path: path.join(process.cwd()),
      filename: 'server.bundle.js'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          BROWSER: JSON.stringify(false),
        },
      }),
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],

    externals: [nodeExternals()]
  })
}
