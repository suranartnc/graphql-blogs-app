module.exports = function (env) {
  return {
    development: {
      cacheDirectory: true,
    },
    production: {}
  }[env || 'development']
}
