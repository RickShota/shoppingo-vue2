<template>
  <!-- 头部 -->
  <header class="header">
    <!--头部第一行 导航-->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>📍定位失败</p>
          <p v-if="!userName">
            <!--声明式导航-->
            <router-link to="/login" class="login">你好，请登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a href="#home" class="login">用户：{{ userName }}</a>
            <a href="#home" class="register" @click="Logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center" style="color: #f10215">我的订单</router-link>
          <a href="#">我的京东 ∨</a>
          <a href="#">京东会员</a>
          <a href="#">企业采购 ∨</a>
          <a href="#">商家服务 ∨</a>
          <a href="#">网站导航 ∨</a>
          <a href="#">手机京东</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <!--logo-->
      <h1 class="logoArea">
        <a class="logo" title="京东" href="#/home">
          <i class="img"></i>
        </a>
      </h1>
      <!--搜索框-->
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text"
                 id="autocomplete"
                 class="input-error input-xxlarge"
                 v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger search-btn"
                  @click="goSearch"
                  type="button">搜索
          </button>
          <div class="min-text">
            <ul>
              <li style="color: #e6473f">3C电脑数码</li>
              <li>京东京造</li>
              <li>乐高积木</li>
              <li>苹果现货</li>
              <li>空气炸锅</li>
              <li>24期免息</li>
            </ul>
          </div>
        </form>
        <!--购物车按钮-->
        <router-link to="/shopcart"
                     style="color: #f10215"
                     class="myCarBtn">
          <img class="car" src="./images/car.png" alt="">
          我的购物车
        </router-link>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    // 搜索回调
    goSearch() {
      // 路由传参之 字符串形式
      // this.$router.push('/search/' + this.keyword + '?=' + this.keyword.toUpperCase())
      // 路由传参之 模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 路由传参之 对象
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          params: {keyword: this.keyword || undefined},
          query: this.$route.query
        })
      }
    },
    // 退出登录
    async Logout() {
      try {
        // 通知服务器退出,清除本地数据在vuex中执行
        await this.$store.dispatch('logOut')
        // 返回首页
        await this.$router.push('/home')
      } catch (e) {
        console.log(e.message)
      }
    }
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = ""
    })
  },
  computed: {
    // 从仓库拿登录用户名
    userName() {
      return this.$store.state.users.userInfo.nickName
    }
  },
}
</script>

<style scoped lang="less">
.header {
  background-color: #fff;

  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;


      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          a {
            cursor: pointer;

          }

          .login {
            &:hover {
              color: #f10215 !important;
              text-decoration: none;
            }
          }

          .register {
            border-left: 1px solid #b3aeae;
            color: #f10215;
            padding: 0 5px;
            margin-left: 5px;

            &:hover {
              color: #ff5465 !important;
              text-decoration: none;
            }
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }

          &:hover {
            color: #f10215 !important;
            text-decoration: none;
          }
        }
      }
    }
  }

  & > .bottom {
    max-width: 1200px;
    min-width: 735px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .logoArea {
      float: left;

      .logo {
        //精灵图
        .img {
          display: block;
          width: 175px;
          height: 120px;
          background-image: url("~@/components/Header/images/logo.png");
          background-position: 0 0;
        }
      }
    }

    .searchArea {
      float: left;
      margin-top: 35px;
      width: 1000px;
      text-align: center;
      position: relative;

      .searchForm {
        overflow: hidden;
        display: inline-block;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          border-radius: 16px 0 0 16px;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
        .search-btn{
          border-radius: 0 16px 16px 0;
        }
        .min-text {
          margin-top: 40px;

          ul {
            li {
              float: left;
              margin-left: 10px;
              cursor: pointer;
              color: #999999;

              &:hover {
                color: #e6473f;
              }
            }
          }

        }

      }
      .myCarBtn {
        display: inline-block;
        width: 130px;
        height: 30px;
        position: absolute;
        font-size: 13px;
        margin-left: 20px;
        text-align: center;
        line-height: 30px;
        border: #d3d3d3 1px solid;
        border-radius: 20px;
        .car{
          height: 14px;
        }

        &:hover {
          border: #df3033 1px solid;
          color: #df3033!important;
          font-weight: bolder;
          text-decoration: none;
        }
      }
    }


  }
}
</style>
