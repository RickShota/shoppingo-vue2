import Home from "@/views/Home/home";
import Search from "@/views/Search";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";

/**
 * 路由配置文件
 */
export default [
  /*路由重定向*/
  {path: '/', redirect: '/home'},
  /*主页*/
  {
    path: '/home',
    component: Home,
    meta: {show: true}// 路由元信息:控制哪些路由显示页足
  },
  /*搜索页*/
  {
    name: 'search',
    path: '/search/:keyword?',// 加问号代表params可传可不传
    component: Search,
    meta: {show: true},
    // props: true,// 打开路由组件传参
    // props: {keyword:'ng',k:'ng'},// 对象写法
    props: route => ({keyword: route.params.keyword, k: route.query.k}),// 函数写法
  },
  /*登录页*/
  {path: '/login', component: Login},

  /*注册页*/
  {path: '/register', component: Register},

  /*商品详情页*/
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {show: true},
  },

  /*购物车添加成功页*/
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {show: true}
  }
]
