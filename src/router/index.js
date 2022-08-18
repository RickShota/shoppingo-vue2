import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "@/store";
import {removeToken} from "@/utils/token";

Vue.use(VueRouter)
/**
 * 重写push和replace
 */

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

const router = new VueRouter({
  routes,
  base: '/shopgovue2/',
  // 滚动行为:路由跳转后自动返回顶部
  scrollBehavior() {
    return {y: 0}
  }
})
/**
 * 导航守卫:路由前置守卫
 */
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
      next('/login?redirect=' + to.path) // 强制跳转到登录页,且添加query参数便于登录后跳转
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
/**
 * 导航守卫:路由独享守卫
 * 在路由配置文件单独配置
 */

export default router
