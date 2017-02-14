const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /.scss$/,
        loader: 'style!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap',
        include: [path.join(process.cwd(), 'src/app/styles')]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?name=images/[name].[ext]?[hash:8]'
      }
    ]
  }
}