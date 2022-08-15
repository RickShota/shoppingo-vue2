import {reqGetOrderInfo, reqGetUserAddress} from "@/api";

export const trade = {
  state: {
    userAddressList: [],
    orderInfo: {},
  },
  getters: {},
  mutations: {
    SET_ADDRESS(state, data) {
      state.userAddressList = data
    },
    SET_ORDERINFO(state, data) {
      state.orderInfo = data
    },
  },
  actions: {
    // 获取用户地址
    async getUserAddress(store) {
      let res = await reqGetUserAddress()
      if (res.code === 200) {
        store.commit('SET_ADDRESS', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 获取订单交易页信息
    async getOrderInfo(store) {
      let res = await reqGetOrderInfo()
      if (res.code === 200) {
        store.commit('SET_ORDERINFO', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  }
}
