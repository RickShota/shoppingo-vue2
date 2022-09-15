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
// 全局注册API
import * as API from '@/api'
// 部分引入element-ui
import { MessageBox,Button,Backtop } from 'element-ui';
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox;
Vue.component(Button.name,Button);
Vue.use(Backtop)
// 引入图片懒加载插件
import VueLazyload from "vue-lazyload";
import limg from '@/assets/loading.jpg'
Vue.use(VueLazyload, {
  loading: limg,
})
// 引入自定义插件
import myPlugins from "@/plugins/myPlugins";
Vue.use(myPlugins,{
  name:'upper'
})
// 引入表单验证插件
import '@/plugins/validate'

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
