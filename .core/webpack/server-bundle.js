const path = require('path');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')
const getCSSOptions = require('./utils/getCSSOptions')
const getImagesOptions = require('./utils/getImagesOptions')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    devtool: 'source-map',

    target: 'node',

    node: {
      __filename: true,
      __dirname: true,
    },

    entry: [
      path.join(process.cwd(), '.core/server/ssr-server.js'),
    ],

    output: {
      path: path.join(process.cwd()),
      filename: 'server.bundle.js'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
           presets: [
              [
                "env",
                {
                  "targets": {
                    "node": "current"
                  }
                }
              ],
              "stage-1"
            ],
            plugins: [
              [
                'babel-plugin-webpack-loaders', {
                  'config': './.core/webpack/server.js',
                  "verbose": false
                }
              ],
              "lodash",
              "transform-ensure-ignore",
              "transform-react-constant-elements",
              "transform-react-remove-prop-types",
              "transform-react-pure-class-to-function"
            ]
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        }
      ]
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
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
    ],

    externals: [nodeExternals()]
  })
}
