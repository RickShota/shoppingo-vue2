import {reqGetCode, reqGetLogout, reqGetUserInfo, reqPostLogin, reqPostRegister} from "@/api";
import {getToken, removeToken, setToken} from "@/utils/token";

export const users = {
  state: {
    code: "",// 验证码
    token: getToken(),// 默认值为本地的登录令牌,不用每次都要触发userLogin的SET_TOKEN
    userInfo: {},// 用户信息
  },
  getters: {},
  mutations: {
    SET_CODE(state, data) {
      state.code = data
    },
    SET_TOKEN(state, data) {
      state.token = data.token
    },
    SET_USERINFO(state, data) {
      state.userInfo = data
    },
    CLEAR(state) {
      state.token = ""
      state.userInfo = {}
      removeToken()
    }
  },
  actions: {
    // 获取验证码
    async getCode(store, phone) {
      let res = await reqGetCode(phone)
      if (res.code === 200) {
        store.commit('SET_CODE', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 用户注册
    async userRegister(store, params) {
      let res = await reqPostRegister(params)
      if (res.code === 200) {
        return 'OK'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 用户登录(重要)
    async userLogin(store, params) {
      let res = await reqPostLogin(params)
      if (res.code === 200) {
        // 将token提交给vuex仓库(不持久)
        store.commit('SET_TOKEN', res.data)
        // 将token提交给本地存储(持久)
        setToken(res.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 借token获取用户信息
    async getUserInfo(store) {
      let res = await reqGetUserInfo()
      if (res.code === 200) {
        // 提取用户信息
        store.commit('SET_USERINFO', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.massage))
      }
    },
    // 退出登录
    async logOut(store) {
      let res = await reqGetLogout()
      if (res.code === 200) {
        // 删除用户信息(注意:action不可以直接操作state)
        store.commit('CLEAR')
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  }
}
