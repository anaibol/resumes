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
    extensions: ['', '.jsx', '.css', '.js', '.json'],
  },
  // resolve: {
  //   modulesDirectories: ['node_modules', 'components']
  // },
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
    ],
  },
  // postcss: function () {
  //     return [require('autoprefixer'), require('precss')];
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new ExtractTextPlugin('index.css', {
    //   publicPath: '/css/',
    //   allChunks: true
    // })
  ]
}
