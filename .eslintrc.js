// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  globals: {
    'BASEDIR': true,
    'CONTROLLERS': true,
    'MODELS': true,
    'PROXY': true,
    'RETURNSUCCESS': true,
    'RETURNFAIL': true
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'eol-last': 0,
    'new-cap': 0
  }
}
