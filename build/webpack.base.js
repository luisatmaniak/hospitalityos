const webpack = require('webpack')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const root = path.resolve(__dirname, '..')

const webpackConfig = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(root, 'dist'),
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[id].[chunkhash].js' : undefined,
    publicPath: '/dist/',
    jsonpFunction: 'mnkjsp',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: false && process.env.VUE_ENV === 'client' && isProd,
          preserveWhitespace: false,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV),
    }),

    new FriendlyErrorsPlugin(),

    // compat for webpack 4
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd(),
      },
    }),
  ],
}

module.exports = webpackConfig
