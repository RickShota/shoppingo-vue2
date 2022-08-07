import {reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api";

// home数据模块
export const home = {
  state: {
    categoryList: [],// 三级菜单数据
    bannerList: [], // 主轮播图数据
    floorList: [], //副轮播图数据
  },
  getters: {},
  mutations: {
    CATEGORYLIST(state, data) {
      // 接收数据并转存到仓库
      state.categoryList = data
    },
    BANNERLIST(state, data) {
      state.bannerList = data
    },
    FLOORLIST(state,data){
      state.floorList = data
    }
  },
  actions: {
    async getCategoryList(store) {
      const result = await reqCategoryList()
      if (result.code === 200) {
        result.data.pop()
        store.commit('CATEGORYLIST', result.data)
        // console.log("请求CategoryList成功")
      }
    },
    async getBannerList(store) {
      const result = await reqGetBannerList()
      if (result.code === 200) {
        store.commit('BANNERLIST', result.data)
        // console.log("请求BannerList成功")
      }
    },
    async getFloorList(store) {
      const result = await reqGetFloorList()
      if (result.code === 200) {
        store.commit('FLOORLIST', result.data)
        // console.log("请求FloorList成功")
      }
    }
  }
}
