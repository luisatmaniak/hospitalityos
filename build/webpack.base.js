const webpack = require("webpack");
const path = require("path");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const root = path.resolve(__dirname, "..");

const webpackConfig = {
  mode: isProd? "production" : "development",
  output: {
    path: path.resolve(root, "dist"),
    filename: isProd ? "[name].[chunkhash].js" : "[name].js",
    chunkFilename: isProd ? "[id].[chunkhash].js" : undefined,
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: false && isProd,
          preserveWhitespace: false
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"]
  },
  plugins: [
    new FriendlyErrorsPlugin(),

    // compat for webpack 4
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd()
      }
    })
  ]
};

// disable for webpack 4
if (false && isProd) {
  const ExtractTextPlugin = require("extract-text-webpack-plugin");

  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new ExtractTextPlugin({ filename: "common.[chunkhash].css" })
  ]);
}

module.exports = webpackConfig;
