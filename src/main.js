import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import '@/mock/mockServer';
import 'swiper/css/swiper.min.css';
// 全局注册组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";

Vue.component('type-nav', TypeNav)
Vue.component('my-carousel', Carousel)
Vue.component('my-pagination', Pagination)

Vue.config.productionTip = false

new Vue({
  router,store,
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
