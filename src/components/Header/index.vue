<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!--声明式导航-->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a href="#home">用户：{{ userName }}</a>
            <a href="#home" class="register" @click="Logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="#">我的尚品汇</a>
          <a href="#">尚品汇会员</a>
          <a href="#">企业采购</a>
          <a href="#">关注尚品汇</a>
          <a href="#">合作招商</a>
          <a href="#">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="#/home">
          <img src="./images/logo.png" alt="">
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text"
                 id="autocomplete"
                 class="input-error input-xxlarge"
                 v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger"
                  @click="goSearch"
                  type="button">搜索
          </button>
        </form>
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
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          a{
            cursor: pointer;
          }

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
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
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
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
      }
    }
  }
}
</style>
