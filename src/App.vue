<template>
  <div id="app">
    <!--头部-->
    <my-header></my-header>
    <!--回到顶部element插件-->
    <el-backtop :visibility-height="400">顶</el-backtop>
    <!--路由视窗-->
    <router-view></router-view>
    <!-- 路由元信息:控制哪些路由显示页足-->
    <my-footer v-show="$route.meta.show"></my-footer>
  </div>
</template>

<script>

import MyHeader from "@/components/Header";
import MyFooter from "@/components/Footer";

export default {
  name: 'App',
  components: {
    MyFooter,
    MyHeader
  },
  mounted() {
    // 派发action，让vuex调用Ajax请求,获取商品分类列表
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style>

</style>
