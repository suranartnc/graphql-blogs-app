module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    extends: [
      'standard',
      'standard-react'
    ],
    plugins: [],
    'rules': {
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'jsx-quotes': ["error", "prefer-double"]
    }
}
