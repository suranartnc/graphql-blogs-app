const path = require('path');

module.exports = function() {
  return {

    output: {
      publicPath: '/build/',
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [
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
                includePaths: [
                  path.join(process.cwd(), '.core/app/styles'),
                  path.join(process.cwd(), 'src/app/styles')
                ],
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            name: 'images/min/[name]-[hash:8].[ext]',
          }
        },
      ],
    },
  }
}
