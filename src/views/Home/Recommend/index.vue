<template>
  <!--京东秒杀-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="kill">
          <div class="ms">
            <p class="a">京东秒杀</p>
            <p class="b">FLASH DEALS</p>
            <img src="../images/home/soon.png" alt=""/>
            <p class="c">本场距离结束还剩</p>
          </div>
          <ul class="time">
            <li>{{ hour }}</li>
            <li>{{ min }}</li>
            <li>{{ seconds }}</li>
          </ul>
        </li>
        <li class="banner">
          <img src="../images/home/today.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today.png" alt=""/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodayRecommend",
  data() {
    return {
      hour: '00',
      min: '00',
      seconds: '00'
    }
  },
  mounted() {
    this.countDown('2030-12-12 12:12:12')
  },
  methods: {
    // 倒计时方法
    countDown(time) {
      let nowTime = +new Date()
      let inputTime = +new Date(time)
      let times = (inputTime - nowTime) / 1000// 剩余时间总秒数
      let H = parseInt(`${times / 60 / 60 % 24}`)
      H = H < 10 ? '0' + H : H
      let M = parseInt(`${times / 60 % 60}`)
      M = M < 10 ? '0' + M : M
      let S = parseInt(`${times % 60}`)
      S = S < 10 ? '0' + S : S
      this.hour = H
      this.min = M
      this.seconds = S
      const that = this
      // 延迟1秒执行一次
      setTimeout(()=>{
        that.countDown(time)
      },1000)
    }
  },
}
</script>

<style scoped lang="less">
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 40px auto;

    .recommend {
      height: 266px;
      background-color: #eaeaea;
      margin: 10px 0;
      display: flex;

      .kill {
        width: 16.67%;
        background-color: #f02b2b;
        border-radius: 5px;
        color: #fff;
        font-size: 18px;
        text-align: center;

        .ms {
          padding-top: 30px;

          .a {
            font-size: 32px;
            font-weight: lighter;
          }

          .b {
            color: #f9aaaa;
          }

          img {
            width: 50px;
            margin: 10px;
          }

          .c {
            font-size: 14px;
          }

        }

        .time {
          float: contour;
          margin: 15px auto;
          text-align: center;
          line-height: 35px;

          li {
            display: inline-block;
            margin: 2px;
            width: 35px;
            height: 35px;
            background-color: black;
          }
        }

      }

      .banner {
        width: 20.83%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          transition: all .5s;

          &:hover {
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
  }
}
</style>
