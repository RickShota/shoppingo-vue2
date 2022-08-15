import {reqGetGoodsInfo, reqPostAddShopCart} from "@/api";
import {getUUID} from "@/utils/uuid_token";

export const detail = {
  state: {
    goodsInfo: {},
    uuid_token: getUUID(),// 游客临时身份
  },
  // 简化数据
  getters: {
    categoryView(state) {
      return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodsInfo.spuSaleAttrList || []
    }
  },
  mutations: {
    // 获取商品详情
    GOODSINFO(state, data) {
      state.goodsInfo = data
    }
  },
  actions: {
    // 获取商品详情
    async getGoodsInfo(store, skuId) {
      let res = await reqGetGoodsInfo(skuId)
      if (res.code === 200) {
        store.commit('GOODSINFO', res.data)
        // console.log('请求商品详情成功')
      }
    },
    // 将产品添加购物车
    async setGoodsToCart(store, {skuId, skuNum}) {
      let res = await reqPostAddShopCart(skuId, skuNum)
      if (res.code === 200) {
        // 返回成功参数
        return "OK"
      } else {
        // 返回失败参数
        return Promise.reject(new Error(res.message))
      }
    }
  }
}
