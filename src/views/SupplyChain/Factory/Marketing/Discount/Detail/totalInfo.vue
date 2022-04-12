<template lang="pug">
div.collection-detail
  ul.content
    li(v-for="item in detailColums" :key="item.key")
      .des {{ item.label }}
      .num(:style="{color: item.color || ''}") {{ item.transform ? toAmountStr(totalInfo && totalInfo[item.key] ? totalInfo[item.key] : 0, 2, true) : totalInfo && totalInfo[item.key] || 0}}
</template>
<script>
import { toAmountStr } from '@/utils/util'
import { detailColums } from './config'
export default {
  props: {
    totalInfo: {
      type: Object
    }
  },
  setup(props, { root }) {
    return {
      toAmountStr,
      detailColums
    }
  }
}
</script>
<style lang="stylus" scoped>
.collection-detail
  background #fff
  margin-bottom 18px
  border-radius var(--defaultStadius)
  .content
    display flex
    align-items center
    padding 20px 0 22px 0
    background-color #F8F9FA
    li
      position relative
      width 20%
      text-align left
      margin-left 18px
      &:not(:last-child)
        &:after
          content ''
          height 40px
          border-left 1px solid #ECECFF
          position absolute
          top 12px
          right 0px
      .num
        color #383B42
        font-size 14px
        font-weight 500
        line-height 20px
      .des
        color #383B42
        line-height 20px
        margin-top 7px
</style>
