module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    camelcase: 'off',
    'object-curly-spacing': 'off',
    'no-inner-declarations': 'off',
    'no-tabs': 'off',
    'no-undef': 'off',
    'no-multiple-empty-lines': 0
  }
}
