'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let COMPONENT_FILE = 'react-hash-tabs';
const plugins = [];
const babelOptions = {};

if (process.env.MINIFY) {
  plugins.push(new UglifyJsPlugin({ sourceMap: true }));
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));
  COMPONENT_FILE += '.min';
} else {
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }));
}

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: COMPONENT_FILE + '.js',
    path: path.join(__dirname, 'dist'),
    library: 'ReactHashTabs',
    libraryTarget: 'umd',
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'classnames': {
      root: 'classNames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ],
  },
  plugins: plugins,
  devtool: 'source-map',
};
