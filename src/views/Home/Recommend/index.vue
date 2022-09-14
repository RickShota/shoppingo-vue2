<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="mask">
            <div class="time">
              <img src="../images/home/clock.png" alt=""/>
              <h3>今日推荐</h3>
            </div>
          </div>
        </li>
        <li class="banner">
          <img src="../images/home/today01.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today02.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today03.png" alt=""/>
        </li>
        <li class="banner">
          <img src="../images/home/today04.png" alt=""/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodayRecommend"
}
</script>

<style scoped lang="less">
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 20px auto;

    .recommend {
      height: 165px;
      background-color: #eaeaea;
      margin: 10px 0;
      display: flex;

      .clock {
        width: 16.67%;
        background-image: url("../images/home/banner3.jpg");
        .mask{
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255,.2);
          backdrop-filter: blur(15px);
        }
        color: #fff;
        font-size: 18px;
        text-align: center;

        .time {
          padding: 30px 0;
        }

        h3 {
          margin: 9px 0;
          font-weight: 700;
          font-size: 18px;
          line-height: 30.06px;
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
            transform: scale(1.1,1.1);
          }
        }
      }
    }
  }
}
</style>
