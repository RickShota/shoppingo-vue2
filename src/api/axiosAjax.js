// 二次封装axios
import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store";
// 利用create方法创建axios实例
const requests = axios.create({
  /*配置对象*/
  // 基础路径:防止打包时proxy代理失效
  baseURL: (process.env.NODE_ENV==="development")?'/api':'http://gmall-h5-api.atguigu.cn/api',
  timeout: 5000, // 请求超时时间5s
})

// 请求拦截器
requests.interceptors.request.use(config=>{
  // 进度条插件开始加载
  nprogress.start();
  // 如果仓库有游客令牌，塞入请求头
  if (store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 如果仓库有账户令牌，塞入请求头
  if (store.state.users.token){
    config.headers.token = store.state.users.token
  }
  return config // 配置对象
})
// 响应拦截器
requests.interceptors.response.use(res=>{
  // 成功回调:进度条插件加载完成
  nprogress.done();
  return res.data
},error => {
  //失败回调:终止请求
  return Promise.reject(error)
})

export default requests
