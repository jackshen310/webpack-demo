const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const fallback = require('express-history-api-fallback');

// http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-18%E4%BD%BF%E7%94%A8WebpackDevMiddleware.html
webpackConfig.entry = ['webpack-hot-middleware/client?noInfo=true&reload=true', './scripts/index.jsx'];

// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(webpackConfig);
// 给 app 注册 webpackMiddleware 中间件
app.use(
  webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true, //向控制台显示任何内容
  })
);
// 为了支持模块热替换，响应用于替换老模块的资源
app.use(require('webpack-hot-middleware')(compiler));
// 把项目根目录作为静态资源目录，用于服务 HTML 文件
app.use(express.static('./dist'));
app.use(fallback('index.html', { root: './dist' }));
// 启动 HTTP 服务器，服务器监听在 3000 端口
app.listen(9090);
