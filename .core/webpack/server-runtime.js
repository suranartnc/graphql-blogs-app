const webpackMerge = require('webpack-merge');

const commonConfig = require('./base');
const getBabelOptions = require('./utils/getBabelOptions')
const getCSSOptions = require('./utils/getCSSOptions')
const getImagesOptions = require('./utils/getImagesOptions')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    module: {
      loaders: getImagesOptions('development').concat(getCSSOptions('development'))
    },
  })
}
