const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    entry: [
      path.join(process.cwd(), 'src/app/styles/global/app.scss'),
      path.join(process.cwd(), '.noxt/app/app.prod.js'),
    ],

    output: {
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].chunk.js',
    },

    module: {
      loaders: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
          }),
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  importLoaders: 2,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  minimize: true,
                },
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                query: {
                  includePaths: [path.join(process.cwd(), 'src/app/styles')],
                },
              },
            ],
          }),
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loaders: [
            {
              loader: 'file-loader',
              query: {
                name: env === 'dev' ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
              }
            },
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 4,
                },
                pngquant: {
                  quality: '75-90',
                  speed: 3,
                },
              },
            }
          ],
        },
      ],
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
        path: path.join(process.cwd(), 'static'),
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
            autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
          ],
        },
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('../../static/build/react-manifest.json'),
      }),
      new ProgressBarPlugin(),
    ],

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    }
  })
}
