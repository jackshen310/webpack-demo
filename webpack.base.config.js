const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 使用参考：https://www.npmjs.com/package/mini-css-extract-plugin

console.log('dddd', process.env.NODE_ENV);
module.exports = {
  entry: {
    index: './scripts/index.jsx', //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  output: {
    filename: '[name].bundle.[hash].js', //输出文件名，[name]表示入口文件js名
    path: path.join(__dirname, 'dist'), //输出文件路径
    chunkFilename: '[name].bundle.[hash].js',
    publicPath: '/', // 指定资源路径，所有的按需加载的资源都从根路径开始找， https://webpack.js.org/guides/public-path/
  },
  // ResolveLoader 用于配置 Webpack 如何寻找 Loader。
  // 默认情况下只会去 node_modules 目录下寻找，为了让 Webpack 加载放在本地项目中的 Loader 需要修改 resolveLoader.module
  resolveLoader: {
    modules: ['node_modules', 'loaders'], // 在./loaders目录下查找自定义loader
  },
  resolve: {
    // import时可以忽略文件后缀，例如 import App from './App', 而不需要 './App.jsx'
    extensions: ['.js', '.jsx'],
  },
  module: {
    // 链式loader执行顺序从右至左或者自下而上
    rules: [
      {
        // react loader
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 替换style-loader
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          {
            // 自定义loader
            loader: 'my-loader',
            options: {
              arg: 'test',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件名
      template: './index.html', // 以当前目录下的index.html文件为模板生成dist/index.html文件
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.BannerPlugin({
      banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]',
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '.', 'dll'),
      manifest: require('./dll/manifest.json'),
    }),
    // new NameAllModulesPlugin(),
  ],
  // 参数说明：https://imweb.io/topic/5b66dd601402769b60847149
  // https://juejin.im/post/5b304f1f51882574c72f19b0
  /**
   * 内置的代码切分的规则是这样的：
   * 新 bundle 被两个及以上模块引用，或者来自 node_modules
   * 新 bundle 大于 30kb （压缩之前）
   * 异步加载并发加载的 bundle 数不能大于 5 个
   * 初始加载的 bundle 数不能大于 3 个
   * chunks: 'all'|'async'|'initial'，分别代表了全部 chunk，按需加载的 chunk 以及初始加载的 chunk。chunks 也可以是一个函数
   */
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // 抽离自己写的公共代码，例如 show.js这个被多个组件引用了，所以会单独成一个common.js
          chunks: 'async', //
          name: 'common', // 打包后的文件名，任意命名
          minChunks: 2, //最小引用2次
          minSize: 0, // 只要超出0字节就生成一个新包
          priority: 2,
        },
        vendor: {
          // 抽离第三方插件,例如React
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        lodash: {
          // 演示：将lodash库单独成一个chunk
          test: /node_modules\/lodash/,
          chunks: 'all', // 默认 Webpack 4 只会对按需加载的代码做分割。如果我们需要配置初始加载的代码也加入到代码分割中，可以设置 splitChunks.chunks 为 'all'
          name: 'lodash', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 20,
        },
      },
    },
  },
};
