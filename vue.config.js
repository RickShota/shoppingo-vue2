const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭ESLink
  lintOnSave: false,
  // 关闭map
  productionSourceMap: false,
  // 修改请求公共路径
  publicPath: './',
  // proxy代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      }
    }
  }
})
