const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const MyPlugin = require('./plugins/MyPlugin');
const AutoRunElectronPlugin = require('./plugins/AutoRunElectronPlugin');
const config = require('./config/dev');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // sourceMap https://blog.csdn.net/liwusen/article/details/79414508
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(config.mode),
    // }),
    new webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
    new MyPlugin(),
    // http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-12%E6%9E%84%E5%BB%BAElectron%E5%BA%94%E7%94%A8.html
    // setInterval(() => document.querySelector('.gitbook-plugin-modal').style.width = 0, 1000)
    new AutoRunElectronPlugin(),
  ],
  profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳
  // http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-6DevServer.html
  devServer: {
    inline: false, //打包后加入一个websocket客户端
    hot: true, //热加载
    contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
    host: '0.0.0.0', //主机地址
    port: config.port, //端口号
    compress: true, //开发服务器是否启动gzip等压缩
    historyApiFallback: true,
  },
  // http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-7%E5%85%B6%E5%AE%83%E9%85%8D%E7%BD%AE%E9%A1%B9.html
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每隔1000毫秒询问一次
    poll: 1000,
  },
});
