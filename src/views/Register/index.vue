<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>欢迎注册
        <span class="go">我有账号，去 <a href="#login" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text"
               placeholder="请输入你的手机号"
               v-model="phone"
               name="phone"
               v-validate="{ required: true, regex: /^1\d{10}$/ }"
               :class="{ invalid: errors.has('phone') }"/>
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text"
               placeholder="请输入验证码"
               v-model="code"
               name="code"
               v-validate="{ required: true, regex: /^\d{6}$/ }"
               :class="{ invalid: errors.has('code') }">
        <button @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password"
               placeholder="请输入你的登录密码"
               v-model="password"
               name="password"
               v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
               :class="{ invalid: errors.has('password') }">
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password"
               placeholder="请输入确认密码"
               v-model="rePassword"
               name="rePassword"
               v-validate="{ required: true, is:password }"
               :class="{ invalid: errors.has('rePassword') }">
        <span class="error-msg">{{ errors.first("rePassword") }}</span>
      </div>
      <div class="controls">
        <input type="checkbox"
               v-model="isChecked"
               name="agree"
               v-validate="{ required: true, 'agree':true }"
               :class="{ invalid: errors.has('agree') }">
        <span>同意协议《京东用户协议》并注册</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <my-footer></my-footer>
  </div>
</template>

<script>


import MyFooter from "@/components/Footer";
export default {
  name: 'MyRegister',
  components: {MyFooter},
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      rePassword: '',
      isChecked: false
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        await this.$store.dispatch('getCode', this.phone)
        this.code = this.$store.state.users.code
      } catch (e) {
        console.log(e.message)
      }
    },
    // 注册请求
    async userRegister() {
      const success = await this.$validator.validateAll(); //全部表单验证
      if (success) {
        try {
          const {phone, password, code} = this
          await this.$store.dispatch('userRegister', {phone, password, code})
          await this.$router.push('/login',)
        } catch (e) {
          alert(e.message)
        }
      }
    }
  },

}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    border-radius: 5px;
    background-color: #fff;
    margin: 10px auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;


      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
        border-radius: 5px;
      }

      button {
        vertical-align: center;
        margin-left: 20px;
        height: 38px;
        width: 90px;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;


      button {
        outline: none;
        cursor: pointer;
        width: 290px;
        height: 45px;
        background: #e2231a;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        border-radius: 5px;
        border: none;

        &:hover {
          background: #c81623;
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
