<template>
  <!--分页器-->
  <div class="pagination">
    <button @click="$emit('getPageNo',pageNo-1)" :disabled="pageNo===1">上一页</button>
    <button v-if="startAndEnd.start>1"
            @click="$emit('getPageNo',1)"
            :class="{'active':pageNo===1}">1</button>
    <button v-if="startAndEnd.start>2">···</button>

    <button @click="toPage(page)"
            v-for="(page,i) in startAndEnd.end" :key="i"
            v-show="page >= startAndEnd.start"
            :class="{'active':page===pageNo}">{{ page }}
    </button>

    <button v-if="startAndEnd.end<totalPage-1">···</button>
    <button v-if="startAndEnd.end<totalPage"
            @click="$emit('getPageNo',totalPage)"
            :class="{'active':pageNo===totalPage}">{{ totalPage }}
    </button>
    <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo===totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize) // 向上取整
    },
    // 连续页的起始与结束
    startAndEnd() {
      const {continues, pageNo, totalPage} = this
      let start = 0, end = 0
      // 总页数小于连续页数
      if (totalPage <= continues) {
        start = 1
        end = totalPage
      } else { // 否则正常情况
        start = pageNo - parseInt(`${continues / 2}`)
        end = pageNo + parseInt(`${continues / 2}`)
        // 约束start|end在合理范围之内
        // 如果start小于1则固定(1~5)
        if (start < 1) {
          start = 1
          end = continues
        }
        // 如果end大于总页则固定(END-4~END)
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return {start, end}
    }
  },
  methods: {
    // 子传父
    toPage(index) {
      this.$emit('getPageNo', index)
    }
  },
}
</script>

<style scoped lang="less">
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
