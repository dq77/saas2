<template lang="pug">
.p-bar
  .u-list-item
    div
      .u-label 付款客户名称
      .u-content-lighter {{ info.customerName }}
  .u-list-item.u-center
    div
      .u-label 付款单号
      .u-content-lighter
        span {{ info.billNo }}
  .u-list-item.u-center
    div
      .u-label 创建时间
      .u-content-lighter {{ info.createdTime }}
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    info: Object
  },
})
</script>

<style lang="stylus" scoped>
.p-bar
  display: flex
  padding 20px 20px 20px 10px
  .u-center
    justify-content: center
  .u-label
    color #494949
    font-size: 14px
    line-height: 17px
  .u-content-lighter
    margin-top 7px
    color #494949
    font-size: 12px
    line-height: 31px
  .u-list-item
    display: flex
    align-items: center
    flex 1
    padding-left 20px
    width 0
    border-right 1px solid #F2F2F6
    &:last-child
      margin-right 0
</style>
