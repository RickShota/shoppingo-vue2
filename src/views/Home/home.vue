<template>
  <div>
    <!--分类导航栏-->
    <type-nav></type-nav>
    <!--轮播图与列表-->
    <list-container></list-container>
    <!--今日推荐-->
    <today-recommend></today-recommend>
    <!--商品排行-->
    <goods-rank></goods-rank>
    <!--猜你喜欢-->
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
import GoodsRank from "@/views/Home/Rank";
import GoodsLike from "@/views/Home/Like";
import TheFloor from "@/views/Home/Floor";
import TheBrand from "@/views/Home/Brand";
import {mapState} from "vuex";

export default {
  name: "MyHome",
  components: {TheBrand, TheFloor, GoodsLike, GoodsRank, TodayRecommend, ListContainer},
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
}
</script>

<style scoped>

</style>
