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
// 全局注册API
import * as API from '@/api'
// 部分引入element-ui
import { MessageBox,Button } from 'element-ui';
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox;
Vue.component(Button.name,Button)

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
    Vue.prototype.$API = API
  }
}).$mount('#app')
