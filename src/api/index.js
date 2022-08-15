/**
 * API统一管理
 */

import requests from "@/api/ajax";
import mockRequests from "@/api/mockAjax";
// 获取三级菜单接口
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList', {})
// 获取轮播图接口
export const reqGetBannerList = () => mockRequests.get('/banner', {})
// 获取楼层接口
export const reqGetFloorList = () => mockRequests.get('/floors', {})
// 搜索接口
export const reqPostSearchInfo = (searchParams) => requests.post('/list', searchParams)
// 获取商品详情接口
export const reqGetGoodsInfo = (skuid) => requests.get(`/item/${skuid}`)
// 添加或修改购物车接口
export const reqPostAddShopCart = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车列表接口
export const reqGetShopCartList = () => requests.get('/cart/cartList')
// 删除购物车接口
export const reqDelShopCart = (skuId) => requests.delete(`cart/deleteCart/${skuId}`)
// 切换商品选中状态
export const reqExchangeCart = (skuID, isChecked) => requests.get(`cart/checkCart/${skuID}/${isChecked}`)
// 获取验证码
export const reqGetCode = (phone) => requests.get(`user/passport/sendCode/${phone}`)
// 注册接口
export const reqPostRegister = (data) => requests.post('/user/passport/register', data)
// 登录接口
export const reqPostLogin = (data) => requests.post('/user/passport/login', data)
// 退出登录
export const reqGetLogout = () => requests.get('/user/passport/logout')
// 借token获取用户信息
export const reqGetUserInfo = () => requests.get('/user/passport/auth/getUserInfo')
// 获取用户地址接口
export const reqGetUserAddress = () => requests.get('/user/userAddress/auth/findUserAddressList')
// 获取订单交易页信息
export const reqGetOrderInfo = () => requests.get('/order/auth/trade')
// 提交订单接口
export const reqPostSubmitOrder = (tradeNo,data) => requests.post(`order/auth/submitOrder?tradeNo=${tradeNo}`,data)
// 获取订单支付信息
export const reqGetPayInfo = (orderId) => requests.get(`payment/weixin/createNative/${orderId}`)
// 查询支付订单状态
export const reqGetPayStatus = (orderId) => requests.get(`payment/weixin/queryPayStatus/${orderId}`)
