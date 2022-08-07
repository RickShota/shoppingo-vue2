// search数据模块
import {reqPostSearchInfo} from "@/api";

export const search = {
  state() {
    return {
      searchList: {}
    }
  },
  getters: {
    goodsList(state) {
      // 防止list为空,要加个或
      return state.searchList.goodsList ?? []
    },
    trademarkList(state) {
      return state.searchList.trademarkList ?? []
    },
    attrsList(state) {
      return state.searchList.attrsList ?? []
    },
    total(state) {
      return state.searchList.total ?? []
    }
  },
  mutations: {
    GETSEARCHINFO(state, data) {
      state.searchList = data
    }
  },
  actions: {
    async getSearchInfo(store, params) {
      const res = await reqPostSearchInfo(params)
      if (res.code === 200) {
        store.commit('GETSEARCHINFO', res.data)
        // console.log('请求搜索信息成功')
      }
    }
  }
}
