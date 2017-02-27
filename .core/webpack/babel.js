const path = require('path');
const getCSSOptions = require('./utils/getCSSOptions')
const getImagesOptions = require('./utils/getImagesOptions')

const config = require('../config')

module.exports = function() {
  return {

    output: {
      publicPath: process.env.NODE_ENV === 'production' ? '/build/' : `http://${config.host}:${config.wdsPort}/build/`,
      libraryTarget: 'commonjs2',
    },

    module: {
      loaders: [
        ...getCSSOptions('development'),
        ...getImagesOptions(process.env.NODE_ENV),
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
        }
      ],
    },
  }
}
