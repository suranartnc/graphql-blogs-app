import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

import webpackBaseConfig from './webpack.config.base.babel'
import config from '../config'

export default {
  ...webpackBaseConfig,

  name: 'SSR server',

  devtool: 'source-map',

  entry: path.join(process.cwd(), '.noxt/server/ssr-server.js'),
  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  output: {
    publicPath: '/',
    filename: 'server.bundle.js'
  },

  module: {
    ...webpackBaseConfig.module,
    rules: [
      ...webpackBaseConfig.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  node: "current"
                },
                modules: false,
                loose: true
              },
            ],
            'stage-1',
            'react',
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
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.join(process.cwd(), 'src/app/styles')],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(false),
      },
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],

  externals: [nodeExternals()]
}
