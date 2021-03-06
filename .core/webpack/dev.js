const path = require('path');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');

const config = require('../config');
const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')
const getCSSOptions = require('./utils/getCSSOptions')
const getImagesOptions = require('./utils/getImagesOptions')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    cache: true,

    devtool: 'cheap-module-source-map',

    entry: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://${config.host}:${config.wdsPort}/__webpack_hmr`,
      path.join(process.cwd(), 'src/app/styles/global/app.scss'),
      path.join(process.cwd(), '.core/app/app.dev.js'),
    ],

    output: {
      publicPath: `http://${config.host}:${config.wdsPort}/build/`,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },

    module: {
      loaders: [
        ...getBabelOptions('development'),
        ...getImagesOptions('development'),
        ...getCSSOptions('development')
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
        manifest: require('../../static/build/vendor-ddl-manifest.json'),
      }),
    ],

    performance: {
      hints: false
    }
  })
}
