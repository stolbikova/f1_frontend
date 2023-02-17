const webpack = require('webpack');
const { isDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  isDev() && new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
].filter(Boolean);
