module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    'shared-node-browser': true,
  },
  rules: {
    'vue/max-attributes-per-line': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  globals: {
    process: true,
  },
  overrides: [
    {
      files: ['server.js', 'build/*.js'],
      env: {
        'shared-node-browser': false,
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
}
