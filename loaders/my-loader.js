const loaderUtils = require('loader-utils');

module.exports = function (source) {
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换

    console.log('my-loader', source);
    // 获取到用户给当前 Loader 传入的 options
    const options = loaderUtils.getOptions(this);
    console.log('options', options);

    return source;
};