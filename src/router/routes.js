import Login from "@/views/Login";
import Register from "@/views/Register";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";
import Trade from "@/views/Trade";
import Pay from "@/views/Pay";
import PaySuccess from "@/views/PaySuccess";
import Center from "@/views/Center";
import myOrder from "@/views/Center/myOrder";
import groupOrder from "@/views/Center/groupOrder";

/**
 * 路由懒加载
 */
const foo = () => {
  return import("@/views/Home/home")
}

/**
 * 路由配置文件
 */
export default [
  /*路由重定向*/
  {path: '/', redirect: '/home'},
  /*主页*/
  {
    path: '/home',
    component: foo,
    meta: {show: true}// 路由元信息:控制哪些路由显示页足
  },
  /*搜索页*/
  {
    name: 'search',
    // 在注册路由的时候,如果这里占位，切记务必要传递params
    path: '/search/:keyword?',// 加问号代表params可传可不传
    component: () => import ("@/views/Search"),
    meta: {show: true},
    // 1.打开路由组件传参,相当于把params参数，作为props属性值传递给这个路由组件
    // props: true,
    // 2.对象写法
    // props: {keyword:'ng',k:'ng'},
    // 3.函数写法,一般是把query参数与params参数当做props传递给路由组件
    props: route => ({keyword: route.params.keyword, k: route.query.k}),
  },
  /*登录页*/
  {path: '/login', component: Login},
  /*注册页*/
  {path: '/register', component: Register, props: true},
  /*商品详情页*/
  {
    path: '/detail/:skuid?',
    component: Detail,
    meta: {show: true},
  },
  /*商品添加成功页*/
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {show: true},
  },
  /*购物车页*/
  {
    path: '/shopcart',
    component: ShopCart,
    meta: {show: true},
  },
  /*结算页面*/
  {
    path: '/trade',
    component: Trade,
    meta: {show: true},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 如果是从购物车来
      if (from.path === '/shopcart') {
        next() // 放行
      } else {
        next(false) // 否则阻止
      }
    }
  },
  /*支付页面*/
  {
    path: '/pay',
    component: Pay,
    meta: {show: true},
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  /*支付成功页面*/
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {show: true},
  },
  /*个人中心页*/
  {
    path: '/center',
    component: Center,
    meta: {show: true},
    // 嵌套路由
    children: [
      {path: '/center', redirect: '/center/myorder'},
      {path: 'myorder', component: myOrder},
      {path: 'grouporder', component: groupOrder},
    ]
  },
]
