var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // context: __dirname + "/app",
  entry: [
   'webpack-dev-server/client?http://localhost:8080',
   'webpack/hot/only-dev-server',
   "./editor/app/app.js"
  ],
  devtool: 'source-map',
  resolve: {
    modulesDirectories: ['node_modules', './app'],
    extensions: ['', '.jsx', '.css', '.js', '.json']
  },
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
    publicPath: '/admin/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel"],
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      { test: /\.handlebars$/,
        loader: "handlebars"
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new ExtractTextPlugin('./assets/styles.css')
  ]
}
