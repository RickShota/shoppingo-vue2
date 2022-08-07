<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" alt=""/>
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" alt="" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "MyZoom",
  props: ['imgUrlList'],
  data() {
    return {
      currentIndex: 1
    }
  },
  computed: {
    imgObj() {
      return this.imgUrlList[this.currentIndex] || {}
    }
  },
  mounted() {
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index
    })
  },
  methods: {
    handler(e) {
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
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
