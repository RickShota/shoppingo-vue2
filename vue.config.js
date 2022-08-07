const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭ESLink
  lintOnSave:false,
  // proxy代理
  devServer:{
    proxy: {
      "/api": {
        target:"http://gmall-h5-api.atguigu.cn",
      }
    }
  }
})
