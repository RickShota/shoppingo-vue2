<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!--购物车商品item-->
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked"
                   @click="updateChecked(item.skuId, $event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" alt="">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(-1,item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum"
                   @change="handler($event.target.value,item)"
                   class="itxt">
            <a href="javascript:void(0)" class="plus" @click="handler(1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteData(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="updateAllChecked($event)">&nbsp;
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span> 件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import throttle from "lodash/throttle";

export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['cartList']),
    // 提取购物车列表
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算总价
    totalPrice() {
      // 累加器reduce((运算结果,数组每一项)=>计算公式,初始值)
      return this.cartInfoList.reduce((sum, item) => item.isChecked ? sum += item.skuNum * item.skuPrice : sum += 0, 0)
    },
    // 全选判断
    isAllChecked() {
      // 遍历数组every((数组每一项)=>满足条件)  都满足返回true,有一个不满足返回false
      return this.cartInfoList.every(item => item.isChecked === 1)
    }
  },
  methods: {
    // 得到购物车列表请求
    getData() {
      this.$store.dispatch('getCartList')
    },
    // 修改购物车请求
    async changeData(skuId, skuNum) {
      try {
        await this.$store.dispatch('setGoodsToCart', {skuId, skuNum})
        // 若成功则请求列表刷新页面
        this.getData()
      } catch (e) {
        console.log(e.message)
      }
    },
    // 删除购物车请求
    async deleteData(skuId) {
      try {
        await this.$store.dispatch('deleteCartGoods', skuId)
        this.getData()
      } catch (e) {
        alert('删除失败，请稍后重试 >_<')
      }
    },
    // 删除选中的商品
    async deleteChecked() {
      try {
        await this.$store.dispatch('deleteAllChecked', this.cartInfoList)
        this.getData()
      } catch (e) {
        console.log(e.message)
      }
    },
    // 修改购物车事件处理函数(节流cd)
    handler: throttle(function (disNum, cart) {
      switch (disNum) {
        case 1:
          this.changeData(cart.skuId, 1)
          break
        case -1:
          if (cart.skuNum > 1) this.changeData(cart.skuId, -1)
          break
        default:
          if (disNum > 0 && !isNaN(disNum))
            this.changeData(cart.skuId, parseInt(disNum) - cart.skuNum)
      }
    }, 1000),
    // 切换商品选中状态
    async updateChecked(skuId, isChecked) {
      try {
        let checked = isChecked ? '1' : '0'
        await this.$store.dispatch('exchangeChecked', {skuId: skuId, isChecked: checked})
        this.getData()
      } catch (e) {
        console.log(e.message)
      }
    },
    //全选的业务
    async updateAllChecked(e) {
      //获取全选的复选框勾选的状态,接口需要的1|0
      let isChecked = e.target.checked ? "1" : "0";
      try {
        //await等待成功:购物车全部商品勾选状态成功以后
        await this.$store.dispatch("allUpdateChecked", isChecked);
        this.getData();
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;


        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
          line-height: 82px;
        }

        .cart-list-con2 {
          width: 45%;
          float: left;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;


          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;


          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei", serif;
          background: #e1251b;
          overflow: hidden;

          &:hover {
            color: white !important;
            background: #ff2519;
          }
        }
      }
    }
  }
}
</style>
