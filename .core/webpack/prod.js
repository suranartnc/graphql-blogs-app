const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')
const getCSSOptions = require('./utils/getCSSOptions')
const getImagesOptions = require('./utils/getImagesOptions')
const getVendors = require('./utils/getVendors')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    entry: {
      vendor: getVendors(),
      app: [
        path.join(process.cwd(), 'src/app/styles/global/app.scss'),
        path.join(process.cwd(), '.core/app/app.prod.js'),
      ],
    },

    output: {
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].chunk.js',
    },

    module: {
      loaders: [
        ...getBabelOptions('production'),
        ...getImagesOptions('production'),
        ...getCSSOptions('production')
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          BROWSER: JSON.stringify(true),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
      new AssetsPlugin({
        filename: 'assets.json',
        path: path.join(process.cwd(), 'static', 'build'),
        prettyPrint: true,
      }),
      new ExtractTextPlugin({
        filename: '[name]-[contenthash].css',
        allChunks: true,
      }),
      new webpack.LoaderOptionsPlugin({
        test: /\.scss$/,
        options: {
          context: process.cwd(),
          postcss: [
            autoprefixer({ browsers: ['last 2 versions', 'IE >= 10'] }),
          ],
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      new ProgressBarPlugin()
    ],

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    }
  })
}
