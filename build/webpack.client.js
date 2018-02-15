const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseWebpackConfig = require('./webpack.base')

const root = path.resolve(__dirname, '..')
const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = merge(baseWebpackConfig, {
  entry: path.resolve(root, 'src/entry-client.js'),

  devtool: !isProd && '#cheap-module-eval-source-map',

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },

  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
  ],

  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false,
  },
})

if (isProd) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'mnk',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/],
    }),
  ])
}

module.exports = webpackConfig
