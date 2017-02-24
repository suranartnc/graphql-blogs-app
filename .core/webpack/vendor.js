const path = require('path');
const webpack = require('webpack');

const getVendors = require('./utils/getVendors')

module.exports = function(env) {
  return {
    entry: getVendors(),

    output: {
      filename: 'vendor-ddl.js',
      path: path.join(process.cwd(), 'static', 'build'),
      library: 'vendor_lib',
    },

    plugins: [
      new webpack.DllPlugin({
        path: path.join(process.cwd(), 'static', 'build', 'vendor-ddl-manifest.json'),
        name: 'vendor_lib',
      }),
    ],
  }
}
