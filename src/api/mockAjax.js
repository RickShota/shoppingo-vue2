// 二次封装axios
import axios from "axios";
import nprogress from 'nprogress'// 进度条插件
import 'nprogress/nprogress.css'
// 利用create方法创建axios实例
const mockAjax = axios.create({
  /*配置对象*/
  baseURL: '/mock', // 基础路径
  timeout: 5000, // 请求超时时间5s
})
// 请求拦截器
mockAjax.interceptors.request.use(config=>{
  nprogress.start();
  return config // 配置对象
})
// 响应拦截器
mockAjax.interceptors.response.use(res=>{
  // 成功回调
  nprogress.done();
  return res.data
},error => {
  //失败回调:终止请求
  return Promise.reject(error)
})
export default mockAjax
