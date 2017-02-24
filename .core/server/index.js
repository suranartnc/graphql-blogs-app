if (process.env.NODE_ENV === 'production' && process.env.USE_BUNDLE) {
  require('source-map-support').install({
    environment: 'node'
  })
  require('../../server.bundle.js')
} else {
  require('babel-register')({
    "presets": [
      [
        "env",
        {
          "targets": {
            "node": "current"
          }
        }
      ],
      "stage-1"
    ],
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./.core/webpack/server.js",
          "verbose": false
        }
      ],
      "transform-ensure-ignore",
    ]
  })
  require('babel-polyfill')

  require('./ssr-server')
}
