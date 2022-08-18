<template>
  <div>
    <!--分类导航栏-->
    <type-nav :is-show="false"></type-nav>

    <div class="main">
      <div class="py-container">
        <!--bread：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类面包屑-->
            <li class="with-x"
                v-if="searchParams.categoryName"
                @click="removeCategoryName">{{ searchParams.categoryName }}<i>×</i>
            </li>
            <!--关键字面包屑-->
            <li class="with-x"
                v-if="searchParams.keyword"
                @click="removeKeyword">{{ searchParams.keyword }}<i>x</i>
            </li>
            <!--品牌面包屑-->
            <li class="with-x"
                v-if="searchParams.trademark"
                @click="removeTrademark">{{ searchParams.trademark.split(":")[1] }}<i>x</i>
            </li>
            <!--属性面包屑-->
            <li class="with-x"
                v-for="(item,index) in searchParams.props" :key="index"
                @click="removeAttr(index)">{{ item.split(":")[1] }}<i>x</i>
            </li>
          </ul>
        </div>

        <!--分类-->
        <search-selector
            :trademarkList="trademarkList"
            :attrsList="attrsList"
            @trademarkInfo="getTrademarkInfo"
            @attrInfo="getAttrInfo">
        </search-selector>

        <!--商品展示-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 综合|价格排序的地方 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont"
                               :class="{'icon-Downxiangxia9':isDesc,'icon-Upxiangshang9':isAsc}">
                      </span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont"
                               :class="{'icon-Downxiangxia9':isDesc,'icon-Upxiangshang9':isAsc}">
                      </span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <!--商品详情item-->
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <!--图片懒加载-->
                      <img v-lazy="item.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="item.title">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ item.id }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);" @click="addToCarOnce(item.id,1)" target="_blank"
                       class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!--分页器-->
          <my-pagination
              :page-no="searchParams.pageNo"
              :page-size="searchParams.pageSize"
              :continues="5"
              :total="total"
              @getPageNo="setPageNo">
          </my-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "@/views/Search/SearchSelector/SearchSelector";
import {mapGetters} from "vuex";


export default {
  name: "MySearch",
  components: {SearchSelector},
  // 路由传参之 路由组件自定义属性
  props: ['keyword', 'k'],
  data() {
    return {
      // 初始化请求体
      searchParams: {
        category1Id: "",// 一级分类id
        category2Id: "",// 二级分类id
        category3Id: "",// 三级分类id
        categoryName: "",// 分类名
        keyword: "",// 关键字
        props: [],// 售卖属性
        trademark: "",// 品牌
        order: "1:desc",// 排序类型
        pageNo: 1,// 分页器第几页
        pageSize: 5,// 每页展示数据个数
      },
    }
  },
  computed: {
    ...mapGetters(['goodsList', 'attrsList', 'trademarkList', 'total']),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
  },
  beforeMount() {
    // 浅拷贝
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 发请求
    getData() {
      this.$store.dispatch('getSearchInfo', this.searchParams)
    },
    // 删除面包屑1 类名
    removeCategoryName() {
      // 参数置空并发请求
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也要跟着改
      if (this.$route.params) {
        this.$router.push({name: "search", params: this.$route.params})
      } else {
        this.$router.push({name: "search"})
      }
    },
    // 删除面包屑2 关键字
    removeKeyword() {
      // 参数置空并发请求
      this.searchParams.keyword = undefined
      this.getData()
      // 通知兄弟组件删除关键字
      this.$bus.$emit("clear")
      // 地址栏也要跟着改
      if (this.$route.query) {
        this.$router.push({name: "search", query: this.$route.query})
      } else {
        this.$router.push({name: "search"})
      }
    },
    // 删除面包屑3 品牌名
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 删除面包屑4 属性名
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 父接子，获取品牌信息
    getTrademarkInfo(data) {
      // console.log('父组件',data)
      // 整理品牌字段参数  “ID:品牌名称”
      this.searchParams.trademark = `${data.tmId}:${data.tmName}`
      this.getData()
    },
    // 父接子，获取属性信息
    getAttrInfo(attr, attrValue) {
      console.log(attr, "父", attrValue)
      // 整理属性字段参数  “ID:属性值:属性名”
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
        this.getData()
      }
    },
    // 改变排序
    changeOrder(flag) {
      /** Flag代表综合1(默认)/价格2
       *  Sort代表升序/降序
       *  获取最开始的状态*/
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]
      // 新排序属性暂存
      let newOrder = ""
      // 如果点击的是同一flag，则改变sort
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`
      } else { // 否则点击的是不同flag，则改变flag
        newOrder = `${flag}:desc`
      }
      // 将新排序赋予params,并发起请求
      this.searchParams.order = newOrder
      this.getData()
    },
    // 改变页面
    setPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    },
    addToCarOnce(skuId, num) {
      console.log(skuId, num)
    }
  },
// 监听路由变化，从而按需发起请求
  watch: {
    $route(newUrl) {
      Object.assign(this.searchParams, newUrl.query, newUrl.params)
      this.getData(this.searchParams)
      // 搜索完滞空
      this.searchParams.category1Id = ""
      this.searchParams.category2Id = ""
      this.searchParams.category3Id = ""
    }
  },
}
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      user-select: none;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;
            user-select: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                user-select: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
