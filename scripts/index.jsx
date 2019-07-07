import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
require('./index.css');
// 或者指定loader http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html
// require('style-loader!css-loader?minimize!./index.css');

ReactDOM.render(<App />, document.getElementById('root'));

// if (navigator.serviceWorker) {
//   window.addEventListener('DOMContentLoaded', function() {
//     // 调用  serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径
//     navigator.serviceWorker.register('/sw.js');
//   });
// }

// 热更新
if (module.hot) {
  module.hot.accept();
}
