const path = require('path');
const express = require('express');

const cors = require('cors');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack/webpack.config.js');
const config = require('../config');

const webpackDevConfig = webpackConfig('dev');

const app = express();

if (!config.isProduction) {
  app.use(cors())
}

app.use(express.static(path.join(process.cwd(), 'static')));

if (!config.isProduction) {
  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.listen(config.wdsPort, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Webpack Dev Server listening on ${config.host}:${config.wdsPort}`);
})
