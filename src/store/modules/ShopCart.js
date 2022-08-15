import {reqDelShopCart, reqExchangeCart, reqGetShopCartList} from "@/api";

export const shopCart = {
  state: {
    cartList: []
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {}
    }
  },
  mutations: {
    CARTLIST(state, data) {
      state.cartList = data || []
    }
  },
  actions: {
    // 获取购物车列表
    async getCartList(store) {
      let res = await reqGetShopCartList()
      if (res.code === 200) {
        console.log("获取购物车列表成功")
        store.commit('CARTLIST', res.data)
      }
    },
    // 删除单个购物车商品
    async deleteCartGoods(store, skuId) {
      let res = await reqDelShopCart(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    // 切换单个商品选中状态
    async exchangeChecked(store, {skuId, isChecked}) {
      let res = await reqExchangeCart(skuId, isChecked)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    // 修改全部商品的勾选的状态
    allUpdateChecked(store, isChecked) {
      let PromiseAll = [];
      //获取购物车商品的个数,进行遍历
      store.getters.cartList.cartInfoList.forEach(item => {
        //调用修改某一个商品的action【四次】
        let promise = store.dispatch("exchangeChecked", {skuId: item.skuId, isChecked});
        PromiseAll.push(promise);
      })
      //Promise.all():参数需要的是一个数组【数组里面需要promise】
      //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
      //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
      return Promise.all(PromiseAll);
    },
    // 删除选中商品
    deleteAllChecked(store, cartInfoList) {
      let PromiseAll = []
      cartInfoList.forEach(item => {
        let promise = item.isChecked ? store.dispatch('deleteCartGoods', item.skuId) : ''
        // 将每一次返回的Promise添加到数组中
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }
  }
}
