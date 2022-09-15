<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0;">扫码登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form action="##">
              <div class="input-text clearFix">
                <span class="up-img"><img src="./images/user.png" alt=""></span>
                <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone">
              </div>
              <div class="input-text clearFix">
                <span class="up-img"><img src="./images/pw.png" alt=""></span>
                <input type="password" placeholder="请输入密码" v-model="password">
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="userLogin">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from "@/components/Footer";
export default {
  name: 'MyLogin',
  components: {MyFooter},
  data() {
    return {
      phone: "",
      password: "",
    }
  },
  methods: {
    // 登录请求
    async userLogin() {
      try {
        const {phone, password} = this
        // 逐步判断，true就继续执行，否则中断
        phone && password && await this.$store.dispatch('userLogin', {phone, password})
        // 小细节：判断是否有query参数,有则跳转到指定路由,否则默认跳home
        let toPath = this.$route.query.redirect || '/home'
        await this.$router.push(`${toPath}`)
      } catch (e) {
        console.log(e.message)
        alert('登录失败')
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      border-radius: 10px;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;

          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            .up-img {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
              background-color: #f3f3f3;
              text-align: center;
              line-height: 46px;
              img{
                width: 25px;
              }
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              font-size: 14px;
              line-height: 22px;
              padding: 6px 8px;
              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background: #e2231a;
            padding: 6px;
            border-radius: 10px;
            font-size: 16px;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
            &:hover {
              background: #c81623;
            }
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }

      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }

}
</style>
