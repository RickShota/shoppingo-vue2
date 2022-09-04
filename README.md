# shoppingo-vue2

学完vue后的第一个vue2练手项目，耗时15天完成，收获良多

## 项目概要

仿淘宝（旧）PC端电商网站前端业务逻辑实现，采用vue2全家桶开发，包括首页、分类列表、商品详情、购物车、订单支付、用户登陆/注册等多个子模块。后端接口来自第三方。


## 技术选型

1. 前台数据处理/交互/组件化
   - vue2
   - vuex
   - vue-router
   - vue-lazyload
   - vue-validate
   - element-ui
   - swiper
   - moment
2. 前后台交互
   - axios
   - mock.js
   - postman
3. 模块化
   - ES6
   - babel
4. 工程化
   - webpack
   - vue-cli@4
   - eslint
5. css预编译
   - less
6. 其他插件
   - lodash.js
   - uuid.js
   - nprogress.js

---

# 每日笔记

# Day01

### 1.脚手架使用

`vue init webpack 项目名称`

`vue create 项目名称`

### 2.脚手架基本目录

##### public + assets文件夹区别：

​    *通常将外部的第三方的文件放在public中，自己的文件放在assets中。*

1. **public文件夹**

（1）路径设置时无需添加 /public，默认加载 public 文件夹下的文件
（2）public文件夹下的资源会直接编译打包，而不经过 webpack

2. **assets文件夹**

（1）assets目录中的文件会被webpack处理解析为模块依赖
（2）大多数用来存放js、css等

##### node_modules：

​ 放置项目依赖的地方

##### src：

​ 程序员源代码文件夹

##### components：

​ 一般放置非路由组件（或者项目共用的组件）

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

#### 4.1.在WebStorm中将本地仓库与GitHub绑定

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
{
   path: '/', redirect
:
   '/home'
}
,
/*登录页*/
{
   path: '/login', component
:
   Login
}
,
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

### 2.从Home组件中抽取子组件

##### 2.1静态页面（样式）

##### 2.2拆分静态组件

##### 2.3发请求获取服务器数据进行展示

##### 2.4开发动态业务

拆分组件：结构+样式+图片资源

一共要拆分为六个组件：
brand（品牌）、
floor（楼层）、
like（猜你喜欢）、
listContainer（包含轮播图的容器）、
rank（排行）、
recommend（推荐）

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

# day03

### 1.重写push与replace方法

工作的时候想处理掉，不想处理对于你的程序没有任何影响

```js
// 先把VueRouter原型对象的push|replace方法备份
let copyPush = VueRouter.prototype.push;
let copyReplace = VueRouter.prototype.replace;
// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
   if (resolve && reject) {
      copyPush.call(this, location, resolve, reject)
   } else {
      copyPush.call(this, location, () => {
      }, () => {
      })
   }
}
VueRouter.prototype.replace = function (location, res, rej) {
   if (res && rej) {
      copyReplace.call(this, location, res, rej)
   } else {
      copyReplace.call(this, location, () => {
      }, () => {
      })
   }
}
```

### 2.axios二次封装

API：关于请求相关的（axios）
请求、响应拦截器----nprogress进度条

### 3.模块化配置vuex

当项目比较大，组件通信数据比较复杂，这种情况才使用vuex

Vuex是插件，通过vuex仓库进行存储项目的数据

#### 3.1 vuex模块式开发【modules】

由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用vuex模块式管理数据。

#### 3.2 Vuex核心概念

state、actions、mutations、getters、modules

### 4.商品分类三级联动展示动态数据

#### 4.1 axios搭配vuex模块化发请求数据存仓库渲染一条龙

1. 集中封装api请求接口

   ```js
   export const reqData = (params) => requests.get('/api/url', params)
   ```

2. vuex模块中actions异步调用请求，并提交给mutations

   ```js
   async getData(store) {
     const result = await reqData()
     if (result.code === 200) {
       store.commit('SET_DATA', result.data)
       console.log("请求成功")
     }
   }
   ```

3. mutasions中接收数据并转存到state仓库

   ```js
   SET_DATA(state, data) {
     state.Data = data
   },
   ```

4. state中初始化数据

   ```js
   state: { Data: [], }
   ```

5. vue组件中生命周期函数里调用actions里的异步方法发起请求（mounted|created都可以）

   ```js
   mounted() {
     this.$store.dispatch('getData')
   }
   ```

   - mounted：模板已经变为真是DOM（只不过没有数据，显示空白），因为ajax是异步，需要时间。

   - created：稍微好那么一丢丢（不算啥）

6. 在组件中从vuex仓库拿数据渲染

   ```js
   computed: {
     ...mapState({
       Data: state => state.moduleName.Data
     })
   },
   ```

#### 4.2 商品分类json数据解析

```json
categoryList:[
{
id: 1, categoryName: '一级分类',
child:[
{id: 3.14,
categoryName: '二级分类'，
child:[
{id: 4, categoryName: '三级分类'}
]
}
]
},
...
]
```

- categoryList数组为第一层结构，数组中每一个对象C1为一级分类item
- 每个C1对象中的child数组为第二层结构，数组中每一个对象C2为二级分类item
- 每个C2对象中的child数组为第三层结构，数组中每一个对象C3为三级分类item

### 5.一级分类的hover背景效果实现

- 第一种解决方案：CSS 的 hover 选择器

- 第二种解决方案：js 的DOM事件

### 6.动态展示三层分类联动结构

#### 第一层循环

```html

<div v-for="(c1,index) in categoryList" :key="c1.categoryId"></div>
```

#### 第二层循环

```html

<div v-for="(c2,index) in c1.child" :key="c2.categoryId"></div>
```

#### 第三层循环

```html
<em v-for="(c3,index) in c2.child" :key="c3.categoryId"></em>
```

### 7.函数防抖与节流

**正常：** 事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）

**防抖：** 前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行最后一次

**节流：** 在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

**实现：** 借用loadsh.js插件，它里面封装的函数功能很多

##### 扩展：优化项目常见的方法

- v-if|v-show
- 按需加载
- 函数防抖与节流
- 按需加载

### 8.路由的跳转与传参

##### 第一种声明式导航：router-link

**问题：** 三级分类为什么使用router-link组件的时候，会出现卡顿？
**原因：** router-link是一个组件，相当于VueComponent类的实例对象，一瞬间new出很多实例（1000+），很消耗内存，因此导致卡顿。

##### 第二种编程式导航：push|replace

三级分类由于使用router-link的时候，会出现卡顿现象，因此采用编程式导航。

路由跳转home->search：需要进行路由传参【分类的名字、一、二、三级分类的id】

```js
this.$router.push(
        {
           name: 'search',
           query: {
              categoryName: '电子书',
              category2Id: 4
           }
        }
)
```

# day04

## 复习

### 三级联动业务:

1. 前面基础课程当中v-for很少使用index，以后在写项目的时候，index索引值切记加上
2. 防抖与节流【面试经常出现】
3. vuex可以模块式开发
4. vuex经常用的套路是state、mutations、actions、getters、modules

## 1.搜索模块中的三级联动与过渡动画

#### 1.1 注意的事项

注意1：以后在开发项目的时候，如果发现某一个组件在项目当中多个地方出现频繁的使用
咱们经常把这类的组件注册为全局组件。
注册全局组件的好处：只需要注册一次，可以在程序任意地方使用

注意2：咱们经常把项目中共用的全局组件放置于components里面，以后需要注意，
项目当中全局组件（共用的组件）一般放置于components文件夹中

注意3：全局组件只需要注册一次，就可以在项目当中任意的地方使用，注册全局组件一般是在入口文件注册。

#### 1.2 组件name属性的作用?

- 开发者工具中可以看见组件的名字
- 注册全局组件的时候，可以通过组件实例获取相应组件的名字

## 2.TypeNav组件业务分析

#### 2.1 分析结果

- 三级联动在home模块正常持久显示
- 三级联动在search模块鼠标触发显示

#### 2.2 解决方案

通过一个响应式属性控制三级联动显示与隐藏

#### 2.3 出现问题

在home模块下不应该出现显示与隐藏的效果

#### 2.4 问题分析

三级联动：本身在search模块应该有显示与隐藏的业务，但是在home模块下不应该出现显示与隐藏的业务。
说白了：你需要让三级联动组件知道谁在用它。

#### 2.5 解决方案

通过$route让组件区分在哪个模块下
以后在工作时，如果出现某一个组件要区分当前在哪一个模块中【home、search】，通过$route路由信息区分

#### 2.6 注意事项

路由跳转的时候，相应的组件会把重新销毁与创建----【kepp-alive】

## 3.过渡效果

最早接触过渡的时候：CSS3 的 transition 属性

Vue当中也有过渡动画效果：transition内置组件

#### 注意

在Vue当中，你可以给 （某一个节点）|（某一个组件）添加过渡动画效果
但是需要注意，节点|组件务必出现v-if|v-show指令才可以使用。

## 4.TypeNav三级联动性能优化?

#### 4.1 业务性能分析

home切换到search或者search切换到home，你会发现一件事情，组件在频繁的向服务器发请求，
获取三级联动的数据进行展示。

**结论：** 项目中如果频繁的向服务器发请求，很好性能的，因此咱们需要进行优化。

#### 4.2 发现问题

问：为什么会频繁的向服务器发请求获取三级联动的数据?

答：因为路由跳转的时候，组件会进行销毁【home组件的created：在向vuex派发action，因此频繁的获取三级联动的数据】

结合实际：只需要发一次请求，获取到三级联动的数据即可，不需要多次。

#### 4.3 优化方案

## 5.开发listContainer|Floor组件业务

#### 5.1 Web应用前后端分离:

1. 后台向前台提供API接口, 只负责数据的提供和计算，而完全不处理展现

2. 前台通过Http(Ajax)请求获取数据, 在浏览器端动态构建界面显示数据

#### 5.2 mock数据

当后台接口没有写好时，前端可以本地模拟数据

注意：mock（模拟数据）数据需要使用到mockjs模块，可以帮助我们模拟数据。

[mockjs官方文档](http://mockjs.com/)

生成随机数据，拦截 Ajax 请求
拦截ajax请求：请求发布出去【浏览器会进行拦截：笨想，因为服务器】，只是项目当中本地自己玩耍数据。

- 第一步：安装依赖包mockjs
- 第二步：在src文件夹下创建一个文件夹，文件夹mock文件夹。
- 第三步：准备模拟的数据

​    *把mock数据需要的图片放置于public文件夹中，比如:listContainer中的轮播图的数据*

- 第四步：在mock文件夹中创建一个server.js文件

​    *
注意：在server.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。*

- 第五步：通过mock模块模拟出数据，通过`Mock.mock`方法进行模拟数据
- 第六步：回到入口文件，引入serve.js

​    *mock需要的数据|相关mock代码页书写完毕，关于mock当中serve.js需要执行一次，如果不执行，和你没有书写一样的。*

- 第七步：在API文件夹中创建mockRequest【axios实例：baseURL:'/mock'】

​    *专门获取模拟数据用的axios实例。*

在开发项目的时候：切记，单元测试，某一个功能完毕，一定要测试是否OK

## 6.存储数据，存储于vuex

- 书写静态页面
- 拆分组件
- 获取服务器数据
- 展示数据
- 开发动态业务

## 7.swiper基本的使用

#### 7.1 swiper使用场景

移动端可以使用，pc端也可以使用。

#### 7.2 swiper常用于哪些场景

常用的场景即为轮播图----【carousel:轮播图】
swiper最新版本为7版本的，项目当中使用的是5版本

[官方文档](https://www.swiper.com.cn/)

# day05

项目第四天一些重要的事情

## 1.mock.js模块实现模拟数据

---对于将来实际工作的时候，后台没有准备好接口（服务器没有开发出来），前端工程师可以利用mock技术，
实现模拟数据，将来项目上线（后台真实接口）写好了，替换为真实接口即可。
---对于咱们而言，后台老师确实没有给首页中轮播这部分的接口，mock数据，你可以当中一个真实接口就行了。
上线的时候，对于mock数据对于项目而言没有任何影响。

对于项目而言:真实的接口 /api/xxxx 模拟的数据/mock/xxxx
模拟数据JSON：没有空格，最好使用格式化插件进行格式化。

## 2.swiper插件

提醒：当年学习过移动端视口、rem、高清图等等。
swiper插件：可以在移动端、PC端都可以使用，这个插件经常可以快速开发轮播图。
前端开发：轮播图、分页器、日历。

##### Swiper使用步骤：

第一步：引入依赖包【swiper.js|swiper.css】
第二步：静态页面中结构必须完整【container、wrap、slider】，类名不能瞎写
第三步：初始化swiper实例

#### 2.1 swiper在Vue项目中使用 （开发ListContainer组件）

**提示：** 卸载插件，你可以不用删除node_modules文件夹，可以使用npm uninstall xxxx进行卸载

1. swiper安装到项目当中

2. 在相应的组件引入swiper.js|swiper.css
   但是需要注意，home模块很多组件都使用到swiper.css,没必要在每一个组件内部都引入样式一次，只需要在入口文件引入一次即可。

3. 初始化swiper实例在哪里书写?
   初始化swiper实例之前，页面中的节点（结构）务必要有，对于Vue一个组件而言，mounted[组件挂载完毕：相应的结构不就有了吗]

4. 动态效果为什么没有出来？
   Swiper需要获取到轮播图的节点DOM，才能给swiper轮播添加动态效果，
   因为没有获取到节点。

5. 第一种解决方案，延迟器（不是完美的解决方案）
   同学的想法：都不是完美的【错误的想法】
   created里面：created执行与mounted执行，时间差可能2ms，白扯
   updated里面：如果组件有很多响应式（data），只要有一个属性值发生变化updated还会再次执行，再次初始化实例。

**总结：** 第一种解决方案可以通过延迟器（异步）去解决问题，
但是这种解决方案存在风险（无法确定用户请求到底需要多长时间），因此没办法确定
延迟器时间。

#### 2.2 Swiper在Vue项目中使用完美解决方案

第一种解决方案问题出现在哪里：v-for,在遍历来自于Vuex（数据:通过ajax向服务器发请求，存在异步）

watch监听属性：可以检测到属性值的变化，当属性值发生变化的时候，可以出发一次。

##### Vuex当中的仓库数据bannerList（组件在使用）：

bannerList仓库数据有没有发生过变化？
一定是有的：bannerList初始值空数组，当服务器的数据返回以后，它的bannerList存储的属性值会发生变化【变为服务器返回的数据】
组件实例在使用仓库中的bannerList，组件的这个属性bannerList一定是发生过变化，watch可以监听到。

组件实例的一个方法this.$nextTick(()=>{})

##### $nextTick官网解释:

在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。
**注意：** 组件实例的$nextTick方法，在工作当中经常使用，经常结合第三方插件使用，获取更新后的DOM节点

## 3.开发Floor组件

开发Floor组件：Floor组件它被复用的（重复使用两次）

#### 3.1:Floor组件获取mock数据，发请求的action书写在哪里?

派发action应该是在父组件的组件挂载完毕生命周期函数中书写，因为父组件需要通知Vuex发请求，父组件
获取到mock数据，通过v-for遍历 生成多个floor组件，因此达到复用作用。

#### 3.2 数据获取与渲染

父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件

注意：v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用

#### 3.4组件间通信（面试必问的东西）

props：父子
插槽：父子
自定义事件：子父
全局事件总线$bus：万能
pubsub：万能
Vuex：万能
$ref：父子通信

#### 3.5为什么在Floor组件的mounted中初始化Swiper实例轮播图可以使用

因为父组件的mounted发请求获取Floor组件，当父组件的mounted执行的时候。
Floor组件结构可能没有完整，但是服务器的数据回来以后Floor组件结构就一定是完成的了
，因此v-for在遍历来自于服务器的数据，如果服务器的数据有了，Floor结构一定的完整的。
否则，你都看不见Floor组件

## 4.carousel全局组件

如果项目当中出现类似的功能，且重复利用，封装为全局组件----【不封装也可以】

为了封装全局的轮播图组件:让Floor与listContainer组件中的代码一样，如果一样完全可以独立出来
封装为一个全局组件。

# day06

#### 复习：

1. swiper|lodash|moment插件工作的时候经常使用----【API：有时间翻看一下】
2. $nextTick,组件实例的方法。在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

## 1.合并参数

#### 1.1 为什么需要合并参数（query|params）

因为这些参数，对于search是有用的，因为search通过这些参数
向服务器发请求，需要把这些参数携带给服务器，服务器就会返回相应的用户的搜索的数据，search就可以进行展示。

#### 1.2 三层分类列表业务逻辑思考

当你点击每个分类a标签的时候，会进行路由的跳转，将产品的名字与id传递给search模块（query）

#### 1.3 搜索框业务逻辑思考

点击搜索按钮的时候，用户输入进来的关键字，点击按钮的时候会通过params参数传递给search模块-----（params）

#### 1.4 路由跳转（home->search）

两个地方，三级联动（typeNav）、Header组件（搜索按钮）

## 2.完成search静态组件

#### 2.1 书写静态页面

**结构：**

分类导航栏公共组件

bread面包屑

属性选择器子组件

商品展示

分页器公共组件

#### 2.2 拆分组件

将属性选择器拆分成子组件，便于维护

#### 2.3 获取服务器数据展示数据

**初始化请求体：**

```js
{
   "category1Id"
:
   "1",//一级分类的id
           "category2Id"
:
   "12",//二级分类的id
           "category3Id"
:
   "123",//三级分类的id
           "categoryName"
:
   "手机",//产品的名字
           "keyword"
:
   "小米",//关键字
           "order"
:
   "1:desc",//排序
           "pageNo"
:
   1,//当前第几页
           "pageSize"
:
   10,//每一页需要展示多少条数据
           "props"
:
   ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],//平台属性的选择参数
           "trademark"
:
   "4:小米"//品牌参数
}
```

**注意：** 搜索的接口，需要传递参数，至少是一个空对象（KV没有，但是至少给服务器一个对象）

## 3.获取search模块数据

axios定义api接口发起请求

vuex中定义异步请求，并将结果转存到仓库

组件中生命周期函数调用异步请求，并从仓库拿数据

## 4.展示商品列表数据

渲染默认展示数据，通过v-for遍历渲染每一个商品详情盒子，并给商品图片嵌套router-link

## 5.根据用户的搜索条件展示不同的数据。

根据前端传递的搜索params参数决定
根据不同条件，展示不同的数据。-->取决于后台返回的数据

1. 发请求，获取搜索模块的数据
2. 根据用户搜索的条件携带参数给服务器，展示用户搜索的内筒

##### **开发遇到的问题：**

用户条件可以发生多次变化，但是咱们的请求，只是会发一次【mounted中书写的】

##### 请求的性能优化：

发一个请求，需要向服务器携带参数：带100个参数 带1参数 【消耗宽带】
对于给服务器携带的参数：如果数值为undefind，向服务器发请求的时候，参数步携带给服务器的

## 6.面包屑的业务完成

#### 6.1 面包屑的种类

分类面包屑、关键字面包屑、品牌面包屑、属性面包屑

#### 6.2 业务逻辑整理

每种面包屑按需展示至多一个，不可重复，最多同时展示4个面包屑

#### 6.3 逻辑实现

- 显示与隐藏采用v-if

*扩展：v-if与v-show的区别*

###### 一、共同点：

v-if 和 v-show 都能实现元素的显示隐藏

###### 二、区别：

1. v-show 只是简单的控制元素的 display 属性，而 v-if 才是条件渲染（条件为真，元素将会被渲染，条件 为假，元素会被销毁）；

2. v-show 有更高的首次渲染开销，而 v-if 的首次渲染开销要小的多；

3. v-if 有更高的切换开销，v-show 切换开销小；

4. v-if 有配套的 v-else-if 和 v-else，而 v-show 没有

5. v-if 可以搭配 template 使用，而 v-show 不行

###### 三、v-show与v-if的使用场景

`v-if` 与 `v-show` 都能控制`dom`元素在页面的显示

`v-if` 相比 `v-show` 开销更大的（直接操作`dom`节点增加与删除）

如果需要非常频繁地切换，则使用 v-show 较好

如果在运行时条件很少改变，则使用 v-if 较好

# day07

学会套路最重要：
套路1：路由自己跳自己----修改路由
套路2：watch监听路由的变化发请求

## 1.品牌与平台属性的数据进行动态展示

#### 1.1 分析数据结构

tradeMark---品牌

举例子：理解平台属性 【用户购买一个手机】
颜色【平台属性】:红色、白色、紫色【平台属性值】
价格【平台属性】：1299,6999,899【平台属性值】
操作系统【平台属性】：iOS、Android【平台属性值】

```json
// 尺寸: 中、短
// 材料: 塑料、涤纶
[
   {
      attrId: 1,
      attrName: 尺寸,
      attrValueList: [
         '中',
         '短'
      ]
   },
   {
      attrId: 2,
      attrName: 材料,
      attrValueList: [
         '塑料',
         '涤纶'
      ]
   }
]
```

## 2.完成品牌与平台属性的业务

#### 2.1 业务分析

刚刚我们只是把服务器的数据动态展示，但是需要注意，对于品牌|平台属性、用户可以点击选则
我们还是需要收集用户选择的数据，把用户选择的数据信息，给服务器传递获取，获取相应的数据进行展示

#### 2.2 组件通信

工作使用频率非常高、面试的时候经常出现
父子：props、插槽、ref
子父：自定义事件
万能：vuex、$bus、pubsub

经典面试题：数组去重（多种方法）

平台属性携带参数格式：
props Array N 商品属性的数组: ["属性ID:属性值:属性名"]   示例: ["2:6.0～6.24英寸:屏幕尺寸"]

`props:['属性的ID:属性值:属性名']`

## 3.完成排序业务

#### 3.1 业务分析

- 综合与价格按钮

点击谁，谁的背景颜色变为红色。（类名：active）
谁有类这件事情，区分开综合与价格

将来点击综合||价格，还是需要给服务器发请求
【价格升序：把这个信息给服务器传递过去，服务器接收到信息，数据库自动把排序这件事情做了，把排序做好的数据返回给你，你展示即可】

- order：服务器需要字段，代表的是排序方式，字符串（可以传递也可以不传递）

`1`代表综合

`2`代表价格

`asc`代表升序

`desc`代表降序

故服务器排序方式有以下几种情况：
`"1:asc"  "1:desc"  "2:asc"  "2:desc"`

#### 3.2 综合与价格箭头

箭头用什么去做【可以选用阿里图标库】  https://www.iconfont.cn/

对于综合|价格旁边的箭头【动态显示：时而又，时而没有】，带有类名active，拥有箭头

根据1、2区分谁有类名（背景）、谁有箭头

根据asc|desc区分它用哪一个箭头【上、下】

## 5.分页功能

第三方插件：ElementUI实现超级简单

但是咱们需要自己封装。也属于前台项目当中比较重要的一部分。

# day08

#### 复习

- 品牌业务的完成
- 完成平台属性业务
- 完成排序业务

**总结：**

注意1：在书写项目的时候,需要注释清楚！
注意2：单元测试，完成一个功能测试是否OK【打印、vue开发者工具】
注意3：每一次书写的时候，都有小bug【解决bug能力】

## 1.分页器业务

前端三大件：轮播图、分页器、日历。这属于前端开发常见三种业务

#### 1.1 分页功能

比如电商平台：搜索一个奶粉，奶粉的产品有10000+，一次渲染10000+条数据，可能慢。
数据多的时候，可以选择分页，比如每一次只是展示10

#### 1.2 拆分分页组件（静态组件）

注册为全局组件，因为其他模块也在使用分页功能。

#### 1.3 分页器封装业务分析

封装分页器组件的时候：需要知道哪些条件？（自定义属性）

1. 分页器组件需要知道我一共展示多少条数据 ----total【100条数据】

2. 每一个需要展示几条数据------pageSize【每一页3条数据】

3. 需要知道当前在第几页-------pageNo[当前在第几页]

4. 需要知道连续页码数---------continues【起始数字、结束数字：连续页码数】

###### 特殊情况分析：

已知条件: total=【99】 pageSize =【3】 pageNo=6 continues 5

4 5 6 7 8

已知条件: total=【99】 pageSize =【3】 pageNo= 1 continues 5

错误:-1 0 1 2 3
正确: 1 2 3 4 5

已知条件: total=【99】 pageSize =【3】 pageNo= 2 continues 5

错误: 0 1 2 3 4
正确：1 2 3 4 5

已知条件: total=【99】 pageSize =【3】 pageNo= 33 continues 5

错误: 31 32 33 34 35
正确：29 30 31 32 33

已经条件: total=【99】 pageSize =【3】 pageNo= 32 continues 5

错误：30 31 32 33 34
正确: 29 30 31 32 33

## 2.分页器封装

#### 2.1进行单元测试

连续页码5: 8   [6,7,8,9,10]

连续页码7: 8   [5,6,7,8,9,10,11]

连续页码5:  8   [6,7,8,9,10]

连续页码7:  8   [5,6,7,8,9,10,11]

#### 2.2 特殊需求

记忆功能这个需求可以书写、可以不书写【正常说：没有这个需求的】
比如:2021年10月30日11:47:44 点击分页器 第四页 ->网站关闭了
但是2021年11月11日11:48:12 打开这个项目 第四页 -->本地存储

#### 总结:

- 对于一个分页器:

1. 需要知道数据总条数
2. 每一个需要展示数据条数
3. 知道当前是第几页
4. 连续页码数字
5. 自定义事件【子给父通信的】


- push与replace区别?

编程式导航：push 与 replace

能不能记录历史记录：push（能记住历史记录） replace（不能记住历史记录）

目前项目当中：进行路由跳转（编程式导航）基础都是push

push与replace是有区别的

## 3.开发详情业务

1. 书写静态页面、样式
2. 拆分组件
3. 获取服务器动态展示
4. 完成动态业务

## 4.滚动行为的设置

#### 4.1 遇到的问题

当从其他路由页面跳转到商品展示列表时，网页的位置还停留在原先的位置

#### 4.2 解决方法

在定义路由实例时，设置`scrollBehavior`属性

```js
const router = new VueRouter({
   routes,
   base: '/shopgovue2/',
   // 滚动行为:路由跳转后自动返回顶部
   scrollBehavior() {
      return {y: 0}
   }
})
```

# day09

#### **复习**

前端开发三大件：轮播 + 分页 + 日历

分页器功能：
需要知道一共展示多少条数据
需要知道每一页展示几条数据
需要知道当前是第几页
需要知道连续页码数

## 1.商品详情页开发

#### 1.1 详情模块注意事项

商品属性的开发

排他操作：在工作中经常使用，即点击一个多选按钮，先将所有按钮归0，再给点击的按钮赋1

#### 1.2 放大镜的功能实现

----插件:插件解决可以

不使用插件，自己实现

创建放大镜子组件Zoom

参数：传入当前的图片，父传子$bus

###### 遮罩层为什么能动

$refs获取节点（DOM：必须要定位），通过JS动态修改left|top、定位元素才有left、top属性

具体实现：

```js
handler(e)
{
   const mask = this.$refs.mask
   const big = this.$refs.big
   // 计算mask相对盒子横向移动距离
   let left = e.offsetX - mask.offsetWidth / 2
   // 计算mask相对盒子纵向移动距离
   let top = e.offsetY - mask.offsetHeight / 2
   // 约束范围
   if (left < 0) left = 0
   if (top < 0) top = 0
   if (left > mask.offsetWidth) left = mask.offsetWidth
   if (top > mask.offsetHeight) top = mask.offsetHeight
   // 修改元素位移
   mask.style.left = left + 'px'
   mask.style.top = top + 'px'
   big.style.left = -2 * left + 'px'
   big.style.top = -2 * top + 'px'
}
```

扩展：DOM API的事件对象

```js
e.offsetX / Y // 鼠标相对于当前元素边框的坐标
e.clientX / Y // 鼠标相对于浏览器窗口的坐标
e.pageX / Y   // 鼠标相对于整个HTML页面的坐标
e.screenX / Y // 鼠标相对于屏幕的坐标
e.offsetWidth / Height // 获得元素的宽高（无单位，包含padding和border）
```

## 2.产品购买个数业务

以后项目当中：凡是出现文本框【用户输入：一定有'幺蛾子'，思考情况一定要多思考】

## 3.加入购物车的业务

#### 3.1 业务思考

购物车：每一个人都有属于自己的购物车，那为什么不同用户登录自己账号，可以看见属于自己产品
一定是用户点击加入购物车，把你的产品信息提交给服务器进行保存，当你下次在进入购物车的时候，需要向服务器发请求，获取你购物车里面的信息展示

项目：点击加入购物车按钮的时候，以前经常进行路由跳转【调到另外一个路由】，
但是你要注意，点击加入购物车这个按钮的时候，将用户选择产品，提交给服务器进行存储，如果服务器存储成功，之后在进行路由跳转

# day10

前台项目三个重要地方：分页器、购物车、登录注册。

#### 复习

**问题1：** 什么时候用router-link、什么时候用编程式导航。
1.1如果一个按钮点击过后，如果只有路由跳转的业务【声明式导航、编程式导航】
1.2如果点击一个按钮除了路由跳转，还有其他的业务，可以选择编程式导航。

**问题2：** promise问题。【基础问题】

**概念：** ES6提供的一个构造函数，异步编程的一种解决方案

**作用：** 解决了异步多层嵌套回调（即回调地狱）的问题，让代码的可读性更高，更容易维护

**三种状态：**

- pending（执行中）
- Resolved（成功，又称fulfilled）
- rejected（拒绝）

## 1.加入购物车成功组件的业务

当商品加入购物车成功，服务器返回成功代码，即跳转到成功提示页

#### 1.1 主要功能与实现

展示商品简要信息，通过`sessionStorage`本地存储获取商品数据

2个按钮，一个是返回商品详情（`$router.back()`），一个是去购物车结算（声明式跳转）

## 2.购物车业务

#### 2.1 获取购物车的数据进行展示

问题：不同用户有自己的购物车，服务器怎么区分？

解答：临时方案是分配一个用户id，最终方案是登录注册模块

问题：对于游客而言，用哪个技术可以随机生成唯一用户id形成临时身份？

解答：uuid

实现：

创建一个utils（工具）文件夹：用于存放工具类js代码

```js
/**
 *  利用uuid生成随机字符串,作为游客令牌
 *  每次执行不能发生变化，游客身份持久储存
 */
export const getUUID = () => {
           // 本地储存有就不生成，没有就生成
           let uuid_token = localStorage.getItem("uuid_token")
           let token = getToken();
           if (!token && !uuid_token) {
              uuid_token = uuidv4()
              localStorage.setItem("uuid_token", uuid_token)
           }
           return uuid_token
        }
```

#### 2.2 设计购物车的数据

###### 购物车数量的操作?

修改购物车产品数量的时候，需要发请求，通知服务器产品最新的个数【服务器需要保存】，
当组件在获取购物车的数据时候，不就是最新的数值【用户刷新刷不掉】

产品个数变化接口参数：
skuID string 商品ID

skuNum：在修改产品个数的时候,需要给服务器传递的是【变化的数值】

比如：佩奇 起始数量 4 用户在表单元素中输入 6 ----->给服务器参数是2
佩奇 起始数量4 用户在表单元素中输入1 ------>给服务器的参数-3
佩奇 起始的数量4 用户在表单元素中输入4 ------>给服务器的参数0

blur:失去焦点--->点击空白的地方
change:文本需要有变化，而且还需要点击空白的地方
input:只要文本发生变化立马执行【不许点击空白的地方】

# day11

1:购物车完成
2:登录注册
注意:有的时候node_modules会丢包,删除重新安装就行了。
注意:函数防抖与节流【面试经常出现】
注意:用户有两个身份【临时游客、用户】

## 1.删除购物车中的产品的操作

步骤：dispatch派发删除请求，actions中定义异步请求，成功返回OK，失败返回Promise的error

注意：常用请求方法有post、get、delete，本次使用delete

## 2.购物车产品选中与未选中业务

购物车中产品的数据：isChecked属性，1：代表这个产品勾选中 0:代表这个产品没有被选中

发请求，刷新页面

## 3.全选的业务

#### 3.1 以后在工作当中出现了一些问题

想不明白、或者没有思路。【前一个月：有问题，尽可能别问同事】

#### 3.2 全选的复选框业务

目前而言：是没有这个接口，一次修改全部产品的选中状态接口【正常工作当中一定是有这样的接口：一次全部修改选中状态】
全选复选框：如果它勾上，顶上全部的产品的选中状态，勾上
全选复选框：如果它没勾上，顶上的全部产品的选装中台，没勾上

vuex:minStore[小仓库state、getters、dispatch、commit]

## 4.登录注册

对于企业当中，一般项目都有登录注册功能【这个业务很重要】
当然有一些项目不需要注册，后台管理系统项目，一般不需要注册。

#### 4.1 登录与注册的静态组件

图片问题会报错

#### 4.2 assets【放置静态资源文件的地方】

一般放置所有组件共用的静态资源
在样式当中也可以使用@,在样式当中使用@，前面加上~

#### 4.3 注册的业务

今天在做注册、登录业务的时候，先不处理表单的验证功能，在项目最后一天，在把表单如何验证，用插件解决
正则
手机号:11
验证码:4-6
登录密码|确认密码:首字母大写、包含英文、数字、特殊字符等等。

获取验证码
/api/user/passport/sendCode/{phone}

# day12

token面试题：项目当中token过期、失效如何处理？

答：清除本地token（本地存储），让用户回到登录页，获取最新的token

## 1.登录注册业务

#### 1.1 注册业务整理

【手机号、验证码、登录密码】，点击注册按钮的时候，需要把这些信息给服务器传递过去
手机号:11位
验证码：4-6
登录密码：英文字母、数字、首字母大写等等

#### 1.2 登录业务

当你点击登录按钮的时候，需要把手机号、密码需要携带给服务器，服务器需要判断，你是不是我的用户【注册过的】
如果是用户登录成功，进行登录，如果用户登录失败给一个提示即可。

#### 1.3 token

【令牌：字符串，服务器下发给用户的身份凭证】

## 2.用户登录以后获取用户信息进行展示

#### 2.1 业务逻辑分析

登录成功以后，服务器会返回token【存储于vuex当中】，如果想获取用户信息
还需要再发请求【用户信息】，携带token给服务器。
api/user/passport/auth/getUserInfo 获取用户信息的接口

#### 2.2 遇到的bug

Q1：为什么刷新页面，用户信息就消失？

用户刷新页面，用户信息消失没了获取不到，因为token没有携带给服务器。

Vuex存储数据并非持久化

Q2：为什么去别的模块（非home模块）获取用户信息失败？

因为你去别的模块根本没有发请求获取用户信息，没办法展示用户信了

#### 2.3 解决方案

A1：本地存储持久化存储token，`localStorage`

A2：每一个组件都在mounted里面发起获取用户信息，进行展示（可以太麻烦）

残留的问题：用户在home模块刷新的时候，用户信息一直在展示（mounted执行的时候在向服务器发请求、获取用户信息展示）

home->search[用户信息刷新数据就没了，因为在search模块当中根本没有发请求获取用户信息]
search-detail[根本没有获取用户信息进行展示]

## 3.退出登录

#### 3.1 发请求

需要通知服务器，把现在用户身份token【销毁】

#### 2.2 清除数据

清除仓库数据+本地存储数据【都需要清理】

#### 2.3 发现bug

演示一些操作，你看一下是否正常?
用户已经登录了，用户想从home路由跳转到login路由，不应该这么操作了。
现在用户登录以后，home路由不应该跳转到login路由当中【因为登陆了】，
但是咱们以现在认知【技术】，没办法约束从home调到login

## 4.导航守卫

#### 4.1 守卫条件判断

###### 三大守卫:

- 全局守卫：项目当中任何路由变化都可以检测到，通过条件判断可不可以进行路由跳转。
- 前置守卫：路由跳转之前可以做一些事情。
- 后置守卫：路由跳转已经完成在执行。

//全局守卫:[后置守卫:在路由跳转完毕之后才会执行一次]
router.afterEach(()=>{
console.log('守卫:路由跳转完毕才会执行一次')
})

用户已经登录了，不应该在访问login？【通过什么条件能判断用户登录、未登录】
路由独享守卫：
针对某一个路由的守卫

组件内守卫：
也是负责某一个路由守卫

## 5.身份凭证问题

以后登录：

TOKEN身份为大

UUID生成的临时身份次之

# day13

## 1.交易业务

今天在做支付的时候，统一使用
账号:13700000000
密码:111111

#### 1.1 获取用户地址信息、获取用户购物车清单信息

用户地址信息
`/api/user/userAddress/auth/findUserAddressList`

商品清单接口
`/api/order/auth/trade`

#### 1.2 Vuex的action发请求

但是从今天开始，咱们要练习不用Vuex改如何开发？
请求配置,类似$bus使用

## 2.展示商品清单数据

## 3.提交订单业务

当用户点击提交订单按钮的时候，需要发请求的
提交订单的请求地址：`/api/order/auth/submitOrder?tradeNo={tradeNo}`

前台：需要告诉服务器：谁买的、买的啥、买几个、 支付多少钱、留言信息...
后台：订单号，这笔交易的一个标识符【支付的】

`axios({url:'xxx',methods:'post',data:{a:1}})`

3.1微信支付、支付宝支付等等
交易编码（服务器：字符串hash）
收件人名字
收件人手机号
收件的地址
买家留言信息
支付产品

## 4.获取支付信息进行展示

异步方法，async/await

```js
async
getPayInfo()
{
   let res = await this.$API.reqGetPayInfo(this.orderId)
   if (res.code === 200) {
      this.payInfo = res.data
   } else {
      console.log(res.message)
   }
}
,
```

## 5.ElementUI组件库

##### react框架:

antd【蚂蚁金服旗下PC端UI组件库】
antd-mobile【蚂蚁金服旗下的移动端UI组件库】

##### Vue框架:

[element-UI](https://element.eleme.cn/#/zh-CN)【饿了吗旗下的UI组件库，官方承认的PC组件库插件】
[Vant](https://youzan.github.io/vant/#/zh-CN/)【Vue官方提供移动端UI组件库】

#### 5.1 ElementUI使用

第一步：项目中安装ElementUI组件库 [2.15.6版本：Vue2]

第二步：在入口文件引入ElementUI组件库

​ 第一种：全部引入【不采用：因为项目中只是用到一个组件，没必要全都引入进来】

​ 第二种：按需引入【按照开发需求引入相应的组件，并非全部组件引入】

第三步：按需引入，安装相应的插件

`npm install babel-plugin-component -D`

文档中说的.babelrc文件，即为babel.config.js文件

修改完babel.config.js配置文件以后，项目重启

第四步：按照需求引入相应的组件即可

`Vue.component();`
`Vue.prototype.$xxx = xxx;`

#### 5.2 项目用到的模块

###### messageBox显示弹框

`this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {dangerouslyUseHTMLString: true});`

## 6.支付业务【微信支付】

#### 6.1 微信支付链接

从哪获取？点击支付时，向服务器提交订单信息，服务器会返回收款链接

#### 6.2 将收款链接转换成二维码并展示

解决方案：[QRCode.js插件](http://davidshimjs.github.io/qrcodejs/)

```js
let url = await QRCode.toDataURL(this.payInfo.codeUrl)
```

通过`QRCode.toDataUrl`方法，将字符串转换为加密的在线二维码链接，通过图片进行展示。

###### 扩展：项目目前使用的第三方插件

moment.js
swiper.js
nprogress.js
qrcode.js

#### 6.3 判断支持是否成功

GET|POST：短轮询，请求发一次，服务器响应一次，完事。

第一种做法：前端开启定时器，一直找服务器要用户支付信息【定时器】

第二种做法：项目务必要上线 + 和后台紧密配合。当用户支付成功以后，需要后台重定向到项目某一个路由中，将支付情况通过URL参数形式传给前端，前端获取到服务器返回的参数，就可以判断了。

# day14

### 1.个人中心路由搭建

#### 1.1 嵌套路由

作用：实现组件嵌套展示

用法：声明路由规则时添加children属性

#### 1.2 完成个人中心“我的订单”嵌套展示

router-link 搭配 router-view

再次用到分页器

```html

<my-pagination
        :page-no="page"
        :page-size="limit"
        :total="myOrderList.total"
        :continues="9"
        @getPageNo="getPageNo">
</my-pagination>
```

### 2.未登录全局守卫的判断

在前面课程当中：

导航守卫：路由发生变化，守卫可以检测到，通过判断，确定这次路由跳转

前置守卫：在路由跳转之前，进行判断

后置守卫：路由都已经跳转完毕才执行。

#### 2.1 逻辑分析

##### 未登录的情况：

不可访问的页面：用户中心、我的订单、我的购物车、确认订单页面、支付页面、支付成功页面

操作：强制跳转到登录页，且添加query参数便于登录后跳转

##### 用户登录后的情况：

不可访问的页面：登录页面和注册页面

##### 其他细节：

结算页面只能从购物车转入

支付页面只能从结算页面转入

#### 2.2 守卫实现

路由前置守卫用来实现一般的路由跳转守卫

```js
router.beforeEach(async (to, from, next) => {
   let token = store.state.users.token
   let name = store.state.users.userInfo.nickName
   // 如果没有登录
   if (!token) {
      if (to.path === '/addcartsuccess' ||
              to.path === '/shopcart' ||
              to.path === '/center' ||
              to.path === '/center/myorder' ||
              to.path === '/paysuccess' ||
              to.path === '/pay' ||
              to.path === '/trade'
      ) {
         // 强制跳转到登录页,且添加query参数便于登录后跳转
         next('/login?redirect=' + to.path)
         console.log('未登录，禁止跳转到该页面')
      } else {
         console.log('未登录，限制访问')
         next()// 放行
      }
   } else { // 否则登录了
      if (to.path === '/login' || to.path === '/register') {
         next(false)
         console.log('已登录，禁止跳转到该页')
      } else {
         // 如果没有用户名
         if (!name) {
            // 发起请求获取用户名
            try {
               await store.dispatch('getUserInfo')
               next()// 然后放行
               console.log('未检测到用户名，已重新获取用户名并放行')
            } catch (e) {
               console.log('重新获取用户数据失败，尝试清空本地token并重新获取用户名', e.message)
               removeToken()
               await store.dispatch('getUserInfo')
            }
         } else {
            next()// 放行
            console.log('检测到用户名，放行')
         }
      }
   }
})
```

路由独享守卫用来实现限制单一组件前后跳转

```js
/*结算页面*/
{
   path: '/trade',
           component
:
   Trade,
           meta
:
   {
      show: true
   }
,
   // 路由独享守卫
   beforeEnter: (to, from, next) => {
      // 如果是从购物车来
      if (from.path === '/shopcart') {
         next() // 放行
      } else {
         next(false) // 否则阻止
      }
   }
}
,
```

#### 2.3 扩展：组件内守卫

一般很少用

组件内守卫：也是专门负责某一个路由【并非负责全部路由】，写法和路由独享守卫有区别？
组件内守卫需要书写在组件内部

`beforeRouteEnter`

`beforeRouteUpdate (2.2 新增)`

`beforeRouteLeave`

### 3.打包上线

#### 3.1 打包`npm run build`

项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。

有了map就可以像未加密一样定位错误在哪一行

默认为true，正式打包后需要设置为false

vue.config,js配置

productionSourceMap: false

### 4.路由懒加载

#### 4.1 作用

当用户访问的时候，加载对应组件进行展示，节省资源，缓解服务器压力

#### 4.2 使用

在配置路由时，component节点本用来定义组件，将其变为函数，返回一个组件

```js
component: () => import ("@/views/Search"),
```

### 5.图片懒加载

#### 5.1 vue-lazyload插件

图片懒加载：当用户网络不好，服务器的数据没有回来时，避免让用户看空白，至少有一个默认图片在展示。

#### 5.2 插件的使用

1. 全局注册插件

```js
// 引入图片懒加载插件
import VueLazyload from "vue-lazyload";
import limg from '@/assets/loading.jpg'

Vue.use(VueLazyload, {
   loading: limg,
})
```

2. 对于需要懒加载的图片标签img，将src属性替换成v-lazy

### 6.表单验证

以后工作的时候经常会进行表单验证【element-ui】进行表单验证，so 简单。
项目当中表单验证功能比较常见的。

#### 6.1 vee-validate插件

Vue官方提供的一个表单验证的插件
这个插件很难用：如果你翻看它的文档（看一个月：不保证能看懂），依赖文件很多（文档书写的很难理解）
花大量时间学习，很难搞懂。

###### 使用步骤：

1. 安装vee-valadite，别安装最新版本@2
2. 在plugins文件夹中创建一个validate.js[专门注册vee-valadite]
3. 注册插件
4. 注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】
5. 在入口文件需要引入执行一次
6. 使用vee-valadiate插件

#### 6.2 vee-validate 基本使用

第一步：插件安装与引入
cnpm i vee-validate@2 --save 安装的插件安装2版本的

```js
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate)
```

第二步：提示信息

```js
VeeValidate.Validator.localize('zh_CN', {
   messages: {
      ...zh_CN.messages,
      is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
   },
   attributes: { // 给校验的 field 属性名映射中文名称
      phone: '手机号',
      code: '验证码',
      password: '密码',
      password1: '确认密码',
      isCheck: '协议'
   }
})
```

第三步：基本使用

```html
<input
        placeholder="请输入你的手机号"
        v-model="phone"
        name="phone"
        v-validate="{ required: true, regex: /^1\d{10}$/ }"
        :class="{ invalid: errors.has('phone') }"
/>
<span class="error-msg">{{ errors.first("phone") }}</span>
```

`const success = await this.$validator.validateAll(); //全部表单验证`
//自定义校验规则
//定义协议必须打勾同意

```js
VeeValidate.Validator.extend('agree', {
   validate: value => {
      return value
   },
   getMessage: field => field + '必须同意'
})
```

------

正在整理中，未完待续...
