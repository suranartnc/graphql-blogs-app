const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = function(env) {
  return {
    entry: {
      react: [
        'react',
        'react-dom',
        'react-helmet',
        'react-redux',
        'react-router',
        'react-router-redux',
        'react-router-scroll',
        'react-apollo',
        'recompose',
        'redux',
      ],
      utils: [
        'apollo-client',
        'classnames',
        'es6-promise',
        'graphql-tag',
        'immutability-helper',
        'isomorphic-fetch',
      ],
    },

    output: {
      filename: 'vendor-[name]-[hash].js',
      path: path.join(process.cwd(), 'static', 'build'),
      library: '[name]_lib',
    },

    plugins: [
      new AssetsPlugin({
        filename: 'assets-vendors.json',
        path: path.join(process.cwd(), 'static', 'build'),
        prettyPrint: true,
      }),
      new webpack.DllPlugin({
        path: path.join(process.cwd(), 'static', 'build', 'vendor-[name]-manifest.json'),
        name: '[name]_lib',
      }),
    ],
  }
}
