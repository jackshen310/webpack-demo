class MyPlugin {
  apply(compiler) {
    compiler.plugin('compilation', function(compilation) {
      // console.log('compilation...');
    });
    compiler.plugin('watch-run', (watching, callback) => {
      // 获取发生变化的文件列表
      // console.log('wtching', watching.watchFileSystem);
      const changedFiles = watching.watchFileSystem.watcher.mtimes;
      // changedFiles 格式为键值对，键为发生变化的文件路径。
      // console.log('watch-run', changedFiles);
      callback();
    });
  }
}

module.exports = MyPlugin;
