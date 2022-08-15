import {v4 as uuidv4} from 'uuid'
import {getToken} from "@/utils/token";

/**
 *  利用uuid生成随机字符串,作为游客令牌
 *  每次执行不能发生变化，游客身份持久储存
 */

export const getUUID = () => {
  // 本地储存有就不生成，没有就生成
  let uuid_token = localStorage.getItem("uuid_token")
  let token = getToken();
  if (!token && !uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem("uuid_token", uuid_token)
  }
  return uuid_token
}
