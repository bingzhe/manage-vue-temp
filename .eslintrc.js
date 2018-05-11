// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [2, 2, { 'SwitchCase': 1 }], //缩进风格
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": ["error"],
    "no-empty": 2,
    "no-eq-null": 2,
    "no-new": 0,
    "no-fallthrough": 0,
    "no-unreachable": 0,
    'no-undef': 2,
    'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
  }
}
