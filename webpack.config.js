const camelCase = require('camelcase');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));
const shouldMininimize = process.argv.indexOf('--min') !== -1;
var HtmlWebpackPlugin = require('html-webpack-plugin');

const standardConfig = {
  devtool: 'source-map',
  entry: './src/index.js',
    output: {
      path: './dist',
      filename: 'index.js'
    },
  module: {
    noParse: /node_modules\/knockout\/build\/output\/*.js/,
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file'
    }, {
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['babel-preset-es2015']
      }
    }]
  },
  devServer: {
    port: 8000,
    contentBase: 'src/',
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash:true,
      inject: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/index.min.js': './src/index.js'
  });
}

module.exports = standardConfig;
