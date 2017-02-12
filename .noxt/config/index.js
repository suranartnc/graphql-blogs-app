const customConfig = require('../../src/config')

module.exports = {
  development: Object.assign({
    isProduction: false,
    host: 'localhost',
    port: 3000,
    wdsPort: 3001,
    apiHost: 'localhost',
    apiPort: 3002
  }, customConfig.development),
  production: Object.assign({
    isProduction: true,
    host: 'localhost',
    port: process.env.PORT || 3000,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3002
  }, customConfig.production)
}[process.env.NODE_ENV || 'development']
