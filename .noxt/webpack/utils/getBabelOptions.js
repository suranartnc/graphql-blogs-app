module.exports = function (env) {
  return {
    development: [
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ],
    production: [
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader'
      }
    ]
  }[env || 'development']
}
