<template lang="pug">
.select
  div(style="display: flex;")
    el-input(
      v-model="customerName"
      clearable
      @clear="search"
      placeholder="请输入客户名称"
    )
    el-button(
      @click="search"
      type="primary"
      style="margin-left: 10px;"
    ) 搜索
  div(class="header")
    el-checkbox(
      :indeterminate="isIndeterminate"
      v-model="allChecked"
      @change="handleCheckAllChange"
    )
    span(class="title") 客户名称
    span(style="float: right;") 已选择 {{ currentCheck.length }} 个客户
  //- el-scrollbar(style="height: 660px;")
  ul(
    class="list"
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-immediate="false"
  )
    li(
      class="list-item"
      v-for="item in pagedRecords"
      :key="item.id"
    )
      el-checkbox(
        v-model="item.checked"
        @change="handleCheckedChange"
      )
      span(class="title") {{ item.customerName }}
  p(v-if="loading && pagedRecords.length" style="text-align: center;") 加载中...
  p(v-if="disabled && pagedRecords.length" style="text-align: center;") 没有更多了
</template>
<script lang='ts'>
import useCurrent from './useCurrent'
export default {
  setup(props, { emit, root: { $route } }) {
    // state
    const state = useCurrent()
    return {
      ...state
    }
  }
}
</script>
<style lang="stylus" scoped>
.select
  color #494949
  .title
    margin-left 10px
  .header
    background-color #F2F2F6
    border-radius 4px 4px 0 0
    height 50px
    line-height 50px
    padding 0 11px
    margin-top 20px
  .list
    height calc(100vh - 280px)
    overflow-y auto
    .list-item
      padding 0 11px
      border 1px solid #F2F2F6
      border-top 0
      height: 50px
      line-height: 50px
</style>
