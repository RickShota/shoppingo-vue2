# shoppingo-vue2

学完vue后的第一个vue2电脑端项目，来自[bilibili尚品汇](https://www.bilibili.com/video/BV1Vf4y1T7bw?p=2&spm_id_from=pageDriver&vd_source=c074cfcb590f03ed244ef1b7890c7837)

耗时17天完成，收获良多

### 技术栈

- vue2全家桶（vuex、vue-cli、vue-router）
- axios二次封装
- 少量的element-UI
- mock.js、lodash.js、swiper、vee-validate、vue-lazyload、nprogress等第三方插件

### 每日笔记
# Day01
### 1.脚手架使用

`vue init webpack 项目名称`
`vue create 项目名称`

### 2.脚手架基本目录

##### public + assets文件夹区别：

​	*通常将外部的第三方的文件放在public中，自己的文件放在assets中。*

1. **public文件夹**

（1）路径设置时无需添加 /public，默认加载 public 文件夹下的文件
（2）public文件夹下的资源会直接编译打包，而不经过 webpack

2. **assets文件夹**

（1）assets目录中的文件会被webpack处理解析为模块依赖
（2）大多数用来存放js、css等

##### node_modules：

​	放置项目依赖的地方

##### src：

​	程序员源代码文件夹

##### 	components：

​	一般放置非路由组件（或者项目共用的组件）

##### 其他独立文件：

- App.vue：唯一的根组件
- main.js：入口文件（程序最先执行的文件）
- babel.config.js：babel配置文件
- package.json：看到项目描述、项目依赖、项目运行指令
- README.md：项目说明文件

### 3.自定义配置脚手架

##### 3.1 保存后浏览器自动打开

*在package.json文件中*

```json
"scripts": {
	"serve": "vue-cli-service serve --open",
	"build": "vue-cli-service build",
	"lint": "vue-cli-service lint"
},
```

##### 3.2 关闭eslint校验工具

*创建vue.config.js文件：需要对外暴露*

```js
module.exports = {
   lintOnSave: false,
}
```

##### 3.3 src路径的别名设置

原因：复杂项目的src（源代码文件夹）里目录会很多，找文件不方便，设置src文件夹的别名找文件会方便一些
*创建jsconfig.json文件*

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```



### 4.项目上传Git

##### 跟踪文件并→暂存区

`git add index.html（单个）`

`git add .（所有）`

##### 暂存区→ Git仓库

`git commit -m "描述信息"`

##### ↺ 撤销文件修改!

`git checkout -- index.html`

##### 工作区 ← 暂存区

`git reset HEAD index.html`

##### 工作区 → Git仓库

`git commit -a -m "描述信息"`

##### 移除文件

`git rm -f index.js（仓库&工作区）`
`git rm --cached index.js（保留工作区）`

*参考：[歪歪坨的博客-CSDN博客_webstorm绑定github](https://blog.csdn.net/qq_37954460/article/details/120628439)*



### 5.路由的配置

##### 扩展：路由分为KV

- 对于后台而言：

  K即为URL地址，V即为相应的中间件

- 前端路由:

  K即为URL（网络资源定位符），V即为相应的路由组件

##### 5.1 路由的分析

**分析：** 确定项目结构顺序：上中下
只有中间部分的V在发生变化，中间部分应该使用的是路由组件

**结论：**

上下两个非路由组件：Header 、Footer
四个基本路由组件：Home、Search、Login（无Footer）、Register（无Footer）

##### 5.2 安装路由

`npm i vue-router@3.x -S`

*--save：可以让你安装的依赖，在package.json文件当中进行记录*

##### 5.3 创建路由组件

一般放在views|pages文件夹

##### 5.4 配置路由，配置完四个路由组件

```js
/*路由重定向*/
{path: '/', redirect: '/home'},
/*登录页*/
{path: '/login', component: Login},
```



### 6.创建非路由组件

*2个：Header、Footer*

##### 非路由组件使用分为几步:

第一步：定义

第二步：引入

第三步：注册

第四步：使用

##### 非路由组件的结构的搭建：

静态页面：
结构 + 样式 + 图片资源

*项目采用的 less样式，浏览器不识别 less语法，需要一些loader进行处理，把less语法转换为CSS语法*

1. 安装less ：`less-loader@5`

    *切记 less-loader安装 5版本，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义*

2. 需要在style标签的身上加上lang="less"，不添加样式不生效



### 7.路由的跳转

路由跳转两种形式：

- 声明式导航（router-link：务必要有to属性）
- 编程式导航（push||replace）

*编程式导航更好用：因为可以书写自己的业务逻辑*



**面试题：**

**问：** v-show与v-if区别?

**答：**`v-show`通过样式display控制，`v-if`通过元素上树与下树进行操作

**问：** 开发项目的时候，优化手段有哪些?

**答：** 1. v-show|v-if 2. 按需加载



### 8.配置路由元信息

##### 原因：

首页|搜索底部是有Footer组件，而登录注册是没有Footer组件

##### 实现：

利用路由元信息传递的值，搭配 v-show 实现Footer组件显示|隐藏

##### 路由元信息：

- 定义路由时加`mate:{key: boolen}`
- 使用时在组件种通过`$route.meta.key`访问值



### 9.路由传参

##### params参数：（“/”后面的参数项）

路由需要占位，程序就崩了，属于URL当中一部分

##### query参数：（“？”后面的参数项）

路由不需要占位，写法类似于ajax当中query参数

##### 面试题：

**问：** 路由传递参数（对象写法）path是否可以结合params参数一起使用?

**答：** 不可以，不能这样书写，程序会崩掉

**问：** 如何指定params参数可传可不传?

**答：** 在配置路由时，占位符后面加上“ ? ”即可

**问：** params参数可以传递也可以不传递，但是如果传递是空串，如何解决？

**答：** 使用undefined解决：`params:{keyword:'' || undefined}`

**问：** 路由组件能不能传递props数据?

**答：** 可以，且有三种写法：

（1）布尔值写法:params
	`props:true`

（2）对象写法:额外给路由组件传递一些props
	`props:{a:1,b:2}`

（3）函数写法：可以params参数、query参数，通过props传递给路由组件
	`props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})`

# day02

### 1.继续配置路由：

##### $router和$route

- $router：进行编程式导航的路由跳转
`this.$router.push|this.$router.replace`
- $route：可以获取路由的信息|参数
`this.$route.path`
`this.$route.params|query`
`this.$route.meta`

**问题：** 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?

**注意：** 编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。这种异常对于程序没有任何影响。

**原因：** 由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象

**解决方案：**

第一种解决方案：是给push函数传入相应的成功的回调与失败的回调，该解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

第二种解决方案：重写vue-router原型链上的push和replace方法

### 2.将Home组件的静态组件拆分

##### 2.1静态页面（样式）

##### 2.2拆分静态组件

##### 2.3发请求获取服务器数据进行展示

##### 2.4开发动态业务

拆分组件：结构+样式+图片资源

一共要拆分为六个组件：brand、floor、like、listContainer、rank、recommend

### 3.axios二次封装

**Ajax：** 客户端可以'悄悄地'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。

**实现方式：** XMLHttpRequest、$、fetch、axios

**跨域：** 如果多次请求协议、域名、端口号有不同的地方，称之为跨域

**解决方案：** JSONP、CROS、代理

*src目录下的api文件夹，一般关于axios二次封装的文件*

#### 第三方插件：

进度条：nprogress.js模块实现进度条功能

开发文档：[nprogress的简介及使用教程 - Made with Vuejs](https://madewith.cn/23)



### 4.复习vuex

vuex：Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store




正在整理中，未完待续...
