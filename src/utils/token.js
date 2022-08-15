// 将token提交给本地存储(持久)
export const setToken = (token) => {
  localStorage.setItem('TOKEN',token)
  // console.log('token已存到本地',token)
}
// 获取本地令牌
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
// 清除本地令牌
export const removeToken = () =>{
  localStorage.removeItem('TOKEN')
}
