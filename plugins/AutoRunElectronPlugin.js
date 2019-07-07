const { spawn } = require('child_process');
const config = require('../config/dev');
class AutoRunElectronPlugin {
  apply(compiler) {
    let isInitialCompilation = true;
    compiler.plugin('done', function(compilation) {
      if (isInitialCompilation && config.electron) {
        // 启动客户端
        spawn('yarn', ['electron', './main'], { cwd: process.cwd(), stdio: 'inherit' });
      }
      isInitialCompilation = false;
    });
  }
}

module.exports = AutoRunElectronPlugin;
