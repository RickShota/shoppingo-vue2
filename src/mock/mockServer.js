// 1.引入Mock对象
import Mock from 'mockjs'
// 2.引入json数据
import banner from './banner.json'
import floors from './floors.json'
// 3.配置模拟接口
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floors",{code:200,data:floors})
