<template>
  <div class="swiper-container" :id="idName">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgObj" alt="">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "MyCarousel",
  data() {
    return {
      idName: 'Swiper'+this.id
    }
  },
  props: ['list', 'id'],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // swiper轮播图逻辑
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(`${'#'+this.idName}`, {
            direction: "horizontal",
            loop: true, // 循环模式
            autoplay: { // 3秒自动播放
              disableOnInteraction: false,
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
