const path = require('path');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');

const config = require('../config');
const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    cache: true,

    devtool: 'cheap-module-source-map',

    entry: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://${config.host}:${config.wdsPort}/__webpack_hmr`,
      path.join(process.cwd(), 'src/app/styles/global/app.scss'),
      path.join(process.cwd(), '.noxt/app/app.dev.js'),
    ],

    output: {
      publicPath: `http://${config.host}:${config.wdsPort}/build/`,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },

    module: {
      loaders: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            name: env === 'dev' ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          },
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          BROWSER: JSON.stringify(true),
        },
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('../../static/build/react-manifest.json'),
      }),
    ],

    performance: {
      hints: false
    }
  })
}
