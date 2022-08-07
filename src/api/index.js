// API统一管理
import requests from "@/utils/request";
import mockRequests from "@/utils/mockAjax";
// 获取三级菜单数据
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList', {})
// 获取轮播图数据
export const reqGetBannerList = () => mockRequests.get('/banner', {})
export const reqGetFloorList = () => mockRequests.get('/floors', {})
// 获取搜索数据
export const reqPostSearchInfo = (searchParams) => requests.post('/list', searchParams)
// 获取商品详情数据
export const reqGetGoodsInfo = (skuid) => requests.get(`/item/${skuid}`)
// 添加购物车
export const reqPostAddShopCart = (skuId,skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
