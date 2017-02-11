import path from 'path'

module.exports = function() {
  return {
    name: 'browser',

    output: {
      path: path.join(process.cwd(), 'static', 'build'),
    },

    module: {
      loaders: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        }
      ],
    },

    resolve: {
      extensions: [
        '.json',
        '.js',
      ],
    },

    plugins: [],
  }
}
