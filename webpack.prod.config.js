const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // https://www.cnblogs.com/steamed-twisted-roll/p/10990309.html
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('./config/dev');
// http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-4%E4%BD%BF%E7%94%A8ParallelUglifyPlugin.html
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(), // 删除dist目录
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(config.mode),
    // }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyES: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          // drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
      },
    }),
  ],
});
