const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const MyPlugin = require('./plugins/MyPlugin');
const config = require('./config/dev');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(config.mode),
    // }),
    new webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
    new MyPlugin(),
  ],
  devServer: {
    inline: true, //打包后加入一个websocket客户端
    hot: true, //热加载
    contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
    host: 'localhost', //主机地址
    port: config.port, //端口号
    compress: true, //开发服务器是否启动gzip等压缩
  },
});
