<template>
  <div class="home-app">
    <!--分类导航栏-->
    <type-nav></type-nav>
    <!--轮播图与列表-->
    <list-container></list-container>
    <!--浮动边框-->
    <float-bar>
      <template>
        <div class="floatBanner">
          <ul>
            <li @click="toThe(700)">京东秒杀</li>
            <li @click="toThe(1000)">为你推荐</li>
            <li @click="toThe(2100)">家用电器</li>
            <li @click="toThe(2500)">手机通讯</li>
            <li><a
                href="https://jdcs.jd.com/chat/index.action?venderId=1&entry=jd_web_jimi_jdhome"
                target="_blank"
            >客服反馈</a></li>
          </ul>
        </div>
      </template>
    </float-bar>
    <!--今日推荐-->
    <today-recommend></today-recommend>
    <!--为你推荐-->
    <goods-like></goods-like>
    <!--楼层-->
    <the-floor v-for="item in floorList" :key="item.id" :floor-list="item"></the-floor>
    <!--商标-->
    <the-brand></the-brand>
  </div>
</template>

<script>

import ListContainer from "@/views/Home/ListContainer";
import TodayRecommend from "@/views/Home/Recommend";
import GoodsLike from "@/views/Home/Like";
import TheFloor from "@/views/Home/Floor";
import TheBrand from "@/views/Home/Brand";
import {mapState} from "vuex";
import FloatBar from "@/views/Home/FloatBar";

export default {
  name: "MyHome",
  components: {FloatBar, TheBrand, TheFloor, GoodsLike, TodayRecommend, ListContainer},
  // 操作dom最早的时期
  mounted() {
    // 加载楼层列表数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  methods: {
    // 页面跳转
    toThe(num) {
      window.scrollTo({
        top:num,
        behavior:"smooth"
      })
    },
  },
}
</script>

<style scoped lang="less">
.home-app {
  position: relative;

  .floatBanner {
    box-sizing: border-box;
    box-shadow: 1px 1px 13px -10px #333333;
    position: absolute;
    right: 10px;
    width: 58px;
    height: auto;
    margin: 40px 20px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;

    li {
      padding: 10px;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      transition: all 0.3s;
      cursor: default;

      &:hover {
        background-color: #f10215;
        color: white;
      }
    }
  }
}

</style>
