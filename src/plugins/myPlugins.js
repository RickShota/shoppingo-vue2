// 自定义插件
let myPlugins = {}

myPlugins.install = function (Vue,options) {
  // 全局指令
  Vue.directive(options.name,(element,params)=>{
    // 操作元素
    element.innerHTML = params.value.toUpperCase()
  })
}

export default myPlugins
