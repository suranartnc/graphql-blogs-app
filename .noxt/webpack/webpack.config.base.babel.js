import path from 'path'

export default {
  output: {
    path: path.join(process.cwd(), 'static', 'build'),
  },

  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
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
