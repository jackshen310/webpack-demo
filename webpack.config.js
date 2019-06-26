const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入html-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // https://www.cnblogs.com/steamed-twisted-roll/p/10990309.html
const MyPlugin = require('./plugins/MyPlugin');

module.exports = {
    entry: {
        index: "./scripts/index.jsx" //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
    },
    output: {
        filename: "[name].bundle.[hash].js",//输出文件名，[name]表示入口文件js名
        path: path.join(__dirname, "dist"),//输出文件路径
        chunkFilename: "[name].bundle.[hash].js"
    },
    // ResolveLoader 用于配置 Webpack 如何寻找 Loader。 
    // 默认情况下只会去 node_modules 目录下寻找，为了让 Webpack 加载放在本地项目中的 Loader 需要修改 resolveLoader.module
    resolveLoader: {
        modules: ['node_modules', 'loaders'] // 在./loaders目录下查找自定义loader
    },
    module: {
        // 链式loader执行顺序从右至左或者自下而上
        rules: [
            { // react loader
                test: /\.(js|jsx)?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'my-loader',
                    options: {
                        arg: 'test'
                    }
                }]
            }, {
                test: /\.scss$/,
                // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        // 给 css-loader 传入配置项
                        options: {
                            minimize: true,
                        }
                    },
                    'sass-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', //输出文件名
            template: './index.html' // 以当前目录下的index.html文件为模板生成dist/index.html文件
        }),
        new CleanWebpackPlugin(), // 删除dist目录
        new webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
        new MyPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {  // 抽离自己写的公共代码
                    chunks: "initial",
                    name: "common", // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                },
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
            }
        }
    },
    devServer: {
        inline: true,//打包后加入一个websocket客户端
        hot: true,//热加载
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 9090,//端口号
        compress: true//开发服务器是否启动gzip等压缩
    }
}