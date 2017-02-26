if (process.env.NODE_ENV === 'production' && process.env.USE_BUNDLE) {
  require('source-map-support').install({
    environment: 'node'
  })
  require('../../server.bundle.js')
} else {
  const getBabelOptions = require('../webpack/utils/getBabelOptions')
  require('babel-register')(getBabelOptions('server-runtime')[0].options)
  require('./ssr-server')
}
