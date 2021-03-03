## tree shaking

## webpack 优化

#### 优化前端性能

+ 压缩、删除多余的代码、注释
+ CDN加速：静态资源改为CDN的路径
+ Tree Shak：删除永远不会用到的代码
+ Code Spliting： 将代码分块按需加载
+ SplitChunkPlugin：提起公共的第三方库

#### 优化打包构建

+ happypack：多核构建
+ externals：不需要更新的三方库脱离打包，script标签引入
+ dll：把基本不会改动的代码打包成静态资源