import path from 'path'
import webpack from 'webpack'
import webpackBaseConfig from './webpack.config.base.babel'
import config from '../config'

export default {
  ...webpackBaseConfig,

  name: 'SSR server',
  entry: path.join(process.cwd(), '.noxt/server/ssr-server.js'),
  target: 'node',

  output: {
    publicPath: '/',
    filename: 'server_bundle.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    ...webpackBaseConfig.module,
    rules: [
      ...webpackBaseConfig.module.rules,
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
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
    })
  ]
}
