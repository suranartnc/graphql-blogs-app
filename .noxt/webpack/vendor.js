const path = require('path');
const webpack = require('webpack');

module.exports = function(env) {
  return {
    entry: {
      react: [
        'es6-promise',
        'isomorphic-fetch',
        'react',
        'react-css-modules',
        'react-dom',
        'react-helmet',
        'react-redux',
        'react-router',
        'react-router-redux',
        'react-router-scroll',
        'redux',
        'apollo-client',
        'graphql-tag',
        'immutability-helper',
        'react-apollo'
      ],
    },

    output: {
      filename: 'vendor-[name].js',
      path: path.join(process.cwd(), 'static', 'build'),
      library: '[name]_lib',
    },

    plugins: [
      new webpack.DllPlugin({
        path: path.join(process.cwd(), 'static', 'build', '[name]-manifest.json'),
        name: '[name]_lib',
      }),
    ],
  }
}
