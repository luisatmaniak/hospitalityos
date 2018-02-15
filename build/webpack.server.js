const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const baseWebpackConfig = require("./webpack.base");

const root = path.resolve(__dirname, "..");

const webpackConfig = merge(baseWebpackConfig, {
  target: "node",

  entry: path.resolve(root, "src/entry-server.js"),

  devtool: "#source-map",

  output: {
    path: path.resolve(root, "dist/.server"),
    filename: "server.bundle.js",
    libraryTarget: "commonjs2"
  },

  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/
  }),

  plugins: [new VueSSRServerPlugin()],

  performance: {
    hints: false
  }
});

module.exports = webpackConfig;
