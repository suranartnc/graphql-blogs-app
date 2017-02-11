module.exports = function (env) {
  return {
    development: {
      cacheDirectory: true,
    },
    production: {
      babelrc: false,
      presets: [
        [
          'env',
          {
            targets: {
              node: "current"
            },
            modules: false,
            loose: true
          },
        ],
        'stage-1',
        'react',
      ],
      plugins: [
        'lodash',
        'transform-decorators-legacy',
        'transform-react-constant-elements',
        'transform-react-remove-prop-types',
        'transform-react-pure-class-to-function',
        ["module-resolver", {
          "root": ["./src"],
          "alias": {
            "noxt": "./.noxt/",
            "components": "./src/app/components",
            "hocs": "./src/app/hocs",
            "modules": "./src/app/modules",
            "pages": "./src/app/pages",
            "styles": "./src/app/styles",
            "utils": "./src/app/utils"
          }
        }]
      ]
    }
  }[env || 'development']
}
