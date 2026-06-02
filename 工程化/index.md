* webpack打包为什么慢，vite为啥快
 webpack 全量编译构建
 vite 使用 esbuild ，只对实际需要的文件进行编译，打包使用了rollup

* webpack构建流程
 + 编译  
    根据入口文件递归解析所有依赖，使用loader进行文件转换，根据rules加载模块
 + 构建  
    根据 plugin 完成代码压缩，文件生成等任务
 + 输出  
    将构建后的文件输出到output

* loader 和 plugin 区别
 loader 文件处理器，在plugin之前执行
 plugin 执行更复杂的操作，根据webpack提供的勾子函数来处理不同的事情

* webpack常见优化
 

* tree shaking 原理
* babel 原理
* polyfill 和 plugin 区别
* source map
* code split
* 懒加载
* 按需加载
* chunk / bundle / module 区别
* HMR 原理
* vite 为什么冷启动快
* vite 为什么热更新快
* ESBuild 和 Rollup 分别做什么
* CommonJS 对 tree shaking 的影响
* npm / yarn / pnpm 区别
* package.json 常见字段
* dependencies / devDependencies 区别
* peerDependencies 作用
* semver 版本管理
* CI / CD 基础
* eslint / prettier / stylelint
* git 常用命令
* monorepo 基础
* 微前端基础理解