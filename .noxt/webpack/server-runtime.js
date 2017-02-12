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
            name: env === 'dev' ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          },
        }
      ]
    },
  })
}
