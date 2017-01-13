import path from 'path'
import webpack from 'webpack'

export default {
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
      'redux'
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
