const webpackMerge = require('webpack-merge');

const commonConfig = require('./base');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    module: {
      loaders: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            name: 'images/[name].[ext]?[hash:8]',
          },
        }
      ]
    },
  })
}
