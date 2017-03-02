const path = require('path')

module.exports = {

  devtool: 'cheap-module-source-map',

  module: {
    loaders: [
      {
        test: /.scss$/,
        loader: 'style!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?name=images/[name].[ext]?[hash:8]'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.join(process.cwd(), '.core/app/styles'),
      path.join(process.cwd(), 'src/app/styles')
    ]
  }
}
