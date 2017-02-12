const path = require('path');
const getBabelOptions = require('./utils/getBabelOptions')

module.exports = function() {
  return {
    name: 'browser',

    output: {
      publicPath: '/build/',
      path: path.join(process.cwd(), 'static', 'build'),
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules|\.git/,
          loader: 'babel-loader',
          options: getBabelOptions('production'),
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
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        }
      ],
    },

    resolve: {
      extensions: [
        '.json',
        '.js',
      ],
    },

    plugins: [],
  }
}
