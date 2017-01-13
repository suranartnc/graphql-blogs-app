import path from 'path'
import webpack from 'webpack'
import webpackBaseConfig from './webpack.config.base.babel'
import config from '../config'

export default {
  ...webpackBaseConfig,

  cache: true,
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://${config.host}:${config.wdsPort}/__webpack_hmr`,
    path.join(process.cwd(), 'src/app/styles/global/app.scss'),
    path.join(process.cwd(), '.noxt/app/app.dev.js'),
  ],

  output: {
    ...webpackBaseConfig.output,
    publicPath: `http://${config.host}:${config.wdsPort}/build/`,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  module: {
    ...webpackBaseConfig.module,
    rules: [
      ...webpackBaseConfig.module.rules,
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
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
    new webpack.HotModuleReplacementPlugin(),
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
}
