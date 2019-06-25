import acss from './a.css'
import c from './c.js'
const a = {
    init() {
        console.log("a init bbbaaa")
    },
    cinit() {
        c.init()
    }
}

import('./show').then(({ show }) => {
    // 重新构建后会输出两个文件，分别是执行入口文件 bundle.js 和 异步加载文件 0.bundle.js。
    show('Webpack');
});
export default a;