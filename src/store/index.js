import Vue from "vue";
import Vuex from 'vuex'
import {home} from "@/store/modules/Home";
import {search} from "@/store/modules/Search";
import {detail} from "@/store/modules/Detail";
import {shopCart} from "@/store/modules/ShopCart";
import {users} from "@/store/modules/User";
import {trade} from "@/store/modules/Trade";


Vue.use(Vuex)

export default new Vuex.Store({
  // 数据源
  state: {},
  // 计算属性
  getters: {},
  // 同步修改
  mutations: {},
  // 异步修改
  actions: {},
  // 模块化
  modules: {
    home,
    search,
    detail,
    shopCart,
    users,
    trade
  }
})
