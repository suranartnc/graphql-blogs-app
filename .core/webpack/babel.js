const path = require('path');
const getCSSOptions = require('./utils/getCSSOptions')
const getImagesOptions = require('./utils/getImagesOptions')

module.exports = function() {
  return {

    output: {
      publicPath: '/build/',
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [
        ...getCSSOptions('development'),
        ...getImagesOptions(process.env.NODE_ENV),
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
        }
      ],
    },
  }
}
