<template>
  <div class="clearfix selector">
    <!--商品品牌-->
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li v-for="item in trademarkList" :key="item.tmId"
              @click="trademarkHandler(item)">{{ item.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!--商品属性-->
    <div class="type-wrap" v-for="t1 in attrsList" :key="t1.attrId">
      <div class="fl key">{{ t1.attrName }}</div>
      <div class="fl value">
        <!--属性值-->
        <ul class="type-list">
          <li v-for="(t2,index) in t1.attrValueList" :key="index" @click="attrHandler(t1,t2)">
            <a>{{ t2 }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSelector',
  props: ['trademarkList', 'attrsList'],
  methods: {
    // 品牌事件处理函数,子向父传值:品牌信息
    trademarkHandler(data) {
      // console.log('子组件', data)
      this.$emit('trademarkInfo', data)
    },
    // 属性事件处理函数,子向父传值:属性信息
    attrHandler(attr, attrValue) {
      console.log(attr, "子", attrValue)
      this.$emit('attrInfo', attr, attrValue)
    }
  },
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;
    user-select: none;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;
          cursor: pointer;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;
          cursor: pointer;

          a {
            text-decoration: none;
            color: #666;
            user-select: none;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
        cursor: pointer;
      }
    }
  }
}
</style>
