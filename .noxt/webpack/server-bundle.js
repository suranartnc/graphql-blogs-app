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
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },

    entry: [
      path.join(process.cwd(), 'src/app/styles/global/app.scss'),
      path.join(process.cwd(), '.noxt/server/ssr-server.js'),
    ],

    output: {
      filename: '../../server.bundle.js'
    },

    module: {
      loaders: getBabelOptions('production').concat(getImagesOptions('production')).concat(getCSSOptions('production'))
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
      new webpack.LoaderOptionsPlugin({
        test: /\.scss$/,
        options: {
          context: process.cwd(),
          postcss: [
            autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
          ],
        },
      }),
      new ExtractTextPlugin({
        filename: '[name]-[contenthash].css',
        allChunks: true,
      })
    ],

    externals: [nodeExternals()]
  })
}
