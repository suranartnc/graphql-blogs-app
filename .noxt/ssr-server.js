if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('../static/assets.json')) // eslint-disable-line global-require
}

require('./server/ssr-server')
