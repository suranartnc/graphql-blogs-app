module.exports = function (env) {
  return {
    "server-bundle": [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
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
          plugins: [
            [
              'babel-plugin-webpack-loaders', {
                'config': './.core/webpack/server.js',
                "verbose": false
              }
            ],
            "lodash",
            "transform-ensure-ignore",
            "transform-react-constant-elements",
            "transform-react-remove-prop-types",
            "transform-react-pure-class-to-function"
          ]
        },
      }
    ],
    development: [
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
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
          plugins: ["transform-ensure-ignore"]
        }
      }
    ],
    production: [
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "env",
              {
                "targets": {
                  "browsers": ["last 2 versions", "IE >= 10"]
                },
                "modules": false,
                "loose": true
              }
            ],
            "stage-1"
          ],
          plugins: [
            [
              "lodash",
              {
                "id": ["lodash", "recompose"]
              }
            ],
            "transform-react-constant-elements",
            "transform-react-remove-prop-types",
            "transform-react-pure-class-to-function"
          ]
        }
      }
    ]
  }[env || 'development']
}
