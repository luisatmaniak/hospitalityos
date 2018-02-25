module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-stage-3',
  ],
  plugins: ['jsx-vue-functional', 'transform-vue-jsx'],
}
