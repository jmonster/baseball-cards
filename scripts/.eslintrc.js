module.exports = {
  globals: {
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'standard'
  ],
  env: {
    browser: false,
    node: true
  },
  rules: {
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
    'space-before-function-paren': ['error',
      {
        'asyncArrow': 'always',
        'named': 'never',
        'anonymous': 'ignore'
      }
    ]
  }
};
