const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // https://www.cnblogs.com/steamed-twisted-roll/p/10990309.html
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('./config/dev');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(), // 删除dist目录
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(config.mode),
    // }),
  ],
});
