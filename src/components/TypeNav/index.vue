<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="mouseleave"
           @mouseover="flag=true"
           @click="goSearch">
        <!--横幅1-->
        <h2 class="all">全部商品分类</h2>
        <!--竖幅:三级联动-->
        <transition name="sort">
          <div class="sort" v-show="flag">
            <!--利用事件委派+编程式导航实现路由跳转-->
            <div class="all-sort-list2">
              <div class="item"
                   :class="{cur:currentIndex===index}"
                   v-for="(c1,index) in categoryList"
                   :key="c1.categoryId">
                <!--一级分类-->
                <h3 @mouseover="changeItem(index)">
                  <a :data-categoryname="c1.categoryName" href="javascript:;"
                     :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!--二三级-->
                <div class="item-list clearfix"
                     :style="{display:currentIndex===index?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryname="c2.categoryName" href="javascript:;"
                           :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryname="c3.categoryName" href="javascript:;"
                             :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!--横幅其他-->
      <nav class="nav">
        <a href="#">服装城</a>
        <a href="#">美妆馆</a>
        <a href="#">尚品汇超市</a>
        <a href="#">全球购</a>
        <a href="#">闪购</a>
        <a href="#">团购</a>
        <a href="#">有趣</a>
        <a href="#">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import throttle from 'lodash/throttle';

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上分类的坐标
      currentIndex: -1,
      // 竖幅显示开关
      flag: this.isShow
    }
  },
  // 自定义属性
  props: {
    // 竖幅显示开关，默认打开
    isShow: {
      default: true,
      type: Boolean,
    }
  },
  // 生命周期：组件挂载完毕
  mounted() {
    // 通知vuex发请求
    // this.$store.dispatch('getCategoryList')
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList,
    })
  },
  methods: {
    // 利用lodash节流:触发回调函数拥有50ms冷却时间
    changeItem: throttle(function (index) {
      this.currentIndex = index
      // console.log('鼠标进入' + index)
    }, 50),
    // 鼠标离开“全部商品”按钮
    mouseleave() {
      this.currentIndex = -1;
      // 如果竖幅显示开关没有打开，则鼠标离开就隐藏
      if (!this.isShow) {
        this.flag = false
      }
    },
    // type路由跳转
    goSearch(e) {
      let element = e.target;
      // 获取自定义属性
      let {categoryname, category1id, category2id, category3id} = element.dataset
      // 判断点击的是不是a
      if (categoryname) {
        // 整理路由参数
        let location = {
          name: "search",
          query: {categoryName: categoryname}
        }
        if (category1id) {
          location.query.category1Id = category1id
        } else if (category2id) {
          location.query.category2Id = category2id
        } else if (category3id) {
          location.query.category3Id = category3id
        }
        // 开始路由跳转
        if (this.$route.params) {
          location.params = this.$route.params
          this.$router.push(location)
        }
      } else {
        console.log('不是a标签');
      }
    },
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    user-select: none;

    .all {
      width: 210px;
      height: 45px;
      text-align: center;
      line-height: 45px;
      background-color: rgb(225, 37, 27);
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        display: inline-block;
        line-height: 45px;
        font-size: 16px;
        text-decoration: none;
        color: #333333;
        cursor: pointer;

        &:hover {
          color: rgb(225, 37, 27);
          font-weight: bold;
        }
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          transition: all .5s;

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;


            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;


                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  cursor: pointer;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  cursor: pointer;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: #ccc;
        }
      }
    }

    // 过渡动画样式
    .sort-enter {
      height: 0;
      opacity: 0;
    }

    .sort-enter-active {
      transition: all 0.3s;
    }

    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }

    .sort-leave {
      height: 461px;
      opacity: 1;
    }

    .sort-leave-active {
      transition: all 0.3s;
    }

    .sort-leave-to {
      height: 0;
      opacity: 0;
    }
  }
}
</style>
