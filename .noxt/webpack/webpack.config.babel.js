function buildConfig(env) {
  return require('./' + env + '.js').default({ env: env })
}

module.exports = buildConfig;
