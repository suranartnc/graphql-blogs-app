const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base');

module.exports = function(env) {
  return {

    entry: [
      path.join(process.cwd(), 'src/app/styles/global/app.scss'),
      path.join(process.cwd(), '.noxt/app/app.prod.js'),
    ],

    output: {
      publicPath: '/build/',
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].chunk.js',
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules|\.git/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'es2015',
                {
                  modules: false,
                  loose: true,
                },
              ],
              'react',
              'stage-0',
            ],
            plugins: [
              'lodash',
              'transform-decorators-legacy',
              'transform-react-constant-elements',
              'transform-react-remove-prop-types',
              'transform-react-pure-class-to-function',
              ["module-resolver", {
                "root": ["./src"],
                "alias": {
                  "noxt": "./.noxt/",
                  "components": "./src/app/components",
                  "hocs": "./src/app/hocs",
                  "modules": "./src/app/modules",
                  "pages": "./src/app/pages",
                  "styles": "./src/app/styles",
                  "utils": "./src/app/utils"
                }
              }]
            ],
          },
        },
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
          test: /\.(jpg|png|gif)$/,
          loaders: [
            'file-loader',
            'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
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
          warnings: false,
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
    ]
  }
}
