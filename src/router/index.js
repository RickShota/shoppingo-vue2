import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

Vue.use(VueRouter)

// 先把VueRouter原型对象的push|replace方法备份
let copyPush = VueRouter.prototype.push;
let copyReplace = VueRouter.prototype.replace;
// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    copyPush.call(this, location, resolve, reject)
  } else {
    copyPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, res, rej) {
  if (res && rej) {
    copyReplace.call(this, location, res, rej)
  } else {
    copyReplace.call(this, location, () => {}, () => {})
  }
}

const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior() {
    return {y: 0}
  }
})

export default router
