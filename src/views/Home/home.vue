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
    <the-floor v-for="item in florList" :key="item.id" :floor-list="item"></the-floor>
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
  data() {
    return {
      florList: [
        {
          "id": "001",
          "name": "家用电器",
          "keywords": [
            "节能补贴",
            "4K电视",
            "空气净化器",
            "IH电饭煲",
            "滚筒洗衣机",
            "电热水器"
          ],
          "imgObj": "./images/floor-1-1.png",
          "navList": [
            {
              "url": "#",
              "text": "热门"
            },
            {
              "url": "#",
              "text": "大家电"
            },
            {
              "url": "#",
              "text": "生活电器"
            },
            {
              "url": "#",
              "text": "厨房电器"
            },
            {
              "url": "#",
              "text": "应季电器"
            },
            {
              "url": "#",
              "text": "空气/净水"
            },
            {
              "url": "#",
              "text": "高端电器"
            }
          ],
          "carouselList": [
            {
              "id": "0011",
              "imgObj": "./images/floor-1-b01.png"
            },
            {
              "id": "0012",
              "imgObj": "./images/floor-1-b02.png"
            },
            {
              "id": "0013",
              "imgObj": "./images/floor-1-b03.png"
            }
          ],
          "recommendList": [
            "./images/floor-1-2.png",
            "./images/floor-1-3.png",
            "./images/floor-1-5.png",
            "./images/floor-1-6.png"
          ],
          "bigImg": "./images/floor-1-4.png"
        },
        {
          "id": "002",
          "name": "手机通讯",
          "keywords": [
            "节能补贴2",
            "4K电视2",
            "空气净化器2",
            "IH电饭煲2",
            "滚筒洗衣机2",
            "电热水器2"
          ],
          "imgObj": "./images/floor-1-1.png",
          "navList": [
            {
              "url": "#",
              "text": "一线品牌"
            },
            {
              "url": "#",
              "text": "国产手机"
            },
            {
              "url": "#",
              "text": "移动折扣"
            },
            {
              "url": "#",
              "text": "老年手机"
            },
            {
              "url": "#",
              "text": "话费套餐"
            },{
              "url": "#",
              "text": "热门"
            },
            {
              "url": "#",
              "text": "大家电"
            }
          ],
          "carouselList": [
            {
              "id": "0011",
              "imgObj": "./images/floor-1-b01.png"
            },
            {
              "id": "0012",
              "imgObj": "./images/floor-1-b02.png"
            },
            {
              "id": "0013",
              "imgObj": "./images/floor-1-b03.png"
            }
          ],
          "recommendList": [
            "./images/floor-1-2.png",
            "./images/floor-1-3.png",
            "./images/floor-1-5.png",
            "./images/floor-1-6.png"
          ],
          "bigImg": "./images/floor-1-4.png"
        }
      ]
    }
  },
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
    z-index: 5;
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
