const path = require('path');
const webpack = require('webpack');

// 引入DLL https://www.webpackjs.com/plugins/dll-plugin/
module.exports = {
  mode: 'production',
  entry: {
    dll: ['react', 'react-dom', 'lodash'],
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'dll', 'manifest.json'),
    }),
  ],
};
